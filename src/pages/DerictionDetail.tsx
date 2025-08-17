import { BannerBreadcrumb } from "../components";
import { Layout } from "../components/layout";

interface CareerPath {
  id: string;
  title: string;
  description: string;
  image?: string; // Optional for future use
  icon: string;
  skills: string[];
  opportunities: string;
  gradient: string;
}

const careerPaths: CareerPath[] = [
  {
    id: "software-tester",
    title: "Software Tester",
    description:
      "Chuyên gia kiểm thử phần mềm, đảm bảo chất lượng và hiệu suất của các ứng dụng.",
    image: "/images_uside/career_software_tester.png",
    icon: "🔍",
    skills: [
      "Manual Testing",
      "Automation Testing",
      "API Testing",
      "Performance Testing",
    ],
    opportunities: "Nhu cầu cao trong các công ty công nghệ và dịch vụ số.",
    gradient: "from-blue-400 to-purple-500",
  },
  {
    id: "web-developer",
    title: "Web Developer",
    description:
      "Phát triển các ứng dụng web hiện đại với công nghệ tiên tiến.",
    image: "/images_uside/career_web_developer.png",
    icon: "💻",
    skills: ["HTML/CSS", "JavaScript", "React/Vue", "Node.js", "Database"],
    opportunities: "Cơ hội việc làm đa dạng từ startup đến tập đoàn lớn.",
    gradient: "from-green-400 to-blue-500",
  },
  {
    id: "app-developer",
    title: "App Developer",
    description: "Tạo ra các ứng dụng di động sáng tạo cho iOS và Android.",
    image: "/images_uside/career_app_developer.png",
    icon: "📱",
    skills: ["React Native", "Flutter", "Swift", "Kotlin", "UI/UX Design"],
    opportunities:
      "Thị trường mobile đang bùng nổ với triển vọng tăng trưởng mạnh.",
    gradient: "from-purple-400 to-pink-500",
  },
  {
    id: "designer",
    title: "UI/UX Designer",
    description: "Thiết kế trải nghiệm người dùng trực quan và thân thiện.",
    image: "/images_uside/career_ui_ux_designer.png",
    icon: "🎨",
    skills: ["Figma", "Adobe Creative Suite", "User Research", "Prototyping"],
    opportunities:
      "Vai trò quan trọng trong mọi dự án số hóa và chuyển đổi công nghệ.",
    gradient: "from-pink-400 to-red-500",
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    description:
      "Phân tích dữ liệu lớn để tạo ra những insights có giá trị cho doanh nghiệp.",
    image: "/images_uside/career_data_scientist.png",
    icon: "📊",
    skills: [
      "Python/R",
      "Machine Learning",
      "Statistics",
      "Data Visualization",
    ],
    opportunities: "Một trong những ngành hot nhất với mức lương hấp dẫn.",
    gradient: "from-cyan-400 to-blue-500",
  },
  {
    id: "devops-engineer",
    title: "DevOps Engineer",
    description:
      "Kết nối phát triển và vận hành, tự động hóa quy trình triển khai.",
    image: "/images_uside/career_devops_engineer.png",
    icon: "⚙️",
    skills: ["Docker", "Kubernetes", "AWS/Azure", "CI/CD", "Linux"],
    opportunities:
      "Nhu cầu cao trong thời đại cloud computing và microservices.",
    gradient: "from-orange-400 to-red-500",
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity Specialist",
    description: "Bảo vệ hệ thống và dữ liệu khỏi các mối đe dọa an ninh mạng.",
    image: "/images_uside/career_cybersecurity.png",
    icon: "🛡️",
    skills: [
      "Network Security",
      "Penetration Testing",
      "Incident Response",
      "Risk Assessment",
    ],
    opportunities:
      "Lĩnh vực quan trọng với sự phát triển mạnh mẽ của công nghệ.",
    gradient: "from-red-400 to-pink-500",
  },
  {
    id: "blockchain-developer",
    title: "Blockchain Developer",
    description: "Phát triển các ứng dụng phi tập trung và smart contracts.",
    image: "/images_uside/career_blockchain_developer.png",
    icon: "⛓️",
    skills: ["Solidity", "Web3.js", "Smart Contracts", "DeFi", "NFTs"],
    opportunities: "Công nghệ tương lai với nhiều cơ hội đột phá.",
    gradient: "from-yellow-400 to-orange-500",
  },
];

const DirectionDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const career = careerData.find((item) => item.id === id);

  return (
    <Layout>
      <BannerBreadcrumb
        pageName="Định hướng phát triển"
        image="/images_uside/banner_direction.png"
      />

      <section className="inner-about">
        <div className="container max-w-7xl mx-auto py-[60px]">
        </div>
      </section>
    </Layout>
  );
};

export default DirectionDetailPage;
