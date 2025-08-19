import { NavLink, useNavigate } from 'react-router-dom';
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
    navigate('/');
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

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

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
      <header className={`header border-b border-gray-200 bg-background shadow-sm sticky z-50 top-0 left-0 right-0 transition-transform duration-300 ease-in-out ${
        isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

              {/* Search */}
              <div className="search-container relative group">
                <div className="search-wrapper relative rounded-2xl transition-all duration-300 hover:shadow-lg focus-within:shadow-lg"
                     style={{
                       background: 'var(--color-secondary)',
                     }}>
                  <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    className="search-input w-full px-5 py-3 bg-transparent rounded-2xl focus:outline-none transition-all duration-300 max-w-xs sm:max-w-sm"
                    style={{
                      color: 'var(--color-text-primary)',
                      boxShadow: 'inset 4px 4px 8px rgba(0, 0, 0, 0.1), inset -6px -6px 12px rgba(255, 255, 255, 0.8)'
                    }}
                  />
                  <div className="search-icon-wrapper absolute right-3 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:rotate-12 shadow-lg group-hover:shadow-xl"
                       style={{
                         background: 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-text-accent) 100%)',
                       }}>
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                         style={{
                           background: 'rgba(255, 255, 255, 0.2)'
                         }}></div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute -top-1 -left-1 w-3 h-3 rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                       style={{
                         background: 'linear-gradient(135deg, var(--color-accent) 0%, #ff6b6b 100%)'
                       }}></div>
                  <div className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                       style={{
                         background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)'
                       }}></div>
                  
                  {/* Floating particles effect */}
                  <div className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                       style={{
                         background: 'var(--color-accent)',
                         transform: 'translate(-50%, -50%)',
                         animation: 'floatUp 2s ease-in-out infinite'
                       }}></div>
                </div>
              </div>

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
