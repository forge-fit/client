import { Button } from "@/components/ui/button";
import { WorkoutCard } from "@/components/WorkoutCard";
import { ExerciseLibrary } from "@/components/ExerciseLibrary";
import { WorkoutPlanForm, WorkoutPlan } from "@/components/WorkoutPlanForm";
import { WorkoutPlayerDialog } from "@/components/WorkoutPlayerDialog";
import { useState } from "react";
import { TrendingUp, ClipboardList } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNavigate } from "react-router-dom";

const featuredWorkouts = [
  {
    title: "Full Body Strength",
    description: "Build strength and endurance with this comprehensive workout",
    duration: "45 min",
    difficulty: "Intermediate",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&auto=format&fit=crop",
  },
  {
    title: "HIIT Cardio Blast",
    description: "Intense cardio intervals to boost your metabolism",
    duration: "30 min",
    difficulty: "Advanced",
    image:
      "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=800&auto=format&fit=crop",
  },
  {
    title: "Yoga Flow",
    description: "Improve flexibility and mindfulness",
    duration: "60 min",
    difficulty: "Beginner",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop",
  },
];

interface IndexProps {
  initialWorkoutPlans: WorkoutPlan[];
}

const Index = ({ initialWorkoutPlans }: IndexProps) => {
  const [savedPlans, setSavedPlans] = useState<WorkoutPlan[]>(initialWorkoutPlans);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const handleSavePlan = (plan: WorkoutPlan) => {
    setSavedPlans((prev) => [...prev, plan]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-700 to-primary-900 text-white py-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
            Transform Your Body,
            <br />
            Transform Your Life
          </h1>
          <p className="text-xl mb-8 text-primary-100 max-w-2xl animate-fade-in">
            Get fit with personalized workouts and expert guidance, anywhere,
            anytime.
          </p>
          <div className="relative overflow-hidden group">
            <WorkoutPlayerDialog savedPlans={savedPlans} />
          </div>
        </div>
      </section>

      {/* Featured Workouts */}
      <section className="py-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Featured Workouts</h2>
            <Button variant="ghost" className="text-primary-700">
              <TrendingUp className="mr-2 h-4 w-4" /> View All
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredWorkouts.map((workout) => (
              <WorkoutCard key={workout.title} {...workout} />
            ))}
          </div>
        </div>
      </section>

      {/* Exercise Library Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container max-w-6xl mx-auto">
          <ExerciseLibrary />
        </div>
      </section>

      {/* Create Workout Plan Section */}
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
            <WorkoutPlanForm onSavePlan={handleSavePlan} initialPlans={initialWorkoutPlans} />
          )}
        </div>
      </section>
    </div>
  );
};

export default Index;