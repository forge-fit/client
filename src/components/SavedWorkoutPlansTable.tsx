import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit2, Trash2, Info } from "lucide-react";
import { WorkoutPlan } from "./WorkoutPlanForm";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";

interface SavedWorkoutPlansTableProps {
  savedPlans: WorkoutPlan[];
  onEditPlan: (plan: WorkoutPlan) => void;
  onDeletePlan: (plan: WorkoutPlan) => void;
}

export function SavedWorkoutPlansTable({
  savedPlans,
  onEditPlan,
  onDeletePlan,
}: SavedWorkoutPlansTableProps) {
  const isMobile = useIsMobile();

  const ExerciseDetailsDialog = ({ exercise }) => (
    <Dialog>
      <DialogTrigger className="text-left w-full hover:bg-accent/50 p-2 rounded-md transition-colors">
        <div className="flex items-center justify-between">
          <span>{exercise.name}</span>
          <Info className="h-4 w-4 text-muted-foreground" />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{exercise.name}</DialogTitle>
          <DialogDescription>Exercise Details</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm text-muted-foreground">Sets</div>
            <div>{exercise.sets}</div>
            <div className="text-sm text-muted-foreground">Reps</div>
            <div>{exercise.reps}</div>
            <div className="text-sm text-muted-foreground">Weight</div>
            <div>{exercise.weight.value} {exercise.weight.unit}</div>
          </div>
          {exercise.notes && (
            <div>
              <div className="text-sm text-muted-foreground mb-1">Notes</div>
              <div className="text-sm">{exercise.notes}</div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );

  if (isMobile) {
    return (
      <div className="space-y-6">
        {savedPlans.map((plan, planIndex) => (
          <div key={planIndex} className="rounded-lg overflow-hidden border">
            <div className="bg-primary p-4 flex items-center justify-between">
              <h3 className="text-white font-semibold capitalize">{plan.name}</h3>
              <div className="flex items-center gap-2">
                <Edit2
                  className="h-4 w-4 text-white cursor-pointer"
                  onClick={() => onEditPlan(plan)}
                />
                <AlertDialog>
                  <AlertDialogTrigger>
                    <Trash2 className="h-4 w-4 text-white" />
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Workout Plan</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete "{plan.name}"? This action
                        cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => onDeletePlan(plan)}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
            <div className="divide-y">
              {plan.exercises.map((exercise, exerciseIndex) => (
                <ExerciseDetailsDialog key={exerciseIndex} exercise={exercise} />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[800px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Exercise</TableHead>
              <TableHead>Sets</TableHead>
              <TableHead>Reps</TableHead>
              <TableHead>Weight</TableHead>
              <TableHead>Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {savedPlans.flatMap((plan, planIndex) =>
              plan.exercises.map((exercise, exerciseIndex) => (
                <TableRow key={`${planIndex}-${exerciseIndex}`}>
                  <TableCell
                    className={`font-medium ${
                      exerciseIndex === 0 ? "capitalize group" : ""
                    }`}
                  >
                    {exerciseIndex === 0 ? (
                      <div className="flex items-center justify-between">
                        <span
                          className="cursor-pointer hover:text-primary"
                          onClick={() => onEditPlan(plan)}
                        >
                          {plan.name}
                        </span>
                        <div className="flex items-center gap-2">
                          <Edit2
                            className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                            onClick={() => onEditPlan(plan)}
                          />
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Trash2 className="h-4 w-4 text-destructive opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" />
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Delete Workout Plan
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "{plan.name}"?
                                  This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => onDeletePlan(plan)}
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </TableCell>
                  <TableCell>{exercise.name}</TableCell>
                  <TableCell>{exercise.sets}</TableCell>
                  <TableCell>{exercise.reps}</TableCell>
                  <TableCell>
                    {exercise.weight.value} {exercise.weight.unit}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {exercise.notes}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}