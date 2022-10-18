import { useEffect, useState } from "react";

import UrlCard from "./UrlCard";
export default function Urls({ urls }) {
  return (
    <section className="d-grid gap-3 container justify-content-center py-3">
      {urls.map((url) => (
        <UrlCard key={url.short} url={url} />
      ))}
    </section>
  );
}
