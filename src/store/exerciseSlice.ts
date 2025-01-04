import { ExerciseDto } from "@forge-fit/server";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ExerciseState {
  exercises: ExerciseDto[];
}

const initialState: ExerciseState = {
  exercises: [],
};

export const exerciseSlice = createSlice({
  name: "exercise",
  initialState,
  reducers: {
    setExercises: (state, action: PayloadAction<ExerciseDto[]>) => {
      state.exercises = action.payload;
    },
  },
});

export const { setExercises } = exerciseSlice.actions;

export default exerciseSlice.reducer;
