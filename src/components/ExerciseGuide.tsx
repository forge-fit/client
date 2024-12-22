import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Info, AlertTriangle, CheckCircle, Dumbbell } from "lucide-react";
import type { ExerciseGuide } from "@/types/exercise";
import { cn } from "@/lib/utils";
import { useDialog } from "@/hooks/use-dialog";
import { ExerciseLibraryDialog } from "./ExerciseLibraryDialog";

interface ExerciseGuideProps {
  exercise: ExerciseGuide;
  isMobile?: boolean;
}

export function ExerciseGuide({
  exercise,
  isMobile = false,
}: ExerciseGuideProps) {
  return (
    <div className={cn("w-full", !isMobile && "card")}>
      <div className="max-w-2xl mx-auto">
        <div className="aspect-video rounded-lg overflow-hidden bg-black mb-4">
          <iframe
            src={exercise.videoUrl}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
            allowFullScreen
          />
        </div>
      </div>

      {isMobile ? (
        // Mobile Layout
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">Steps</h3>
            <ol className="space-y-2">
              {exercise.steps.map((step, index) => (
                <li key={index} className="flex gap-3 text-sm">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs">
                    {index + 1}
                  </div>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Tips</h3>
            <div className="space-y-2">
              {exercise.tips.map((tip, index) => (
                <Alert key={index} className="py-2">
                  <div className="flex gap-2 items-center">
                    <CheckCircle className="h-4 w-4 shrink-0" />
                    <AlertDescription className="text-sm">
                      {tip}
                    </AlertDescription>
                  </div>
                </Alert>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Common Mistakes</h3>
            <div className="space-y-2">
              {exercise.commonMistakes.map((mistake, index) => (
                <Alert key={index} variant="destructive" className="py-2">
                  <div className="flex gap-2 items-center">
                    <AlertTriangle className="h-4 w-4 shrink-0" />
                    <AlertDescription className="text-sm">
                      {mistake}
                    </AlertDescription>
                  </div>
                </Alert>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <div className="flex flex-wrap gap-1">
              {exercise.equipment.map((item) => (
                <Badge key={item} variant="outline" className="text-xs">
                  <Dumbbell className="mr-1 h-3 w-3" />
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      ) : (
        // Desktop Layout (existing layout)
        <div>
          <CardContent className="space-y-6 p-2">
            <Tabs defaultValue="steps" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="steps">Steps</TabsTrigger>
                <TabsTrigger value="tips">Tips</TabsTrigger>
                <TabsTrigger value="mistakes">Common Mistakes</TabsTrigger>
              </TabsList>

              <TabsContent value="steps">
                <ScrollArea className="h-auto rounded-md border p-4">
                  <ol className="space-y-4">
                    {exercise.steps.map((step, index) => (
                      <li key={index} className="flex gap-3">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border">
                          {index + 1}
                        </div>
                        <p>{step}</p>
                      </li>
                    ))}
                  </ol>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="tips">
                <ScrollArea className="h-auto rounded-md border p-4">
                  <div className="space-y-4">
                    {exercise.tips.map((tip, index) => (
                      <Alert key={index}>
                        <CheckCircle className="h-4 w-4" />
                        <AlertDescription>{tip}</AlertDescription>
                      </Alert>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="mistakes">
                <ScrollArea className="h-auto rounded-md border p-4">
                  <div className="space-y-4">
                    {exercise.commonMistakes.map((mistake, index) => (
                      <Alert key={index} variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>{mistake}</AlertDescription>
                      </Alert>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>

            <div className="flex flex-wrap gap-2">
              <Info className="h-4 w-4" />
              <span className="text-sm text-muted-foreground">
                Equipment needed:
              </span>
              {exercise.equipment.map((item) => (
                <Badge key={item} variant="outline">
                  <Dumbbell className="mr-1 h-3 w-3" />
                  {item}
                </Badge>
              ))}
            </div>
          </CardContent>
        </div>
      )}
    </div>
  );
}
