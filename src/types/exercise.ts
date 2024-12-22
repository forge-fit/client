export interface ExerciseGuide {
  id: string;
  name: string;
  description?: string;
  muscleGroups: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  videoUrl: string;
  steps: string[];
  tips: string[];
  commonMistakes: string[];
  equipment: string[];
}
