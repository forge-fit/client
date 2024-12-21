import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface WorkoutNavigationProps {
  onPrevious: () => void;
  onNext: () => void;
  isPreviousDisabled: boolean;
  nextButtonText: string;
}

export function WorkoutNavigation({
  onPrevious,
  onNext,
  isPreviousDisabled,
  nextButtonText
}: WorkoutNavigationProps) {
  return (
    <div className="flex justify-between w-full">
      <Button
        variant="secondary"
        onClick={onPrevious}
        disabled={isPreviousDisabled}
        className="bg-white/10 hover:bg-white/20 text-white disabled:bg-white/5 disabled:text-white/50"
      >
        <ChevronLeft className="w-4 h-4 mr-2" />
        Previous
      </Button>
      <Button
        onClick={onNext}
        className="bg-white/10 hover:bg-white/20 text-white"
        variant="secondary"
      >
        {nextButtonText}
        <ChevronRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
}