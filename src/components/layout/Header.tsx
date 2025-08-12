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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Handle click outside to close popup and mobile menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setShowAppsPopup(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (showAppsPopup || isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showAppsPopup, isMobileMenuOpen]);

  return (
    <>
      <header className="header border-b border-gray-200 bg-background shadow-sm sticky z-50 top-0 left-0 right-0">
        <div className="container mx-auto px-3">
          <div className="inner-wrap flex items-center justify-between py-2 sm:py-3 md:py-4">
            {/* Logo */}
            <div 
              className={`inner-logo flex items-center gap-2 md:gap-4 cursor-pointer ${logoClicked ? 'clicked' : ''}`}
              onClick={handleLogoClick}
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-[60px] md:h-[60px] flex-shrink-0">
                <img
                  src="/images_uside/uside_light.png"
                  className="w-full h-full object-contain"
                  alt="USide Logo"
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-base sm:text-lg md:text-2xl text-text-primary font-bold sm:hidden md:block">
                  Uside
                </h1>
                <p className="text-text-secondary text-xs md:text-sm sm:hidden md:block">
                  Your personal space
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
                      end={item.link === '/'}
                      className={({ isActive }) =>
                        `px-2 py-2 rounded-lg text-sm xl:text-base transition-colors whitespace-nowrap ${
                          isActive
                            ? 'text-white font-semibold bg-color-accent active'
                            : 'text-text-primary hover:text-color-accent hover:bg-gray-100'
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
            <div className="inner-buttons flex items-center gap-2 sm:gap-3 md:gap-[30px]">
              {/* Apps button */}
              <div 
                ref={popupRef}
                className="relative cursor-pointer"
                onClick={handleRobotClick}
              >
                <button className={`robot-apps-button w-8 h-8 md:w-10 md:h-10 ${showAppsPopup ? 'active' : ''}`}>
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
                          style={{ '--app-color': app.color } as React.CSSProperties}
                          title={app.name}
                        >
                          <span className="app-icon text-lg mb-1">{app.icon}</span>
                          <span className="app-name text-xs text-gray-600">{app.name}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Login button */}
              <button 
                className="neumorphic-button button-login px-3 py-2 md:px-6 md:py-2 text-sm md:text-base bg-color-accent text-white rounded-lg hover:bg-opacity-90 transition-all disabled:opacity-50 flex items-center gap-2"
                onClick={handleLoginClick}
                disabled={isLoading}
              >
                {isLoading && <div className="loading-spinner w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
                <span className="hidden sm:inline">{isLoading ? 'Đang xử lý...' : 'Đăng nhập'}</span>
                <span className="sm:hidden">{isLoading ? '...' : 'Login'}</span>
              </button>

              {/* Mobile menu button */}
              <button
                className="xl:hidden p-2 text-text-primary hover:text-color-accent transition-colors"
                onClick={toggleMobileMenu}
                aria-label="Toggle mobile menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div 
            ref={mobileMenuRef}
            className="xl:hidden border-t border-gray-200 bg-background"
          >
            <nav className="container mx-auto px-4 py-4">
              <ul className="space-y-2">
                {menu.map((item, index) => (
                  <li key={index}>
                    <NavLink
                      to={item.link}
                      end={item.link === '/'}
                      className={({ isActive }) =>
                        `block px-4 py-3 rounded-lg text-base transition-colors ${
                          isActive
                            ? 'text-white font-semibold bg-color-accent active'
                            : 'text-text-primary hover:text-color-accent hover:bg-gray-100'
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
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
