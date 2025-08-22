
const BackgroundRobot = () => {
  return (
    <>
      {/* Animated Background Robots */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Robot 1 - Large floating robot */}
        <div
          className="absolute top-5 left-10 w-24 h-32 animate-bounce hidden 5xl:block"
          style={{
            animationDuration: "3s",
            animationDelay: "0s",
          }}
        >
          <img src="/images_uside/pet_cloud_uside.png" alt="" />
        </div>

        {/* Robot 5 - Large background robot */}
        <div
          className="absolute top-1/2 right-10 animate-bounce transform -translate-y-1/2 w-32 h-40 opacity-30 hidden xl:block"
          style={{
            animationDuration: "3s",
            animationDelay: "0s",
          }}
        >
          <img src="/images_uside/pet_cloud_uside.png" alt="" />
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(250)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full animate-ping"
              style={{
                background: "var(--color-accent)",
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
                opacity: 0.6,
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default BackgroundRobot;
