import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Exercise, WorkoutPlan } from "./WorkoutPlanForm";
import { WorkoutPlayerDialog } from "./WorkoutPlayerDialog";
import { Clock, Dumbbell, Weight, Repeat } from "lucide-react";
import { useRef } from "react";

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
  
  const closeDialogRef = useRef<HTMLButtonElement>(null);

  const handleStartWorkout = () => {
    closeDialogRef.current?.click();
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
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Exercises:</h3>
              <div className="grid gap-3">
                {exercises.map((exercise, index) => (
                  <div
                    key={index}
                    className="bg-accent/50 p-4 rounded-lg space-y-2 animate-fade-in"
                  >
                    <h4 className="font-medium text-primary flex items-center gap-2">
                      <Dumbbell className="w-4 h-4" />
                      {exercise.name}
                    </h4>
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Repeat className="w-4 h-4" />
                        <span>{exercise.sets} sets × {exercise.reps} reps</span>
                      </div>
                      {Number(exercise.weight.value) > 0 && (
                        <div className="flex items-center gap-1">
                          <Weight className="w-4 h-4" />
                          <span>{exercise.weight.value}{exercise.weight.unit}</span>
                        </div>
                      )}
                    </div>
                    {exercise.notes && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {exercise.notes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-4">
              <DialogClose ref={closeDialogRef} className="hidden" />
              <WorkoutPlayerDialog 
                initialWorkoutPlan={workoutPlan} 
                onStart={handleStartWorkout}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}