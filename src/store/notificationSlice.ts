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
    if (!("Notification" in window)) return false;

    try {
      const permission = await Notification.requestPermission();
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
      const reminderDate = new Date();
      reminderDate.setHours(hours, minutes, 0);

      if (reminderDate.getTime() < Date.now()) {
        reminderDate.setDate(reminderDate.getDate() + 1);
      }

      const timeUntilReminder = reminderDate.getTime() - Date.now();

      state.scheduledReminder = setTimeout(() => {
        sendNotification({
          title: "Workout Reminder",
          options: {
            body: "Time for your daily workout!",
            icon: "/fit-track/favicon.ico",
            requireInteraction: true,
          },
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
