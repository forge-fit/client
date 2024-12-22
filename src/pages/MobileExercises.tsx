import { exerciseGuides, muscleGroups } from "@/data/exerciseGuides";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, Filter, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ExerciseGuide } from "@/components/ExerciseGuide";
import { cn } from "@/lib/utils";
import type { ExerciseGuide as ExerciseGuideType } from "@/types/exercise";

export default function MobileExercises() {
  const navigate = useNavigate();
  const [selectedMuscle, setSelectedMuscle] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedExercise, setSelectedExercise] =
    useState<ExerciseGuideType | null>(null);

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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b">
        <div className="flex items-center gap-2 p-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold flex-1">
            {selectedMuscle || "All Exercises"}
          </h1>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowFilters(true)}
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {/* Search Input */}
        <div className="px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search exercises..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      {/* Exercise List */}
      <div className="divide-y">
        {filteredExercises.map((exercise) => (
          <button
            key={exercise.id}
            className="w-full p-4 text-left hover:bg-accent/50 active:bg-accent transition-colors"
            onClick={() => setSelectedExercise(exercise)}
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{exercise.name}</h3>
                <span className="text-xs text-muted-foreground px-2 py-1 bg-secondary rounded-full">
                  {exercise.difficulty}
                </span>
              </div>
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
            </div>
          </button>
        ))}
      </div>

      {/* Mobile-Friendly Filter Dialog */}
      <Dialog open={showFilters} onOpenChange={setShowFilters}>
        <DialogContent className="w-screen h-[100vh] max-w-none m-0 p-0 rounded-none">
          <div className="flex flex-col h-full">
            {/* Dialog Header */}
            <div className="sticky top-0 z-10 bg-background border-b">
              <div className="flex items-center gap-2 p-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowFilters(false)}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <h2 className="text-xl font-bold flex-1">Filter by Muscle</h2>
              </div>
            </div>

            {/* Filter Options */}
            <div className="flex-1 overflow-auto">
              <div className="p-4 space-y-2">
                <button
                  className={cn(
                    "w-full p-4 text-left rounded-lg transition-colors",
                    !selectedMuscle
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent"
                  )}
                  onClick={() => {
                    setSelectedMuscle(null);
                    setShowFilters(false);
                  }}
                >
                  All Exercises
                </button>
                {muscleGroups.map((muscle) => (
                  <button
                    key={muscle}
                    className={cn(
                      "w-full p-4 text-left rounded-lg transition-colors",
                      selectedMuscle === muscle
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-accent"
                    )}
                    onClick={() => {
                      setSelectedMuscle(muscle);
                      setShowFilters(false);
                    }}
                  >
                    {muscle}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Mobile-Friendly Exercise Details Dialog */}
      <Dialog
        open={!!selectedExercise}
        onOpenChange={(open) => !open && setSelectedExercise(null)}
      >
        <DialogContent className="w-screen h-[100vh] max-w-none m-0 p-0 rounded-none overflow-y-auto">
          <div className="flex flex-col h-full">
            {/* Dialog Header */}
            <div className="sticky top-0 z-10 bg-background border-b">
              <div className="flex items-center gap-2 p-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedExercise(null)}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <div className="flex-1">
                  <h2 className="text-xl font-bold">
                    {selectedExercise?.name}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {selectedExercise?.muscleGroups.join(", ")}
                  </p>
                </div>
              </div>
            </div>

            {/* Exercise Content - Fixed height and overflow */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-4 pb-20">
                {selectedExercise && (
                  <ExerciseGuide exercise={selectedExercise} isMobile={true} />
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
