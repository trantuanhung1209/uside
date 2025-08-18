const BackgroundRobot = () => {
  return (
    <>
      {/* Animated Background Robots */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Robot 1 - Large floating robot */}
        <div
          className="absolute top-10 left-10 w-24 h-32 animate-bounce"
          style={{
            animationDuration: "3s",
            animationDelay: "0s",
          }}
        >
          <div
            className="w-full h-full relative transition-all duration-500 hover:scale-110"
            style={{
              background: "var(--color-background)",
              boxShadow:
                "-12px -12px 24px #FAFBFF, 12px 12px 24px rgba(22, 17, 29, 0.2)",
              borderRadius: "20px",
            }}
          >
            {/* Robot Head */}
            <div
              className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-2xl"
              style={{
                background: "var(--color-primary)",
                boxShadow:
                  "inset -8px -8px 16px #FAFBFF, inset 8px 8px 16px rgba(22, 17, 29, 0.15)",
              }}
            >
              {/* Eyes */}
              <div className="absolute top-3 left-2 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <div
                className="absolute top-3 right-2 w-3 h-3 bg-blue-500 rounded-full animate-pulse"
                style={{ animationDelay: "0.5s" }}
              ></div>
              {/* Antenna */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-1 h-4 bg-gray-400 rounded-full"></div>
              <div
                className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full animate-pulse"
                style={{ background: "var(--color-accent)" }}
              ></div>
            </div>

            {/* Robot Body */}
            <div
              className="absolute top-12 left-1/2 transform -translate-x-1/2 w-20 h-16 rounded-xl"
              style={{
                background: "var(--color-secondary)",
                boxShadow:
                  "inset -6px -6px 12px #FAFBFF, inset 6px 6px 12px rgba(22, 17, 29, 0.1)",
              }}
            >
              {/* Control Panel */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <div
                  className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"
                  style={{ animationDelay: "1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-red-400 rounded-full animate-pulse"
                  style={{ animationDelay: "2s" }}
                ></div>
              </div>
            </div>

            {/* Robot Arms */}
            <div
              className="absolute top-14 -left-2 w-6 h-3 rounded-lg animate-pulse"
              style={{
                background: "var(--color-background)",
                boxShadow:
                  "-4px -4px 8px #FAFBFF, 4px 4px 8px rgba(22, 17, 29, 0.15)",
              }}
            ></div>
            <div
              className="absolute top-20 -left-20 w-6 h-3 rounded-lg animate-pulse"
              style={{
                background: "var(--color-background)",
                boxShadow:
                  "-4px -4px 8px #FAFBFF, 4px 4px 8px rgba(22, 17, 29, 0.15)",
              }}
            ></div>
            <div
              className="absolute top-14 -right-2 w-6 h-3 rounded-lg animate-pulse"
              style={{
                background: "var(--color-background)",
                boxShadow:
                  "-4px -4px 8px #FAFBFF, 4px 4px 8px rgba(22, 17, 29, 0.15)",
                animationDelay: "1s",
              }}
            ></div>
          </div>
        </div>

        {/* Robot 2 - Medium robot with different animation */}
        <div
          className="absolute top-32 right-20 w-20 h-28"
          style={{
            animation: "float 4s ease-in-out infinite",
            animationDelay: "1s",
          }}
        >
          <div
            className="w-full h-full relative"
            style={{
              background: "var(--color-background)",
              boxShadow:
                "-10px -10px 20px #FAFBFF, 10px 10px 20px rgba(22, 17, 29, 0.18)",
              borderRadius: "16px",
            }}
          >
            {/* Robot Head */}
            <div
              className="absolute top-0 left-1/2 transform -translate-x-1/2 w-14 h-14 rounded-xl"
              style={{
                background: "var(--color-accent)",
                boxShadow:
                  "inset -6px -6px 12px rgba(255,255,255,0.3), inset 6px 6px 12px rgba(0, 210, 255, 0.3)",
              }}
            >
              {/* Visor */}
              <div
                className="absolute top-2 left-2 right-2 h-4 rounded-lg animate-pulse"
                style={{
                  background: "linear-gradient(90deg, #00d2ff, #3aefc4)",
                  animationDuration: "2s",
                }}
              ></div>
            </div>

            {/* Body with chest display */}
            <div
              className="absolute top-10 left-1/2 transform -translate-x-1/2 w-16 h-14 rounded-lg"
              style={{
                background: "var(--color-primary)",
                boxShadow:
                  "inset -4px -4px 8px #FAFBFF, inset 4px 4px 8px rgba(22, 17, 29, 0.1)",
              }}
            >
              {/* Screen */}
              <div className="absolute top-1 left-1 right-1 bottom-1 rounded-md bg-black flex items-center justify-center">
                <div className="text-xs text-green-400 animate-pulse font-mono">
                  01101
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Robot 5 - Large background robot */}
        <div
          className="absolute top-1/2 right-10 transform -translate-y-1/2 w-32 h-40 opacity-30"
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
