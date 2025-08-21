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
      <div className="digital-clock-container inline-block absolute top-10 right-10 z-[-1] xs:left-0 xs:top-10 xs:w-[50%] xs:scale-90 sm:top-0 md:w-[35%] md:translate-x-[196%] md:top-10 md:scale-100 lg:w-[26%] lg:translate-x-[200%]lg:right-10 xl:w-[30%] xl:right-[10px]  2xl:w-[40%] 2xl:top-0 2xl:scale-95 2xl:translate-x-0 3xl:w-[40%] 4xl:w-[35%] 5xl:w-[30%]"> 
        <div className="digital-clock-wrapper">
          {/* Digital Clock Display */}
          <div className="digital-clock">
            <span className="time-digit">{hours.charAt(0)}</span>
            <span className="time-digit">{hours.charAt(1)}</span>
            <span className="time-separator">:</span>
            <span className="time-digit">{minutes.charAt(0)}</span>
            <span className="time-digit">{minutes.charAt(1)}</span>
          </div>
          
          {/* Date Display */}
          <div className="digital-date time-digit">
            {formattedDate}
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
