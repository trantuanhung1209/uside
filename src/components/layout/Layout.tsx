import React from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import FloatingStepProgress from "./FloatingStepProgress";
import { ChangeAccentColor } from "../ui";
import { useScrollToTop } from "../../hooks";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  
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
        <main className="overflow-hidden">{children}</main>
      </div>
      <Footer />

      {/* Change Accent Color - Floating button available on all pages */}
      <ChangeAccentColor />
    </>
  );
};

export default Layout;
