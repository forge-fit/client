import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WorkoutPlan } from "@/components/WorkoutPlanForm";

interface WorkoutPlanState {
  plans: WorkoutPlan[];
  selectedPlan: WorkoutPlan | null;
  isWorkoutVisible: boolean;
}

const initialState: WorkoutPlanState = {
  plans: [],
  selectedPlan: null,
  isWorkoutVisible: false,
};

const workoutPlanSlice = createSlice({
  name: "workoutPlan",
  initialState,
  reducers: {
    addWorkoutPlan: (state, action: PayloadAction<WorkoutPlan>) => {
      state.plans.push(action.payload);
    },
    setWorkoutPlans: (state, action: PayloadAction<WorkoutPlan[]>) => {
      state.plans = action.payload;
    },
    deleteWorkoutPlan: (state, action: PayloadAction<string>) => {
      state.plans = state.plans.filter((plan) => plan.name !== action.payload);
    },
    updateWorkoutPlan: (state, action: PayloadAction<WorkoutPlan>) => {
      const index = state.plans.findIndex(
        (plan) => plan.name === action.payload.name
      );
      if (index !== -1) {
        state.plans[index] = action.payload;
      }
    },
    setSelectedPlan: (state, action: PayloadAction<WorkoutPlan | null>) => {
      state.selectedPlan = action.payload;
    },
    setWorkoutVisibility: (state, action: PayloadAction<boolean>) => {
      state.isWorkoutVisible = action.payload;
    },
  },
});

export const {
  addWorkoutPlan,
  setWorkoutPlans,
  deleteWorkoutPlan,
  updateWorkoutPlan,
  setSelectedPlan,
  setWorkoutVisibility,
} = workoutPlanSlice.actions;
export default workoutPlanSlice.reducer;
