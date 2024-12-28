import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";
import { WorkoutCard, WorkoutCardProps } from "./WorkoutCard";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLocation, useNavigate } from "react-router-dom";
import { useDialog } from "@/hooks/use-dialog";

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

interface WorkoutLibraryDialogProps {
  workouts: WorkoutCardProps[];
}

export function WorkoutLibraryDialog({ workouts }: WorkoutLibraryDialogProps) {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const navigate = useNavigate();
  const isOpen = location.pathname === "/workout-library";
  const filteredWorkouts = workouts.filter(
    (workout) =>
      selectedCategory === "all" || workout.category === selectedCategory
  );

  return (
    <Dialog open={isOpen} onOpenChange={() => navigate("/")}>
      <DialogContent className="sm:max-w-[90vw] max-h-[90vh] w-full p-0">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle className="text-2xl font-bold">
            Workout Library
          </DialogTitle>
        </DialogHeader>
        <div className="flex h-[calc(90vh-82px)]">
          {/* Categories Sidebar */}
          <div className="w-64 border-r shrink-0">
            <div className="p-4 space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    "w-full text-left px-4 py-3 rounded-lg transition-colors",
                    selectedCategory === category.id
                      ? "bg-primary text-white"
                      : "hover:bg-accent"
                  )}
                >
                  <div className="font-medium">{category.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {category.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Workouts Grid */}
          <div className="flex-1 min-w-0 overflow-y-auto my-1 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 auto-rows-max">
              {filteredWorkouts.map((workout, index) => (
                <div key={index} className="w-full">
                  <WorkoutCard {...workout} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
