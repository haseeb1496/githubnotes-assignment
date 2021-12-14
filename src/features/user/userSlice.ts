import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface User {
  gists: [];
  info: {};
}

const initialState: User = {
  gists: [],
  info: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserGists: (state: User, action: PayloadAction<[]>) => {
      state.gists = action.payload;
    },
    setUserInfo: (state: User, action: PayloadAction<object>) => {
      state.info = action.payload;
    },
  },
});

export const { setUserGists, setUserInfo } = userSlice.actions;

export const selectUserGists = (state: RootState) => state.user.gists;
export const selectUserInfo = (state: RootState) => state.user.info;

export default userSlice.reducer;
