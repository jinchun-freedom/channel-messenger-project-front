// ** Redux Imports
import { createSlice } from "@reduxjs/toolkit";
import { ListType } from "definition";

const currentType: ListType = ListType.Create;
export const ChannelSlice = createSlice({
  name: "Channel",
  initialState: {
    currentType,
  },
  reducers: {
    handleChangeType: (state, action) => {
      state.currentType = action.payload;
    },
  },
});

export const { handleChangeType } = ChannelSlice.actions;
export default ChannelSlice.reducer;
