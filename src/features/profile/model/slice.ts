import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { UserProfile } from "./types";

const initialState: { user: UserProfile | null } = {
   user: null,
};

const profileSlice = createSlice({
   name: "profile",
   initialState,
   reducers: {
      setUserProfile: (state, action: PayloadAction<UserProfile>) => {
         state.user = action.payload;
      },
   },
});

export const { setUserProfile } = profileSlice.actions;
export const profileReducer = profileSlice.reducer;
