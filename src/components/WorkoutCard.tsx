import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Dumbbell, Play } from "lucide-react";

interface WorkoutCardProps {
  title: string;
  description: string;
  duration: string;
  difficulty: string;
  image: string;
}

export function WorkoutCard({ title, description, duration, difficulty, image }: WorkoutCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg animate-fade-in relative">
      <div className="aspect-video w-full overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <CardHeader>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Dumbbell className="w-4 h-4" />
            <span>{difficulty}</span>
          </div>
        </div>
      </CardContent>
      <div className="absolute bottom-4 right-4 overflow-hidden group">
        <button 
          className="p-2 rounded-full bg-transparent hover:bg-primary-100 transition-colors relative"
          aria-label="Start workout"
        >
          <Play className="w-5 h-5 text-primary-700 fill-primary-700" />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200/20 via-transparent to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-300 ease-out pointer-events-none"></div>
        </button>
      </div>
    </Card>
  );
}