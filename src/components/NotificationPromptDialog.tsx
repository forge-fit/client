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
  const permission = useAppSelector(
    (state: RootState) => state.notification.permission
  );

  const handleEnable = async () => {
    const result = await dispatch(requestNotificationPermission()).unwrap();
    if (result || permission === "granted") {
      onClose();
    }
  };

  // Close dialog if permission is already granted
  if (permission === "granted" && open) {
    onClose();
    return null;
  }

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
