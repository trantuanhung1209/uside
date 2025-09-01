import { useEffect, useState } from "react";

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Format time to HH:MM:SS
  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return { hours, minutes, seconds };
  };

  // Format date to "Tue 19 August" format
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      day: 'numeric',
      month: 'long'
    };
    return date.toLocaleDateString('en-US', options);
  };

  const { hours, minutes } = formatTime(time);
  const formattedDate = formatDate(time);

  return (
    <>
      <div className=""> 
        <div className="text-center ">
          {/* Digital Clock Display */}
          <div className="digital-clock">
            <span className="time-digit">{hours.charAt(0)}</span>
            <span className="time-digit">{hours.charAt(1)}</span>
            <span className="time-separator">:</span>
            <span className="time-digit">{minutes.charAt(0)}</span>
            <span className="time-digit">{minutes.charAt(1)}</span>
          </div>
          
          {/* Date Display */}
          <div className="digital-date w-31">
            {formattedDate}
          </div> 
        </div>
      </div>
    </>
  );
};

export default Clock;
