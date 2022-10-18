import React from "react";
import { Provider } from "react-redux";
import { Outlet } from "react-router-dom";
import Header from "../comps/Header";
import Verify from "../comps/Verify";
import store from "../estado/store";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Verify>
        <Header />
        <Outlet />
      </Verify>
    </Provider>
  );
}
