import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  globalPosts: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    updatePosts: (state, action) => {
      state.globalPosts = action.payload;
    },
  },
});

export const { updatePosts } = postSlice.actions;

export default postSlice.reducer;
