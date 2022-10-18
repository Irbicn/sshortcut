import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../comps/Header";
import { appActions, appSelectors } from "../estado/appSlice";
import Urls from "./usuario/Urls";
import Urls_form from "./usuario/Urls_form";

export default function Usuario() {
  const urls = useSelector(appSelectors.urls);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(appActions.read());
  }, []);

  return (
    <main className="w-100 d-flex flex-column container pt-3">
      <Urls_form />
      <Urls urls={urls} />
    </main>
  );
}
