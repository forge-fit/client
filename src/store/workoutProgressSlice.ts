import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WorkoutProgress, WorkoutStats } from "@/types/workout";
import { setSelectedPlan, setWorkoutVisibility } from "./workoutPlanSlice";
import { AppDispatch } from "./store";
import { addWorkoutFeedback } from "./workoutHistorySlice";
import { RootState } from "@/types/store";

interface WorkoutState {
  currentExerciseIndex: number;
  currentSet: number;
  isResting: boolean;
  restTimeLeft: number;
}

interface WorkoutProgressState {
  progress: WorkoutProgress[];
  stats: WorkoutStats;
  activeWorkout: WorkoutProgress | null;
  lastWorkoutId: string | null;
  workoutState: WorkoutState | null;
}

const initialState: WorkoutProgressState = {
  progress: [],
  stats: {
    totalWorkouts: 0,
    totalTime: 0,
  },
  activeWorkout: null,
  lastWorkoutId: null,
  workoutState: null,
};

const workoutProgressSlice = createSlice({
  name: "workoutProgress",
  initialState,
  reducers: {
    startWorkout: (state, action: PayloadAction<{ workoutId: string }>) => {
      const workoutId = `workout_${Date.now()}`;

      // Create new workout first
      const newWorkout: WorkoutProgress = {
        id: workoutId,
        workoutId: action.payload.workoutId,
        date: new Date().toISOString(),
        completed: false,
        duration: 0,
        feedback: {
          difficulty: 0,
          energy: 0,
          notes: "",
        },
        exercisesCompleted: 0,
        totalExercises: 0,
      };

      // Then update state
      state.progress = [
        ...state.progress.filter((w) => w.completed),
        newWorkout,
      ];
      state.activeWorkout = { ...newWorkout };
      state.lastWorkoutId = workoutId;
    },

    updateActiveWorkout: (
      state,
      action: PayloadAction<{
        duration: number;
        exercisesCompleted: number;
        totalExercises: number;
      }>
    ) => {
      if (state.activeWorkout && state.lastWorkoutId) {
        const workout = state.progress.find(
          (w) => w.id === state.lastWorkoutId
        );
        if (workout) {
          workout.duration = action.payload.duration;
          workout.exercisesCompleted = action.payload.exercisesCompleted;
          workout.totalExercises = action.payload.totalExercises;
          state.activeWorkout = { ...workout };
        }
      }
    },

    completeWorkout: (
      state,
      action: PayloadAction<{
        feedback: { difficulty: number; energy: number; notes: string };
        progress: {
          exercisesCompleted: number;
          totalExercises: number;
          duration: number;
        };
      }>
    ) => {
      if (state.lastWorkoutId) {
        const workout = state.progress.find(
          (w) => w.id === state.lastWorkoutId
        );

        if (workout) {
          workout.completed = true;
          workout.feedback = action.payload.feedback;
          workout.exercisesCompleted =
            action.payload.progress.exercisesCompleted;
          workout.totalExercises = action.payload.progress.totalExercises;
          workout.duration = action.payload.progress.duration;

          state.stats.totalWorkouts += 1;
          state.stats.totalTime += workout.duration;
        }

        state.workoutState = null;
        state.activeWorkout = null;
        state.lastWorkoutId = null;
        state.progress = state.progress.filter((w) => w.completed);
      }
    },

    deleteProgress: (state, action: PayloadAction<{ id: string }>) => {
      state.progress = state.progress.filter((p) => p.id !== action.payload.id);

      // Recalculate stats
      const completedWorkouts = state.progress.filter((p) => p.completed);
      state.stats.totalWorkouts = completedWorkouts.length;
      state.stats.totalTime = state.progress.reduce(
        (acc, curr) => acc + curr.duration,
        0
      );
    },

    updateWorkoutState: (state, action: PayloadAction<WorkoutState>) => {
      state.workoutState = action.payload;
    },
  },
});

export const {
  startWorkout,
  updateActiveWorkout,
  completeWorkout,
  deleteProgress,
  updateWorkoutState,
} = workoutProgressSlice.actions;

export const completeWorkoutAndResetState =
  (workoutData: {
    feedback: { difficulty: number; energy: number; notes: string };
    progress: {
      exercisesCompleted: number;
      totalExercises: number;
      duration: number;
    };
  }) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    // Save to workout progress
    dispatch(completeWorkout(workoutData));

    // Get the active workout ID from state
    const state = getState();
    const activeWorkout = state.workoutProgress.activeWorkout;
    const selectedPlan = state.workoutPlan.selectedPlan;

    // Save to workout history with correct workout ID and duration
    dispatch(
      addWorkoutFeedback({
        workoutId: selectedPlan?.name || "Unknown Workout",
        date: new Date().toISOString(),
        duration: Math.round(workoutData.progress.duration),
        difficulty: workoutData.feedback.difficulty,
        energy: workoutData.feedback.energy,
        notes: workoutData.feedback.notes,
        exercisesCompleted: workoutData.progress.exercisesCompleted,
        totalExercises: workoutData.progress.totalExercises,
      })
    );

    // Reset workout state
    dispatch(setSelectedPlan(null));
    dispatch(setWorkoutVisibility(false));
  };

export default workoutProgressSlice.reducer;
