import { Input } from "@/components/ui/input";

interface SetsRepsInputProps {
  sets: string;
  reps: string;
  onSetsChange: (value: string) => void;
  onRepsChange: (value: string) => void;
}

export function SetsRepsInput({
  sets,
  reps,
  onSetsChange,
  onRepsChange,
}: SetsRepsInputProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Input
        placeholder="Sets"
        className="no-arrows"
        type="number"
        value={sets}
        onChange={(e) => onSetsChange(e.target.value)}
      />
      <Input
        placeholder="Reps"
        className="no-arrows"
        type="number"
        value={reps}
        onChange={(e) => onRepsChange(e.target.value)}
      />
    </div>
  );
}