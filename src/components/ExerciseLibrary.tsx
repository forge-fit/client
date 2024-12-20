import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dumbbell, Clock, Target } from "lucide-react";

interface Exercise {
  id: string;
  name: string;
  description: string;
  muscleGroup: string;
  duration: string;
  difficulty: string;
}

const exercises: Exercise[] = [
  {
    id: "1",
    name: "Push-ups",
    description: "Classic bodyweight exercise for chest and triceps",
    muscleGroup: "Chest, Triceps",
    duration: "5-10 min",
    difficulty: "Beginner"
  },
  {
    id: "2",
    name: "Squats",
    description: "Fundamental lower body exercise",
    muscleGroup: "Legs, Glutes",
    duration: "5-10 min",
    difficulty: "Beginner"
  },
  {
    id: "3",
    name: "Pull-ups",
    description: "Upper body pulling exercise",
    muscleGroup: "Back, Biceps",
    duration: "5-10 min",
    difficulty: "Intermediate"
  }
];

export function ExerciseLibrary() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Exercise Library</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exercises.map((exercise) => (
          <Card key={exercise.id} className="hover:shadow-lg transition-shadow animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Dumbbell className="h-5 w-5" />
                {exercise.name}
              </CardTitle>
              <CardDescription>{exercise.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  <span>{exercise.muscleGroup}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>{exercise.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Dumbbell className="h-4 w-4 text-primary" />
                  <span>{exercise.difficulty}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}