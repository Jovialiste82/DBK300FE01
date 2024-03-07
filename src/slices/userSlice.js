import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  username: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateBalance: (state, action) => {
      state.balance = action.payload;
    },
  },
});

export const { updateBalance } = userSlice.actions;

export default userSlice.reducer;
