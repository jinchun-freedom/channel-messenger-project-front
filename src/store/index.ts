// ** Toolkit imports
import { configureStore } from "@reduxjs/toolkit";

// ** Reducers
import channel from "./channel";

export const store = configureStore({
  reducer: {
    channel,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
