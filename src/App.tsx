import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  HomePage,
  AboutPage,
  DirectionPage,
  DirectionDetailPage,
  NewsPage,
  NewsDetailPage,
  ContactPage,
} from "./pages";
import NotFoundPage from "./pages/NotFoundPage";
import {
  RobotImageLoader,
  FloatingMusicControl,
} from "./components/ui";
import { useAppLoading } from "./hooks";
import { MusicProvider } from "./contexts/MusicContext";
import AccentColorProvider from "./contexts/AccentColorContext";
import { NewsNotificationProvider } from './contexts/NewsNotificationContext';
import { ReadNewsProvider } from './contexts/ReadNewsContext';

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
        {/* Route 404 */}
        <Route path="*" element={<NotFoundPage />} />
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
          <NewsNotificationProvider>
            <ReadNewsProvider>
              <AppWithNotifications />
            </ReadNewsProvider>
          </NewsNotificationProvider>
        </div>

        {/* Floating Music Control - Available on all pages */}
        <FloatingMusicControl />
      </MusicProvider>
    </AccentColorProvider>
  );
};

export default App;
