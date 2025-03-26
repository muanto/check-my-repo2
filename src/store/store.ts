import { configureStore } from "@reduxjs/toolkit";
import checkMyRepoReducer from "./checkMyRepoSlice";

// Configura il negozio
const store = configureStore({
  reducer: {
    checkMyRepo: checkMyRepoReducer,
  },
});

// Esporta il negozio
export type RootState = ReturnType<typeof store.getState>;
export default store;
