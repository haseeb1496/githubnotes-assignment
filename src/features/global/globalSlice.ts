import { current } from "@reduxjs/toolkit";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface Global {
  publicGists: any[];
  searchInput: string;
  listView: boolean;
  isLoading: boolean;
  isLoggedIn: boolean;
  starredGists: any[];
}

const initialState: Global = {
  publicGists: [],
  searchInput: "",
  listView: true,
  isLoading: false,
  isLoggedIn: false,
  starredGists: [],
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setPublicGists: (state: Global, action: PayloadAction<[]>) => {
      state.publicGists = action.payload;
    },
    setSearchInput: (state: Global, action: PayloadAction<string>) => {
      state.searchInput = action.payload;
    },
    setListView: (state: Global, action: PayloadAction<boolean>) => {
      state.listView = action.payload;
    },
    setIsLoading: (state: Global, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setIsLoggedIn: (state: Global, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    addStarredGist: (state: Global, action: PayloadAction<string>) => {
      state.publicGists = state.publicGists.map((gist) =>
        gist["id"] === action.payload ? { ...gist, starredGist: true } : gist
      );
      state.starredGists.push(
        state.publicGists.find((gist) => gist["id"] === action.payload)
      );
    },
    removeStarredGist: (state: Global, action: PayloadAction<string>) => {
      state.publicGists = state.publicGists.map((gist) =>
        gist["id"] === action.payload ? { ...gist, starredGist: false } : gist
      );
      state.starredGists.splice(
        state.publicGists.findIndex((gist) => gist["id"] === action.payload),
        1
      );
    },
  },
});

export const {
  setPublicGists,
  setSearchInput,
  setListView,
  setIsLoading,
  setIsLoggedIn,
  addStarredGist,
  removeStarredGist,
} = globalSlice.actions;

export const selectPublicGists = (state: RootState) => state.global.publicGists;
export const selectSearchInput = (state: RootState) => state.global.searchInput;
export const selectListView = (state: RootState) => state.global.listView;
export const selectIsLoading = (state: RootState) => state.global.isLoading;
export const selectIsLoggedIn = (state: RootState) => state.global.isLoggedIn;
export const selectStarredGists = (state: RootState) =>
  state.global.starredGists;

export default globalSlice.reducer;
