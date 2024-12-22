import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { useDialog } from "@/hooks/use-dialog";
import { ExerciseLibraryDesktopDialog } from "./ExerciseLibraryDesktopDialog";

export function ExerciseLibraryButton() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const dialog = useDialog();

  const handleClick = () => {
    if (isMobile) {
      navigate("/exercises");
    } else {
      dialog.onOpen();
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        className="text-primary-700"
        onClick={handleClick}
      >
        <TrendingUp className="mr-2 h-4 w-4" /> View All
      </Button>

      {!isMobile && (
        <ExerciseLibraryDesktopDialog
          open={dialog.isOpen}
          onOpenChange={dialog.setIsOpen}
        />
      )}
    </>
  );
}
