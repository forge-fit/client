import React, { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MobileWorkoutPlan from "./pages/MobileWorkoutPlan";
import WorkoutLibrary from "./pages/WorkoutLibrary";
import { featuredWorkouts } from "./data/workouts";
import Progress from "./pages/Progress";
import MobileExercises from "./pages/MobileExercises";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAppDispatch } from "@/store/hooks";
import { requestNotificationPermission } from "@/store/notificationSlice";
import { NotificationPromptDialog } from "@/components/NotificationPromptDialog";
import { checkAndRescheduleNotification } from "@/store/notificationSlice";

const App = () => {
  const [showNotificationPrompt, setShowNotificationPrompt] = useState(false);
  const isMobile = useIsMobile();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAndRescheduleNotification());
  }, [dispatch]);

  useEffect(() => {
    // Check if we've shown the prompt before
    const hasPrompted = localStorage.getItem("notification_prompted");
    if (!hasPrompted && "Notification" in window) {
      setShowNotificationPrompt(true);
      localStorage.setItem("notification_prompted", "true");
    }
  }, []);

  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/fit-track">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/workout-plan" element={<MobileWorkoutPlan />} />
          <Route
            path="/workout-library"
            element={<WorkoutLibrary workouts={featuredWorkouts} />}
          />
          <Route path="/progress" element={<Progress />} />
          {isMobile && (
            <Route path="/exercises" element={<MobileExercises />} />
          )}
        </Routes>
      </BrowserRouter>
      <NotificationPromptDialog
        open={showNotificationPrompt}
        onClose={() => setShowNotificationPrompt(false)}
      />
    </TooltipProvider>
  );
};

export default App;
