import { configureStore } from "@reduxjs/toolkit";
import globalSlice from "../features/global/globalSlice";
import pageReducer from "../features/page/pageSlice";
import userSlice from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    page: pageReducer,
    user: userSlice,
    global: globalSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
