import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { exerciseGuides, muscleGroups } from "@/data/exerciseGuides";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ExerciseLibraryDialog } from "./ExerciseLibraryDialog";
import { useDialog } from "@/hooks/use-dialog";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import type { ExerciseGuide } from "@/types/exercise";

interface ExerciseLibraryDesktopDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ExerciseLibraryDesktopDialog({
  open,
  onOpenChange,
}: ExerciseLibraryDesktopDialogProps) {
  const [selectedMuscle, setSelectedMuscle] = useState<string | null>(null);
  const [selectedExercise, setSelectedExercise] =
    useState<ExerciseGuide | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const exerciseDialog = useDialog();

  const filteredExercises = exerciseGuides
    .filter((ex) => !selectedMuscle || ex.muscleGroups.includes(selectedMuscle))
    .filter(
      (ex) =>
        searchQuery === "" ||
        ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ex.muscleGroups.some((muscle) =>
          muscle.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl p-6">
          <div className="flex gap-6 h-[calc(80vh-8rem)]">
            <div className="w-48 shrink-0">
              <h3 className="font-semibold mb-4">Muscle Groups</h3>
              <ScrollArea className="h-full pr-4">
                <div className="space-y-1">
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start",
                      !selectedMuscle && "bg-"
                    )}
                    onClick={() => setSelectedMuscle(null)}
                  >
                    All Exercises
                  </Button>
                  {muscleGroups.map((muscle) => (
                    <Button
                      key={muscle}
                      variant="ghost"
                      className={cn(
                        "w-full justify-start",
                        selectedMuscle === muscle && "bg-accent"
                      )}
                      onClick={() => setSelectedMuscle(muscle)}
                    >
                      {muscle}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </div>

            <div className="flex-1 pt-4">
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search exercises..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <h2 className="font-semibold">
                  {selectedMuscle
                    ? `${selectedMuscle} Exercises`
                    : "All Exercises"}
                  {searchQuery && " • Search Results"}
                </h2>

                <ScrollArea className="h-[calc(80vh-16rem)]">
                  <div className="grid grid-cols-2 gap-4 pr-4">
                    {filteredExercises.map((exercise) => (
                      <Card
                        key={exercise.id}
                        className="p-4 cursor-pointer hover:bg-accent/50 transition-colors"
                        onClick={() => {
                          setSelectedExercise(exercise);
                          exerciseDialog.onOpen();
                        }}
                      >
                        <h3 className="font-semibold">{exercise.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {exercise.muscleGroups.join(", ")}
                        </p>
                        <div className="text-sm text-muted-foreground mt-2">
                          {exercise.difficulty}
                        </div>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ExerciseLibraryDialog
        open={exerciseDialog.isOpen}
        onOpenChange={exerciseDialog.setIsOpen}
        selectedExercise={selectedExercise}
      />
    </>
  );
}
