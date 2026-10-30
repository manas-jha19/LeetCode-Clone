"use client";

import type { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { problemSchema } from "../../schema";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import { FlaskConical, Plus, Trash2, Terminal } from "lucide-react";

type ProblemFormData = z.infer<typeof problemSchema>;

interface TestCasesSectionProps {
  form: UseFormReturn<ProblemFormData>;
  testCasesArray: any;
}

export function TestCasesSection({
  form,
  testCasesArray,
}: TestCasesSectionProps) {
  const {
    register,
    formState: { errors },
  } = form;

  const { fields, append, remove } = testCasesArray;

  return (
    <Card className="bg-indigo-50 dark:bg-indigo-950/20">
      <CardHeader className="pb-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-xl">
              <FlaskConical className="h-5 w-5 text-indigo-600" />
              Test Cases
            </CardTitle>

            <p className="mt-1 text-sm text-muted-foreground">
              Add input and expected output for each test case.
            </p>
          </div>

          <Button
            type="button"
            size="sm"
            className="gap-2"
            onClick={() => append({ input: "", output: "" })}
          >
            <Plus className="h-4 w-4" />
            Add Test Case
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {fields.map((field: { id: string }, index: number) => {
          const testCaseError = errors.testCases?.[index];

          return (
            <div
              key={field.id}
              className="rounded-xl border bg-background p-4 shadow-sm"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2 font-semibold">
                  <Terminal className="h-4 w-4 text-indigo-600" />
                  Test Case {index + 1}
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => remove(index)}
                  disabled={fields.length <= 1}
                  aria-label={`Remove test case ${index + 1}`}
                  title={
                    fields.length <= 1
                      ? "At least one test case is required"
                      : "Remove test case"
                  }
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor={`testCases.${index}.input`}>Input</Label>

                  <Textarea
                    id={`testCases.${index}.input`}
                    {...register(`testCases.${index}.input`)}
                    placeholder="Example: 5"
                    className="min-h-24 resize-y font-mono text-sm"
                  />

                  {testCaseError?.input && (
                    <p className="text-sm text-red-500">
                      {testCaseError.input.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`testCases.${index}.output`}>
                    Expected Output
                  </Label>

                  <Textarea
                    id={`testCases.${index}.output`}
                    {...register(`testCases.${index}.output`)}
                    placeholder="Example: 8"
                    className="min-h-24 resize-y font-mono text-sm"
                  />

                  {testCaseError?.output && (
                    <p className="text-sm text-red-500">
                      {testCaseError.output.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {typeof errors.testCases?.message === "string" && (
          <p className="text-sm text-red-500">{errors.testCases.message}</p>
        )}
      </CardContent>
    </Card>
  );
}
