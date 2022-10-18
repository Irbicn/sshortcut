import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import NotFound from "./NotFound";

export default function Redirect() {
  const url = useLoaderData();
  const [timer, setTimer] = useState(5);

  useEffect(() => {
    let contador = setInterval(() => {
      if (timer > 0) return setTimer(timer - 1);
      clearInterval(contador);
      if (url) window.location.href = url;
    }, 1000);
    return () => {
      clearInterval(contador);
    };
  });

  if (!url) return <NotFound />;

  return (
    <main className="d-flex flex-column text-center justify-content-center w-100 h-100">
      <h1>
        Seras redirigido en: <b>{timer}</b>
      </h1>
      {!timer && (
        <>
          <p>no te llevo a tu link?</p>
          <a href={url}>Apreta aqui para redireccionarte</a>
        </>
      )}
    </main>
  );
}

export const loader = async ({ params }) => {
  const { url } = params;
  return await axios.get("/url/get/" + url);
};
