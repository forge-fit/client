import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { Exercise } from "./WorkoutPlanForm";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ExerciseSelector } from "./ExerciseSelector";
import { SetsRepsInput } from "./SetsRepsInput";
import { WeightInput } from "./WeightInput";

interface AddExerciseDialogProps {
  onAddExercise: (exercise: Exercise) => void;
}

const availableExercises = [
  {
    id: "1",
    name: "Push-ups",
  },
  {
    id: "2",
    name: "Squats",
  },
  {
    id: "3",
    name: "Pull-ups",
  },
];

export function AddExerciseDialog({ onAddExercise }: AddExerciseDialogProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [exercise, setExercise] = useState<Exercise>({
    name: "",
    sets: "",
    reps: "",
    notes: "",
    weight: { value: "", unit: "kg" },
  });

  const handleAddExercise = () => {
    if (!exercise.name || !exercise.sets || !exercise.reps) {
      toast({
        title: "Error",
        description: "Please fill in all required fields (Exercise, Sets, and Reps)",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    onAddExercise(exercise);
    setExercise({
      name: "",
      sets: "",
      reps: "",
      notes: "",
      weight: { value: "", unit: "kg" },
    });
    setOpen(false);

    toast({
      title: "Success",
      description: "Exercise added to workout plan",
      duration: 3000,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <Plus className="w-4 h-4 mr-2" /> Add Exercise
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Exercise</DialogTitle>
          <DialogDescription>
            Add a new exercise to your workout plan. Fill in all required fields.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <ExerciseSelector
            value={exercise.name}
            onChange={(value) =>
              setExercise((prev) => ({ ...prev, name: value }))
            }
            exercises={availableExercises}
          />
          <SetsRepsInput
            sets={exercise.sets}
            reps={exercise.reps}
            onSetsChange={(value) =>
              setExercise((prev) => ({ ...prev, sets: value }))
            }
            onRepsChange={(value) =>
              setExercise((prev) => ({ ...prev, reps: value }))
            }
          />
          <WeightInput
            value={exercise.weight.value}
            unit={exercise.weight.unit}
            onChange={(value, unit) =>
              setExercise((prev) => ({
                ...prev,
                weight: { value, unit },
              }))
            }
          />
          <Textarea
            placeholder="Notes (optional)"
            value={exercise.notes}
            onChange={(e) =>
              setExercise((prev) => ({ ...prev, notes: e.target.value }))
            }
          />
          <Button onClick={handleAddExercise} className="w-full">
            Add to Workout
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}