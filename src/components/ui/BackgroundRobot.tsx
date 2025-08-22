
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
          className="absolute top-1/2 right-10 transform -translate-y-1/2 w-32 h-40 opacity-30 hidden xl:block"
          style={{
            animation: "pulse 4s ease-in-out infinite",
          }}
        >
          <div
            className="w-full h-full relative"
            style={{
              background: "var(--color-background)",
              boxShadow:
                "-20px -20px 40px #FAFBFF, 20px 20px 40px rgba(22, 17, 29, 0.1)",
              borderRadius: "24px",
            }}
          >
            {/* Large robot details */}
            <div
              className="absolute top-4 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-2xl"
              style={{
                background: "var(--color-primary)",
                boxShadow:
                  "inset -10px -10px 20px #FAFBFF, inset 10px 10px 20px rgba(22, 17, 29, 0.1)",
              }}
            >
              <div className="absolute top-4 left-4 w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
              <div
                className="absolute top-4 right-4 w-4 h-4 bg-blue-400 rounded-full animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
              <div
                className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-2 rounded-full"
                style={{ background: "var(--color-accent)" }}
              ></div>
            </div>
          </div>
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
