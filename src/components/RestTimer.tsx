import { Button } from "@/components/ui/button";
import { FastForward, Pause, Play } from "lucide-react";
import { CircularTimer } from "./CircularTimer";

interface RestTimerProps {
  restTimeLeft: number;
  isTimerPaused: boolean;
  onToggleTimer: () => void;
  onExtendTime: () => void;
  onSkipRest: () => void;
}

export function RestTimer({
  restTimeLeft,
  isTimerPaused,
  onToggleTimer,
  onExtendTime,
  onSkipRest,
}: RestTimerProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <CircularTimer value={restTimeLeft} maxValue={60} />
        <div className="text-lg text-white/80">Rest Time</div>
      </div>
      <div className="flex justify-center gap-2 w-full px-4">
        <Button
          onClick={onToggleTimer}
          variant="secondary"
          className="bg-white/10 hover:bg-white/20 text-white flex-1 sm:flex-none"
        >
          {isTimerPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
        </Button>
        <Button
          onClick={onExtendTime}
          variant="secondary"
          className="bg-white/10 hover:bg-white/20 text-white flex-1 sm:flex-none"
        >
          <FastForward className="w-4 h-4 mr-2" />
          +30s
        </Button>
        <Button
          onClick={onSkipRest}
          variant="secondary"
          className="bg-white/10 hover:bg-white/20 text-white flex-1 sm:flex-none"
        >
          Skip Rest
        </Button>
      </div>
    </div>
  );
}