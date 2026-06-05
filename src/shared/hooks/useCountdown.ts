import { useEffect, useRef, useState } from 'react';

/**
 * Обратный отсчёт в секундах. Тикает раз в 100мс для плавности progress-бара.
 * Возвращает оставшееся время и управление (pause/resume/reset).
 */
export function useCountdown(
  totalSeconds: number,
  onFinish?: () => void,
  autoStart = true
) {
  const [remaining, setRemaining] = useState(totalSeconds * 1000);
  const [running, setRunning] = useState(autoStart);
  const endAtRef = useRef<number>(Date.now() + totalSeconds * 1000);
  const finishedRef = useRef(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      const left = Math.max(0, endAtRef.current - Date.now());
      setRemaining(left);
      if (left === 0 && !finishedRef.current) {
        finishedRef.current = true;
        setRunning(false);
        onFinish?.();
      }
    }, 100);
    return () => clearInterval(id);
  }, [running, onFinish]);

  const pause = () => {
    if (!running) return;
    setRunning(false);
    setRemaining(Math.max(0, endAtRef.current - Date.now()));
  };

  const resume = () => {
    if (running || finishedRef.current) return;
    endAtRef.current = Date.now() + remaining;
    setRunning(true);
  };

  const reset = (newSeconds = totalSeconds) => {
    finishedRef.current = false;
    endAtRef.current = Date.now() + newSeconds * 1000;
    setRemaining(newSeconds * 1000);
    setRunning(true);
  };

  return {
    seconds: Math.ceil(remaining / 1000),
    progress: remaining / (totalSeconds * 1000), // 1 → 0
    running,
    pause,
    resume,
    reset,
  };
}
