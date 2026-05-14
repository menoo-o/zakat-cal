"use client"

import { useEffect, useState } from "react";

export default function HomePage() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/hello");
      const data = await res.json();

      setMessage(data.message);
    }

    fetchData();
  }, []);

  return (
    <h1>{message}</h1>
  );
}