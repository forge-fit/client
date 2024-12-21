import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock, Dumbbell } from "lucide-react";
import { FeaturedWorkoutDialog } from "./FeaturedWorkoutDialog";
import { Exercise } from "./WorkoutPlanForm";

export interface WorkoutCardProps {
  title: string;
  description: string;
  duration: string;
  difficulty: string;
  image: string;
  exercises: Exercise[];
  category: string;
}

export function WorkoutCard({
  title,
  description,
  duration,
  difficulty,
  image,
  exercises,
}: WorkoutCardProps) {
  return (
    <FeaturedWorkoutDialog
      title={title}
      description={description}
      duration={duration}
      difficulty={difficulty}
      exercises={exercises}
    >
      <Card className="overflow-hidden transition-all hover:shadow-lg animate-fade-in relative cursor-pointer h-[400px] flex flex-col">
        <div className="aspect-video w-full overflow-hidden flex-shrink-0">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
        <CardHeader className="p-4 flex-grow">
          <CardTitle className="text-lg font-bold">{title}</CardTitle>
          <CardDescription className="text-sm line-clamp-2">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-0 mt-auto">
          <div className="flex items-center gap-4 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Dumbbell className="w-3 h-3" />
              <span>{difficulty}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </FeaturedWorkoutDialog>
  );
}
