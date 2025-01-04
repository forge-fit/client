import { HeroSection } from "@/components/sections/HeroSection";
import { WorkoutPlannerSection } from "@/components/sections/WorkoutPlannerSection";
import { FeaturedWorkoutsSection } from "@/components/sections/FeaturedWorkoutsSection";
import { featuredWorkouts } from "@/data/workouts";
import { ExercisesSection } from "@/components/sections/ExercisesSection";
import { Outlet } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";
import { useEffect } from "react";
import { fetchExercises } from "@/store/exerciseSlice";

export default function Index() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchExercises({}));
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <FeaturedWorkoutsSection featuredWorkouts={featuredWorkouts} />
      <ExercisesSection />
      <WorkoutPlannerSection />
      <Outlet />
    </div>
  );
}
