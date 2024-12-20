import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dumbbell, Clock, Target, Heart, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface Exercise {
  id: string;
  name: string;
  description: string;
  muscleGroup: string;
  duration: string;
  difficulty: string;
}

const exercises: Exercise[] = [
  {
    id: "1",
    name: "Push-ups",
    description: "Classic bodyweight exercise for chest and triceps",
    muscleGroup: "Chest, Triceps",
    duration: "5-10 min",
    difficulty: "Beginner"
  },
  {
    id: "2",
    name: "Squats",
    description: "Fundamental lower body exercise",
    muscleGroup: "Legs, Glutes",
    duration: "5-10 min",
    difficulty: "Beginner"
  },
  {
    id: "3",
    name: "Pull-ups",
    description: "Upper body pulling exercise",
    muscleGroup: "Back, Biceps",
    duration: "5-10 min",
    difficulty: "Intermediate"
  }
];

export function ExerciseLibrary() {
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (exerciseId: string) => {
    setFavorites(prev => 
      prev.includes(exerciseId) 
        ? prev.filter(id => id !== exerciseId)
        : [...prev, exerciseId]
    );
  };

  const filteredExercises = exercises.filter(exercise =>
    exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exercise.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exercise.muscleGroup.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Exercise Library</h2>
      
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search exercises..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {filteredExercises.map((exercise) => (
            <CarouselItem key={exercise.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
              <Card className="hover:shadow-lg transition-shadow animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Dumbbell className="h-5 w-5" />
                      {exercise.name}
                    </div>
                    <button
                      onClick={() => toggleFavorite(exercise.id)}
                      className="focus:outline-none"
                    >
                      <Heart
                        className={cn(
                          "h-5 w-5 transition-colors",
                          favorites.includes(exercise.id)
                            ? "fill-red-500 text-red-500"
                            : "text-gray-300 hover:text-red-500"
                        )}
                      />
                    </button>
                  </CardTitle>
                  <CardDescription>{exercise.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-primary" />
                      <span>{exercise.muscleGroup}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>{exercise.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Dumbbell className="h-4 w-4 text-primary" />
                      <span>{exercise.difficulty}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}