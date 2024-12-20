import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Save } from "lucide-react";
import { useState } from "react";

// Import the exercises data from ExerciseLibrary
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
  }
];

interface Exercise {
  name: string;
  sets: string;
  reps: string;
  notes: string;
}

export function WorkoutPlanForm() {
  const [workoutName, setWorkoutName] = useState("");
  const [exercises, setExercises] = useState<Exercise[]>([
    { name: "", sets: "", reps: "", notes: "" }
  ]);

  const addExercise = () => {
    setExercises([...exercises, { name: "", sets: "", reps: "", notes: "" }]);
  };

  const handleExerciseChange = (index: number, field: keyof Exercise, value: string) => {
    const newExercises = exercises.map((exercise, i) => {
      if (i === index) {
        return { ...exercise, [field]: value };
      }
      return exercise;
    });
    setExercises(newExercises);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Workout plan:", { name: workoutName, exercises });
    // Here you would typically save the workout plan
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Create Workout Plan</h2>
      <Card>
        <CardHeader>
          <CardTitle>New Workout Plan</CardTitle>
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
            {exercises.map((exercise, index) => (
              <div key={index} className="space-y-4 p-4 border rounded-lg">
                <Select
                  value={exercise.name}
                  onValueChange={(value) => handleExerciseChange(index, "name", value)}
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
                    onChange={(e) => handleExerciseChange(index, "sets", e.target.value)}
                  />
                  <Input
                    placeholder="Reps"
                    value={exercise.reps}
                    onChange={(e) => handleExerciseChange(index, "reps", e.target.value)}
                  />
                </div>
                <Textarea
                  placeholder="Notes"
                  value={exercise.notes}
                  onChange={(e) => handleExerciseChange(index, "notes", e.target.value)}
                />
              </div>
            ))}
            <div className="flex gap-4">
              <Button type="button" variant="outline" onClick={addExercise}>
                <Plus className="w-4 h-4 mr-2" /> Add Exercise
              </Button>
              <Button type="submit">
                <Save className="w-4 h-4 mr-2" /> Save Plan
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}