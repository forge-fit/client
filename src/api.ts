import { Configuration, ExercisesApi } from "@forge-fit/server";

export const exercisesApi = new ExercisesApi(
  new Configuration({
    basePath: import.meta.env.VITE_API_URL,
  })
);
