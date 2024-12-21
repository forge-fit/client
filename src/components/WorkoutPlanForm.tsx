import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Save } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { SavedWorkoutPlansTable } from "./SavedWorkoutPlansTable";
import { AddExerciseDialog } from "./AddExerciseDialog";
import { ExerciseList } from "./ExerciseList";
import { useIsMobile } from "@/hooks/use-mobile";

export interface Exercise {
  name: string;
  sets: string;
  reps: string;
  notes: string;
  weight: { value: string; unit: string };
}

export interface WorkoutPlan {
  name: string;
  exercises: Exercise[];
}

interface WorkoutPlanFormProps {
  onSavePlan?: (plan: WorkoutPlan) => void;
  initialPlans?: WorkoutPlan[];
}

export function WorkoutPlanForm({ onSavePlan, initialPlans = [] }: WorkoutPlanFormProps) {
  const [workoutName, setWorkoutName] = useState("");
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [savedPlans, setSavedPlans] = useState<WorkoutPlan[]>(initialPlans);
  const [editingPlanIndex, setEditingPlanIndex] = useState<number | null>(null);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const addExercise = (exercise: Exercise) => {
    setExercises([...exercises, exercise]);
  };

  const removeExercise = (index: number) => {
    const newExercises = exercises.filter((_, i) => i !== index);
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

    const newPlan = {
      name: workoutName,
      exercises: exercises,
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
      onSavePlan?.(newPlan);
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
        {editingPlanIndex !== null ? "Edit Workout Plan" : "Create Workout Plan"}
      </h2>
      <Card>
        <CardHeader>
          <CardTitle>
            {editingPlanIndex !== null ? "Edit Workout Plan" : "New Workout Plan"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              placeholder={isMobile ? "Plan Name" : "Workout Name (e.g., Leg Day, Easy Yoga)"}
              value={workoutName}
              onChange={(e) => setWorkoutName(e.target.value)}
            />

            <div className="space-y-4">
              <ExerciseList
                exercises={exercises}
                onRemoveExercise={removeExercise}
              />
              <AddExerciseDialog onAddExercise={addExercise} />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={!workoutName || exercises.length === 0}
            >
              <Save className="w-4 h-4 mr-2" />
              {editingPlanIndex !== null ? "Update" : "Save"} Plan
            </Button>
          </form>
        </CardContent>
      </Card>

      {savedPlans.length > 0 && (
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Saved Workout Plans</CardTitle>
          </CardHeader>
          <CardContent className="p-0 sm:p-6">
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
