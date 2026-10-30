import { UseFormReturn } from "react-hook-form";
import z, { size } from "zod";
import { problemSchema } from "../../schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ProblemFormData = z.infer<typeof problemSchema>;
interface TagSectionProps {
  form: UseFormReturn<ProblemFormData>;
  tagsArray: any;
}
export function TagSection({ form, tagsArray }: TagSectionProps) {
  const {
    register,
    formState: { errors },
  } = form;

  const { fields, append, remove } = tagsArray;
  return (
    <Card className="bg-amber-50 dark:bg-amber-950/20">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-600" />
            Tags
          </CardTitle>
          <Button
            type="button"
            onClick={() => append("")}
            size={"sm"}
            className="gap-2"
          >
            <Plus className="w-4 h-4" /> Add Tag
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {fields.map((field, index) => (
            <TagItem
              key={field.id}
              index={index}
              regiser={register}
              onRemove={() => remove(index)}
              canRemove={fields.length > 1}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function TagItem({ index, regiser, onRemove, canRemove }: any) {
  return (
    <div className="flex gap-2 items-center ">
      <Input
        {...regiser(`tags.${index}`)}
        placeholder="Enter tag"
        className="flex-1"
      />
      <Button
        type="button"
        variant={"ghost"}
        size={"sm"}
        onClick={onRemove}
        disabled={!canRemove}
        className="p-2"
      >
        <Trash2 className="w-4 h-4 text-red-500" />
      </Button>
    </div>
  );
}
