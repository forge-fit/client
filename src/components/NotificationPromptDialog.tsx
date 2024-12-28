import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { requestNotificationPermission } from "@/store/notificationSlice";
import { RootState } from "@/store/store";

interface NotificationPromptDialogProps {
  open: boolean;
  onClose: () => void;
}

export function NotificationPromptDialog({
  open,
  onClose,
}: NotificationPromptDialogProps) {
  const dispatch = useAppDispatch();

  const handleEnable = async () => {
    if (Notification.permission === "granted" && open) {
      onClose();
      return null;
    }
    try {
      await dispatch(requestNotificationPermission()).unwrap();
      if (Notification.permission === "granted") {
        onClose();
      }
    } catch (error) {
      console.error("Error requesting notification permission:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <div className="flex flex-col items-center gap-4 py-4">
          <Bell className="h-12 w-12 text-primary" />
          <h2 className="text-xl font-semibold text-center">
            Stay on Track with Notifications
          </h2>
          <p className="text-center text-muted-foreground">
            Enable notifications to get daily workout reminders and track your
            fitness journey better.
          </p>
          <div className="flex gap-3 w-full">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Later
            </Button>
            <Button onClick={handleEnable} className="flex-1">
              Enable
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
