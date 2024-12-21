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
import { useRef, useEffect, useMemo } from "react";
import { useAppDispatch } from "@/store/hooks";
import {
  setSelectedPlan,
  setWorkoutVisibility,
} from "@/store/workoutPlanSlice";
import { useDialog } from "@/hooks/use-dialog";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

interface FeaturedWorkoutDialogProps {
  children: React.ReactNode;
  title: string;
  description: string;
  duration: string;
  difficulty: string;
  exercises: Exercise[];
}

export function FeaturedWorkoutDialog({
  children,
  title,
  description,
  duration,
  difficulty,
  exercises,
}: FeaturedWorkoutDialogProps) {
  const dialog = useDialog();
  const workoutDialog = useDialog();
  const dispatch = useAppDispatch();

  const workoutPlan = useMemo(
    () => ({
      name: title,
      exercises: exercises,
    }),
    [title, exercises]
  );

  const handleStartWorkout = () => {
    dispatch(setSelectedPlan(workoutPlan));
    dispatch(setWorkoutVisibility(true));
    dialog.onClose();
    workoutDialog.onOpen();
  };

  return (
    <>
      <Dialog
        open={dialog.isOpen}
        onOpenChange={(open) => (open ? dialog.onOpen() : dialog.onClose())}
      >
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
          </DialogHeader>
          <div className="h-[500px] pr-4 overflow-y-auto">
            <div className="space-y-6">
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
                            <span>
                              {exercise.sets} sets × {exercise.reps} reps
                            </span>
                          </div>
                          {Number(exercise.weight.value) > 0 && (
                            <div className="flex items-center gap-1">
                              <Weight className="w-4 h-4" />
                              <span>
                                {exercise.weight.value}
                                {exercise.weight.unit}
                              </span>
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
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <Button
              variant="default"
              size="lg"
              className="w-full"
              onClick={handleStartWorkout}
            >
              <Play className="w-5 h-5 mr-2" /> Start Training
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <WorkoutPlayerDialog dialog={workoutDialog} />
    </>
  );
}
