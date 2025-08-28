import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  HomePage,
  AboutPage,
  DirectionPage,
  DirectionDetailPage,
  NewsPage,
  NewsDetailPage,
  ContactPage,
  DashboardPage,
  AdminLoginPage,
} from "./pages";
import NotFoundPage from "./pages/NotFoundPage";
import {
  RobotImageLoader,
  FloatingMusicControl,
  FirebaseErrorBoundary,
  ProtectedRoute,
} from "./components/ui";
import { useAppLoading } from "./hooks";
import { MusicProvider } from "./contexts/MusicContext";
import AccentColorProvider from "./contexts/AccentColorContext";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";
import { NewsNotificationProvider } from './contexts/NewsNotificationContext';
import { ReadNewsProvider } from './contexts/ReadNewsContext';
import QuickPushNews from "./components/examples/QuickPushNews";
import FirebaseDebug from "./components/debug/FirebaseDebug";

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
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />
        <Route path="/debug" element={<FirebaseDebug />} />
        {/* Route 404 */}
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/firestore" element={<QuickPushNews />} />
      </Routes>
    </Router>
  );
};

const App: React.FC = () => {
  const { isLoading } = useAppLoading({
    minimumLoadingTime: 3500,
    delayBeforeStart: 0,
  });

  const handleLoadingComplete = () => {
    console.log("🤖 Robot đã hoàn thành việc mở màn!");
  };

  return (
    <AccentColorProvider>
      <AdminAuthProvider>
        <MusicProvider>
          <RobotImageLoader
            isVisible={isLoading}
            onComplete={handleLoadingComplete}
            duration={3500}
            robotImage="/images_uside/pet_uside_dark.png"
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
