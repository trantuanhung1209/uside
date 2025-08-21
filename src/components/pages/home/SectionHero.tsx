import { useRef, useState, useEffect } from "react";
import { SplineViewer } from "../../ui";
import BackgroundRobot from "../../ui/BackgroundRobot";
import BlockQuote from "./BlockQuote";
import Television from "./Television";
import Clock from "./Clock";
import Weather from "./Weather";
import SearchInput from "./SearchInput";

const SectionHero = () => {
  const popupRef = useRef<HTMLDivElement>(null);
  const [showAppsPopup, setShowAppsPopup] = useState(false);
  
  const handleRobotClick = () => {
    setShowAppsPopup(!showAppsPopup);
  };

  // Handle click outside to close popup
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setShowAppsPopup(false);
      }
    };

    if (showAppsPopup) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showAppsPopup]);

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
        className="relative border-b border-border py-[40px]"
        style={{ background: "var(--color-background)" }}
      >
        <BackgroundRobot />

        {/* Main Content */}
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center xs:flex-col xs:gap-[10px] xl:flex-row 5xl:justify-between pb-[20px] 3xl:justify-around ">
            {/* Inner Quote */}
            <BlockQuote />

            {/* Right side buttons */}
            <div className="inline-block xs:order-1 xs:w-full xs:scale-80 md:block md:w-[80%] xl:order-2 3xl:w-[50%] 4xl:w-[40%]">
              <div className="flex items-center gap-2 border-gray-200 bg-background shadow-sm px-[20px] py-[8px] rounded-[20px] transition-all duration-300 hover:shadow-lg 5xl:scale-100 3xl:scale-95 2xl:scale-90 xl:scale-85">
                <div className="search-container relative group flex-1">
                  <div
                    className="search-wrapper relative rounded-2xl transition-all duration-300 "
                    style={{
                      background: "var(--color-secondary)",
                    }}
                  >
                    <SearchInput />
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
                    className={`robot-apps-button section-neumorphic w-8 h-8 md:w-10 md:h-10 ${
                      showAppsPopup ? "active" : ""
                    }`}
                    style={{
                      borderRadius: "50%",
                    }}
                  >
                    <img
                      src="/images_uside/pet_cloud_uside.png"
                      alt="Apps"
                      className="w-full h-full object-contain scale-[1.2]"
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
                              {
                                "--app-color": app.color,
                              } as React.CSSProperties
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
            </div>
          </div>
          <div className="inner-wrap grid grid-cols-2 sm:gap-[40px] xs:grid-cols-1 xs:gap-[10px] 2xl:grid-cols-2 2xl:gap-[20px]">
            <div className="inner-left relative order-2 xs:w-[90%] xs:scale-101 lg:w-[100%] lg:scale-100">
              <SplineViewer
                url="https://prod.spline.design/ZXsHBKR839LKz3yn/scene.splinecode"
                className="w-full h-full"
              />

              {/* Robot overlay to hide Spline logo */}
              <div className="absolute bottom-4 right-4 z-5 xs:scale-90 sm:scale-100 3xl:right-0 xs:bottom-[-16px] xs:right-[26%] xs:w-[20%] md:right-[15%] lg:right-[9%] xl:right-[5%] 2xl:bottom-[-20px] 2xl:right-[20%] 3xl:right-[20%] 4xl:right-[15%] 5xl:right-[10%]">
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

              <Clock />
              <Weather />
            </div>

            <div className="inner-right order-1">
              <Television />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SectionHero;
