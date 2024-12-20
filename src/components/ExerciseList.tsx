import { Button } from "@/components/ui/button";
import { Exercise } from "./WorkoutPlanForm";
import { X } from "lucide-react";

interface ExerciseListProps {
  exercises: Exercise[];
  onRemoveExercise: (index: number) => void;
}

export function ExerciseList({ exercises, onRemoveExercise }: ExerciseListProps) {
  if (exercises.length === 0) {
    return (
      <div className="text-center p-8 text-muted-foreground">
        No exercises added yet
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {exercises.map((exercise, index) => (
        <div
          key={index}
          className="flex items-start justify-between p-4 border rounded-lg bg-accent/50 animate-fade-in"
        >
          <div className="space-y-1">
            <h4 className="font-medium">{exercise.name}</h4>
            <div className="text-sm text-muted-foreground">
              {exercise.sets} sets × {exercise.reps} reps
            </div>
            {exercise.notes && (
              <p className="text-sm text-muted-foreground">{exercise.notes}</p>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemoveExercise(index)}
            className="shrink-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}