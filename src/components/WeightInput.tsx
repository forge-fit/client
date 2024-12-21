import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface WeightInputProps {
  value: string;
  unit: string;
  onChange: (value: string, unit: string) => void;
}

export function WeightInput({ value, unit, onChange }: WeightInputProps) {
  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          placeholder="Weight"
          type="number"
          className="no-arrows"
          value={value}
          onChange={(e) => onChange(e.target.value, unit)}
        />
      </div>
      <ToggleGroup
        type="single"
        value={unit}
        onValueChange={(value) => {
          if (value) {
            onChange(value, value);
          }
        }}
        className="justify-start"
      >
        <ToggleGroupItem value="kg" aria-label="Toggle kg">
          kg
        </ToggleGroupItem>
        <ToggleGroupItem value="lbs" aria-label="Toggle lbs">
          lbs
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}