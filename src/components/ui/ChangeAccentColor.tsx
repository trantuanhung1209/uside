const ChangeAccentColor = () => {
  return (
    <>
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
    </>
  );
};
export default ChangeAccentColor;
