import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { 
  HomePage, 
  AboutPage, 
  DirectionPage, 
  NewsPage, 
  NewsDetailPage,
  ContactPage 
} from './pages';
import { RobotImageLoader, FloatingMusicControl } from './components/ui';
import { useAppLoading } from './hooks';
import { MusicProvider } from './contexts/MusicContext';

const App: React.FC = () => {
  const { isLoading } = useAppLoading({
    minimumLoadingTime: 3500,
    delayBeforeStart: 0
  });

  const handleLoadingComplete = () => {
    console.log('🤖 Robot đã hoàn thành việc mở màn!');
  };

  return (
    <MusicProvider>
      <RobotImageLoader 
        isVisible={isLoading} 
        onComplete={handleLoadingComplete}
        duration={3500}
        robotImage="/images_uside/pet_uside_dark.png"
      />
      
      <div className={`
        transition-all duration-1000 ease-out
        ${isLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
      `}>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/gioi-thieu" element={<AboutPage />} />
            <Route path="/dinh-huong" element={<DirectionPage />} />
            <Route path="/tin-tuc" element={<NewsPage />} />
            <Route path="/tin-tuc/:id" element={<NewsDetailPage />} />
            <Route path="/lien-he" element={<ContactPage />} />
          </Routes>
        </Router>
        
        {/* Floating Music Control - available on all pages */}
        <FloatingMusicControl />
      </div>
    </MusicProvider>
  );
};

export default App;
