import { UserRole } from "@/generated/prisma/enums";
import { prisma } from "@/lib/db";
import {
  getJudge0LanguageId,
  pollBatchResults,
  submitBatch,
} from "@/lib/judge0";
import { currentRole, getCurrentUserData } from "@/modules/auth/actions";

import { NextRequest, NextResponse } from "next/server";

const BATCH_SIZE = 8;

export async function POST(request: NextRequest) {
  try {
    const userRole = await currentRole();
    const userData = await getCurrentUserData();
    if (userRole !== UserRole.ADMIN) {
      return NextResponse.json({ error: "No Authorized" }, { status: 401 });
    }

    if (!userData) {
      return NextResponse.json(
        { error: "User not found. Please complete onboarding." },
        { status: 401 },
      );
    }

    const {
      title,
      description,
      difficulty,
      tags,
      example,
      constraints,
      codeSnippets,
      testCases,
      referenceSolutions,
    } = await request.json();

    if (
      !title ||
      !description ||
      !difficulty ||
      !testCases ||
      !codeSnippets ||
      !referenceSolutions
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }
    if (!Array.isArray(testCases) || testCases.length === 0) {
      return NextResponse.json(
        { error: "At least one testcase is required" },
        { status: 400 },
      );
    }

    for (const [language, solutionCode] of Object.entries(
      referenceSolutions as Record<string, string>,
    )) {
      // 1. get judge0 language id for current lang
      const languageId = getJudge0LanguageId(language);
      // 2. prepare judge0 submissions for all test cases
      const submissions = testCases.map(({ input, output }) => ({
        language_id: languageId,
        source_code: solutionCode,
        expected_output: output,
        stdin: input,
      }));

      // // 3. submit all testcases in one batch
      // const submissionResult = await submitBatch(submissions);
      // // 4. Extract tokens from response
      // const token = submissionResult.map((res: any) => res.token);
      // // 5. poll judg0 untill all submissions are done
      // const results = await pollBatchResults(token);

      //3. submit test cases in batch of 8
      const results: any[] = [];
      for (let i = 0; i < submissions.length; i += BATCH_SIZE) {
        const currentBatch = submissions.slice(i, i + BATCH_SIZE);

        // 4. submit current batch
        const submissionResult = await submitBatch(currentBatch);

        // 5. Extract token
        const tokens = submissionResult.map((res: any) => res.token);

        // 6. poll until current batch is completes
        const batchResults = await pollBatchResults(tokens);
        // 7. store results
        results.push(...batchResults);
      }
      // 8. validate that each test cases
      for (let i = 0; i < results.length; i++) {
        const result = results[i];

        if (result.status.id !== 3) {
          return NextResponse.json(
            {
              error: `validation failed for ${language}`,
              testCases: {
                input: submissions[i].stdin,
                expectedOutput: submissions[i].expected_output,
                actualOutput: result.stdout,
                error: result.stderr || result.compile_output,
              },
              details: result,
            },
            { status: 400 },
          );
        }
      }
    }
    const newProblem = await prisma.problem.create({
      data: {
        title,
        description,
        tags,
        example,
        difficulty,
        testCases,
        referenceSolutions,
        constraints,
        codeSnippets,
        //@ts-ignore
        userId: userData.id,
      },
    });
    return NextResponse.json(
      {
        success: true,
        message: "Problem Created successful !",
        data: newProblem,
      },
      { status: 201 },
    );
  } catch (error) {
    console.log("Database error:", error);
    return NextResponse.json(
      {
        error: "Failed to saved problem in database",
      },
      { status: 500 },
    );
  }
}
