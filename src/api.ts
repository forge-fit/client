import { Configuration, ExercisesApi } from "@forge-fit/server";

console.log(import.meta.env.VITE_API_URL, "import.meta.env.VITE_API_URL");

export const exercisesApi = new ExercisesApi(
  new Configuration({
    basePath: import.meta.env.VITE_API_URL,
  })
);
