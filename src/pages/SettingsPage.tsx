import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setReminderTime } from "@/store/notificationSlice";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const SettingsPage = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [reminderTime, setReminderTimeState] = useState("12:00");

  const handleSave = () => {
    dispatch(setReminderTime(reminderTime));
    toast({
      title: "Daily reminder set",
      description: `Reminder set for ${reminderTime}`,
    });
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Daily Reminder Time:
        </label>
        <input
          type="time"
          value={reminderTime}
          onChange={(e) => setReminderTimeState(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <Button onClick={handleSave}>Save</Button>
    </div>
  );
};

export default SettingsPage;
