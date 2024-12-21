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
  nextButtonText,
}: WorkoutNavigationProps) {
  return (
    <div className="flex gap-2 w-full px-4">
      <Button
        onClick={onPrevious}
        disabled={isPreviousDisabled}
        variant="secondary"
        className="bg-white/10 hover:bg-white/20 text-white flex-1 sm:flex-none h-14"
      >
        <ChevronLeft className="mr-2" />
        Previous
      </Button>
      <Button
        onClick={onNext}
        variant="secondary"
        className="bg-white/10 hover:bg-white/20 text-white flex-1 sm:flex-none h-14"
      >
        {nextButtonText}
        <ChevronRight className="ml-2" />
      </Button>
    </div>
  );
}