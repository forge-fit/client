import { Button } from "@/components/ui/button";
import { WorkoutCard } from "@/components/WorkoutCard";
import { TrendingUp } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FeaturedWorkoutsSectionProps {
  featuredWorkouts: any[];
}

export const FeaturedWorkoutsSection = ({ featuredWorkouts }: FeaturedWorkoutsSectionProps) => {
  return (
    <section className="py-16 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Featured Workouts</h2>
          <Button variant="ghost" className="text-primary-700">
            <TrendingUp className="mr-2 h-4 w-4" /> View All
          </Button>
        </div>
        <ScrollArea className="h-full w-full rounded-md">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredWorkouts.map((workout) => (
              <WorkoutCard key={workout.title} {...workout} />
            ))}
          </div>
        </ScrollArea>
      </div>
    </section>
  );
};