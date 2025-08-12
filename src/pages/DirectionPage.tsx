import { BannerBreadcrumb } from '../components';
import { Layout } from '../components/layout';

const DirectionPage: React.FC = () => {
  return (
    <Layout>
      <BannerBreadcrumb
        pageName="Định hướng phát triển"
        image="/images_uside/banner_direction.png"
      />

      <section className="inner-about">
        <div className="container mx-auto py-[40px]">
          <h1 className="text-3xl font-bold text-text-primary mb-6">Định hướng phát triển</h1>
          <p className="text-text-secondary mb-4">
            USide là một nền tảng trực tuyến được thiết kế để cung cấp không gian cá nhân hóa cho người dùng, giúp họ quản lý công việc, học tập và giải trí một cách hiệu quả.
          </p>
          <p className="text-text-secondary mb-4">
            Chúng tôi cam kết mang đến trải nghiệm người dùng tốt nhất với giao diện thân thiện, tính năng đa dạng và bảo mật cao.
          </p>
          <p className="text-text-secondary">
            Hãy cùng khám phá những gì USide có thể mang lại cho bạn!
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default DirectionPage;
