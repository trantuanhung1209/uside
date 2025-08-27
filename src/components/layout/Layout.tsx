import React from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import FloatingStepProgress from "./FloatingStepProgress";
import { ChangeAccentColor, NewsNotificationContainer } from "../ui";
import { useScrollToTop } from "../../hooks";
import { useNewsNotificationContext } from "../../hooks/useNewsNotificationContext";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const { notifications, removeNotification } = useNewsNotificationContext();
  
  // Tự động scroll lên đầu trang khi chuyển route
  useScrollToTop();

  return (
    <>
      {!isHomePage && <Header />}
      <div className={isHomePage ? "flex" : ""}>
        {isHomePage && (
          <div className="sticky left-2 top-1/2 z-50 transition-all duration-700 ease-out xs:ml-[-40px] sm:ml-0">
            <FloatingStepProgress />
          </div>
        )}
        <main className="overflow-x-hidden">{children}</main>
      </div>
      <Footer />

      {/* News Notification Container */}
      <NewsNotificationContainer 
        notifications={notifications}
        onRemoveNotification={removeNotification}
      />

      {/* Change Accent Color - Floating button available on all pages */}
      <div className={isHomePage ? "fixed top-28 right-2 lg:top-4 lg:right-4 z-10" : "fixed top-25 right-4 z-10"}>
        <ChangeAccentColor />
      </div>
    </>
  );
};

export default Layout;
