"use client";

import { useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Code2, FileCode2, FlaskConical, Lightbulb } from "lucide-react";

import { problemSchema } from "../../schema";
import { LANGUAGES } from "../../schema";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CodeEditor } from "./code-editor";

type ProblemFormData = z.infer<typeof problemSchema>;
type Language = "JAVASCRIPT" | "JAVA" | "PYTHON";

interface LanguageSectionProps {
  form: UseFormReturn<ProblemFormData>;
}

const LANGUAGE_OPTIONS: {
  value: Language;
  label: string;
  editorLanguage: "javascript" | "java" | "python";
}[] = [
  {
    value: "JAVASCRIPT",
    label: "JavaScript",
    editorLanguage: "javascript",
  },
  {
    value: "JAVA",
    label: "Java",
    editorLanguage: "java",
  },
  {
    value: "PYTHON",
    label: "Python",
    editorLanguage: "python",
  },
] as const;

export function LanguageSection({ form }: LanguageSectionProps) {
  const [activeLanguage, setActiveLanguage] = useState<Language>("JAVASCRIPT");

  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const activeOption = LANGUAGE_OPTIONS.find(
    (item) => item.value === activeLanguage,
  )!;

  const starterCode = watch(`codeSnippets.${activeLanguage}`) ?? "";

  const referenceSolution = watch(`referenceSolutions.${activeLanguage}`) ?? "";

  const exampleErrors = errors.example?.[activeLanguage];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Code2 className="size-5" />
          <CardTitle>Language & Code Configuration</CardTitle>
        </div>

        <CardDescription>
          Configure examples, starter code, and reference solutions for each
          programming language.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Language Tabs */}
        <div className="flex flex-wrap gap-2">
          {LANGUAGE_OPTIONS.map((language) => (
            <Button
              key={language.value}
              type="button"
              variant={
                activeLanguage === language.value ? "default" : "outline"
              }
              onClick={() => setActiveLanguage(language.value)}
            >
              {language.label}
            </Button>
          ))}
        </div>

        {/* Example Configuration */}
        <section className="space-y-4 rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <FlaskConical className="size-5" />
            <div>
              <h3 className="font-semibold">Example</h3>
              <p className="text-sm text-muted-foreground">
                Sample input, expected output, and explanation.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`example-input-${activeLanguage}`}>Input</Label>
            <Textarea
              id={`example-input-${activeLanguage}`}
              placeholder="Enter example input"
              {...register(`example.${activeLanguage}.input`)}
            />
            {exampleErrors?.input?.message && (
              <p className="text-sm text-destructive">
                {exampleErrors.input.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor={`example-output-${activeLanguage}`}>Output</Label>
            <Textarea
              id={`example-output-${activeLanguage}`}
              placeholder="Enter expected output"
              {...register(`example.${activeLanguage}.output`)}
            />
            {exampleErrors?.output?.message && (
              <p className="text-sm text-destructive">
                {exampleErrors.output.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor={`example-explanation-${activeLanguage}`}>
              Explanation (Optional)
            </Label>
            <Textarea
              id={`example-explanation-${activeLanguage}`}
              placeholder="Explain how the example works"
              {...register(`example.${activeLanguage}.explanation`)}
            />
          </div>
        </section>

        {/* Starter Code Editor */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <FileCode2 className="size-5" />
            <div>
              <h3 className="font-semibold">Starter Code</h3>
              <p className="text-sm text-muted-foreground">
                Code template shown to users when they solve the problem.
              </p>
            </div>
          </div>

          <CodeEditor
            language={activeOption.editorLanguage}
            value={starterCode}
            onChange={(value) =>
              setValue(`codeSnippets.${activeLanguage}`, value, {
                shouldDirty: true,
                shouldValidate: true,
              })
            }
          />

          {errors.codeSnippets?.[activeLanguage]?.message && (
            <p className="text-sm text-destructive">
              {errors.codeSnippets[activeLanguage]?.message}
            </p>
          )}
        </section>

        {/* Reference Solution Editor */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="size-5" />
            <div>
              <h3 className="font-semibold">Reference Solution</h3>
              <p className="text-sm text-muted-foreground">
                Admin's correct solution used for testing and evaluation.
              </p>
            </div>
          </div>

          <CodeEditor
            language={activeOption.editorLanguage}
            value={referenceSolution}
            onChange={(value) =>
              setValue(`referenceSolutions.${activeLanguage}`, value, {
                shouldDirty: true,
                shouldValidate: true,
              })
            }
          />

          {errors.referenceSolutions?.[activeLanguage]?.message && (
            <p className="text-sm text-destructive">
              {errors.referenceSolutions[activeLanguage]?.message}
            </p>
          )}
        </section>
      </CardContent>
    </Card>
  );
}
