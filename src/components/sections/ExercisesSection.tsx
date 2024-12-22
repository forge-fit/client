import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { exerciseGuides } from "@/data/exerciseGuides";
import { useDialog } from "@/hooks/use-dialog";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { ExerciseLibraryButton } from "../ExerciseLibraryButton";
import { ExerciseLibraryDialog } from "../ExerciseLibraryDialog";

export function ExercisesSection() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const guideDialog = useDialog();
  const [selectedExercise, setSelectedExercise] = useState(exerciseGuides[0]);

  return (
    <section className="py-12 px-4 bg-accent/50">
      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">Exercise Library</h2>
            <p className="text-muted-foreground">
              Learn proper form and technique for each exercise
            </p>
          </div>
          <ExerciseLibraryButton />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {exerciseGuides.slice(0, isMobile ? 3 : 6).map((exercise) => (
            <Card
              key={exercise.id}
              className="group cursor-pointer hover:shadow-lg transition-all"
              onClick={() => {
                setSelectedExercise(exercise);
                guideDialog.onOpen();
              }}
            >
              <CardHeader>
                <CardTitle className="flex justify-between items-start">
                  <span className="text-lg font-semibold">{exercise.name}</span>
                  <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">
                    {exercise.difficulty}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1">
                  {exercise.muscleGroups.map((muscle) => (
                    <span
                      key={muscle}
                      className="text-xs text-muted-foreground bg-secondary/50 px-2 py-0.5 rounded-full"
                    >
                      {muscle}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {selectedExercise && (
        <ExerciseLibraryDialog
          open={guideDialog.isOpen}
          onOpenChange={guideDialog.setIsOpen}
          selectedExercise={selectedExercise}
        />
      )}
    </section>
  );
}
