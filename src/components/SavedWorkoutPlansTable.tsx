import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit2, Trash2 } from "lucide-react";
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

interface SavedWorkoutPlansTableProps {
  savedPlans: WorkoutPlan[];
  onEditPlan: (plan: WorkoutPlan) => void;
  onDeletePlan: (plan: WorkoutPlan) => void;
}

export function SavedWorkoutPlansTable({ savedPlans, onEditPlan, onDeletePlan }: SavedWorkoutPlansTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Workout Name</TableHead>
          <TableHead>Exercise</TableHead>
          <TableHead>Sets</TableHead>
          <TableHead>Reps</TableHead>
          <TableHead>Notes</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {savedPlans.flatMap((plan, planIndex) =>
          plan.exercises.map((exercise, exerciseIndex) => (
            <TableRow key={`${planIndex}-${exerciseIndex}`}>
              <TableCell 
                className={`font-medium ${exerciseIndex === 0 ? "cursor-pointer hover:text-primary group" : ""}`}
                onClick={() => exerciseIndex === 0 ? onEditPlan(plan) : null}
              >
                {exerciseIndex === 0 ? (
                  <div className="flex items-center justify-between">
                    <span className="capitalize">{plan.name}</span>
                    <div className="flex items-center gap-2">
                      <Edit2 className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <AlertDialog>
                        <AlertDialogTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Trash2 className="h-4 w-4 text-destructive opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" />
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Workout Plan</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{plan.name}"? This action cannot be undone.
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
                ) : ""}
              </TableCell>
              <TableCell>{exercise.name}</TableCell>
              <TableCell>{exercise.sets}</TableCell>
              <TableCell>{exercise.reps}</TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {exercise.notes}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}