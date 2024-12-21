import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { WorkoutPlan } from "./WorkoutPlanForm";

interface WorkoutPlanSelectionProps {
  savedPlans: WorkoutPlan[];
  onSelectPlan: (plan: WorkoutPlan) => void;
}

export function WorkoutPlanSelection({ savedPlans, onSelectPlan }: WorkoutPlanSelectionProps) {
  if (savedPlans.length === 0) {
    return (
      <div className="text-center">
        <div className="text-3xl font-bold mb-2">No workout plans</div>
        <div className="text-primary-100">
          You don't have any saved workout plans. Create a new workout
          plan to get started.
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <DialogHeader className="text-center">
        <DialogTitle className="text-white text-2xl">
          Choose Your Workout Plan
        </DialogTitle>
        <DialogDescription className="text-primary-100">
          Select a workout plan to begin your training session.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-8">
        {savedPlans.map((plan) => (
          <Button
            key={plan.name}
            variant="secondary"
            className="w-full justify-start bg-white/10 hover:bg-white/20 text-white transition-colors"
            onClick={() => onSelectPlan(plan)}
          >
            {plan.name}
          </Button>
        ))}
      </div>
    </div>
  );
}