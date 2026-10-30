"use client";
import { useForm, useFieldArray } from "react-hook-form";
import { toast, Toaster } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { defaultFormValues, problemSchema } from "@/modules/problems/schema";
import { SAMPLE_PROBLEMS } from "@/modules/problems/constant/sample-problems";

export function useCreateProblem() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [sampleType, setSampleType] = useState("DP");

  const form = useForm({
    resolver: zodResolver(problemSchema),
    defaultValues: defaultFormValues,
  });
  const testCasesArray = useFieldArray({
    control: form.control,
    name: "testCases",
  });

  const tagsArray = useFieldArray({
    control: form.control,
    name: "tags" as any,
  });
  const onSubmit = async (values: typeof defaultFormValues) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/create-problem", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      console.log("Create Problem Response:", response.status, data);
      if (!response.ok || !data.success) {
        toast.error(data.error || "Failed to create problem");
        return;
      }

      toast.success("Problem created successfully!");
      router.push("/problems");
    } catch (error) {
      console.log("Problem creating error", error);
      toast.error("Failed to create problem");
    } finally {
      setIsLoading(false);
    }
  };
  const onInvalid = (errors: any) => {
    console.error("Form Validation Errors:", errors);
    toast.error("Please check all required fields!");
  };
  const loadSampleData = async (values: any) => {
    const sampleData =
      SAMPLE_PROBLEMS[sampleType as keyof typeof SAMPLE_PROBLEMS];
    tagsArray.replace(sampleData.tags.map((tag) => tag));
    testCasesArray.replace(sampleData.testCases.map((test) => test));

    form.reset(sampleData);
  };

  return {
    form,
    testCasesArray,
    sampleType,
    setSampleType,
    tagsArray,
    isLoading,
    onSubmit: form.handleSubmit(onSubmit, onInvalid),
    loadSampleData,
  };
}
