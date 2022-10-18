import React from "react";
import Ingresar from "./inicio/Ingresar";

export default function Inicio() {
  return (
    <div className="h-100 w-100 d-flex flex-column justify-content-center">
      <h1 className="text-center">S-Shortcut</h1>
      <p className="text-center">
        Te invitamos a que accedas a la app antes de poder crear tu propio link!
      </p>
      <Ingresar />
    </div>
  );
}
