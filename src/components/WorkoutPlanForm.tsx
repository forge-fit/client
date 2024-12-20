import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Save, X } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { SavedWorkoutPlansTable } from "./SavedWorkoutPlansTable";

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

export interface Exercise {
  name: string;
  sets: string;
  reps: string;
  notes: string;
}

export interface WorkoutPlan {
  name: string;
  exercises: Exercise[];
}

export function WorkoutPlanForm() {
  const [workoutName, setWorkoutName] = useState("");
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [savedPlans, setSavedPlans] = useState<WorkoutPlan[]>([]);
  const [editingPlanIndex, setEditingPlanIndex] = useState<number | null>(null);
  const { toast } = useToast();

  const addExercise = () => {
    setExercises([...exercises, { name: "", sets: "", reps: "", notes: "" }]);
  };

  const removeExercise = (index: number) => {
    const newExercises = exercises.filter((_, i) => i !== index);
    setExercises(newExercises);
  };

  const handleExerciseChange = (
    index: number,
    field: keyof Exercise,
    value: string
  ) => {
    const newExercises = exercises.map((exercise, i) => {
      if (i === index) {
        return { ...exercise, [field]: value };
      }
      return exercise;
    });
    setExercises(newExercises);
  };

  const handleEditPlan = (plan: WorkoutPlan) => {
    const planIndex = savedPlans.findIndex((p) => p.name === plan.name);
    setEditingPlanIndex(planIndex);
    setWorkoutName(plan.name);
    setExercises([...plan.exercises]);
  };

  const handleDeletePlan = (plan: WorkoutPlan) => {
    const updatedPlans = savedPlans.filter((p) => p.name !== plan.name);
    setSavedPlans(updatedPlans);
    toast({
      title: "Success",
      description: "Workout plan has been deleted.",
      duration: 3000,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!workoutName) {
      toast({
        title: "Error",
        description: "Please enter a workout name",
        duration: 3000,
      });
      return;
    }

    const newPlan = {
      name: workoutName,
      exercises:
        exercises.length === 0
          ? [{ name: "", sets: "", reps: "", notes: "" }]
          : exercises,
    };

    if (editingPlanIndex !== null) {
      const updatedPlans = [...savedPlans];
      updatedPlans[editingPlanIndex] = newPlan;
      setSavedPlans(updatedPlans);
      setEditingPlanIndex(null);
      toast({
        title: "Success",
        description: "Workout plan has been updated!",
        duration: 3000,
      });
    } else {
      setSavedPlans([...savedPlans, newPlan]);
      toast({
        title: "Success",
        description: "Workout plan has been saved!",
        duration: 3000,
      });
    }

    setWorkoutName("");
    setExercises([]);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">
        {editingPlanIndex !== null
          ? "Edit Workout Plan"
          : "Create Workout Plan"}
      </h2>
      <Card>
        <CardHeader>
          <CardTitle>
            {editingPlanIndex !== null
              ? "Edit Workout Plan"
              : "New Workout Plan"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <Input
                placeholder="Workout Name (e.g., Leg Day, Easy Yoga)"
                value={workoutName}
                onChange={(e) => setWorkoutName(e.target.value)}
              />
            </div>

            <div className="space-y-4">
              {exercises.map((exercise, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 border rounded-lg bg-accent/50 animate-fade-in"
                >
                  <div className="flex-1 space-y-4">
                    <Select
                      value={exercise.name}
                      onValueChange={(value) =>
                        handleExerciseChange(index, "name", value)
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
                          handleExerciseChange(index, "sets", e.target.value)
                        }
                      />
                      <Input
                        placeholder="Reps"
                        value={exercise.reps}
                        onChange={(e) =>
                          handleExerciseChange(index, "reps", e.target.value)
                        }
                      />
                    </div>
                    <Textarea
                      placeholder="Notes"
                      value={exercise.notes}
                      onChange={(e) =>
                        handleExerciseChange(index, "notes", e.target.value)
                      }
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeExercise(index)}
                    className="shrink-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <Button type="button" variant="outline" onClick={addExercise}>
                <Plus className="w-4 h-4 mr-2" /> Add Exercise
              </Button>
              <Button type="submit">
                <Save className="w-4 h-4 mr-2" />{" "}
                {editingPlanIndex !== null ? "Update" : "Save"} Plan
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {savedPlans.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Saved Workout Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <SavedWorkoutPlansTable
              savedPlans={savedPlans}
              onEditPlan={handleEditPlan}
              onDeletePlan={handleDeletePlan}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
