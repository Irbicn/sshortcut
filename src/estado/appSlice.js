import { createSlice } from "@reduxjs/toolkit";

import urlsAT, { read, edit, add, del } from "./urls.AT";
import userAT, { login, reg, verify } from "./user.AT";

export const initialAppState = {
  user: undefined,
  urls: [],
  editing: "",
  error: {},
};

const appSlice = createSlice({
  name: "app",
  initialState: initialAppState,
  reducers: {
    logout(state) {
      localStorage.clear();
      return initialAppState;
    },
  },
  extraReducers: { ...urlsAT, ...userAT },
});

export const appActions = {
  ...appSlice.actions,
  read,
  edit,
  add,
  del,
  login,
  reg,
  verify,
};

export const appSelectors = {
  urls: (state) => state.urls,
  user: (state) => state.user,
  loading: (state) => state.loading,
  error: (state) => state.error,
};

export default appSlice.reducer;
