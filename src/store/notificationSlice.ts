import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

interface NotificationState {
  reminderTime: string;
  scheduledReminder: NodeJS.Timeout | null;
  permission: NotificationPermission;
}

const initialState: NotificationState = {
  reminderTime: "12:00",
  scheduledReminder: null,
  permission: "default",
};

export const requestNotificationPermission = createAsyncThunk(
  "notification/requestPermission",
  async () => {
    if (!("Notification" in window)) {
      console.log("This browser does not support notifications");
      return false;
    }

    try {
      // For both desktop and mobile browsers
      const permission = await Notification.requestPermission();

      // If permission is already granted, register the service worker
      if (permission === "granted") {
        const registration = await navigator.serviceWorker.ready;
        console.log("Service Worker ready for notifications");
      }

      return permission === "granted";
    } catch (error) {
      console.error("Error requesting notification permission:", error);
      return false;
    }
  }
);

export const sendNotification = createAsyncThunk(
  "notification/send",
  async (
    { title, options }: { title: string; options?: NotificationOptions },
    { dispatch }
  ) => {
    if (!("Notification" in window)) return;

    if (Notification.permission !== "granted") {
      const result = await dispatch(requestNotificationPermission()).unwrap();
      if (!result) return;
    }

    const registration = await navigator.serviceWorker.ready;

    try {
      new Notification(title, {
        icon: "/fit-track/icons/icon-192x192.png",
        badge: "/fit-track/icons/icon-192x192.png",
        requireInteraction: true,
        ...options,
      });
    } catch (e) {
      await registration.showNotification(title, {
        icon: "/fit-track/icons/icon-192x192.png",
        badge: "/fit-track/icons/icon-192x192.png",
        requireInteraction: true,
        ...options,
      });
    }
  }
);

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setReminderTime: (state, action: PayloadAction<string>) => {
      state.reminderTime = action.payload;

      if (state.scheduledReminder) {
        clearTimeout(state.scheduledReminder);
      }

      const [hours, minutes] = action.payload.split(":").map(Number);
      const now = new Date();
      const reminderDate = new Date();
      reminderDate.setHours(hours, minutes, 0, 0); // Set seconds and ms to 0

      // Calculate time until reminder
      let timeUntilReminder = reminderDate.getTime() - now.getTime();

      // If time has passed today, try for today first if it's within 1 minute
      if (timeUntilReminder > -60000 && timeUntilReminder < 0) {
        // within last minute
        new Notification("Workout Reminder", {
          body: "Time for your daily workout!",
          icon: "/fit-track/favicon.ico",
          requireInteraction: true,
        });
      }

      // Schedule for tomorrow if time has passed
      if (timeUntilReminder < 0) {
        reminderDate.setDate(reminderDate.getDate() + 1);
        timeUntilReminder = reminderDate.getTime() - now.getTime();
      }

      state.scheduledReminder = setTimeout(() => {
        new Notification("Workout Reminder", {
          body: "Time for your daily workout!",
          icon: "/fit-track/favicon.ico",
          requireInteraction: true,
        });
        // Reschedule for next day
        setReminderTime(action.payload);
      }, timeUntilReminder);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      requestNotificationPermission.fulfilled,
      (state, action) => {
        state.permission = action.payload ? "granted" : "denied";
      }
    );
  },
});

export const { setReminderTime } = notificationSlice.actions;
export default notificationSlice.reducer;
