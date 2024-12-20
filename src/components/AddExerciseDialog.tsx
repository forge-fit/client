import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { Exercise } from "./WorkoutPlanForm";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

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
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
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
    setExercise({ name: "", sets: "", reps: "", notes: "" });
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
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <Select
            value={exercise.name}
            onValueChange={(value) =>
              setExercise((prev) => ({ ...prev, name: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an exercise" />
            </SelectTrigger>
            <SelectContent>
              {availableExercises.map((availableExercise) => (
                <SelectItem
                  key={availableExercise.id}
                  value={availableExercise.name}
                >
                  {availableExercise.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Sets"
              value={exercise.sets}
              onChange={(e) =>
                setExercise((prev) => ({ ...prev, sets: e.target.value }))
              }
            />
            <Input
              placeholder="Reps"
              value={exercise.reps}
              onChange={(e) =>
                setExercise((prev) => ({ ...prev, reps: e.target.value }))
              }
            />
          </div>
          <Textarea
            placeholder="Notes (optional)"
            value={exercise.notes}
            onChange={(e) =>
              setExercise((prev) => ({ ...prev, notes: e.target.value }))
            }
          />
          <Button type="submit" className="w-full">
            Add to Workout
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}