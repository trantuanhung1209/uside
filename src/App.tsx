import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  HomePage,
  AboutPage,
  DirectionPage,
  DirectionDetailPage,
  NewsPage,
  NewsDetailPage,
  ContactPage,
  NewsManagementPage,
  AdminLoginPage,
  AdminPage,
  GuildManagementPage,
} from "./pages";
import NotFoundPage from "./pages/NotFoundPage";
import {
  RobotImageLoader,
  FloatingMusicControl,
  FirebaseErrorBoundary,
  ProtectedRoute,
} from "./components/ui";
import GuildSeeder from "./components/debug/GuildSeeder";
import { useAppLoading } from "./hooks";
import { MusicProvider } from "./contexts/MusicContext";
import AccentColorProvider from "./contexts/AccentColorContext";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";
import { NewsNotificationProvider } from './contexts/NewsNotificationContext';
import { ReadNewsProvider } from './contexts/ReadNewsContext';
import QuickPushNews from "./components/examples/QuickPushNews";
import FirebaseDebug from "./components/debug/FirebaseDebug";
import { preloader, lcpOptimizer } from "./utils/lcpOptimizer";
import { useEffect } from "react";
import OpportunitiesManagementPage from "./pages/OpportunitiesManagementPage";

// Component để quản lý thông báo và hiển thị chúng
const AppWithNotifications: React.FC = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/direction" element={<DirectionPage />} />
        <Route path="/direction/:id" element={<DirectionDetailPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:id" element={<NewsDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/news" element={
          <ProtectedRoute>
            <NewsManagementPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/guilds" element={
          <ProtectedRoute>
            <GuildManagementPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/opportunities" element={
          <ProtectedRoute>
            <OpportunitiesManagementPage />
          </ProtectedRoute>
        } />
        <Route path="/debug" element={<FirebaseDebug />} />
        <Route path="/guild-seeder" element={<GuildSeeder />} />
        {/* Route 404 */}
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/firestore" element={<QuickPushNews />} />
      </Routes>
    </Router>
  );
};

const App: React.FC = () => {
  // Optimize loading time for better LCP
  const optimizedLoadingTime = lcpOptimizer.reduceLoadingTime();
  
  // Ensure minimum loading time for robot visibility
  const robotDisplayTime = Math.max(optimizedLoadingTime, 2000); // Tối thiểu 2 giây để robot hiển thị
  
  const { isLoading } = useAppLoading({
    minimumLoadingTime: robotDisplayTime,
    delayBeforeStart: 0,
  });

  const handleLoadingComplete = () => {
    console.log("🤖 Robot đã hoàn thành việc mở màn!");
  };

  // Initialize LCP optimizations
  useEffect(() => {
    // Preload critical LCP resources immediately
    preloader.preloadLCPResources();
    
    // Optimize font loading to prevent LCP delays
    lcpOptimizer.optimizeFontLoading();
    
    // Apply initial animation optimizations
    lcpOptimizer.optimizeInitialAnimations();
    
    // Prefetch non-critical resources
    preloader.prefetchResources();
    
    // Mark the document as LCP optimized
    document.documentElement.classList.add('lcp-optimized');
    
    // Remove LCP optimization class after initial load
    const timer = setTimeout(() => {
      document.documentElement.classList.remove('lcp-optimized');
    }, robotDisplayTime + 500);

    return () => clearTimeout(timer);
  }, [robotDisplayTime]);

  return (
    <AccentColorProvider>
      <AdminAuthProvider>
        <MusicProvider>
          <RobotImageLoader
            isVisible={isLoading}
            onComplete={handleLoadingComplete}
            duration={robotDisplayTime}
          />

          <div
            className={`
              transition-all duration-1000 ease-out
              ${isLoading ? "opacity-0 scale-95" : "opacity-100 scale-100"}
            `}
          >
            <FirebaseErrorBoundary>
              <NewsNotificationProvider>
                <ReadNewsProvider>
                  <AppWithNotifications />
                </ReadNewsProvider>
              </NewsNotificationProvider>
            </FirebaseErrorBoundary>
          </div>

          {/* Floating Music Control - Available on all pages */}
          <FloatingMusicControl />
        </MusicProvider>
      </AdminAuthProvider>
    </AccentColorProvider>
  );
};

export default App;
