import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { initialAppState } from "./appSlice";

export const login = createAsyncThunk("acount/access", ({ name, password }) =>
  axios.post("acount/access", { name, password })
);
export const reg = createAsyncThunk(
  "acount/register",
  ({ name, password, email }) =>
    axios.post("acount/register", { name, password, email })
);

export const verify = createAsyncThunk("account/verify", () =>
  axios.get("acount/verify")
);

const handleError = (state, { error }) => {
  return { ...state, loading: "", error };
};

export default {
  [login.fulfilled](state, { payload }) {
    state.loading = "";
    state.user = payload.user;
    localStorage.setItem("ELTOKEN", payload.token);
  },
  [login.rejected]: handleError,
  [reg.fulfilled](state, { payload }) {
    state.loading = "";
    state.user = payload.user;
    localStorage.setItem("ELTOKEN", payload.token);
  },
  [reg.rejected]: handleError,
  [verify.fulfilled](state, { payload }) {
    state.loading = "";
    state.user = payload;
  },
  [verify.rejected]: handleError,
};
