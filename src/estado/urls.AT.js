import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { initialAppState } from "./appSlice";

export const read = createAsyncThunk("url/read", () => axios.get("url/read"));
export const edit = createAsyncThunk("url/edit", (payload) =>
  axios.post("url/update", payload)
);
export const add = createAsyncThunk("url/create", ({ origin }) =>
  axios.put("url/create", { origin })
);
export const del = createAsyncThunk("url/delete", ({ id }) =>
  axios.delete("url/delete", { data: { id } })
);

const handleError = (state, { error }) => {
  state.error = error;
  state.loading = "";
};
export default {
  [read.fulfilled](state, { payload }) {
    state.urls = payload;
  },
  [read.rejected]: handleError,
  [edit.fulfilled](state, { payload }) {
    const idx = state.urls.findIndex((url) => url.id === payload.id);
    state.urls[idx].origin = payload.origin;
    state.loading = "";
  },
  [edit.pending](state, { meta }) {
    state.loading = meta.arg.id;
  },
  [edit.rejected]: handleError,
  [add.fulfilled](state, { payload }) {
    state.urls.push(payload);
    state.loading = "";
  },
  [add.rejected]: handleError,
  [del.fulfilled](state, { payload }) {
    const idx = state.urls.findIndex((url) => url.id === payload.id);
    state.urls.splice(idx, 1);
    state.loading = "";
  },
  [del.rejected]: handleError,
};
