import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "@/features/auth/model/slice";
import { adminAuthReducer } from "@/features/auth/model/adminSlice";
import { profileReducer } from "@/features/profile/model/slice";

import { rootApi } from "@/shared/api/rootApi";
import { authApi } from "@/features/auth/model/api";
import { adminAuthApi } from "@/features/auth/model/adminApi";

const rootReducer = combineReducers({
   auth: authReducer,
   admin: adminAuthReducer,
   profile: profileReducer,
   [authApi.reducerPath]: authApi.reducer,
   [adminAuthApi.reducerPath]: adminAuthApi.reducer,
   [rootApi.reducerPath]: rootApi.reducer,
});

export const store = configureStore({
   reducer: rootReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
         authApi.middleware,
         adminAuthApi.middleware,
         rootApi.middleware
      ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
