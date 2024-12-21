import { Button } from "@/components/ui/button";
import { CircularTimer } from "./CircularTimer";
import { Pause, Play, SkipForward, Timer } from "lucide-react";

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
    <div className="flex flex-col items-center w-full h-full min-h-[calc(100vh-120px)] sm:min-h-[400px]">
      <div className="flex-1 flex items-center justify-center w-full">
        <div className="flex flex-col items-center space-y-4">
          <div className="scale-150">
            <CircularTimer value={restTimeLeft} maxValue={60} />
          </div>
          <div className="text-lg text-white/80">Rest Time</div>
        </div>
      </div>
      
      <div className="flex justify-center gap-2 w-full px-4 pb-4">
        <Button
          onClick={onToggleTimer}
          variant="secondary"
          className="bg-white/10 hover:bg-white/20 text-white flex-1 sm:flex-none h-14"
        >
          {isTimerPaused ? (
            <>
              <Play className="mr-2" />
              Resume
            </>
          ) : (
            <>
              <Pause className="mr-2" />
              Pause
            </>
          )}
        </Button>
        <Button
          onClick={onExtendTime}
          variant="secondary"
          className="bg-white/10 hover:bg-white/20 text-white flex-1 sm:flex-none h-14"
        >
          <Timer className="mr-2" />
          +30s
        </Button>
        <Button
          onClick={onSkipRest}
          variant="secondary"
          className="bg-white/10 hover:bg-white/20 text-white flex-1 sm:flex-none h-14"
        >
          <SkipForward className="mr-2" />
          Skip
        </Button>
      </div>
    </div>
  );
}