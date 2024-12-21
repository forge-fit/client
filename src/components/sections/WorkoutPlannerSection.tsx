import { Button } from "@/components/ui/button";
import { WorkoutPlanForm, WorkoutPlan } from "@/components/WorkoutPlanForm";
import { ClipboardList } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface WorkoutPlannerSectionProps {
  isMobile: boolean;
  onSavePlan: (plan: WorkoutPlan) => void;
  initialPlans: WorkoutPlan[];
}

export const WorkoutPlannerSection = ({ 
  isMobile, 
  onSavePlan, 
  initialPlans 
}: WorkoutPlannerSectionProps) => {
  const navigate = useNavigate();

  return (
    <section className="py-16 px-4">
      <div className="container max-w-6xl mx-auto">
        {isMobile ? (
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Create Your Workout Plan</h2>
            <Button 
              size="lg"
              onClick={() => navigate('/workout-plan')}
              className="w-full max-w-sm"
            >
              <ClipboardList className="mr-2 h-4 w-4" />
              Open Workout Planner
            </Button>
          </div>
        ) : (
          <WorkoutPlanForm onSavePlan={onSavePlan} initialPlans={initialPlans} />
        )}
      </div>
    </section>
  );
};