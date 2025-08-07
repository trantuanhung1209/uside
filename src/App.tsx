import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { 
  HomePage, 
  AboutPage, 
  DirectionPage, 
  NewsPage, 
  ContactPage 
} from './pages';
import { RobotImageLoader } from './components/ui';
import { useAppLoading } from './hooks';

const App: React.FC = () => {
  const { isLoading } = useAppLoading({
    minimumLoadingTime: 3500,
    delayBeforeStart: 0
  });

  const handleLoadingComplete = () => {
    console.log('🤖 Robot đã hoàn thành việc mở màn!');
  };

  return (
    <>
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
            <Route path="/lien-he" element={<ContactPage />} />
          </Routes>
        </Router>
      </div>
    </>
  );
};

export default App;
