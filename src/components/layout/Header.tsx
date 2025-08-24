import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import SearchInput from "../pages/home/SearchInput";
import { FaBars } from "react-icons/fa6";

const menu = [
  { name: "Trang chủ", link: "/" },
  { name: "Giới thiệu", link: "/about" },
  { name: "Định hướng", link: "/direction" },
  { name: "Tin tức", link: "/news" },
  { name: "Liên hệ", link: "/contact" },
];

// Apps/Websites data for popup
const appsData = [
  { name: "Gmail", icon: "📧", url: "https://gmail.com", color: "#EA4335" },
  { name: "YouTube", icon: "📺", url: "https://youtube.com", color: "#FF0000" },
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
  { name: "Twitter", icon: "🐦", url: "https://twitter.com", color: "#1DA1F2" },
  { name: "Spotify", icon: "🎵", url: "https://spotify.com", color: "#1DB954" },
];

const Header = () => {
  const [logoClicked, setLogoClicked] = useState(false);
  const [showAppsPopup, setShowAppsPopup] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const popupRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    setLogoClicked(true);
    setTimeout(() => setLogoClicked(false), 300);
    navigate("/");
  };

  const handleRobotClick = () => {
    setShowAppsPopup(!showAppsPopup);
  };

  // Handle scroll to hide/show header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Only hide header after scrolling more than 100px
      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY) {
          // Scrolling down - hide header
          setIsHeaderVisible(false);
        } else {
          // Scrolling up - show header
          setIsHeaderVisible(true);
        }
      } else {
        // Always show header when near top
        setIsHeaderVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  // Handle click outside to close popup and mobile menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setShowAppsPopup(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    if (showAppsPopup || isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showAppsPopup, isMobileMenuOpen]);

  return (
    <>
      <header
        className={`header border-b border-gray-200 bg-background shadow-sm sticky z-10 top-0 left-0 right-0 transition-transform duration-300 ease-in-out ${
          isHeaderVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inner-wrap flex items-center justify-between py-2 sm:py-2 md:py-3">
            {/* Logo */}
            <div
              className={`inner-logo flex items-center gap-2 md:gap-3 cursor-pointer ${
                logoClicked ? "clicked" : ""
              }`}
              onClick={handleLogoClick}
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-[48px] md:h-[48px] flex-shrink-0">
                <img
                  src="/images_uside/pet_cloud_uside.png"
                  className="w-full h-full object-contain scale-120 transition-transform duration-300"
                  alt="USide Logo"
                />
              </div>
              <div className="">
                <h1 className="text-base sm:text-lg md:text-xl text-text-primary font-bold inline-block">
                  Uside
                </h1>
                <p className="text-text-secondary text-xs md:text-sm sm:hidden md:block">
                  Tech Career Platform
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="inner-nav hidden xl:block">
              <ul className="flex items-center gap-1 xl:gap-2">
                {menu.map((item, index) => (
                  <li key={index}>
                    <NavLink
                      to={item.link}
                      end={item.link === "/"}
                      className={({ isActive }) =>
                        `px-2 py-1.5 rounded-lg text-sm xl:text-base transition-colors whitespace-nowrap   ${
                          isActive
                            ? "text-white font-semibold bg-color-accent active"
                            : "text-text-primary hover:text-color-accent hover:bg-gray-100"
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Right side buttons */}
            <div className="inner-buttons flex items-center gap-2 sm:gap-3 md:gap-6 xs:hidden xl:flex">
              {/* Search */}
              <SearchInput />

              {/* Apps button */}
              <div
                ref={popupRef}
                className="relative cursor-pointer"
                onClick={handleRobotClick}
              >
                <button
                  className={`robot-apps-button w-8 h-8 md:w-9 md:h-9 ${
                    showAppsPopup ? "active" : ""
                  }`}
                >
                  <img
                    src="/images_uside/pet_cloud_uside.png"
                    alt="Apps"
                    className="w-full h-full object-contain"
                  />
                  <div className="robot-button-glow"></div>
                </button>

                {/* Apps Popup */}
                {showAppsPopup && (
                  <div className="apps-popup absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border-border p-4 w-64 z-50 xs:scale-90">
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

            {/* Mobile Menu Button */}
            <div
              className="mobile-menu-button xl:hidden cursor-pointer section-neumorphic px-2 py-2 hover:text-accent"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <FaBars />
            </div>
          </div>
        </div>
      </header>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex">
          {/* Sidebar */}
          <div
            ref={mobileMenuRef}
            className="section-neumorphic w-64 sm:w-72 h-full shadow-lg p-4 flex flex-col gap-4 animate-slideIn"
          >
            {/* Header Mobile */}
            <div className="flex items-center justify-between">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={handleLogoClick}
              >
                <img
                  src="/images_uside/pet_cloud_uside.png"
                  alt="Uside Logo"
                  className="w-10 h-10 object-contain"
                />
                <span className="font-bold text-lg text-text-primary">
                  Uside
                </span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-md hover:bg-gray-100"
              >
                ✕
              </button>
            </div>

            {/* Search Input */}
            <div>
              <SearchInput />
            </div>

            {/* Nav Menu */}
            <nav className="overflow-y-auto">
              <ul className="flex flex-col gap-2">
                {menu.map((item, index) => (
                  <li key={index}>
                    <NavLink
                      to={item.link}
                      end={item.link === "/"}
                      className={({ isActive }) =>
                        `block px-3 py-2 rounded-md text-base transition-colors ${
                          isActive
                            ? "text-accent neumorphic-nav"
                            : "text-text-primary neumorphic-hover"
                        }`
                      }
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Apps quick links */}
            <div className="border-t pt-3">
              <h3 className="text-sm font-semibold text-gray-500 mb-2">
                Ứng dụng
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {appsData.map((app, index) => (
                  <a
                    key={index}
                    href={app.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="app-item flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 transition-colors text-center"
                  >
                    <span className="text-lg">{app.icon}</span>
                    <span className="text-xs font-semibold text-gray-500">{app.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
