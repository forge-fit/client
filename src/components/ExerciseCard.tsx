import { ExerciseDto } from "@forge-fit/server";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export const ExerciseCard = ({
  exercise,
  handleExerciseClick,
}: {
  exercise: ExerciseDto;
  handleExerciseClick: (exercise: ExerciseDto) => void;
}) => {
  return (
    <Card
      key={exercise.id}
      className="group hover:shadow-lg transition-all cursor-pointer max-h-[300px]"
      onClick={() => handleExerciseClick(exercise)}
    >
      <CardHeader>
        <CardTitle className="flex justify-between items-start">
          <span className="text-lg font-semibold">
            {exercise.name.split(" ").map((word) => (
              <span key={word}>
                {word.charAt(0).toUpperCase() + word.slice(1)}{" "}
              </span>
            ))}
          </span>
        </CardTitle>
      </CardHeader>
      <CardFooter>
        <div className="flex flex-wrap gap-1">
          <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">
            {exercise.bodyPart}
          </span>
          <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">
            {exercise.target}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};
