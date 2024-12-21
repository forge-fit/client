import { Button } from "@/components/ui/button";
import { WorkoutCard } from "@/components/WorkoutCard";
import { Play, TrendingUp } from "lucide-react";
import { ExerciseLibrary } from "@/components/ExerciseLibrary";
import { WorkoutPlanForm } from "@/components/WorkoutPlanForm";
import { WorkoutPlayerDialog } from "@/components/WorkoutPlayerDialog";
import { useState } from "react";
import { WorkoutPlan } from "@/components/WorkoutPlanForm";

interface IndexProps {
  initialWorkoutPlans: WorkoutPlan[];
}

const Index = ({ initialWorkoutPlans }: IndexProps) => {
  const [savedPlans, setSavedPlans] = useState<WorkoutPlan[]>(initialWorkoutPlans);

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

      {/* Exercise Library Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container max-w-6xl mx-auto">
          <ExerciseLibrary />
        </div>
      </section>

      {/* Create Workout Plan Section */}
      <section className="py-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <WorkoutPlanForm onSavePlan={handleSavePlan} />
        </div>
      </section>
    </div>
  );
};

export default Index;