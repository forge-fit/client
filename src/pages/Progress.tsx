import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  ChevronLeft,
  Clock,
  Dumbbell,
  Trophy,
  TrendingUp,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { deleteProgress } from "@/store/workoutProgressSlice";
import { deleteWorkoutHistory } from "@/store/workoutHistorySlice";

export default function Progress() {
  const { stats: progressStats, progress } = useAppSelector(
    (state) => state.workoutProgress
  );
  const { stats: historyStats, completedWorkouts } = useAppSelector(
    (state) => state.workoutHistory
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleDelete = (id: string) => {
    dispatch(deleteProgress({ id }));
  };

  const handleDeleteHistory = (date: string) => {
    dispatch(deleteWorkoutHistory({ date }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b">
        <div className="container max-w-6xl mx-auto h-16 flex items-center px-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-bold ml-2">Progress</h1>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-700 to-primary-900 text-white">
        <div className="container max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-2">
            <BarChart className="h-6 w-6" />
            <h2 className="text-2xl font-bold">Your Workout Journey</h2>
          </div>
          <p className="text-primary-100">
            Track your progress and see how far you've come
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Workouts
              </CardTitle>
              <Dumbbell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {historyStats.totalWorkouts}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(historyStats.totalDuration / 60)} mins
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Average Difficulty
              </CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {historyStats.averageDifficulty.toFixed(1)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Average Energy
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {historyStats.averageEnergy.toFixed(1)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Completed Workouts */}
        <div className="mt-8">
          <CardHeader>
            <CardTitle>Workout History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {completedWorkouts
                .slice()
                .reverse()
                .map((workout, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <div className="font-medium">{workout.workoutId}</div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(workout.date).toLocaleDateString()} at{" "}
                        {new Date(workout.date).toLocaleTimeString()}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Progress: {workout.exercisesCompleted}/
                        {workout.totalExercises} exercises
                      </div>
                      {workout.notes && (
                        <div className="text-sm text-muted-foreground mt-1">
                          Note: {workout.notes}
                        </div>
                      )}
                      <div className="text-sm text-muted-foreground">
                        Difficulty: {workout.difficulty} | Energy:{" "}
                        {workout.energy}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-sm text-muted-foreground">
                        {Math.round(workout.duration / 60)} mins
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDeleteHistory(workout.date)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </div>
      </div>
    </div>
  );
}
