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
          <div
            className="z-40 h-fit xs:ml-[-44px] sm:ml-0"
            style={{
              position: "fixed",
              left: "0.5rem",
              top: "50dvh",
              transform: "translateY(-50%)",
              willChange: "auto",
            }}
          >
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
