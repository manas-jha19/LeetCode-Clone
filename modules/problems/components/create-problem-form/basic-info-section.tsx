"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Controller } from "react-hook-form";
import { DIFFICULTY_OPTIONS } from "../../schema";
import { Badge } from "@/components/ui/badge";

export function BasicInfoSection({ form }: any) {
  const {
    register,
    control,
    formState: { errors },
  } = form;
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TitleField register={register} error={errors.title} />
        <DescriptionField register={register} error={errors.description} />
        <DifficultyField control={control} error={errors.difficulty} />
      </div>
    </div>
  );
}

function TitleField({ register, error }: any) {
  return (
    <div className="md:col-span-2">
      <Label htmlFor="title" className="text-lg font-semibold">
        Title
      </Label>
      <Input
        id="title"
        {...register("title")}
        placeholder="Enter problem title "
        className="mt-2 text-lg"
      />
      {error && <p className="text-sm text-red-500 mt-1">{error.message}</p>}
    </div>
  );
}

function DescriptionField({ register, error }: any) {
  return (
    <div className="md:col-span-2">
      <Label htmlFor="description" className="font-semibold text-lg">
        Description
      </Label>
      <Textarea
        id="description"
        {...register("description")}
        placeholder="Enter problem description"
        className="mt-2 text-foreground"
      />
      {error && <p className="text-sm text-red-500 mt-1">{error.message}</p>}
    </div>
  );
}

function DifficultyField({ control, error }: any) {
  return (
    <div>
      <Label htmlFor="difficulty" className="font-semibold text-lg">
        Difficulty
      </Label>
      <Controller
        name="difficulty"
        control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              {DIFFICULTY_OPTIONS.map((option) => (
                <SelectItem value={option.value} key={option.value}>
                  <Badge variant={"secondary"} className={option.className}>
                    {option.label}
                  </Badge>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {error && <p className="text-sm text-red-500 mt-1">{error.message}</p>}
    </div>
  );
}
