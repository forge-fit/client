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
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { Exercise } from "./WorkoutPlanForm";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ExerciseSelector } from "./ExerciseSelector";
import { SetsRepsInput } from "./SetsRepsInput";
import { WeightInput } from "./WeightInput";
import { ScrollArea } from "./ui/scroll-area";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import { ExerciseDto } from "@forge-fit/server";
import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";

interface AddExerciseDialogProps {
  onAddExercise: (exercise: Exercise) => void;
}

export function AddExerciseDialog({ onAddExercise }: AddExerciseDialogProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedExerciseId, setSelectedExerciseId] = useState<string>("");
  const [exercise, setExercise] = useState<Exercise>({
    name: "",
    sets: "",
    reps: "",
    notes: "",
    weight: { value: "", unit: "kg" },
  });
  const exercises = useAppSelector(
    (state: RootState) => state.exercise.exercises
  );

  const filteredExercises = exercises.filter(
    (ex) =>
      searchQuery === "" ||
      ex.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedExercises = filteredExercises.sort((a, b) => {
    if (a.id === selectedExerciseId) return -1;
    if (b.id === selectedExerciseId) return 1;
    return 0;
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
    setSelectedExerciseId("");
    setSearchQuery("");
    setOpen(false);

    toast({
      title: "Success",
      description: "Exercise added to workout plan",
      duration: 3000,
    });
  };

  const handleSelectExercise = (ex: ExerciseDto) => {
    setSelectedExerciseId(ex.id);
    setExercise((prev) => ({ ...prev, name: ex.name }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <Plus className="w-4 h-4 mr-2" /> Add Exercise
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Exercise</DialogTitle>
          <DialogDescription>
            Select an exercise from the library and configure its details.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div className="space-y-4 border rounded-lg p-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search exercises..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <ScrollArea className="h-48">
              <div className="grid grid-cols-2 gap-2">
                {sortedExercises.map((ex) => (
                  <Card
                    key={ex.id}
                    className={`p-3 cursor-pointer transition-colors hover:bg-primary/50 ${
                      selectedExerciseId === ex.id ? "bg-primary/50" : ""
                    }`}
                    onClick={() => handleSelectExercise(ex)}
                  >
                    <div className="space-y-2">
                      <h3 className="font-medium">{ex.name}</h3>
                      <div className="flex flex-wrap gap-1">
                        <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">
                          {ex.bodyPart}
                        </span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>

          {selectedExerciseId && (
            <div className="space-y-4">
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
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
