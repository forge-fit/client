import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
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
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {savedPlans.flatMap((plan, planIndex) =>
          plan.exercises.map((exercise, exerciseIndex) => (
            <TableRow key={`${planIndex}-${exerciseIndex}`}>
              {/* Only show workout name in the first row of each plan */}
              <TableCell className="font-medium">
                {exerciseIndex === 0 ? plan.name : ""}
              </TableCell>
              <TableCell>{exercise.name}</TableCell>
              <TableCell>{exercise.sets}</TableCell>
              <TableCell>{exercise.reps}</TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {exercise.notes}
              </TableCell>
              <TableCell>
                {/* Only show edit button in the first row of each plan */}
                {exerciseIndex === 0 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEditPlan(plan)}
                    className="hover:bg-accent"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}