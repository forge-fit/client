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
          <TableHead>Exercises</TableHead>
          <TableHead>Sets</TableHead>
          <TableHead>Reps</TableHead>
          <TableHead>Notes</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {savedPlans.map((plan, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{plan.name}</TableCell>
            <TableCell>{plan.exercises.map(ex => ex.name).join(", ")}</TableCell>
            <TableCell>
              {plan.exercises.map((ex, i) => (
                <div key={i} className="text-sm">{ex.sets}</div>
              ))}
            </TableCell>
            <TableCell>
              {plan.exercises.map((ex, i) => (
                <div key={i} className="text-sm">{ex.reps}</div>
              ))}
            </TableCell>
            <TableCell>
              {plan.exercises.map((ex, i) => (
                ex.notes && (
                  <div key={i} className="text-sm text-muted-foreground">{ex.notes}</div>
                )
              ))}
            </TableCell>
            <TableCell>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEditPlan(plan)}
                className="hover:bg-accent"
              >
                <Edit2 className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}