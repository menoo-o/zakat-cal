import { useCallback, useEffect, useRef, useState } from "react";

type ProgressState = "idle" | "loading" | "complete" | "error";

interface UseProgressBarOptions {
  /** Minimum simulated progress increment per tick (default: 2) */
  minIncrement?: number;
  /** Maximum simulated progress increment per tick (default: 8) */
  maxIncrement?: number;
  /** Tick interval in ms (default: 200) */
  tickInterval?: number;
  /** Max progress before manual complete() is called (default: 90) */
  ceiling?: number;
  /** How long the bar stays visible after complete (default: 400ms) */
  completeDuration?: number;
}

interface UseProgressBarReturn {
  progress: number;
  state: ProgressState;
  start: () => void;
  complete: () => void;
  error: () => void;
  reset: () => void;
}

export function useProgressBar(
  options: UseProgressBarOptions = {}
): UseProgressBarReturn {
  const {
    minIncrement = 2,
    maxIncrement = 8,
    tickInterval = 200,
    ceiling = 90,
    completeDuration = 400,
  } = options;

  const [progress, setProgress] = useState(0);
  const [state, setState] = useState<ProgressState>("idle");
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const completeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTick = () => {
    if (tickRef.current) {
      clearInterval(tickRef.current);
      tickRef.current = null;
    }
  };

  const clearCompleteTimer = () => {
    if (completeTimerRef.current) {
      clearTimeout(completeTimerRef.current);
      completeTimerRef.current = null;
    }
  };

  const start = useCallback(() => {
    clearTick();
    clearCompleteTimer();
    setProgress(0);
    setState("loading");

    // Small nudge to get the bar started immediately
    setProgress(3);

    tickRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= ceiling) {
          clearTick();
          return prev;
        }
        // Slow down as we approach ceiling — feels organic
        const remaining = ceiling - prev;
        const max = Math.min(
          maxIncrement,
          Math.max(minIncrement, remaining * 0.15)
        );
        const increment =
          minIncrement + Math.random() * (max - minIncrement);
        return Math.min(prev + increment, ceiling);
      });
    }, tickInterval);
  }, [ceiling, maxIncrement, minIncrement, tickInterval]);

  const complete = useCallback(() => {
    clearTick();
    setProgress(100);
    setState("complete");

    completeTimerRef.current = setTimeout(() => {
      setState("idle");
      setProgress(0);
    }, completeDuration + 300); // +300 for the exit animation
  }, [completeDuration]);

  const error = useCallback(() => {
    clearTick();
    setState("error");
    completeTimerRef.current = setTimeout(() => {
      setState("idle");
      setProgress(0);
    }, 800);
  }, []);

  const reset = useCallback(() => {
    clearTick();
    clearCompleteTimer();
    setProgress(0);
    setState("idle");
  }, []);

  useEffect(() => {
    return () => {
      clearTick();
      clearCompleteTimer();
    };
  }, []);

  return { progress, state, start, complete, error, reset };
}
