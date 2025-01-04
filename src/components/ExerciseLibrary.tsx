import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ExerciseCard } from "./ExerciseCard";
import { ExerciseDto, ExerciseDtoBodyPartEnum } from "@forge-fit/server";
import { fetchExercises } from "@/store/exerciseSlice";

export function ExerciseLibrary() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBodyPart, setSelectedBodyPart] = useState("all");
  const navigate = useNavigate();
  const location = useLocation();
  const isOpen = location.pathname === "/exercises";
  const exercises = useAppSelector(
    (state: RootState) => state.exercise.exercises
  );
  const dispatch = useAppDispatch();

  const handleBodyPartClick = async (
    bodyPart: ExerciseDtoBodyPartEnum | "all"
  ) => {
    setSelectedBodyPart(bodyPart);
    await dispatch(fetchExercises({ targetMuscle: bodyPart }));
  };

  const filteredExercises = exercises.filter(
    (exercise) =>
      (selectedBodyPart === "all" || exercise.bodyPart === selectedBodyPart) &&
      exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExerciseClick = (exercise: ExerciseDto) => {
    navigate(`/exercises/${exercise.id}`, {
      state: { from: location.pathname },
    });
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={() => navigate("/")}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto flex">
          <div className="w-48 border-r shrink-0">
            <div className="p-4 space-y-2">
              {["all", ...Object.values(ExerciseDtoBodyPartEnum)].map(
                (bodyPart: ExerciseDtoBodyPartEnum | "all") => (
                  <button
                    key={bodyPart}
                    onClick={() => handleBodyPartClick(bodyPart)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      selectedBodyPart === bodyPart
                        ? "bg-primary text-white"
                        : "hover:bg-accent"
                    }`}
                  >
                    <div className="font-medium">
                      {bodyPart.charAt(0).toUpperCase() + bodyPart.slice(1)}
                    </div>
                  </button>
                )
              )}
            </div>
          </div>

          <div className="flex-1 min-w-0 overflow-y-auto my-1 p-6">
            <input
              type="search"
              placeholder="Search exercises..."
              className="w-full px-4 py-2 border rounded-md mb-4"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredExercises.map((exercise) => (
                <ExerciseCard
                  key={exercise.id}
                  exercise={exercise}
                  handleExerciseClick={handleExerciseClick}
                />
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Outlet />
    </>
  );
}
