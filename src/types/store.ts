import { WorkoutPlan } from "@/components/WorkoutPlanForm";
import { WorkoutProgress, WorkoutStats } from "./workout";
import { WorkoutHistoryState } from "@/store/workoutHistorySlice";

export interface WorkoutPlanState {
  plans: WorkoutPlan[];
  selectedPlan: WorkoutPlan | null;
  isWorkoutVisible: boolean;
}

export interface WorkoutProgressState {
  progress: WorkoutProgress[];
  stats: WorkoutStats;
  activeWorkout: WorkoutProgress | null;
  lastWorkoutId: string | null;
  workoutState: {
    currentExerciseIndex: number;
    currentSet: number;
    isResting: boolean;
    restTimeLeft: number;
  } | null;
}

export interface RootState {
  workoutPlan: WorkoutPlanState;
  workoutProgress: WorkoutProgressState;
  workoutHistory: WorkoutHistoryState;
}
