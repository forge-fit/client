import { WorkoutCard, WorkoutCardProps } from "@/components/WorkoutCard";
import { WorkoutLibraryDialog } from "@/components/WorkoutLibraryDialog";

import { FeaturedWorkoutDialog } from "@/components/FeaturedWorkoutDialog";
import { useDialog } from "@/hooks/use-dialog";

interface FeaturedWorkoutsSectionProps {
  featuredWorkouts: WorkoutCardProps[];
}

export const FeaturedWorkoutsSection = ({
  featuredWorkouts,
}: FeaturedWorkoutsSectionProps) => {
  const workoutDialog = useDialog();

  return (
    <section className="py-16 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Featured Workouts</h2>
          <WorkoutLibraryDialog workouts={featuredWorkouts} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredWorkouts.slice(0, 3).map((workout) => (
            <div key={workout.title}>
              <FeaturedWorkoutDialog {...workout}>
                <WorkoutCard {...workout} />
              </FeaturedWorkoutDialog>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
