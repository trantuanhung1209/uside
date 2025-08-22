import { Layout } from "../components/layout";
import { Section1, Section2, Section3, SectionHero } from "../components/pages";
import Section4 from "../components/pages/home/Section4";
import Section5 from "../components/pages/home/Section5";
import Title from "../components/ui/Title";
import { useScrollToTop } from "../hooks";

const HomePage: React.FC = () => {

  useScrollToTop()

  return (
    <Layout>
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
      <section id="section-3" className="section-3 2xl:py-[60px] xs:py-[40px]">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Title title="Định hướng sinh viên" desc="Chúng tôi luôn hướng tới việc mang lại giá trị tốt nhất cho khách hàng." link="dinh-huong" />

          <div className="inner-content">
            <Section3 />
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
