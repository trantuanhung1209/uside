
const BackgroundRobot = () => {
  return (
    <>
      {/* Animated Background Robots */}
      <div className="absolute inset-0 pointer-events-none">

        {/* Floating particles */}
        <div className="absolute inset-0">
          {/* Mobile: 50 particles, Desktop: 200 particles */}
          <div className="block md:hidden">
            {[...Array(50)].map((_, i) => (
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
          <div className="hidden md:block">
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
      </div>
    </>
  );
};

export default BackgroundRobot;
