// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import type { AuthResponse } from "./types";

// const initialState = {
//    user: null as AuthResponse["user"] | null,
//    isAuthenticated: false,
//    isLoading: false,
//    error: null as string | null,
// };

// const authSlice = createSlice({
//    name: "auth",
//    initialState,
//    reducers: {
//       setCredentials: (state, action: PayloadAction<AuthResponse>) => {
//          state.user = action.payload.user;
//          state.isAuthenticated = true;
//       },
//       logout: (state) => {
//          state.user = null;
//          state.isAuthenticated = false;
//          localStorage.removeItem("access_token");
//       },
//       setAuthError: (state, action: PayloadAction<string>) => {
//          state.error = action.payload;
//       },
//    },
// });

// export const { setCredentials, logout, setAuthError } = authSlice.actions;
// export const authReducer = authSlice.reducer;

// 2. Обновляем authSlice.ts (добавляем обработку ролей)
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AuthResponse } from "./types";

const initialState = {
   userID: null as AuthResponse["user"] | null,
   isAuthenticated: false,
   isAdmin: false, // Добавляем флаг админа
   isLoading: false,
   error: null as string | null,
};

const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {
      setCredentials: (state, action: PayloadAction<AuthResponse["user"]>) => {
         console.log("action.payload user", action.payload);
         state.userID = action.payload;
         state.isAuthenticated = true;
         state.isAdmin = action.payload?.admin;
      },
      logout: (state) => {
         Object.assign(state, initialState);
         localStorage.removeItem("access_token");
      },
      setAuthError: (state, action: PayloadAction<string>) => {
         state.error = action.payload;
      },
   },
});

export const { setCredentials, logout, setAuthError } = authSlice.actions;
export const authReducer = authSlice.reducer;
