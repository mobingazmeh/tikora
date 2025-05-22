import { useState, useEffect, useRef, useCallback } from "react";

/**
 * Represents a time object with hours, minutes, and seconds.
 */
interface Time {
  h: number;
  m: number;
  s: number;
}

/**
 * Converts a given number of seconds into an object containing hours, minutes, and seconds.
 * @param totalSeconds - The total number of seconds to convert.
 * @returns An object containing the converted hours, minutes, and seconds.
 */
const convertSecondsToTime = (totalSeconds: number): Time => {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return { h, m, s };
};

/**
 * Options for the useTimeCountDown hook.
 */
interface UseTimeCountDownOptions {
  /**
   * Whether the countdown should start automatically after mount. Defaults to false.
   */
  autoStart?: boolean;
}

/**
 * A custom React hook that provides a countdown timer with start, stop, and reset functionalities.
 * @param initialSeconds - The initial time in seconds for the countdown.
 * @param options - Optional settings for the countdown behavior.
 * @returns An object containing the current time, control functions, and status indicators.
 */
export const useTimeCountDown = (initialSeconds: number, options?: UseTimeCountDownOptions) => {
  const { autoStart = false } = options || {};
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(autoStart);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Decrements the remaining seconds by 1, ensuring it doesn't go below 0.
   */
  const tick = useCallback(() => {
    setSecondsLeft((prev) => Math.max(prev - 1, 0));
  }, []);

  useEffect(() => {
    if (isRunning && secondsLeft > 0) {
      intervalRef.current = setInterval(tick, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, secondsLeft, tick]);

  /**
   * Starts the countdown timer.
   */
  const start = useCallback(() => setIsRunning(true), []);

  /**
   * Stops the countdown timer.
   */
  const stop = useCallback(() => setIsRunning(false), []);

  /**
   * Resets the countdown timer to the initial value.
   */
  const reset = useCallback(() => {
    setIsRunning(autoStart);
    setSecondsLeft(initialSeconds);
  }, [initialSeconds, autoStart]);

  return {
    /** The current time in hours, minutes, and seconds. */
    time: convertSecondsToTime(secondsLeft),
    /** Function to start the countdown. */
    start,
    /** Function to stop the countdown. */
    stop,
    /** Function to reset the countdown to the initial value. */
    reset,
    /** Indicates whether the countdown has ended (reached zero). */
    isEnd: secondsLeft === 0,
    /** Indicates whether the countdown is at its initial state and not running. */
    isStart: secondsLeft === initialSeconds && !isRunning,
  };
};

// Usage Example:
// const { stop, start, reset, time, isEnd, isStart } = useTimeCountDown(120, { autoStart: true });