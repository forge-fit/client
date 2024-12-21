import * as React from "react";
import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { WorkoutPlan } from "./WorkoutPlanForm";
import { Play, StopCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { RestTimer } from "./RestTimer";
import { ExerciseDisplay } from "./ExerciseDisplay";
import { useIsMobile } from "@/hooks/use-mobile";
import { WorkoutNavigation } from "./WorkoutNavigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSelectedPlan } from "@/store/workoutPlanSlice";
import { useDialog } from "@/hooks/use-dialog";
import { WorkoutCompletionDialog } from "./WorkoutCompletionDialog";
import {
  startWorkout,
  updateActiveWorkout,
  completeWorkout,
  updateWorkoutState,
} from "@/store/workoutProgressSlice";
import { WorkoutProgressBar } from "./WorkoutProgressBar";
import { setWorkoutVisibility } from "@/store/workoutPlanSlice";

interface WorkoutPlayerDialogProps {
  dialog: ReturnType<typeof useDialog>;
}

export function WorkoutPlayerDialog({ dialog }: WorkoutPlayerDialogProps) {
  const dispatch = useAppDispatch();
  const savedPlans = useAppSelector((state) => state.workoutPlan.plans);
  const selectedPlan = useAppSelector(
    (state) => state.workoutPlan.selectedPlan
  );
  const workoutState = useAppSelector(
    (state) => state.workoutProgress.workoutState
  );
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(
    workoutState?.currentExerciseIndex ?? 0
  );
  const [currentSet, setCurrentSet] = useState(workoutState?.currentSet ?? 1);
  const [isResting, setIsResting] = useState(workoutState?.isResting ?? false);
  const [restTimeLeft, setRestTimeLeft] = useState(
    workoutState?.restTimeLeft ?? 60
  );
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [showCompletion, setShowCompletion] = useState(false);
  const [workoutDuration, setWorkoutDuration] = useState(0);
  const startTime = useRef<Date | null>(null);
  const activeWorkout = useAppSelector(
    (state) => state.workoutProgress.activeWorkout
  );
  const isWorkoutVisible = useAppSelector(
    (state) => state.workoutPlan.isWorkoutVisible
  );

  useEffect(() => {
    if (activeWorkout && !selectedPlan) {
      const matchingPlan = savedPlans.find(
        (plan) => plan.name === activeWorkout.workoutId
      );
      if (matchingPlan) {
        dispatch(setSelectedPlan(matchingPlan));
        dispatch(setWorkoutVisibility(true));
      }
    }
  }, [activeWorkout, selectedPlan, savedPlans, dispatch]);

  const currentExercise = selectedPlan?.exercises[currentExerciseIndex];
  const totalSets = currentExercise ? parseInt(currentExercise.sets) : 0;

  useEffect(() => {
    if (isResting && !isTimerPaused && restTimeLeft > 0) {
      timerRef.current = setInterval(() => {
        setRestTimeLeft((prev) => {
          if (prev <= 1) {
            if (timerRef.current) {
              clearInterval(timerRef.current);
            }
            setIsResting(false);
            setCurrentSet((prev) => prev + 1);
            return 60;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }
  }, [isResting, isTimerPaused, restTimeLeft]);

  useEffect(() => {
    if (selectedPlan && startTime.current) {
      const interval = setInterval(() => {
        const duration = Math.round(
          (new Date().getTime() - startTime.current!.getTime()) / 1000
        );
        dispatch(
          updateActiveWorkout({
            duration,
            exercisesCompleted: currentExerciseIndex + 1,
            totalExercises: selectedPlan.exercises.length,
          })
        );
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [selectedPlan, currentExerciseIndex, dispatch]);

  const handleNextSet = () => {
    if (currentSet < totalSets) {
      setIsResting(true);
      setRestTimeLeft(60);
      setIsTimerPaused(false);
    } else {
      handleNextExercise();
    }
  };

  const handleNextExercise = () => {
    if (
      selectedPlan &&
      currentExerciseIndex < selectedPlan.exercises.length - 1
    ) {
      setCurrentExerciseIndex((prev) => prev + 1);
      setCurrentSet(1);
      setIsResting(false);
    } else {
      if (startTime.current) {
        const duration = Math.round(
          (new Date().getTime() - startTime.current.getTime()) / 1000
        );
        setWorkoutDuration(duration);
      }
      setShowCompletion(true);
    }
  };

  const handlePrevExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex((prev) => prev - 1);
      setCurrentSet(1);
      setIsResting(false);
    }
  };

  const handleEndWorkout = () => {
    if (!selectedPlan) return;

    // Calculate final duration
    if (startTime.current) {
      const duration = Math.round(
        (new Date().getTime() - startTime.current.getTime()) / 1000
      );
      setWorkoutDuration(duration);
    }

    // Show completion dialog to get user feedback
    setShowCompletion(true);
  };

  useEffect(() => {
    if (activeWorkout) {
      dispatch(
        updateWorkoutState({
          currentExerciseIndex,
          currentSet,
          isResting,
          restTimeLeft,
        })
      );
    }
  }, [
    currentExerciseIndex,
    currentSet,
    isResting,
    restTimeLeft,
    activeWorkout,
    dispatch,
  ]);

  return (
    <Dialog
      open={isWorkoutVisible && dialog.isOpen}
      onOpenChange={(open) => {
        if (!open) {
          dispatch(setWorkoutVisibility(false));
          dialog.onClose();
        } else {
          dispatch(setWorkoutVisibility(true));
          dialog.onOpen();
        }
      }}
    >
      <DialogContent
        className={`${
          isMobile
            ? "w-screen h-screen max-w-none m-0 rounded-none flex flex-col"
            : "sm:max-w-[500px] flex flex-col"
        } bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white border-none`}
        onInteractOutside={() => {
          dialog.onClose();
        }}
        onEscapeKeyDown={() => {
          dialog.onClose();
        }}
      >
        <div className={`space-y-6 h-full flex flex-col`}>
          {isMobile && (
            <div className="text-center pt-4">
              <h2 className="text-2xl font-bold text-white">
                {selectedPlan?.name}
              </h2>
              <p className="text-primary-100">
                Exercise {currentExerciseIndex + 1} of{" "}
                {selectedPlan?.exercises.length}
              </p>
            </div>
          )}

          {selectedPlan && (
            <div className="px-4 space-y-2">
              <WorkoutProgressBar
                currentExercise={currentExerciseIndex}
                totalExercises={selectedPlan.exercises.length}
              />
              <div className="flex justify-between text-xs text-primary-100">
                <span>
                  Exercise {currentExerciseIndex + 1} of{" "}
                  {selectedPlan.exercises.length}
                </span>
                <span>
                  {selectedPlan.exercises[currentExerciseIndex]?.name}
                </span>
              </div>
            </div>
          )}

          <div className="flex-1">
            {isResting ? (
              <RestTimer
                restTimeLeft={restTimeLeft}
                isTimerPaused={isTimerPaused}
                onToggleTimer={() => setIsTimerPaused((prev) => !prev)}
                onExtendTime={() => setRestTimeLeft((prev) => prev + 30)}
                onSkipRest={() => {
                  setIsResting(false);
                  setCurrentSet((prev) => prev + 1);
                }}
              />
            ) : selectedPlan?.exercises[currentExerciseIndex] ? (
              <ExerciseDisplay
                exerciseName={selectedPlan.exercises[currentExerciseIndex].name}
                currentSet={currentSet}
                totalSets={parseInt(
                  selectedPlan.exercises[currentExerciseIndex].sets
                )}
                reps={selectedPlan.exercises[currentExerciseIndex].reps}
                weight={selectedPlan.exercises[currentExerciseIndex].weight}
                notes={selectedPlan.exercises[currentExerciseIndex].notes}
              />
            ) : null}
          </div>

          {!isResting && (
            <div className="mt-auto pb-4 space-y-4">
              <WorkoutNavigation
                onPrevious={handlePrevExercise}
                onNext={handleNextSet}
                isPreviousDisabled={currentExerciseIndex === 0}
                nextButtonText={
                  currentSet <
                  (selectedPlan?.exercises[currentExerciseIndex]?.sets
                    ? parseInt(
                        selectedPlan.exercises[currentExerciseIndex].sets
                      )
                    : 0)
                    ? "Next Set"
                    : "Next Exercise"
                }
              />
              <div className="px-4">
                <Button
                  onClick={handleEndWorkout}
                  variant="secondary"
                  className="w-full bg-white/10 hover:bg-white/20 text-white h-14"
                >
                  <StopCircle className="mr-2 h-5 w-5" /> End Workout
                </Button>
              </div>
            </div>
          )}

          {showCompletion && selectedPlan && (
            <WorkoutCompletionDialog
              open={showCompletion}
              onClose={() => {
                setShowCompletion(false);
                setCurrentExerciseIndex(0);
                setCurrentSet(1);
                startTime.current = null;
                dialog.onClose();
              }}
              workout={selectedPlan}
              duration={workoutDuration}
              currentExerciseIndex={currentExerciseIndex}
              isEarlyEnd={
                currentExerciseIndex < selectedPlan.exercises.length - 1
              }
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
