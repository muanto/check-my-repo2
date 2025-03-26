import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CheckMyRepoState {
  currentScreen: number;
  username: string;
  repositoryName: string;
}

const initialState: CheckMyRepoState = {
  currentScreen: 0,
  username: "",
  repositoryName: "",
};

const checkMyRepoSlice = createSlice({
  name: "check-my-repo",
  initialState,
  reducers: {
    restart: (state) => {
      state.currentScreen = 0;
      state.username = "";
      state.repositoryName = "";
    },
    nextScreen: (state) => {
      state.currentScreen += 1;
    },
    prevScreen: (state) => {
      state.currentScreen -= 1;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setRepositoryName: (state, action: PayloadAction<string>) => {
      state.repositoryName = action.payload;
    },
  },
});

export const {
  restart,
  nextScreen,
  prevScreen,
  setUsername,
  setRepositoryName,
} = checkMyRepoSlice.actions;

export default checkMyRepoSlice.reducer;
