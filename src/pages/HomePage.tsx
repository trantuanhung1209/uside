import { Layout } from "../components/layout";
import { Section1, Section2, Section3, SectionHero } from "../components/pages";
import Title from "../components/ui/Title";

const HomePage: React.FC = () => {
  

  return (
    <Layout>
      {/* section-hero */}
      <SectionHero />

      {/* Section 1 - Animation Loop */}
      <Section1 />

      {/* section 2 - about*/}
      <Section2 />

      {/* section 3 - direction */}
            {/* section 3 - direction */}
      <section className="section-3 py-[80px]">
        <div className="container mx-auto">
          <Title title="Định hướng sinh viên" desc="Chúng tôi luôn hướng tới việc mang lại giá trị tốt nhất cho khách hàng." />

          <div className="inner-content">
            <Section3 />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
