import { Layout } from "../components/layout";
import { LazySection, PreloadSection, SkeletonLoader } from "../components/ui";
import Title from "../components/ui/Title";
import { careerPaths } from "../data/careerPaths";
import { useState, lazy, useEffect } from "react";
import { NewsNotificationWelcome } from "../components";

// Lazy load các component nặng để tối ưu performance
const SectionHero = lazy(() => import("../components/pages/home/SectionHero"));
const Section1 = lazy(() => import("../components/pages/home/Section1"));
const Section2 = lazy(() => import("../components/pages/home/Section2"));
const Section3 = lazy(() => import("../components/pages/home/Section3"));
const Section4 = lazy(() => import("../components/pages/home/Section4"));
const Section5 = lazy(() => import("../components/pages/home/Section5"));

const HomePage: React.FC = () => {
  const [currentCareerIndex, setCurrentCareerIndex] = useState(0);

  // Scroll đến section 3 nếu có flag trong sessionStorage
  useEffect(() => {
    const scrollToSection = sessionStorage.getItem('homeScrollToSection');
    if (scrollToSection === 'section-3') {
      // Xóa flag để tránh scroll không mong muốn
      sessionStorage.removeItem('homeScrollToSection');
      
      // Delay một chút để đảm bảo component đã render
      setTimeout(() => {
        const section = document.getElementById('section-3');
        if (section) {
          section.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }
      }, 500);
    }
  }, []);

  return (
    <Layout>
      {/* Preload các component quan trọng */}
      <PreloadSection 
        componentLoader={() => import("../components/pages/home/Section1")}
        delay={1000}
      />
      <PreloadSection 
        componentLoader={() => import("../components/pages/home/Section4")}
        delay={1500}
      />
      <PreloadSection 
        componentLoader={() => import("../components/pages/home/Section3")}
        delay={1500}
      />
      
      <NewsNotificationWelcome />
      {/* section-hero */}
      <LazySection 
        threshold={0.1} 
        rootMargin="50px"
        fallback={<SkeletonLoader type="hero" />}
      >
        <SectionHero />
      </LazySection>

      {/* Section 1 - Animation Loop */}
      <LazySection 
        id="section-1" 
        threshold={0.2} 
        rootMargin="300px"
        fallback={<SkeletonLoader type="section" />}
      >
        <Section1 />
      </LazySection>

      {/* section 4 - news */}
      <LazySection 
        id="section-2" 
        threshold={0.1} 
        rootMargin="400px"
        fallback={<SkeletonLoader type="news" />}
      >
        <Section4 />
      </LazySection>

      {/* section 3 - direction */}
      <section id="section-3" className="section-3 xl:py-[40px] xs:py-[20px]">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Title
            title="Các lĩnh vực hỗ trợ"
            desc="Chúng tôi cung cấp nhiều lĩnh vực hỗ trợ khác nhau để đáp ứng nhu cầu của bạn."
            link="direction"
          />

          <div className="inner-list-icon flex justify-center items-center xl:gap-[40px] gap-[20px]">
            {careerPaths.map((career, index) => (
              <div 
                key={career.id} 
                className={`w-[40px] h-[40px] section-neumorphic p-2 py-2 cursor-pointer transition-all duration-300 ${
                  index === currentCareerIndex ? 'ring-2 ring-offset-2' : ''
                }`}
                style={{
                  background: index === currentCareerIndex 
                    ? 'var(--color-accent)' 
                    : 'var(--color-background)',
                  boxShadow: index === currentCareerIndex
                    ? `0 0 20px var(--color-accent), inset -2px -2px 4px rgba(255,255,255,0.8), inset 2px 2px 4px rgba(0,0,0,0.1)`
                    : 'inset -2px -2px 4px rgba(255,255,255,0.8), inset 2px 2px 4px rgba(0,0,0,0.1)'
                }}
                onClick={() => setCurrentCareerIndex(index)}
              >
                <img
                  src={career.icon}
                  alt={career.title}
                  className={`w-full h-full object-contain transition-all duration-300 ${
                    index === currentCareerIndex ? 'brightness-0 invert' : ''
                  }`}
                />
              </div>
            ))}
          </div>

          <div className="inner-content">
            <LazySection 
              threshold={0.3} 
              rootMargin="200px"
              fallback={<SkeletonLoader type="section" />}
            >
              <Section3 
                currentCareerIndex={currentCareerIndex}
                onCareerIndexChange={setCurrentCareerIndex}
              />
            </LazySection>
          </div>
        </div>
      </section>

      {/* section 2 - about*/}
      <LazySection 
        id="section-4" 
        threshold={0.1} 
        rootMargin="300px"
        fallback={<SkeletonLoader type="about" />}
      >
        <Section2 />
      </LazySection>

      {/* section 5 - FAQ */}
      <LazySection 
        id="section-5" 
        threshold={0.1} 
        rootMargin="200px"
        fallback={<SkeletonLoader type="faq" />}
      >
        <Section5 />
      </LazySection>
    </Layout>
  );
};

export default HomePage;
