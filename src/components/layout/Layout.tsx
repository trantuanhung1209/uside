import React from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import FloatingStepProgress from "./FloatingStepProgress";
import { ChangeAccentColor } from "../ui";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <>
      {!isHomePage && <Header />}
      <div className="flex">
        {isHomePage && (
          <div className="sticky left-2 top-1/2 z-50 transition-all duration-700 ease-out">
            <FloatingStepProgress />
          </div>
        )}
        <main>{children}</main>
      </div>
      <Footer />

      {/* Change Accent Color - Floating button available on all pages */}
      <ChangeAccentColor />
    </>
  );
};

export default Layout;
