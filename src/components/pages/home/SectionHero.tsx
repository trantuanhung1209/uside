import { useRef, useState } from "react";
import { SplineViewer } from "../../ui";
import BackgroundRobot from "../../ui/BackgroundRobot";
import Television from "./Television";
import BlockQuote from "./BlockQuote";
import Clock from "./Clock";
import Weather from "./Weather";

const SectionHero = () => {
  
  const popupRef = useRef<HTMLDivElement>(null);
  const [showAppsPopup, setShowAppsPopup] = useState(false);
  const handleRobotClick = () => {
    setShowAppsPopup(!showAppsPopup);
  };

  // Apps/Websites data for popup
  const appsData = [
    { name: "Gmail", icon: "📧", url: "https://gmail.com", color: "#EA4335" },
    {
      name: "YouTube",
      icon: "📺",
      url: "https://youtube.com",
      color: "#FF0000",
    },
    { name: "GitHub", icon: "🐙", url: "https://github.com", color: "#181717" },
    {
      name: "Facebook",
      icon: "📘",
      url: "https://facebook.com",
      color: "#1877F2",
    },
    {
      name: "Instagram",
      icon: "📷",
      url: "https://instagram.com",
      color: "#E4405F",
    },
    {
      name: "LinkedIn",
      icon: "💼",
      url: "https://linkedin.com",
      color: "#0A66C2",
    },
    {
      name: "Twitter",
      icon: "🐦",
      url: "https://twitter.com",
      color: "#1DA1F2",
    },
    {
      name: "Spotify",
      icon: "🎵",
      url: "https://spotify.com",
      color: "#1DB954",
    },
  ];

  return (
    <>
      <section
        id="hero"
        className="min-h-screen relative overflow-hidden border-b border-border pt-[200px] 5xl:mt-[-400px]"
        style={{ background: "var(--color-background)" }}
      >
        {/* Background overlay for readability */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(45deg, rgba(240, 241, 244, 0.3) 0%, rgba(240, 241, 244, 0.1) 50%, rgba(240, 241, 244, 0.3) 100%)",
          }}
        ></div>

        <BackgroundRobot />

        {/* Main Content */}
        <div className="relative z-10 container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:pb-[80px] pb-[40px]">
          <div className="inner-wrap grid grid-cols-1 2xl:grid-cols-2 gap-[40px]">
            {/* Hero Illustration/Image */}
            <Television />

            <div className="inner-left relative hidden 2xl:block">
              <SplineViewer
                url="https://prod.spline.design/ZXsHBKR839LKz3yn/scene.splinecode"
                className="w-full h-full"
              />

              {/* Robot overlay to hide Spline logo */}
              <div className="absolute bottom-4 right-4 z-50 3xl:right-0 2xl:bottom-[-20px]">
                <div
                  className="relative w-40 h-20 transition-all duration-300"
                  style={{
                    background: "var(--color-background)",
                    borderRadius: "16px",
                  }}
                >
                  {/* Robot Head */}
                  <div
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-xl"
                    style={{
                      background: "var(--color-primary)",
                      boxShadow:
                        "inset -4px -4px 8px #FAFBFF, inset 4px 4px 8px rgba(22, 17, 29, 0.15)",
                    }}
                  >
                    {/* Eyes */}
                    <div className="absolute top-2 left-2 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <div
                      className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full animate-pulse"
                      style={{ animationDelay: "0.5s" }}
                    ></div>
                    {/* Mouth */}
                    <div
                      className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-1 rounded-full"
                      style={{ background: "var(--color-accent)" }}
                    ></div>
                  </div>

                  {/* Robot Body */}
                  <div
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-8 rounded-lg"
                    style={{
                      background: "var(--color-secondary)",
                      boxShadow:
                        "inset -3px -3px 6px #FAFBFF, inset 3px 3px 6px rgba(22, 17, 29, 0.1)",
                    }}
                  >
                    {/* Control Panel */}
                    <div className="absolute top-1 left-1/2 transform -translate-x-1/2 flex gap-1">
                      <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
                      <div
                        className="w-1 h-1 bg-yellow-400 rounded-full animate-pulse"
                        style={{ animationDelay: "0.5s" }}
                      ></div>
                      <div
                        className="w-1 h-1 bg-red-400 rounded-full animate-pulse"
                        style={{ animationDelay: "1s" }}
                      ></div>
                    </div>
                  </div>

                  {/* Hover effect */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(45deg, var(--color-accent), #3aefc4)",
                    }}
                  ></div>

                  {/* Floating particle effect */}
                  <div
                    className="absolute -top-1 -right-1 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-300"
                    style={{ background: "var(--color-accent)" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side buttons */}
          <div className="absolute top-[-160px] right-[-40px] inner-buttons flex items-center gap-2 sm:gap-3 md:gap-[30px] border-gray-200 bg-background shadow-sm px-[20px] py-[8px] rounded-[20px] transition-all duration-300 hover:shadow-lg xl:right-[4%] xl:top-[-32%] lg:top-[-32%] lg:right-[4%] md:top-[-32%] md:right-[2%]sm:top-[-32%] sm:right-[4%] right-[4%]">
            {/* Search */}
            <div className="search-container relative group">
              <div
                className="search-wrapper relative rounded-2xl transition-all duration-300"
                style={{
                  background: "var(--color-secondary)",
                }}
              >
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  className="search-input w-full px-5 py-3 bg-transparent rounded-xl focus:outline-none transition-all duration-300 max-w-xs sm:max-w-sm"
                  style={{
                    color: "var(--color-text-primary)",
                    boxShadow:
                      "inset 4px 4px 8px rgba(0, 0, 0, 0.1), inset -6px -6px 12px rgba(255, 255, 255, 0.8)",
                  }}
                />
                <div
                  className="search-icon-wrapper absolute right-3 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:rotate-12 shadow-lg group-hover:shadow-xl"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--color-accent) 0%, var(--color-text-accent) 100%)",
                  }}
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: "rgba(255, 255, 255, 0.2)",
                    }}
                  ></div>
                </div>

                {/* Decorative elements */}
                <div
                  className="absolute -top-1 -left-1 w-3 h-3 rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--color-accent) 0%, #ff6b6b 100%)",
                  }}
                ></div>
                <div
                  className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)",
                  }}
                ></div>

                {/* Floating particles effect */}
                <div
                  className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                  style={{
                    background: "var(--color-accent)",
                    transform: "translate(-50%, -50%)",
                    animation: "floatUp 2s ease-in-out infinite",
                  }}
                ></div>
              </div>
            </div>

            {/* Apps button */}
            <div
              ref={popupRef}
              className="relative cursor-pointer top-0 right-0 z-50"
              onClick={handleRobotClick}
            >
              <button
                className={`robot-apps-button w-8 h-8 md:w-10 md:h-10 ${
                  showAppsPopup ? "active" : ""
                }`}
              >
                <img
                  src="/images_uside/pet_uside_light.png"
                  alt="Apps"
                  className="w-full h-full object-contain"
                />
                <div className="robot-button-glow"></div>
              </button>

              {/* Apps Popup */}
              {showAppsPopup && (
                <div className="apps-popup absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border-border p-4 w-64 z-50">
                  <div className="apps-popup-arrow absolute -top-2 right-4 w-4 h-4 bg-white border-l border-t border-border transform rotate-45"></div>
                  <div className="apps-grid grid grid-cols-4 gap-3">
                    {appsData.map((app, index) => (
                      <a
                        key={index}
                        href={app.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="app-item flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 transition-colors text-center"
                        style={
                          { "--app-color": app.color } as React.CSSProperties
                        }
                        title={app.name}
                      >
                        <span className="app-icon text-lg mb-1">
                          {app.icon}
                        </span>
                        <span className="app-name text-xs text-gray-600">
                          {app.name}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Inner Quote */}
          <BlockQuote />

          {/* Clock */}
          <Clock />

          {/* Weather */}
          <Weather />

        </div>
      </section>
    </>
  );
};

export default SectionHero;
