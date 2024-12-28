import { Dialog, DialogContent } from "@/components/ui/dialog";
import { exerciseGuides } from "@/data/exerciseGuides";
import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export function ExerciseLibrary() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const isOpen = location.pathname === "/exercises";
  const filteredExercises = exerciseGuides.filter((exercise) =>
    exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleExerciseClick = (exerciseId: string) => {
    navigate(`/exercises/${exerciseId}`, {
      state: { from: location.pathname },
    });
  };
  return (
    <>
      <Dialog open={isOpen} onOpenChange={() => navigate("/")}>
        <DialogContent className="max-w-4xl max-h-[100vh] overflow-y-auto">
          <div className="space-y-4 my-4">
            <input
              type="search"
              placeholder="Search exercises..."
              className="w-full px-4 py-2 border rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredExercises.map((exercise) => (
                <div
                  key={exercise.id}
                  className="p-4 border rounded-lg cursor-pointer hover:bg-accent"
                  onClick={() => handleExerciseClick(exercise.id)}
                >
                  <h3 className="font-semibold">{exercise.name}</h3>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {exercise.muscleGroups.map((muscle) => (
                      <span
                        key={muscle}
                        className="text-xs bg-secondary/50 px-2 py-0.5 rounded-full"
                      >
                        {muscle}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Outlet />
    </>
  );
}
