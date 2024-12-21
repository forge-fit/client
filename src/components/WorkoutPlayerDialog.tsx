import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { WorkoutPlan } from "./WorkoutPlanForm";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { RestTimer } from "./RestTimer";

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
      <DialogContent className="sm:max-w-[500px] bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white border-none">
        {!selectedPlan ? (
          savedPlans.length === 0 ? (
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">No workout plans</div>
              <div className="text-primary-100">
                You don't have any saved workout plans. Create a new workout
                plan to get started.
              </div>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="text-white">
                  Choose Your Workout Plan
                </DialogTitle>
                <DialogDescription className="text-primary-100">
                  Select a workout plan to begin your training session.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {savedPlans.map((plan) => (
                  <Button
                    key={plan.name}
                    variant="secondary"
                    className="w-full justify-start bg-white/10 hover:bg-white/20 text-white transition-colors"
                    onClick={() => handlePlanSelect(plan)}
                  >
                    {plan.name}
                  </Button>
                ))}
              </div>
            </>
          )
        ) : (
          <div className="space-y-6">
            <DialogHeader>
              <DialogTitle className="text-white">{selectedPlan.name}</DialogTitle>
              <DialogDescription className="text-primary-100">
                Exercise {currentExerciseIndex + 1} of{" "}
                {selectedPlan.exercises.length}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="text-2xl font-bold text-white">
                {currentExercise?.name}
              </div>
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
              ) : (
                <div className="space-y-4">
                  <div className="text-lg text-primary-100">
                    Set {currentSet} of {totalSets}
                  </div>
                  <div className="text-lg text-white">
                    {currentExercise?.reps} reps at {currentExercise?.weight.value}{" "}
                    {currentExercise?.weight.unit}
                  </div>
                  {currentExercise?.notes && (
                    <div className="text-sm text-primary-100">
                      Note: {currentExercise.notes}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex justify-between">
              <Button
                variant="secondary"
                onClick={handlePrevExercise}
                disabled={currentExerciseIndex === 0}
                className="bg-white/10 hover:bg-white/20 text-white disabled:bg-white/5 disabled:text-white/50"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              {!isResting && (
                <Button
                  onClick={handleNextSet}
                  className="bg-white/10 hover:bg-white/20 text-white"
                  variant="secondary"
                >
                  {currentSet < totalSets ? "Next Set" : "Next Exercise"}
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}