import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit2 } from "lucide-react";
import { WorkoutPlan } from "./WorkoutPlanForm";

interface SavedWorkoutPlansTableProps {
  savedPlans: WorkoutPlan[];
  onEditPlan: (plan: WorkoutPlan) => void;
}

export function SavedWorkoutPlansTable({ savedPlans, onEditPlan }: SavedWorkoutPlansTableProps) {
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
                    <span>{plan.name}</span>
                    <Edit2 className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
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