import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adCount: 0,
};

const adSlice = createSlice({
  name: "ad",
  initialState,
  reducers: {
    incrementAdCout: (state) => {
      state.adCount++;
    },
  },
});

export const { updateBalance } = adSlice.actions;

export default adSlice.reducer;
