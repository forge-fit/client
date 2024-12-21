import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Exercise } from "./WorkoutPlanForm";

interface ExerciseDetailsDialogProps {
  exercise: Exercise;
  children: React.ReactNode;
}

export function ExerciseDetailsDialog({ exercise, children }: ExerciseDetailsDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{exercise.name}</DialogTitle>
          <DialogDescription>Exercise Details</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm text-muted-foreground">Sets</div>
            <div>{exercise.sets}</div>
            <div className="text-sm text-muted-foreground">Reps</div>
            <div>{exercise.reps}</div>
            <div className="text-sm text-muted-foreground">Weight</div>
            <div>{exercise.weight.value} {exercise.weight.unit}</div>
          </div>
          {exercise.notes && (
            <div>
              <div className="text-sm text-muted-foreground mb-1">Notes</div>
              <div className="text-sm">{exercise.notes}</div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}