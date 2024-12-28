import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { exerciseGuides } from "@/data/exerciseGuides";
import { Alert } from "./ui/alert";
import { AlertTriangle, CheckCircle, Dumbbell, Info } from "lucide-react";
import { AlertDescription } from "./ui/alert";
import { CardContent } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";

export function ExerciseDialog() {
  const isMobile = useIsMobile();
  const { exerciseId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const exercise = exerciseGuides.find((e) => e.id === exerciseId);
  const isOpen = !!exerciseId;

  const handleClose = () => {
    const from = location.state?.from || "/";
    console.log(from, "from");
    if (from === "/exercises") {
      navigate("/exercises");
    } else {
      navigate("/");
    }
  };

  if (!exercise) return null;

  return (
    <Dialog open={isOpen} onOpenChange={() => handleClose()}>
      <DialogContent className="w-full max-w-2xl max-h-[100vh] overflow-y-auto">
        <div>
          <div className="flex flex-col justify-between pb-4">
            <h2 className="text-2xl font-bold">{exercise.name}</h2>
          </div>
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
                    <TabsTrigger value="alternatives">Alternatives</TabsTrigger>
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

                  <TabsContent value="alternatives">
                    <ScrollArea className="h-auto rounded-md border p-4">
                      <div className="space-y-4">
                        {exercise.alternatives.map((alternative, index) => (
                          <Alert key={index}>
                            <Info className="h-4 w-4" />
                            <AlertDescription>{alternative}</AlertDescription>
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
      </DialogContent>
    </Dialog>
  );
}
