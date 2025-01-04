import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import { ExerciseDto } from "@forge-fit/server";
import { ExerciseCard } from "../ExerciseCard";

export function ExercisesSection() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const exercises = useAppSelector(
    (state: RootState) => state.exercise.exercises
  );
  const handleExerciseClick = (exercise: ExerciseDto) => {
    navigate(`/exercises/${exercise.id}`);
  };

  return (
    <section className="py-12 px-4 bg-accent/50">
      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold pb-2">
              Exercise Library
            </h2>
            <p className="text-muted-foreground">
              Learn proper form and technique for each exercise
            </p>
          </div>
          <Button variant="outline" onClick={() => navigate("/exercises")}>
            <Search className="h-4 w-4" />
            Browse Exercises
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-4">
          {exercises.slice(0, isMobile ? 3 : 6).map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              handleExerciseClick={handleExerciseClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
