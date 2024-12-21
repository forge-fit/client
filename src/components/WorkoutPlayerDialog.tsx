import * as React from "react"
import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { WorkoutPlan } from "./WorkoutPlanForm";
import { Play } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { RestTimer } from "./RestTimer";
import { ExerciseDisplay } from "./ExerciseDisplay";
import { useIsMobile } from "@/hooks/use-mobile";
import { WorkoutPlanSelection } from "./WorkoutPlanSelection";
import { WorkoutNavigation } from "./WorkoutNavigation";

interface WorkoutPlayerDialogProps {
  savedPlans: WorkoutPlan[];
}

export function WorkoutPlayerDialog({ savedPlans }: WorkoutPlayerDialogProps) {
  const [selectedPlan, setSelectedPlan] = useState<WorkoutPlan | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [isResting, setIsResting] = useState(false);
  const [restTimeLeft, setRestTimeLeft] = useState(60);
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handlePlanSelect = (plan: WorkoutPlan) => {
    setSelectedPlan(plan);
    setCurrentExerciseIndex(0);
    setCurrentSet(1);
    setIsResting(false);
  };

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
    if (selectedPlan && currentExerciseIndex < selectedPlan.exercises.length - 1) {
      setCurrentExerciseIndex((prev) => prev + 1);
      setCurrentSet(1);
      setIsResting(false);
    } else {
      toast({
        title: "Workout Complete! 🎉",
        description: "Great job on completing your workout!",
      });
      setSelectedPlan(null);
      setCurrentExerciseIndex(0);
      setCurrentSet(1);
    }
  };

  const handlePrevExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex((prev) => prev - 1);
      setCurrentSet(1);
      setIsResting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          size="lg"
          className="relative overflow-hidden group bg-primary text-white p-4"
        >
          <Play className="w-5 h-5 mr-2" /> Start Training
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-lightSweep pointer-events-none"></span>
        </Button>
      </DialogTrigger>
      <DialogContent 
        className={`${
          isMobile 
            ? 'w-screen h-screen max-w-none m-0 rounded-none flex flex-col' 
            : 'sm:max-w-[500px] min-h-[600px]'
        } bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white border-none`}
      >
        {!selectedPlan ? (
          <div className="h-full flex items-center">
            <WorkoutPlanSelection 
              savedPlans={savedPlans} 
              onSelectPlan={handlePlanSelect} 
            />
          </div>
        ) : (
          <div className={`space-y-6 ${isMobile ? 'h-full flex flex-col' : ''}`}>
            {isMobile && (
              <div className="text-center pt-4">
                <h2 className="text-2xl font-bold text-white">{selectedPlan.name}</h2>
                <p className="text-primary-100">
                  Exercise {currentExerciseIndex + 1} of {selectedPlan.exercises.length}
                </p>
              </div>
            )}

            <div className={`${isMobile ? 'flex-1 flex items-center' : ''}`}>
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
              ) : currentExercise ? (
                <ExerciseDisplay
                  exerciseName={currentExercise.name}
                  currentSet={currentSet}
                  totalSets={parseInt(currentExercise.sets)}
                  reps={currentExercise.reps}
                  weight={currentExercise.weight}
                  notes={currentExercise.notes}
                />
              ) : null}
            </div>

            {!isResting && (
              <div className={`${isMobile ? 'mt-auto pb-4' : ''}`}>
                <WorkoutNavigation
                  onPrevious={handlePrevExercise}
                  onNext={handleNextSet}
                  isPreviousDisabled={currentExerciseIndex === 0}
                  nextButtonText={currentSet < totalSets ? "Next Set" : "Next Exercise"}
                />
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}