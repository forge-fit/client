import { WorkoutPlanForm, WorkoutPlan } from "@/components/WorkoutPlanForm";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface MobileWorkoutPlanProps {
  initialWorkoutPlans: WorkoutPlan[];
}

const MobileWorkoutPlan = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-semibold">Workout Plan</h1>
        </div>
      </div>
      <div className="container py-4">
        <WorkoutPlanForm />
      </div>
    </div>
  );
};

export default MobileWorkoutPlan;
