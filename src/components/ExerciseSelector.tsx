import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ExerciseSelectorProps {
  value: string;
  onChange: (value: string) => void;
  exercises: Array<{ id: string; name: string }>;
}

export function ExerciseSelector({
  value,
  onChange,
  exercises,
}: ExerciseSelectorProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select an exercise" />
      </SelectTrigger>
      <SelectContent>
        {exercises.map((exercise) => (
          <SelectItem key={exercise.id} value={exercise.name}>
            {exercise.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}