import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Exercise, WorkoutPlan } from "./WorkoutPlanForm";
import { WorkoutPlayerDialog } from "./WorkoutPlayerDialog";
import { Clock, Dumbbell } from "lucide-react";

interface FeaturedWorkoutDialogProps {
  children: React.ReactNode;
  title: string;
  description: string;
  duration: string;
  difficulty: string;
  image: string;
  exercises: Exercise[];
}

export function FeaturedWorkoutDialog({
  children,
  title,
  description,
  duration,
  difficulty,
  image,
  exercises,
}: FeaturedWorkoutDialogProps) {
  const workoutPlan: WorkoutPlan = {
    name: title,
    exercises: exercises,
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="aspect-video w-full overflow-hidden rounded-lg">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-4">
            <p className="text-gray-600">{description}</p>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <Dumbbell className="w-4 h-4" />
                <span>{difficulty}</span>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Exercises:</h3>
              <ul className="list-disc pl-5 space-y-1">
                {exercises.map((exercise, index) => (
                  <li key={index}>
                    {exercise.name} - {exercise.sets} sets × {exercise.reps} reps{" "}
                    {exercise.weight.value > 0
                      ? `@ ${exercise.weight.value}${exercise.weight.unit}`
                      : ""}
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-4">
              <WorkoutPlayerDialog initialWorkoutPlan={workoutPlan} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}