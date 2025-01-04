import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import { CardContent } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Badge } from "./ui/badge";
import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import { Dumbbell, Info } from "lucide-react";

export function ExerciseDialog() {
  const isMobile = useIsMobile();
  const { exerciseId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isOpen = !!exerciseId;
  const exercise = useAppSelector(
    (state: RootState) => state.exercise.exercises
  ).find((e) => e.id === exerciseId);

  const handleClose = () => {
    const from = location.state?.from || "/";
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
            <h2 className="text-2xl font-bold">
              {exercise.name.split(" ").map((word) => (
                <span key={word}>
                  {word.charAt(0).toUpperCase() + word.slice(1)}{" "}
                </span>
              ))}
            </h2>
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="aspect-[16/9]  mb-4">
              <img
                src={exercise.gifUrl}
                className="w-full h-full"
                alt={exercise.name}
              />
            </div>
          </div>

          {isMobile ? (
            // Mobile Layout
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold">Steps</h3>
                <ol className="space-y-2">
                  {exercise.instructions.map((step, index) => (
                    <li key={index} className="flex gap-3 text-sm">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs">
                        {index + 1}
                      </div>
                      <p>{step}</p>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="pt-2">
                <div className="flex flex-wrap gap-1">
                  {exercise.equipment.split(",").map((item) => (
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
                <div className="w-full">
                  <ScrollArea className="h-auto rounded-md border p-4">
                    <ol className="space-y-4">
                      {exercise.instructions.map((step, index) => (
                        <li key={index} className="flex gap-3">
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border">
                            {index + 1}
                          </div>
                          <p>{step}</p>
                        </li>
                      ))}
                    </ol>
                  </ScrollArea>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Info className="h-4 w-4" />
                  <span className="text-sm text-muted-foreground">
                    Equipment needed:
                  </span>
                  {exercise.equipment.split(",").map((item) => (
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
