import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WorkoutFeedback {
  workoutId: string;
  date: string;
  duration: number;
  difficulty: number;
  energy: number;
  notes: string;
  exercisesCompleted: number;
  totalExercises: number;
}

export interface WorkoutHistoryState {
  completedWorkouts: WorkoutFeedback[];
  stats: {
    totalWorkouts: number;
    averageDifficulty: number;
    averageEnergy: number;
    totalDuration: number;
  };
}

const initialState: WorkoutHistoryState = {
  completedWorkouts: [],
  stats: {
    totalWorkouts: 0,
    averageDifficulty: 0,
    averageEnergy: 0,
    totalDuration: 0,
  },
};

export const workoutHistorySlice = createSlice({
  name: "workoutHistory",
  initialState,
  reducers: {
    addWorkoutFeedback: (state, action: PayloadAction<WorkoutFeedback>) => {
      state.completedWorkouts.push(action.payload);

      // Update stats
      const stats = state.stats;
      stats.totalWorkouts++;
      stats.totalDuration += action.payload.duration;
      stats.averageDifficulty =
        (stats.averageDifficulty * (stats.totalWorkouts - 1) +
          action.payload.difficulty) /
        stats.totalWorkouts;
      stats.averageEnergy =
        (stats.averageEnergy * (stats.totalWorkouts - 1) +
          action.payload.energy) /
        stats.totalWorkouts;
    },
    deleteWorkoutHistory: (state, action: PayloadAction<{ date: string }>) => {
      const workoutToDelete = state.completedWorkouts.find(
        (w) => w.date === action.payload.date
      );

      if (workoutToDelete) {
        // Remove the workout
        state.completedWorkouts = state.completedWorkouts.filter(
          (w) => w.date !== action.payload.date
        );

        // Update stats
        const stats = state.stats;
        stats.totalWorkouts--;
        stats.totalDuration -= workoutToDelete.duration;

        // Recalculate averages if there are remaining workouts
        if (stats.totalWorkouts > 0) {
          const remaining = state.completedWorkouts;
          stats.averageDifficulty =
            remaining.reduce((acc, curr) => acc + curr.difficulty, 0) /
            stats.totalWorkouts;
          stats.averageEnergy =
            remaining.reduce((acc, curr) => acc + curr.energy, 0) /
            stats.totalWorkouts;
        } else {
          stats.averageDifficulty = 0;
          stats.averageEnergy = 0;
        }
      }
    },
  },
});

export const { addWorkoutFeedback, deleteWorkoutHistory } =
  workoutHistorySlice.actions;
export default workoutHistorySlice.reducer;
