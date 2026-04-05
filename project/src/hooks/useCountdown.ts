import { useState, useEffect, useRef } from 'react';

export function useCountdown(
  endTime: string | Date | null,
  onComplete?: () => void
) {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    expired: !endTime,
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const hasCompleted = useRef(false);

  useEffect(() => {
    if (!endTime) {
      setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: true });
      return;
    }

    const updateCountdown = () => {
      const end = typeof endTime === 'string' ? new Date(endTime) : endTime;
      const now = new Date();
      const diff = end.getTime() - now.getTime();

      if (diff <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: true });
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        if (!hasCompleted.current && onComplete) {
          hasCompleted.current = true;
          onComplete();
        }
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds, expired: false });
    };

    updateCountdown();
    intervalRef.current = setInterval(updateCountdown, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [endTime, onComplete]);

  return countdown;
}
