import { Exercise } from "./WorkoutPlanForm";
import { ExerciseDetailsDialog } from "./ExerciseDetailsDialog";

interface MobileExerciseListProps {
  exercises: Exercise[];
}

export function MobileExerciseList({ exercises }: MobileExerciseListProps) {
  return (
    <div className="divide-y">
      {exercises.map((exercise, exerciseIndex) => (
        <ExerciseDetailsDialog key={exerciseIndex} exercise={exercise}>
          <div className="grid grid-cols-3 gap-2 p-4 hover:bg-accent/50 cursor-pointer">
            <div className="font-medium">{exercise.name}</div>
            <div className="text-center text-muted-foreground">{exercise.sets} sets</div>
            <div className="text-center text-muted-foreground">{exercise.reps} reps</div>
          </div>
        </ExerciseDetailsDialog>
      ))}
    </div>
  );
}