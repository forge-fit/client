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
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

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
        description:
          "Please fill in all required fields (Exercise, Sets, and Reps)",
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
          <div className="grid grid-cols-3 gap-4">
            <Input
              placeholder="Sets"
              className="no-arrows"
              type="number"
              value={exercise.sets}
              onChange={(e) =>
                setExercise((prev) => ({ ...prev, sets: e.target.value }))
              }
            />
            <Input
              placeholder="Reps"
              className="no-arrows"
              type="number"
              value={exercise.reps}
              onChange={(e) =>
                setExercise((prev) => ({ ...prev, reps: e.target.value }))
              }
            />
            <div className="flex gap-2">
              <Input
                placeholder="Weight"
                type="number"
                className="no-arrows"
                value={exercise.weight.value}
                onChange={(e) =>
                  setExercise((prev) => ({
                    ...prev,
                    weight: { ...prev.weight, value: e.target.value },
                  }))
                }
              />
            </div>
          </div>
          <ToggleGroup
            type="single"
            value={exercise.weight.unit}
            onValueChange={(value) => {
              if (value) {
                setExercise((prev) => ({
                  ...prev,
                  weight: { ...prev.weight, unit: value },
                }));
              }
            }}
            className="justify-start"
          >
            <ToggleGroupItem value="kg" aria-label="Toggle kg">
              kg
            </ToggleGroupItem>
            <ToggleGroupItem value="lbs" aria-label="Toggle lbs">
              lbs
            </ToggleGroupItem>
          </ToggleGroup>
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