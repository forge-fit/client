import { WorkoutPlan } from "@/components/WorkoutPlanForm";

export const mockWorkoutPlans: WorkoutPlan[] = [
  {
    name: "Upper Body Power",
    exercises: [
      {
        name: "Bench Press",
        sets: "4",
        reps: "8-10",
        weight: { value: "135", unit: "lbs" },
        notes: "Focus on controlled movement",
      },
      {
        name: "Pull-ups",
        sets: "3",
        reps: "8-12",
        weight: { value: "0", unit: "lbs" },
        notes: "Use assistance band if needed",
      },
      {
        name: "Shoulder Press",
        sets: "3",
        reps: "10-12",
        weight: { value: "65", unit: "lbs" },
        notes: "Keep core tight",
      },
    ],
  },
  {
    name: "Core Blast",
    exercises: [
      {
        name: "Plank",
        sets: "3",
        reps: "60 seconds",
        weight: { value: "0", unit: "lbs" },
        notes: "Maintain proper form",
      },
      {
        name: "Russian Twists",
        sets: "3",
        reps: "20",
        weight: { value: "25", unit: "lbs" },
        notes: "Keep feet elevated",
      },
      {
        name: "Ab Rollouts",
        sets: "3",
        reps: "12-15",
        weight: { value: "0", unit: "lbs" },
        notes: "Use ab wheel",
      },
    ],
  },
];