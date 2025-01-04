import { HeroSection } from "@/components/sections/HeroSection";
import { WorkoutPlannerSection } from "@/components/sections/WorkoutPlannerSection";
import { FeaturedWorkoutsSection } from "@/components/sections/FeaturedWorkoutsSection";
import { featuredWorkouts } from "@/data/workouts";
import { ExercisesSection } from "@/components/sections/ExercisesSection";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setExercises } from "@/store/exerciseSlice";
import { exercisesApi } from "@/api";
import { RootState } from "@/store/store";
import { useEffect } from "react";

export default function Index() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchExercises = async () => {
      const { data } = await exercisesApi.exercisesControllerGetExercises();
      dispatch(setExercises(data));
    };
    fetchExercises();
  }, [dispatch]);

  const exercises = useAppSelector(
    (state: RootState) => state.exercise.exercises
  );
  console.log(exercises);
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
