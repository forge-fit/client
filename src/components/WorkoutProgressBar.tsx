interface WorkoutProgressBarProps {
  currentExercise: number;
  totalExercises: number;
}

export function WorkoutProgressBar({
  currentExercise,
  totalExercises,
}: WorkoutProgressBarProps) {
  const progress = (currentExercise / totalExercises) * 100;

  return (
    <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
      <div
        className="h-full bg-white transition-all duration-300 ease-in-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
