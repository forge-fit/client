import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ExerciseGuide } from "./ExerciseGuide";
import { ExerciseGuide as ExerciseGuideType } from "@/types/exercise";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "./ui/button";
import { ChevronLeft } from "lucide-react";

interface ExerciseLibraryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedExercise: ExerciseGuideType | null;
}

export function ExerciseLibraryDialog({
  open,
  onOpenChange,
  selectedExercise,
}: ExerciseLibraryDialogProps) {
  const isMobile = useIsMobile();

  if (!selectedExercise) return null;

  if (isMobile) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="w-screen h-[100vh] max-w-none m-0 p-0 rounded-none overflow-y-auto">
          <div className="flex flex-col">
            <div className="sticky top-0 z-10 bg-background border-b">
              <div className="flex items-center gap-2 p-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onOpenChange(false)}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <div className="flex-1">
                  <h2 className="text-xl font-bold">{selectedExercise.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    {selectedExercise.muscleGroups.join(", ")}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="p-4">
                <ExerciseGuide exercise={selectedExercise} isMobile={true} />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-screen-sm p-0 gap-0 max-h-[90vh] overflow-auto">
        <Card className="border-0">
          <CardHeader className="p-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">
                {selectedExercise.name}
              </CardTitle>
              <div className="flex gap-2">
                {selectedExercise.muscleGroups.map((muscle) => (
                  <Badge key={muscle} variant="secondary">
                    {muscle}
                  </Badge>
                ))}
                <Badge variant="outline">{selectedExercise.difficulty}</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <ExerciseGuide exercise={selectedExercise} />
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
