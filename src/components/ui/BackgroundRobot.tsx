
const BackgroundRobot = () => {
  return (
    <>
      {/* Animated Background Robots */}
      <div className="absolute inset-0 pointer-events-none">

        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(200)].map((_, i) => (
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
