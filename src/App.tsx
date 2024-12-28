import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MobileWorkoutPlan from "./pages/MobileWorkoutPlan";
import { featuredWorkouts } from "./data/workouts";
import Progress from "./pages/Progress";
import { NotificationPromptDialog } from "@/components/NotificationPromptDialog";
import { ExerciseDialog } from "./components/ExerciseDialog";
import { ExerciseLibrary } from "./components/ExerciseLibrary";
import { WorkoutLibraryDialog } from "./components/WorkoutLibraryDialog";

const App = () => {
  const [showNotificationPrompt, setShowNotificationPrompt] = useState(false);

  useEffect(() => {
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
          <Route path="/" element={<Index />}>
            <Route path="/workout-plan" element={<MobileWorkoutPlan />} />
            <Route
              path="/workout-library"
              element={<WorkoutLibraryDialog workouts={featuredWorkouts} />}
            />
            <Route path="/exercises" element={<ExerciseLibrary />}>
              <Route
                path="/exercises/:exerciseId"
                element={<ExerciseDialog />}
              />
            </Route>
          </Route>
          <Route path="/progress" element={<Progress />} />
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
