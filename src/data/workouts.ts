import { WorkoutCardProps } from "@/components/WorkoutCard";

export const featuredWorkouts: WorkoutCardProps[] = [
  {
    title: "Full Body Strength",
    description: "Build strength and endurance with this comprehensive workout",
    duration: "45 min",
    difficulty: "Intermediate",
    category: "strength",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&auto=format&fit=crop",
    exercises: [
      {
        name: "Push-ups",
        sets: "3",
        reps: "12",
        notes: "Keep core tight",
        weight: { value: "0", unit: "kg" },
      },
      {
        name: "Squats",
        sets: "4",
        reps: "15",
        notes: "Go deep",
        weight: { value: "0", unit: "kg" },
      },
      {
        name: "Dumbbell Rows",
        sets: "3",
        reps: "12",
        notes: "Each arm",
        weight: { value: "10", unit: "kg" },
      },
    ],
  },
  {
    title: "Core Crusher",
    description: "Intense core workout for strong abs",
    duration: "30 min",
    difficulty: "Advanced",
    category: "strength",
    image:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&auto=format&fit=crop",
    exercises: [
      {
        name: "Planks",
        sets: "3",
        reps: "60s",
        notes: "Hold position",
        weight: { value: "0", unit: "kg" },
      },
      {
        name: "Russian Twists",
        sets: "3",
        reps: "20",
        notes: "Slow and controlled",
        weight: { value: "5", unit: "kg" },
      },
    ],
  },
  {
    title: "HIIT Cardio Blast",
    description: "High-intensity interval training for maximum calorie burn",
    duration: "25 min",
    difficulty: "Advanced",
    category: "hiit",
    image:
      "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=800&auto=format&fit=crop",
    exercises: [
      {
        name: "Burpees",
        sets: "4",
        reps: "20",
        notes: "Full range of motion",
        weight: { value: "0", unit: "kg" },
      },
      {
        name: "Mountain Climbers",
        sets: "3",
        reps: "30",
        notes: "Fast pace",
        weight: { value: "0", unit: "kg" },
      },
    ],
  },
  {
    title: "Cardio Endurance",
    description: "Build stamina with this cardio-focused routine",
    duration: "40 min",
    difficulty: "Intermediate",
    category: "cardio",
    image:
      "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=800&auto=format&fit=crop",
    exercises: [
      {
        name: "Jump Rope",
        sets: "3",
        reps: "2 min",
        notes: "Steady pace",
        weight: { value: "0", unit: "kg" },
      },
      {
        name: "High Knees",
        sets: "4",
        reps: "1 min",
        notes: "Keep pace",
        weight: { value: "0", unit: "kg" },
      },
    ],
  },
  {
    title: "Morning Yoga Flow",
    description: "Start your day with this energizing yoga sequence",
    duration: "20 min",
    difficulty: "Beginner",
    category: "yoga",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop",
    exercises: [
      {
        name: "Sun Salutation",
        sets: "3",
        reps: "5",
        notes: "Flow with breath",
        weight: { value: "0", unit: "kg" },
      },
      {
        name: "Warrior Poses",
        sets: "2",
        reps: "10",
        notes: "Hold each pose",
        weight: { value: "0", unit: "kg" },
      },
    ],
  },
  {
    title: "Dynamic Stretching",
    description: "Improve flexibility and prevent injuries",
    duration: "15 min",
    difficulty: "Beginner",
    category: "stretching",
    image:
      "https://images.pexels.com/photos/3076509/pexels-photo-3076509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    exercises: [
      {
        name: "Leg Swings",
        sets: "3",
        reps: "12",
        notes: "Each leg",
        weight: { value: "0", unit: "kg" },
      },
      {
        name: "Arm Circles",
        sets: "2",
        reps: "20",
        notes: "Both directions",
        weight: { value: "0", unit: "kg" },
      },
    ],
  },
  {
    title: "Power Yoga",
    description: "Challenging yoga session for strength and flexibility",
    duration: "50 min",
    difficulty: "Advanced",
    category: "yoga",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop",
    exercises: [
      {
        name: "Chaturanga Flow",
        sets: "4",
        reps: "10",
        notes: "Strong core",
        weight: { value: "0", unit: "kg" },
      },
      {
        name: "Handstand Prep",
        sets: "3",
        reps: "5",
        notes: "Against wall",
        weight: { value: "0", unit: "kg" },
      },
    ],
  },
  {
    title: "Sprint Intervals",
    description: "Explosive cardio workout to boost speed",
    duration: "35 min",
    difficulty: "Advanced",
    category: "cardio",
    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop",
    exercises: [
      {
        name: "Sprint",
        sets: "6",
        reps: "30s",
        notes: "Max effort",
        weight: { value: "0", unit: "kg" },
      },
      {
        name: "Recovery Jog",
        sets: "6",
        reps: "90s",
        notes: "Easy pace",
        weight: { value: "0", unit: "kg" },
      },
    ],
  },
];
