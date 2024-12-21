import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { useDialog } from "@/hooks/use-dialog";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { WorkoutPlan } from "./WorkoutPlanForm";
import { Button } from "./ui/button";
import { Dumbbell } from "lucide-react";
import { setWorkoutVisibility } from "@/store/workoutPlanSlice";
import { startWorkout } from "@/store/workoutProgressSlice";

interface WorkoutPlanSelectionDialogProps {
  dialog: ReturnType<typeof useDialog>;
  onSelectPlan: (plan: WorkoutPlan) => void;
}

export function WorkoutPlanSelectionDialog({
  dialog,
  onSelectPlan,
}: WorkoutPlanSelectionDialogProps) {
  const dispatch = useAppDispatch();
  const savedPlans = useAppSelector((state) => state.workoutPlan.plans);

  return (
    <Dialog open={dialog.isOpen} onOpenChange={dialog.setIsOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Select Workout Plan
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          {savedPlans.length === 0 ? (
            <div className="text-center p-8 bg-accent/50 rounded-lg">
              <p className="text-muted-foreground">
                No workout plans found. Create a new workout plan to get
                started.
              </p>
            </div>
          ) : (
            <div className="grid gap-3">
              {savedPlans.map((plan) => (
                <Button
                  key={plan.name}
                  variant="secondary"
                  className="w-full justify-start bg-accent/50 hover:bg-accent/70 transition-colors h-auto py-4"
                  onClick={() => {
                    dispatch(startWorkout({ workoutId: plan.name }));
                    onSelectPlan(plan);
                    dispatch(setWorkoutVisibility(true));
                    dialog.onClose();
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Dumbbell className="h-5 w-5 text-primary" />
                    <div className="text-left">
                      <h3 className="font-semibold">{plan.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {plan.exercises.length} exercises
                      </p>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
