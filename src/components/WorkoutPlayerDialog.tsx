import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { WorkoutPlan } from "./WorkoutPlanForm";
import {
  ChevronLeft,
  ChevronRight,
  FastForward,
  Pause,
  Play,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

  const handlePlanSelect = (plan: WorkoutPlan) => {
    setSelectedPlan(plan);
    setCurrentExerciseIndex(0);
    setCurrentSet(1);
    setIsResting(false);
  };

  const currentExercise = selectedPlan?.exercises[currentExerciseIndex];
  const totalSets = currentExercise ? parseInt(currentExercise.sets) : 0;

  const handleNextSet = () => {
    if (currentSet < totalSets) {
      setIsResting(true);
      setRestTimeLeft(60);
      setIsTimerPaused(false);
      const timer = setInterval(() => {
        setRestTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
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

  const extendRestTime = () => {
    setRestTimeLeft((prev) => prev + 30);
  };

  const toggleTimer = () => {
    setIsTimerPaused((prev) => !prev);
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
          <span
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent
                opacity-0 group-hover:opacity-100
                group-hover:animate-lightSweep pointer-events-none"
          ></span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        {!selectedPlan ? (
          <>
            <DialogHeader>
              <DialogTitle>Choose Your Workout Plan</DialogTitle>
              <DialogDescription>
                Select a workout plan to begin your training session.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {savedPlans.map((plan) => (
                <Button
                  key={plan.name}
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => handlePlanSelect(plan)}
                >
                  {plan.name}
                </Button>
              ))}
            </div>
          </>
        ) : (
          <div className="space-y-6">
            <DialogHeader>
              <DialogTitle>{selectedPlan.name}</DialogTitle>
              <DialogDescription>
                Exercise {currentExerciseIndex + 1} of{" "}
                {selectedPlan.exercises.length}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="text-2xl font-bold">{currentExercise?.name}</div>
              {isResting ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">
                      Rest Time: {restTimeLeft}s
                    </div>
                    <Progress value={(restTimeLeft / 60) * 100} />
                  </div>
                  <div className="flex justify-center gap-2">
                    <Button onClick={toggleTimer}>
                      {isTimerPaused ? (
                        <Play className="w-4 h-4" />
                      ) : (
                        <Pause className="w-4 h-4" />
                      )}
                    </Button>
                    <Button onClick={extendRestTime}>
                      <FastForward className="w-4 h-4 mr-2" />
                      +30s
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-lg">
                    Set {currentSet} of {totalSets}
                  </div>
                  <div className="text-lg">
                    {currentExercise?.reps} reps at{" "}
                    {currentExercise?.weight.value}{" "}
                    {currentExercise?.weight.unit}
                  </div>
                  {currentExercise?.notes && (
                    <div className="text-sm text-muted-foreground">
                      Note: {currentExercise.notes}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePrevExercise}
                disabled={currentExerciseIndex === 0}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              {isResting ? (
                <Button
                  onClick={() => {
                    setIsResting(false);
                    setCurrentSet((prev) => prev + 1);
                  }}
                >
                  Skip Rest
                </Button>
              ) : (
                <Button onClick={handleNextSet}>
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
