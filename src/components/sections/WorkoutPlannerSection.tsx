import { Button } from "@/components/ui/button";
import { WorkoutPlanForm, WorkoutPlan } from "@/components/WorkoutPlanForm";
import { ClipboardList } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addWorkoutPlan } from "@/store/workoutPlanSlice";
import { useIsMobile } from "@/hooks/use-mobile";

export const WorkoutPlannerSection = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const plans = useAppSelector((state) => state.workoutPlan.plans);

  const handleSavePlan = (plan: WorkoutPlan) => {
    dispatch(addWorkoutPlan(plan));
  };

  return (
    <section className="py-16 px-4">
      <div className="container max-w-6xl mx-auto">
        {isMobile ? (
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">
              Create Your Workout Plan
            </h2>
            <Button
              size="lg"
              onClick={() => navigate("/workout-plan")}
              className="w-full max-w-sm"
            >
              <ClipboardList className="mr-2 h-4 w-4" />
              Open Workout Planner
            </Button>
          </div>
        ) : (
          <WorkoutPlanForm />
        )}
      </div>
    </section>
  );
};
