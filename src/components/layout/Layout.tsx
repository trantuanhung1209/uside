import React from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import FloatingStepProgress from "./FloatingStepProgress";
import { ChangeAccentColor, NewsNotificationContainer } from "../ui";
import { useNewsNotificationContext } from "../../hooks/useNewsNotificationContext";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const { notifications, removeNotification } = useNewsNotificationContext();

  return (
    <>
      {!isHomePage && <Header />}
      <div className={isHomePage ? "flex w-full overflow-x-hidden" : "w-full overflow-x-hidden"}>
        {isHomePage && (
          <div className="fixed left-2 top-1/2 z-40 h-fit -translate-y-1/2 transition-all duration-700 ease-out xs:ml-[-44px] sm:ml-0">
            <FloatingStepProgress />
          </div>
        )}
        <main className="min-w-0 flex-1 overflow-x-hidden">{children}</main>
      </div>
      <Footer />

      {/* News Notification Container */}
      <NewsNotificationContainer 
        notifications={notifications}
        onRemoveNotification={removeNotification}
      />

      {/* Change Accent Color - Floating button available on all pages */}
      <div className={isHomePage ? "fixed top-24 right-3 z-30 lg:top-4 lg:right-4" : "fixed top-24 right-3 z-30 lg:right-4"}>
        <ChangeAccentColor />
      </div>
    </>
  );
};

export default Layout;
