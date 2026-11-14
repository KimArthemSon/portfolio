import { useEffect, useState } from 'react';

function format(timeZone: string): string {
  try {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      timeZone,
    }).format(new Date());
  } catch {
    return '';
  }
}

/** Current time in the given IANA time zone (e.g. "2:14 PM"), refreshed every 15s. */
export function useLocalTime(timeZone: string): string {
  const [time, setTime] = useState(() => format(timeZone));

  useEffect(() => {
    setTime(format(timeZone));
    const timer = window.setInterval(() => setTime(format(timeZone)), 15_000);
    return () => window.clearInterval(timer);
  }, [timeZone]);

  return time;
}
