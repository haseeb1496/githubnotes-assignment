import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface Page {
  pageNumber: number;
  numberOfResults: number;
}

const initialState: Page = {
  pageNumber: 1,
  numberOfResults: 14,
};

export const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setPageNumber: (state: Page, action: PayloadAction<number>) => {
      state.pageNumber = action.payload;
    },
    setNumberOfResults: (state: Page, action: PayloadAction<number>) => {
      state.numberOfResults = action.payload;
    },
  },
});

export const { setPageNumber, setNumberOfResults } = pageSlice.actions;

export const selectPageNumber = (state: RootState) => state.page.pageNumber;
export const selectNumberOfResults = (state: RootState) =>
  state.page.numberOfResults;

export default pageSlice.reducer;
