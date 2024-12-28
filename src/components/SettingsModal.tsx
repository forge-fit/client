import React, { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { setReminderTime } from "@/store/notificationSlice";
import { Button } from "@/components/ui/button";
import { Settings, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import { requestNotificationPermission } from "@/store/notificationSlice";

interface SettingsModalProps {
  onClose: () => void;
}

const SettingsModal = ({ onClose }: SettingsModalProps) => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const selectedReminderTime = useAppSelector(
    (state: RootState) => state.notification.reminderTime
  );
  const permission = useAppSelector(
    (state: RootState) => state.notification.permission
  );

  const [reminderTime, setReminderTimeState] = useState(selectedReminderTime);

  const handleSave = async () => {
    if (permission !== "granted") {
      const result = await dispatch(requestNotificationPermission()).unwrap();
      if (!result) {
        toast({
          title: "Notification Permission Required",
          description: "Please enable notifications to receive reminders",
          variant: "destructive",
        });
        return;
      }
    }

    dispatch(setReminderTime(reminderTime));
    toast({
      title: "Daily reminder set",
      description: `Reminder set for ${reminderTime}`,
    });
    onClose();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Settings className="h-6 w-6 text-foreground" />
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 pb-2">
          Daily Reminder Time:
        </label>
        <input
          type="time"
          value={reminderTime}
          onChange={(e) => setReminderTimeState(e.target.value)}
          onClick={(e) => (e.target as HTMLInputElement).showPicker()}
          className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="default" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default SettingsModal;
