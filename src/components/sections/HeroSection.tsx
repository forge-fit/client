import { WorkoutPlayerDialog } from "@/components/WorkoutPlayerDialog";
import { WorkoutPlan } from "@/components/WorkoutPlanForm";

interface HeroSectionProps {
  savedPlans: WorkoutPlan[];
}

export const HeroSection = ({ savedPlans }: HeroSectionProps) => {
  return (
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
  );
};