import { useRef, useState, useEffect } from "react";
import { SplineViewer } from "../../ui";
import BackgroundRobot from "../../ui/BackgroundRobot";
import BlockQuote from "./BlockQuote";
import Television from "./Television";
import Clock from "./Clock";
import Weather from "./Weather";
import SearchInput from "./SearchInput";
import Extensions from "./Extensions";

const SectionHero = () => {
  const popupRef = useRef<HTMLDivElement>(null);
  const [showAppsPopup, setShowAppsPopup] = useState(false);

  const handleRobotClick = () => {
    setShowAppsPopup(!showAppsPopup);
  };

  // Handle click outside to close popup
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setShowAppsPopup(false);
      }
    };

    if (showAppsPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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
          <div className="flex items-center xs:flex-col xs:gap-[10px] xl:flex-row 4xl:justify-between pb-[20px] 3xl:justify-around relative">
            {/* Inner Quote */}
            <BlockQuote />

            {/* Right side buttons */}
            <div className="relative z-2 xs:order-1 xs:w-full md:block md:w-[80%] xl:order-2 3xl:w-[50%] 4xl:w-[40%]">
              <div className="flex items-center gap-2 border-gray-200 bg-background shadow-sm px-[10px] lg:px-[15px] lg:py-[6px] rounded-[20px] transition-all duration-300 hover:shadow-lg">
                <div className="search-container relative group flex-1">
                  <div
                    className="search-wrapper relative rounded-2xl transition-all duration-300 "
                    style={{
                      background: "var(--color-secondary)",
                    }}
                  >
                    <SearchInput />

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
                </div>
              </div>
            </div>

            {/* Apps Popup */}
            {showAppsPopup && (
              <div className="apps-popup absolute top-15 right-12 mt-2 bg-white rounded-lg shadow-lg border-border p-4 w-64 z-500 xs:scale-90 md:right-25 lg:right-30 xl:right-20 xl:scale-95 4xl:right-30 5xl:right-20">
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
                      <span className="app-icon text-lg mb-1">{app.icon}</span>
                      <span className="app-name text-xs text-gray-600">
                        {app.name}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between bg-background pb-[40px]">
            <div className="grid grid-cols-2 gap-4">
              <Weather />
              <Extensions />
            </div>
            <Clock />
          </div>
          <div className="inner-wrap grid grid-cols-2 justify-between">
            <div className="inner-left">
              <Television />
            </div>

            <div className="inner-right flex justify-end overflow-hidden relative">
              <div className="pr-[470px] translate-y-[-80px]">
                <SplineViewer
                url="https://prod.spline.design/ZXsHBKR839LKz3yn/scene.splinecode"
                className="w-0"
              />
              </div>
              <div className="w-30 h-20 bg-background absolute bottom-20 left-0 z-10"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SectionHero;
