import { HeroSection } from "@/components/sections/HeroSection";
import { WorkoutPlannerSection } from "@/components/sections/WorkoutPlannerSection";
import { FeaturedWorkoutsSection } from "@/components/sections/FeaturedWorkoutsSection";
import { featuredWorkouts } from "@/data/workouts";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <FeaturedWorkoutsSection featuredWorkouts={featuredWorkouts} />
      <WorkoutPlannerSection />
    </div>
  );
}
