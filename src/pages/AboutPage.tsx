import { Layout } from '../components/layout';

const AboutPage: React.FC = () => {
  return (
    <Layout>
      <main className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Giới thiệu về USide
          </h1>
          
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Về chúng tôi</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              USide là không gian cá nhân của bạn - nơi bạn có thể khám phá, học hỏi và phát triển.
              Chúng tôi cam kết mang đến những trải nghiệm tốt nhất cho người dùng.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Với công nghệ React hiện đại và thiết kế responsive, USide được xây dựng 
              để đáp ứng mọi nhu cầu của bạn.
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default AboutPage;
