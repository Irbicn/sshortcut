import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { appActions, appSelectors } from "../estado/appSlice";
import Loading from "./Loading";

export default function Verify({ children }) {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const user = useSelector(appSelectors.user);
  const logged = !!localStorage.getItem("ELTOKEN");

  useEffect(() => {
    if (logged && !user) dispatch(appActions.verify());
  }, [user]);

  if (!user && !logged && pathname !== "/") return <Navigate to="/" replace />;
  if (!user && logged) return <Loading />;
  if (user && logged && pathname === "/")
    return <Navigate to="/cuenta" replace />;

  return <>{children}</>;
}
