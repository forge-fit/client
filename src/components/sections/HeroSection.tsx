import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useDialog } from "@/hooks/use-dialog";
import { BarChart, Play, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setSelectedPlan,
  setWorkoutVisibility,
} from "@/store/workoutPlanSlice";
import { WorkoutPlanSelectionDialog } from "@/components/WorkoutPlanSelection";
import { WorkoutPlayerDialog } from "@/components/WorkoutPlayerDialog";
import { useEffect } from "react";
import SettingsModal from "@/components/SettingsModal";

export const HeroSection = () => {
  const navigate = useNavigate();
  const planDialog = useDialog();
  const workoutDialog = useDialog();
  const dispatch = useAppDispatch();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const activeWorkout = useAppSelector(
    (state) => state.workoutProgress.activeWorkout
  );
  const savedPlans = useAppSelector((state) => state.workoutPlan.plans);
  const selectedPlan = useAppSelector(
    (state) => state.workoutPlan.selectedPlan
  );
  useEffect(() => {
    if (activeWorkout && !selectedPlan) {
      const matchingPlan = savedPlans.find(
        (plan) => plan.name === activeWorkout.workoutId
      );
      if (matchingPlan) {
        dispatch(setSelectedPlan(matchingPlan));
        dispatch(setWorkoutVisibility(true));
      }
    }
  }, [activeWorkout, dispatch, selectedPlan, savedPlans]);

  const handleStartClick = () => {
    if (activeWorkout) {
      dispatch(setWorkoutVisibility(true));
      workoutDialog.onOpen();
    } else {
      planDialog.onOpen();
    }
  };

  return (
    <section className="bg-gradient-to-r from-primary-700 to-primary-900 text-white py-20 px-4">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4"
        onClick={() => setIsSettingsOpen(true)}
      >
        <Settings className="h-6 w-6" />
      </Button>

      <div className="container max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
          Transform Your Body,
          <br />
          Transform Your Life
        </h1>
        <p className="text-xl mb-8 text-primary-100 max-w-2xl animate-fade-in">
          Get fit with personalized workouts and expert guidance, anywhere,
          anytime.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md">
          <div className="relative overflow-hidden group flex-1">
            <Button
              variant="default"
              size="lg"
              className="relative overflow-hidden group bg-primary text-white p-4 h-14 w-full"
              onClick={handleStartClick}
            >
              <Play className="w-5 h-5 mr-2" />
              {activeWorkout ? "Continue Training" : "Start Training"}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-lightSweep pointer-events-none"></span>
            </Button>
          </div>
          <WorkoutPlanSelectionDialog
            dialog={planDialog}
            onSelectPlan={(plan) => {
              dispatch(setSelectedPlan(plan));
              dispatch(setWorkoutVisibility(true));
              planDialog.onClose();
              workoutDialog.onOpen();
            }}
          />
          <Button
            variant="secondary"
            size="lg"
            onClick={() => navigate("/progress")}
            className="bg-white/10 hover:bg-white/20 text-white h-14"
          >
            <BarChart className="mr-2 h-5 w-5" />
            View Progress
          </Button>
        </div>
      </div>

      {isSettingsOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <SettingsModal onClose={() => setIsSettingsOpen(false)} />
          </div>
        </div>
      )}

      {activeWorkout && <WorkoutPlayerDialog dialog={workoutDialog} />}
    </section>
  );
};
