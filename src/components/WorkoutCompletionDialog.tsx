import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { useAppDispatch } from "@/store/hooks";
import { completeWorkoutAndResetState } from "@/store/workoutProgressSlice";
import { sendNotification } from "@/store/notificationSlice";
import { WorkoutPlan } from "./WorkoutPlanForm";
interface WorkoutCompletionDialogProps {
  open: boolean;
  onClose: () => void;
  workout: WorkoutPlan;
  duration: number;
  currentExerciseIndex: number;
  isEarlyEnd?: boolean;
}

export function WorkoutCompletionDialog({
  open,
  onClose,
  workout,
  duration,
  currentExerciseIndex,
  isEarlyEnd = false,
}: WorkoutCompletionDialogProps) {
  const dispatch = useAppDispatch();
  const [difficulty, setDifficulty] = useState(3);
  const [energy, setEnergy] = useState(3);
  const [notes, setNotes] = useState("");

  const handleSubmit = async () => {
    const workoutData = {
      feedback: { difficulty, energy, notes },
      progress: {
        exercisesCompleted: isEarlyEnd
          ? currentExerciseIndex + 1
          : workout.exercises.length,
        totalExercises: workout.exercises.length,
        duration,
      },
    };

    dispatch(completeWorkoutAndResetState(workoutData));

    await dispatch(
      sendNotification({
        title: "Workout Complete! 💪",
        options: {
          body: `Great job! You completed ${
            workoutData.progress.exercisesCompleted
          } exercises in ${Math.floor(duration / 60)} minutes.`,
          tag: "workout-completion",
          data: {
            workoutName: workout.name,
            timestamp: new Date().toISOString(),
          },
        },
      })
    ).unwrap();

    onClose();
  };

  const handleSliderChange = (
    e: React.MouseEvent<HTMLDivElement>,
    setValue: (value: number) => void,
    min: number,
    max: number
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const value = Math.round(min + percent * (max - min));
    setValue(Math.min(Math.max(value, min), max));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Great Work! 🎉</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">How difficult was it?</label>
            <div
              className="relative cursor-pointer"
              onClick={(e) => handleSliderChange(e, setDifficulty, 1, 5)}
            >
              <Slider
                min={1}
                max={5}
                step={1}
                value={[difficulty]}
                onValueChange={([value]) => setDifficulty(value)}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Easy</span>
              <span>Hard</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Energy Level</label>
            <div
              className="relative cursor-pointer"
              onClick={(e) => handleSliderChange(e, setEnergy, 1, 5)}
            >
              <Slider
                min={1}
                max={5}
                step={1}
                value={[energy]}
                onValueChange={([value]) => setEnergy(value)}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Low</span>
              <span>High</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Notes</label>
            <Textarea
              placeholder="How did it go? Any achievements?"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <Button onClick={handleSubmit} className="w-full">
            Save Progress
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
