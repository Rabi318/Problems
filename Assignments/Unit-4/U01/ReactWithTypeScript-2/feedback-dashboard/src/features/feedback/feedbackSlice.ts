import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { FeedbackEntry } from "./types";

interface FeedbackState {
  entries: FeedbackEntry[];
}

const initialState: FeedbackState = {
  entries: [],
};

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    addFeedback: (state, action: PayloadAction<FeedbackEntry>) => {
      state.entries.push(action.payload);
    },
  },
});

export const { addFeedback } = feedbackSlice.actions;
export default feedbackSlice.reducer;
