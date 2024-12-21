import { Button } from "@/components/ui/button";
import { WorkoutCard } from "@/components/WorkoutCard";
import { ExerciseLibrary } from "@/components/ExerciseLibrary";
import { WorkoutPlanForm, WorkoutPlan } from "@/components/WorkoutPlanForm";
import { WorkoutPlayerDialog } from "@/components/WorkoutPlayerDialog";
import { useState } from "react";
import { TrendingUp, ClipboardList } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturedWorkoutsSection } from "@/components/sections/FeaturedWorkoutsSection";
import { WorkoutPlannerSection } from "@/components/sections/WorkoutPlannerSection";

const featuredWorkouts = [
  {
    title: "Full Body Strength",
    description: "Build strength and endurance with this comprehensive workout",
    duration: "45 min",
    difficulty: "Intermediate",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&auto=format&fit=crop",
    exercises: [
      {
        name: "Push-ups",
        sets: "3",
        reps: "12",
        notes: "Keep core tight",
        weight: { value: "0", unit: "kg" }
      },
      {
        name: "Squats",
        sets: "4",
        reps: "15",
        notes: "Go deep",
        weight: { value: "0", unit: "kg" }
      },
      {
        name: "Dumbbell Rows",
        sets: "3",
        reps: "12",
        notes: "Each arm",
        weight: { value: "10", unit: "kg" }
      },
      {
        name: "Shoulder Press",
        sets: "3",
        reps: "10",
        notes: "Control the movement",
        weight: { value: "15", unit: "kg" }
      },
      {
        name: "Lunges",
        sets: "3",
        reps: "12",
        notes: "Each leg",
        weight: { value: "0", unit: "kg" }
      }
    ]
  },
  {
    title: "HIIT Cardio Blast",
    description: "Intense cardio intervals to boost your metabolism",
    duration: "30 min",
    difficulty: "Advanced",
    image:
      "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=800&auto=format&fit=crop",
    exercises: [
      {
        name: "Burpees",
        sets: "4",
        reps: "20",
        notes: "Full range of motion",
        weight: { value: "0", unit: "kg" }
      },
      {
        name: "Mountain Climbers",
        sets: "3",
        reps: "30",
        notes: "Fast pace",
        weight: { value: "0", unit: "kg" }
      },
      {
        name: "Jump Rope",
        sets: "4",
        reps: "50",
        notes: "Double unders",
        weight: { value: "0", unit: "kg" }
      },
      {
        name: "High Knees",
        sets: "3",
        reps: "40",
        notes: "Keep pace high",
        weight: { value: "0", unit: "kg" }
      },
      {
        name: "Box Jumps",
        sets: "3",
        reps: "15",
        notes: "Land softly",
        weight: { value: "0", unit: "kg" }
      }
    ]
  },
  {
    title: "Yoga Flow",
    description: "Improve flexibility and mindfulness",
    duration: "60 min",
    difficulty: "Beginner",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop",
    exercises: [
      {
        name: "Sun Salutation A",
        sets: "3",
        reps: "5",
        notes: "Flow with breath",
        weight: { value: "0", unit: "kg" }
      },
      {
        name: "Warrior Sequence",
        sets: "2",
        reps: "10",
        notes: "Hold each pose",
        weight: { value: "0", unit: "kg" }
      },
      {
        name: "Balance Series",
        sets: "2",
        reps: "8",
        notes: "Each side",
        weight: { value: "0", unit: "kg" }
      },
      {
        name: "Core Flow",
        sets: "2",
        reps: "12",
        notes: "Engage core throughout",
        weight: { value: "0", unit: "kg" }
      },
      {
        name: "Final Relaxation",
        sets: "1",
        reps: "1",
        notes: "5 minutes of deep relaxation",
        weight: { value: "0", unit: "kg" }
      }
    ]
  }
];

interface IndexProps {
  initialWorkoutPlans: WorkoutPlan[];
}

const Index = ({ initialWorkoutPlans }: IndexProps) => {
  const [savedPlans, setSavedPlans] = useState<WorkoutPlan[]>(initialWorkoutPlans);
  const isMobile = useIsMobile();

  const handleSavePlan = (plan: WorkoutPlan) => {
    setSavedPlans((prev) => [...prev, plan]);
  };

  return (
    <ScrollArea className="min-h-screen bg-gray-50 [&_[data-radix-scroll-area-thumb]]:bg-primary-700 [&_[data-radix-scroll-area-thumb]]:hover:bg-primary-800">
      <HeroSection savedPlans={savedPlans} />
      <FeaturedWorkoutsSection featuredWorkouts={featuredWorkouts} />
      <section className="py-16 px-4 bg-white">
        <div className="container max-w-6xl mx-auto">
          <ExerciseLibrary />
        </div>
      </section>
      <WorkoutPlannerSection 
        isMobile={isMobile}
        onSavePlan={handleSavePlan}
        initialPlans={initialWorkoutPlans}
      />
    </ScrollArea>
  );
};

export default Index;
