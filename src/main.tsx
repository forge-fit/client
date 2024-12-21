import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import App from "./App";
import "./index.css";
import { setWorkoutPlans } from "./store/workoutPlanSlice";
import { mockWorkoutPlans } from "./test/mockWorkoutPlans";

// Initialize store with mock data
store.dispatch(setWorkoutPlans(mockWorkoutPlans));

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
