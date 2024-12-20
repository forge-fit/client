import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Save, X } from "lucide-react";
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";

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

interface WorkoutPlan {
  name: string;
  exercises: Exercise[];
}

export function WorkoutPlanForm() {
  const [workoutName, setWorkoutName] = useState("");
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [savedPlans, setSavedPlans] = useState<WorkoutPlan[]>([]);
  const { toast } = useToast();

  const addExercise = () => {
    setExercises([...exercises, { name: "", sets: "", reps: "", notes: "" }]);
  };

  const removeExercise = (index: number) => {
    const newExercises = exercises.filter((_, i) => i !== index);
    setExercises(newExercises);
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
    const newPlan = {
      name: workoutName,
      exercises: exercises.filter(ex => ex.name !== "")
    };
    setSavedPlans([...savedPlans, newPlan]);
    setWorkoutName("");
    setExercises([]);
    toast({
      title: "Success",
      description: "Workout plan has been saved!",
      duration: 3000,
    });
    console.log("Workout plan:", newPlan);
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
            
            <div className="space-y-4">
              {exercises.map((exercise, index) => (
                <div key={index} className="flex items-start gap-4 p-4 border rounded-lg bg-accent/50 animate-fade-in">
                  <div className="flex-1 space-y-4">
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
                <Save className="w-4 h-4 mr-2" /> Save Plan
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Workout Name</TableHead>
                  <TableHead>Exercises</TableHead>
                  <TableHead>Sets</TableHead>
                  <TableHead>Reps</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {savedPlans.map((plan, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{plan.name}</TableCell>
                    <TableCell>{plan.exercises.map(ex => ex.name).join(", ")}</TableCell>
                    <TableCell>
                      {plan.exercises.map((ex, i) => (
                        <div key={i} className="text-sm">{ex.sets}</div>
                      ))}
                    </TableCell>
                    <TableCell>
                      {plan.exercises.map((ex, i) => (
                        <div key={i} className="text-sm">{ex.reps}</div>
                      ))}
                    </TableCell>
                    <TableCell>
                      {plan.exercises.map((ex, i) => (
                        ex.notes && (
                          <div key={i} className="text-sm text-muted-foreground">{ex.notes}</div>
                        )
                      ))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}