import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Clock, Dumbbell, Play } from "lucide-react";
import { WorkoutPlan } from "./WorkoutPlanForm";
import { WorkoutPlayerDialog } from "./WorkoutPlayerDialog";

interface FeaturedWorkoutDialogProps {
  title: string;
  description: string;
  duration: string;
  difficulty: string;
  image: string;
  exercises: WorkoutPlan["exercises"];
  children: React.ReactNode;
}

export function FeaturedWorkoutDialog({
  title,
  description,
  duration,
  difficulty,
  image,
  exercises,
  children,
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
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="aspect-video w-full overflow-hidden rounded-lg">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center gap-4 text-sm">
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
            <h4 className="font-medium">Exercises</h4>
            <ul className="space-y-2">
              {exercises.map((exercise, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between p-3 bg-accent rounded-lg"
                >
                  <span className="font-medium">{exercise.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {exercise.sets} sets × {exercise.reps} reps
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-end">
            <WorkoutPlayerDialog savedPlans={[workoutPlan]}>
              <Button>
                <Play className="w-4 h-4 mr-2" />
                Start Workout
              </Button>
            </WorkoutPlayerDialog>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}