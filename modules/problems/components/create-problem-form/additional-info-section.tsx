import z from "zod";
import { problemSchema } from "../../schema";
import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type ProblemFormData = z.infer<typeof problemSchema>;

interface AdditionalInfoSectionProps {
  form: UseFormReturn<ProblemFormData>;
}

export function AdditionalInfoSection({ form }: AdditionalInfoSectionProps) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <Card className="bg-amber-50 dark:bg-amber-950/20">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-amber-600" />
          Additional Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <ConstraintsField register={register} error={errors.constraints} />
        <HintField register={register} />
        <EditorialField register={register} />
      </CardContent>
    </Card>
  );
}

function ConstraintsField({ register, error }: any) {
  return (
    <div>
      <Label htmlFor="constraints">Contraints</Label>
      <Textarea
        id="constraints"
        {...register("constraints")}
        placeholder="Enter Problem Constraints"
        className="mt-2 min-h-24 resize-y font-mono"
      />
      {error && <p className="text-sm text-red-500 mt-1">{error.message}</p>}
    </div>
  );
}

function HintField({ register }: any) {
  return (
    <div>
      <Label className="font-medium">Hints (Optional)</Label>
      <Textarea
        {...register("hints")}
        placeholder="Enter hints for solving the problem"
        className="mt-2 min-h-24 resize-y"
      />
    </div>
  );
}

function EditorialField({ register }: any) {
  return (
    <div>
      <Label className="font-medium">Editorial (Optional)</Label>
      <Textarea
        {...register("editorial")}
        placeholder="Enter problem editorial / solution explanation "
        className="mt-2 min-h-32 resize-y"
      />
    </div>
  );
}
