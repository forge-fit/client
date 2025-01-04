import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, store } from "./store";

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
        icon: "/forge-fit/icons/icon-192x192.png",
        badge: "/forge-fit/icons/icon-192x192.png",
        requireInteraction: true,
        ...options,
      });
    } catch (e) {
      await registration.showNotification(title, {
        icon: "/forge-fit/icons/icon-192x192.png",
        badge: "/forge-fit/icons/icon-192x192.png",
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

      // Set time in local timezone
      reminderDate.setHours(hours, minutes, 0, 0);
      const localISOString = new Date(
        reminderDate.getTime() - reminderDate.getTimezoneOffset() * 60000
      ).toISOString();

      let timeUntilReminder = reminderDate.getTime() - now.getTime();

      // Schedule for tomorrow if time has passed
      if (timeUntilReminder < 0) {
        reminderDate.setDate(reminderDate.getDate() + 1);
        timeUntilReminder = reminderDate.getTime() - now.getTime();
      }

      // Store the next reminder time with timezone offset
      localStorage.setItem("nextReminderTime", localISOString);

      // Show immediately if within a minute
      if (Math.abs(timeUntilReminder) < 60000) {
        store.dispatch(
          sendNotification({
            title: "Workout Reminder",
            options: { body: "Time for your daily workout!" },
          })
        );
      }

      state.scheduledReminder = setTimeout(
        () =>
          store.dispatch(
            sendNotification({
              title: "Workout Reminder",
              options: { body: "Time for your daily workout!" },
            })
          ),
        timeUntilReminder
      );
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
