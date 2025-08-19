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

  const { hours, minutes, seconds } = formatTime(time);

  return (
    <>
      <div className="digital-clock-container absolute top-[-50px] right-[190px]">
        <div className="digital-clock-wrapper">
          {/* Digital Clock Display */}
          <div className="digital-clock">
            <span className="time-digit">{hours.charAt(0)}</span>
            <span className="time-digit">{hours.charAt(1)}</span>
            <span className="time-separator">:</span>
            <span className="time-digit">{minutes.charAt(0)}</span>
            <span className="time-digit">{minutes.charAt(1)}</span>
            <span className="time-separator">:</span>
            <span className="time-digit">{seconds.charAt(0)}</span>
            <span className="time-digit">{seconds.charAt(1)}</span>
          </div>
          
          {/* Glow Effect Background */}
          <div className="clock-glow"></div>
          
          {/* Reflection Effect */}
          <div className="clock-reflection"></div>
        </div>
      </div>
    </>
  );
};

export default Clock;
