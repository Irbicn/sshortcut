import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { appActions, appSelectors } from "../estado/appSlice";

export default function Header() {
  const { pathname } = useLocation();
  const ref = useRef();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const user = useSelector(appSelectors.user);
  if (ref.current && show) ref.current.focus();
  const logout = () => {
    dispatch(appActions.logout());
  };

  if (pathname === "/") return <></>;
  return (
    <header className="p-3 bg-dark ">
      <nav className="nav navbar-dark justify-content-between">
        <span
          className="navbar-brand"
          style={{ margin: 0, fontSize: "25px", fontWeight: "bold" }}
        >
          S-Shortcut
        </span>
        <div className="dropstart show">
          <button
            type="button"
            className="btn btn-secondary dropdown-toggle"
            onClick={() => setShow(!show)}
          >
            {user.name}
          </button>
          <ul
            onBlur={() => setShow(false)}
            className="dropdown-menu show"
            style={{ position: "absolute", right: "100%", top: "0" }}
            hidden={!show}
          >
            <li>
              <button disabled type="button" className="dropdown-item">
                Cuenta
              </button>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <button className="dropdown-item" onClick={logout}>
                Salir
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
