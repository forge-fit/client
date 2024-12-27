import React, { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MobileWorkoutPlan from "./pages/MobileWorkoutPlan";
import WorkoutLibrary from "./pages/WorkoutLibrary";
import { featuredWorkouts } from "./data/workouts";
import Progress from "./pages/Progress";
import MobileExercises from "./pages/MobileExercises";
import SettingsPage from "./pages/SettingsPage";
import { useIsMobile } from "@/hooks/use-mobile";

const queryClient = new QueryClient();

const App = () => {
  const isMobile = useIsMobile();

  return (
    <QueryClientProvider client={queryClient}>
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
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
