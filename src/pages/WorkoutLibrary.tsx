import { useState } from "react";
import { WorkoutCard, WorkoutCardProps } from "@/components/WorkoutCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface WorkoutCategory {
  id: string;
  name: string;
  description: string;
}

const categories: WorkoutCategory[] = [
  { id: "all", name: "All Workouts", description: "Browse all workouts" },
  { id: "strength", name: "Strength", description: "Build muscle and power" },
  { id: "cardio", name: "Cardio", description: "Improve endurance" },
  { id: "yoga", name: "Yoga", description: "Flexibility and mindfulness" },
  { id: "hiit", name: "HIIT", description: "High intensity training" },
  { id: "stretching", name: "Stretching", description: "Improve flexibility" },
];

interface WorkoutLibraryProps {
  workouts: WorkoutCardProps[];
}

export default function WorkoutLibrary({ workouts }: WorkoutLibraryProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const navigate = useNavigate();

  const filteredWorkouts = workouts.filter(
    (workout) =>
      selectedCategory === "all" || workout.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b">
        <div className="container px-4 h-16 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-bold">Workout Library</h1>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container px-4 py-6">
        <div className="grid grid-cols-2 gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                "relative h-24 rounded-xl overflow-hidden transition-all",
                "flex flex-col justify-end p-4 text-left",
                "bg-gradient-to-br",
                selectedCategory === category.id
                  ? "from-primary to-primary-600 text-white ring-2 ring-primary"
                  : "from-accent to-accent/50 hover:from-accent/80 hover:to-accent/30"
              )}
            >
              <div className="font-semibold">{category.name}</div>
              <div className="text-xs opacity-80">{category.description}</div>
            </button>
          ))}
        </div>

        {/* Workouts List */}
        <div className="space-y-4">
          {filteredWorkouts.map((workout, index) => (
            <WorkoutCard key={index} {...workout} />
          ))}
        </div>
      </div>
    </div>
  );
}
