import { configureStore, combineReducers } from "@reduxjs/toolkit";
import notificationReducer from "./notificationSlice";
import workoutPlanReducer from "./workoutPlanSlice";
import workoutProgressReducer from "./workoutProgressSlice";
import workoutHistoryReducer from "./workoutHistorySlice";
import exerciseReducer from "./exerciseSlice";
// Load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("fitness_tracker_state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// Save state to localStorage
const saveState = (state: RootState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("fitness_tracker_state", serializedState);
  } catch (err) {
    // Ignore write errors
  }
};

const preloadedState = loadState();

const rootReducer = combineReducers({
  notification: notificationReducer,
  workoutPlan: workoutPlanReducer,
  workoutProgress: workoutProgressReducer,
  workoutHistory: workoutHistoryReducer,
  exercise: exerciseReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  preloadedState,
});

// Subscribe to store changes
store.subscribe(() => {
  saveState(store.getState());
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
