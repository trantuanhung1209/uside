import { Layout } from "../components/layout";
import { Section1, Section2, Section3, SectionHero } from "../components/pages";
import Section4 from "../components/pages/home/Section4";
import Section5 from "../components/pages/home/Section5";
import Title from "../components/ui/Title";
import { NewsNotificationTrigger } from "../components/ui";
import { useScrollToTop } from "../hooks";
import { careerPaths } from "../data/careerPaths";
import { useState } from "react";

const HomePage: React.FC = () => {
  useScrollToTop();
  const [currentCareerIndex, setCurrentCareerIndex] = useState(0);

  return (
    <Layout>
      {/* Trigger thông báo tin tức */}
      <NewsNotificationTrigger />
      
      {/* section-hero */}
      <SectionHero />

      {/* Section 1 - Animation Loop */}
      <section id="section-1">
        <Section1 />
      </section>

      {/* section 4 - news */}
      <section id="section-2">
        <Section4 />
      </section>

      {/* section 3 - direction */}
      <section id="section-3" className="section-3 xl:py-[40px] xs:py-[20px]">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Title
            title="Các lĩnh vực hỗ trợ"
            desc="Chúng tôi cung cấp nhiều lĩnh vực hỗ trợ khác nhau để đáp ứng nhu cầu của bạn."
            link="direction"
          />

          <div className="inner-list-icon flex justify-center items-center gap-[40px]">
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
            <Section3 
              currentCareerIndex={currentCareerIndex}
              onCareerIndexChange={setCurrentCareerIndex}
            />
          </div>
        </div>
      </section>

      {/* section 2 - about*/}
      <section id="section-4">
        <Section2 />
      </section>

      {/* section 5 - FAQ */}
      <section id="section-5">
        <Section5 />
      </section>
    </Layout>
  );
};

export default HomePage;
