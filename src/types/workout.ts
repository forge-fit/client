export interface WorkoutProgress {
  id: string;
  workoutId: string;
  date: string;
  completed: boolean;
  duration: number;
  feedback: {
    difficulty: number;
    energy: number;
    notes: string;
  };
  exercisesCompleted: number;
  totalExercises: number;
}

export interface WorkoutStats {
  totalWorkouts: number;
  totalTime: number;
}
