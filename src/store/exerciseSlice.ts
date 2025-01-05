import {
  createSlice,
  createAsyncThunk,
  createAction,
  PayloadAction,
} from "@reduxjs/toolkit";
import { ExerciseDto, ExerciseDtoBodyPartEnum } from "@forge-fit/server";
import { exercisesApi } from "@/api";

interface ExerciseState {
  exercises: ExerciseDto[];
  loading: boolean;
  error: string | null;
  selectedBodyPart: string;
}

const initialState: ExerciseState = {
  exercises: [],
  loading: false,
  error: null,
  selectedBodyPart: "all",
};

type GetExercisesParams = {
  offset?: number;
  limit?: number;
  search?: string;
  targetMuscle?: ExerciseDtoBodyPartEnum | "all";
};

// Async thunk for fetching exercises
export const fetchExercises = createAsyncThunk(
  "exercises/fetchExercises",
  async (getExercisesParams: GetExercisesParams, { rejectWithValue }) => {
    try {
      const { data } = await exercisesApi.exercisesControllerGetExercises(
        getExercisesParams.offset || undefined,
        getExercisesParams.limit || undefined,
        getExercisesParams.search || undefined,
        getExercisesParams.targetMuscle || undefined
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const setSelectedBodyPart = createAction<
  ExerciseDtoBodyPartEnum | "all"
>("exercise/setSelectedBodyPart");

const exerciseSlice = createSlice({
  name: "exercise",
  initialState,
  reducers: {
    setSelectedBodyPart: (
      state,
      action: PayloadAction<ExerciseDtoBodyPartEnum | "all">
    ) => {
      state.selectedBodyPart = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExercises.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExercises.fulfilled, (state, action) => {
        state.loading = false;
        state.exercises = action.payload;
      })
      .addCase(fetchExercises.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default exerciseSlice.reducer;
