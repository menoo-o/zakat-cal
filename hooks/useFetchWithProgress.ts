import { useCallback, useState } from "react";
import { useProgressBar } from "./useProgressBar";

type FetchStatus = "idle" | "loading" | "success" | "error";

interface UseFetchWithProgressReturn<T> {
  data: T | null;
  status: FetchStatus;
  fetchData: (url: string, options?: RequestInit) => Promise<T | null>;
  progressProps: {
    progress: number;
    state: "idle" | "loading" | "complete" | "error";
  };
}

/**
 * Wraps a fetch call and automatically drives the progress bar.
 *
 * Usage:
 *   const { fetchData, data, status, progressProps } = useFetchWithProgress<User[]>();
 *
 *   // In layout:
 *   <TopProgressBar {...progressProps} />
 *
 *   // Trigger:
 *   await fetchData("/api/users");
 */
export function useFetchWithProgress<T = unknown>(): UseFetchWithProgressReturn<T> {
  const { progress, state, start, complete, error } = useProgressBar();

  // useState (not useRef) so that updates to data/status trigger a re-render
  // and the returned values are never stale.
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<FetchStatus>("idle");

  const fetchData = useCallback(
    async (url: string, options?: RequestInit): Promise<T | null> => {
      start();
      setStatus("loading");
      try {
        const res = await fetch(url, options);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = (await res.json()) as T;
        setData(json);
        setStatus("success");
        complete();
        return json;
      } catch (err) {
        setStatus("error");
        error();
        console.error("Fetch error:", err);
        return null;
      }
    },
    [start, complete, error]
  );

  return {
    data,
    status,
    fetchData,
    progressProps: { progress, state },
  };
}