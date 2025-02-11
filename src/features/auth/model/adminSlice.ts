import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AuthResponse } from "./types";

const initialState = {
   user: null as AuthResponse["user"] | null,
   isAuthenticated: false,
   isAdmin: false, // Добавляем флаг админа
   isLoading: false,
   error: null as string | null,
};

const adminAuthSlice = createSlice({
   name: "admin",
   initialState,
   reducers: {
      setAdminCredentials: (
         state,
         action: PayloadAction<AuthResponse["user"]>
      ) => {
         console.log("action.payload", action.payload);
         state.user = action.payload;
         state.isAuthenticated = true;
         state.isAdmin = action.payload?.admin;
      },
      adminLogout: (state) => {
         Object.assign(state, initialState);
         localStorage.removeItem("access_token");
      },
      setAdminAuthError: (state, action: PayloadAction<string>) => {
         state.error = action.payload;
      },
   },
});

export const { setAdminCredentials, adminLogout, setAdminAuthError } =
   adminAuthSlice.actions;
export const adminAuthReducer = adminAuthSlice.reducer;
