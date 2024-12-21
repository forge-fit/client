import { Dumbbell, Weight, Clock, Repeat } from "lucide-react";

interface ExerciseDisplayProps {
  exerciseName: string;
  currentSet: number;
  totalSets: number;
  reps?: string;
  weight?: { value: string; unit: string };
  notes?: string;
}

export function ExerciseDisplay({
  exerciseName,
  currentSet,
  totalSets,
  reps,
  weight,
  notes
}: ExerciseDisplayProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Dumbbell className="h-8 w-8 text-primary" />
          <h2 className="text-3xl font-bold text-white">{exerciseName}</h2>
        </div>
        {weight && weight.value && (
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
            <Weight className="h-6 w-6 text-primary-100" />
            <span className="text-xl font-bold text-primary-100">
              {weight.value}{weight.unit}
            </span>
          </div>
        )}
      </div>
      
      <div className="grid gap-4">
        <div className="flex items-center justify-between bg-white/10 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <Clock className="h-6 w-6 text-primary-100" />
            <span className="text-xl font-semibold text-white">Sets Progress</span>
          </div>
          <span className="text-2xl font-bold text-primary-100">{currentSet}/{totalSets}</span>
        </div>
        
        {reps && (
          <div className="flex items-center justify-between bg-white/10 p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <Repeat className="h-6 w-6 text-primary-100" />
              <span className="text-xl font-semibold text-white">Target</span>
            </div>
            <span className="text-xl text-primary-100">
              {reps} reps
            </span>
          </div>
        )}
      </div>

      {notes && (
        <div className="bg-white/5 p-4 rounded-lg">
          <p className="text-sm text-primary-100">{notes}</p>
        </div>
      )}
    </div>
  );
}