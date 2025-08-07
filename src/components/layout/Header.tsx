import { NavLink } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

const menu = [
  { name: 'Trang chủ', link: '/' },
  { name: 'Giới thiệu', link: '/gioi-thieu' },
  { name: 'Định hướng', link: '/dinh-huong' },
  { name: 'Tin tức', link: '/tin-tuc' },
  { name: 'Liên hệ', link: '/lien-he' },
]

// Apps/Websites data for popup
const appsData = [
  { name: 'Gmail', icon: '📧', url: 'https://gmail.com', color: '#EA4335' },
  { name: 'YouTube', icon: '📺', url: 'https://youtube.com', color: '#FF0000' },
  { name: 'GitHub', icon: '🐙', url: 'https://github.com', color: '#181717' },
  { name: 'Facebook', icon: '📘', url: 'https://facebook.com', color: '#1877F2' },
  { name: 'Instagram', icon: '📷', url: 'https://instagram.com', color: '#E4405F' },
  { name: 'LinkedIn', icon: '💼', url: 'https://linkedin.com', color: '#0A66C2' },
  { name: 'Twitter', icon: '🐦', url: 'https://twitter.com', color: '#1DA1F2' },
  { name: 'Spotify', icon: '🎵', url: 'https://spotify.com', color: '#1DB954' },
]


const Header = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [logoClicked, setLogoClicked] = useState(false);
  const [showAppsPopup, setShowAppsPopup] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const handleLogoClick = () => {
    setLogoClicked(true);
    setTimeout(() => setLogoClicked(false), 300);
  };

  const handleLoginClick = () => {
    setIsLoading(true);
    // Simulate loading
    setTimeout(() => setIsLoading(false), 2000);
  };

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

  return (
    <>
      <header className="header shadow-md">
        <div className="container mx-auto px-4">
          <div className="inner-wrap flex items-center justify-between">
            <div 
              className={`inner-logo flex items-center gap-4 ${logoClicked ? 'clicked' : ''}`}
              onClick={handleLogoClick}
            >
              <div className="w-[60px] h-[60px]">
                <img
                  src="/images_uside/uside_light.png"
                  className="w-full h-full object-contain"
                  alt="USide Logo"
                />
              </div>
              <div>
                <h1 className="text-2xl text-text-primary font-bold">
                  Uside
                </h1>
                <p className="text-text-secondary text-sm">
                  Your personal space
                </p>
              </div>
            </div>
            <nav className="inner-nav">
              <ul className="flex items-center gap-2">
                {menu.map((item, index) => (
                  <li key={index}>
                    <NavLink
                      to={item.link}
                      className={({ isActive }) =>
                        `transition-colors ${
                          isActive
                            ? 'text-white font-semibold active'
                            : 'text-text-primary hover:text-color-accent'
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="inner-buttons flex items-center gap-[30px]">
              <div 
                ref={popupRef}
                className="relative cursor-pointer"
                onClick={handleRobotClick}
              >
                <button className={`robot-apps-button ${showAppsPopup ? 'active' : ''}`}>
                  <img src="/images_uside/pet_uside_light.png" alt="Apps" />
                  <div className="robot-button-glow"></div>
                </button>
                
                {/* Apps Popup */}
                {showAppsPopup && (
                  <div className="apps-popup">
                    <div className="apps-popup-arrow"></div>
                    <div className="apps-grid">
                      {appsData.map((app, index) => (
                        <a
                          key={index}
                          href={app.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="app-item"
                          style={{ '--app-color': app.color } as React.CSSProperties}
                          title={app.name}
                        >
                          <span className="app-icon">{app.icon}</span>
                          <span className="app-name">{app.name}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <button 
                className="neumorphic-button button-login"
                onClick={handleLoginClick}
                disabled={isLoading}
              >
                {isLoading && <div className="loading-spinner"></div>}
                {isLoading ? 'Đang xử lý...' : 'Đăng nhập'}
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
