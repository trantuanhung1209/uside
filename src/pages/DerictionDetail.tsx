import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BannerBreadcrumb } from "../components";
import { Layout } from "../components/layout";

interface CareerPath {
  id: string;
  title: string;
  description: string;
  image?: string;
  icon: string;
  skills: string[];
  opportunities: string;
  gradient: string;
}

interface Question {
  id: number;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    percentage: number;
  }[];
  explanation: string;
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

const quizQuestionsByCareer: Record<string, Question[]> = {
  "software-tester": [
    {
      id: 1,
      question:
        "Theo bạn, điều quan trọng nhất trong việc kiểm thử phần mềm là gì?",
      options: [
        {
          id: "a",
          text: "Tìm ra càng nhiều bug càng tốt",
          isCorrect: false,
          percentage: 35,
        },
        {
          id: "b",
          text: "Đảm bảo chất lượng sản phẩm cuối cùng",
          isCorrect: true,
          percentage: 45,
        },
        {
          id: "c",
          text: "Hoàn thành test case nhanh nhất",
          isCorrect: false,
          percentage: 20,
        },
      ],
      explanation:
        "Mục tiêu chính của testing không chỉ là tìm bug mà là đảm bảo sản phẩm đáp ứng yêu cầu và mang lại trải nghiệm tốt cho người dùng.",
    },
    {
      id: 2,
      question: "Khi nào bạn nên sử dụng Automation Testing?",
      options: [
        {
          id: "a",
          text: "Khi cần test lặp đi lặp lại nhiều lần",
          isCorrect: true,
          percentage: 50,
        },
        {
          id: "b",
          text: "Ngay từ đầu dự án",
          isCorrect: false,
          percentage: 25,
        },
        {
          id: "c",
          text: "Chỉ khi có budget lớn",
          isCorrect: false,
          percentage: 25,
        },
      ],
      explanation:
        "Automation Testing hiệu quả nhất cho các test case cần chạy lặp đi lặp lại, regression testing, và các tác vụ tốn thời gian.",
    },
    {
      id: 3,
      question: "API Testing chủ yếu kiểm tra điều gì?",
      options: [
        {
          id: "a",
          text: "Giao diện người dùng",
          isCorrect: false,
          percentage: 15,
        },
        {
          id: "b",
          text: "Trao đổi dữ liệu giữa các hệ thống",
          isCorrect: true,
          percentage: 70,
        },
        {
          id: "c",
          text: "Hiệu suất database",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "API Testing tập trung vào việc kiểm tra cách các ứng dụng giao tiếp với nhau, đảm bảo dữ liệu được trao đổi chính xác và an toàn.",
    },
  ],

  "web-developer": [
    {
      id: 1,
      question:
        "Framework JavaScript nào phù hợp nhất cho Single Page Application?",
      options: [
        { id: "a", text: "jQuery", isCorrect: false, percentage: 15 },
        { id: "b", text: "React/Vue/Angular", isCorrect: true, percentage: 70 },
        {
          id: "c",
          text: "Vanilla JavaScript",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "React, Vue, và Angular được thiết kế đặc biệt cho SPA với khả năng quản lý state, routing, và component lifecycle hiệu quả.",
    },
    {
      id: 2,
      question: "Responsive Design quan trọng vì lý do nào?",
      options: [
        { id: "a", text: "Tăng SEO ranking", isCorrect: false, percentage: 25 },
        {
          id: "b",
          text: "Người dùng truy cập từ nhiều thiết bị khác nhau",
          isCorrect: true,
          percentage: 60,
        },
        {
          id: "c",
          text: "Giảm thời gian load trang",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Responsive Design đảm bảo website hoạt động tốt trên mọi thiết bị, từ desktop đến mobile, mang lại trải nghiệm nhất quán cho người dùng.",
    },
    {
      id: 3,
      question: "Node.js được sử dụng chủ yếu cho?",
      options: [
        {
          id: "a",
          text: "Frontend development",
          isCorrect: false,
          percentage: 20,
        },
        {
          id: "b",
          text: "Backend server và API",
          isCorrect: true,
          percentage: 65,
        },
        {
          id: "c",
          text: "Database management",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Node.js cho phép chạy JavaScript ở server-side, rất phù hợp để xây dựng backend, API, và các ứng dụng real-time.",
    },
  ],

  "app-developer": [
    {
      id: 1,
      question:
        "React Native vs Flutter - điểm mạnh chính của React Native là gì?",
      options: [
        {
          id: "a",
          text: "Performance tốt hơn",
          isCorrect: false,
          percentage: 25,
        },
        {
          id: "b",
          text: "Sử dụng JavaScript quen thuộc",
          isCorrect: true,
          percentage: 55,
        },
        {
          id: "c",
          text: "UI giống native 100%",
          isCorrect: false,
          percentage: 20,
        },
      ],
      explanation:
        "React Native cho phép developers sử dụng JavaScript và React knowledge có sẵn, giúp giảm learning curve và tận dụng ecosystem lớn.",
    },
    {
      id: 2,
      question: "Khi nào nên chọn Native development thay vì Cross-platform?",
      options: [
        {
          id: "a",
          text: "Khi cần performance tối ưu và tính năng platform-specific",
          isCorrect: true,
          percentage: 50,
        },
        {
          id: "b",
          text: "Khi có budget nhỏ",
          isCorrect: false,
          percentage: 20,
        },
        {
          id: "c",
          text: "Khi cần ra mắt nhanh",
          isCorrect: false,
          percentage: 30,
        },
      ],
      explanation:
        "Native development phù hợp khi app cần performance cao, tính năng đặc thù của platform, hoặc trải nghiệm UX tối ưu nhất.",
    },
    {
      id: 3,
      question: "UI/UX Design trong mobile app quan trọng như thế nào?",
      options: [
        {
          id: "a",
          text: "Chỉ quan trọng về mặt thẩm mỹ",
          isCorrect: false,
          percentage: 15,
        },
        {
          id: "b",
          text: "Quyết định trải nghiệm và retention của user",
          isCorrect: true,
          percentage: 70,
        },
        {
          id: "c",
          text: "Không quan trọng nếu tính năng tốt",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "UI/UX design tốt giúp tăng user engagement, retention rate, và app store rating, trực tiếp ảnh hưởng đến thành công của app.",
    },
  ],

  designer: [
    {
      id: 1,
      question: "Nguyên tắc nào quan trọng nhất trong UI Design?",
      options: [
        {
          id: "a",
          text: "Sử dụng nhiều màu sắc bắt mắt",
          isCorrect: false,
          percentage: 20,
        },
        {
          id: "b",
          text: "Consistency và usability",
          isCorrect: true,
          percentage: 65,
        },
        {
          id: "c",
          text: "Theo trend design mới nhất",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Consistency trong design và usability cho người dùng luôn quan trọng hơn việc theo trend. Design tốt là design người dùng có thể sử dụng dễ dàng.",
    },
    {
      id: 2,
      question: "User Research quan trọng ở giai đoạn nào?",
      options: [
        {
          id: "a",
          text: "Chỉ khi có khiếu nại từ user",
          isCorrect: false,
          percentage: 15,
        },
        {
          id: "b",
          text: "Xuyên suốt quá trình design",
          isCorrect: true,
          percentage: 70,
        },
        {
          id: "c",
          text: "Chỉ ở giai đoạn đầu",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "User research cần được thực hiện liên tục từ giai đoạn discovery, validation ý tượng, đến testing và iteration sau khi ra mắt sản phẩm.",
    },
    {
      id: 3,
      question: "Prototyping giúp designer điều gì?",
      options: [
        {
          id: "a",
          text: "Tạo ra sản phẩm cuối cùng",
          isCorrect: false,
          percentage: 20,
        },
        {
          id: "b",
          text: "Test và validate ý tưởng design",
          isCorrect: true,
          percentage: 65,
        },
        {
          id: "c",
          text: "Thay thế cho coding",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Prototyping cho phép test interaction, user flow, và validate design concept trước khi development, giúp tiết kiệm thời gian và cost.",
    },
  ],

  "data-scientist": [
    {
      id: 1,
      question: "Python vs R trong Data Science - khi nào nên sử dụng Python?",
      options: [
        {
          id: "a",
          text: "Khi cần integrate với web applications",
          isCorrect: true,
          percentage: 55,
        },
        {
          id: "b",
          text: "Chỉ cho statistical analysis",
          isCorrect: false,
          percentage: 20,
        },
        {
          id: "c",
          text: "Python luôn tốt hơn R",
          isCorrect: false,
          percentage: 25,
        },
      ],
      explanation:
        "Python mạnh trong production deployment, web integration, và có ecosystem phong phú. R xuất sắc trong statistical analysis và research.",
    },
    {
      id: 2,
      question:
        "Machine Learning model nào phù hợp cho bài toán classification?",
      options: [
        {
          id: "a",
          text: "Linear Regression",
          isCorrect: false,
          percentage: 15,
        },
        {
          id: "b",
          text: "Random Forest, SVM, Neural Networks",
          isCorrect: true,
          percentage: 70,
        },
        {
          id: "c",
          text: "K-means Clustering",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Classification cần các thuật toán có thể phân loại dữ liệu vào các category distinct. Random Forest, SVM, Neural Networks đều phù hợp cho bài toán này.",
    },
    {
      id: 3,
      question: "Data Visualization quan trọng vì lý do nào?",
      options: [
        {
          id: "a",
          text: "Làm cho báo cáo đẹp hơn",
          isCorrect: false,
          percentage: 20,
        },
        {
          id: "b",
          text: "Giúp communicate insights hiệu quả",
          isCorrect: true,
          percentage: 65,
        },
        {
          id: "c",
          text: "Thay thế cho statistical analysis",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Data visualization giúp communicate complex insights một cách dễ hiểu, hỗ trợ decision making và storytelling với data.",
    },
  ],

  "devops-engineer": [
    {
      id: 1,
      question: "Container hóa với Docker mang lại lợi ích gì chính?",
      options: [
        { id: "a", text: "Tăng security", isCorrect: false, percentage: 25 },
        {
          id: "b",
          text: "Consistency môi trường development và production",
          isCorrect: true,
          percentage: 60,
        },
        { id: "c", text: "Giảm cost server", isCorrect: false, percentage: 15 },
      ],
      explanation:
        "Docker đảm bảo ứng dụng chạy consistent trong mọi môi trường, giải quyết vấn đề 'works on my machine' và đơn giản hóa deployment.",
    },
    {
      id: 2,
      question: "CI/CD pipeline chủ yếu giải quyết vấn đề gì?",
      options: [
        {
          id: "a",
          text: "Tự động hóa testing và deployment",
          isCorrect: true,
          percentage: 70,
        },
        {
          id: "b",
          text: "Viết code tự động",
          isCorrect: false,
          percentage: 15,
        },
        { id: "c", text: "Quản lý server", isCorrect: false, percentage: 15 },
      ],
      explanation:
        "CI/CD tự động hóa quá trình test, build, và deploy, giúp giảm manual errors, tăng speed delivery, và đảm bảo code quality.",
    },
    {
      id: 3,
      question: "Kubernetes được sử dụng chủ yếu để làm gì?",
      options: [
        {
          id: "a",
          text: "Thay thế cho Docker",
          isCorrect: false,
          percentage: 20,
        },
        {
          id: "b",
          text: "Orchestration và management containers",
          isCorrect: true,
          percentage: 65,
        },
        {
          id: "c",
          text: "Database management",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Kubernetes orchestrate containers ở scale lớn, quản lý deployment, scaling, networking, và health monitoring của containerized applications.",
    },
  ],

  cybersecurity: [
    {
      id: 1,
      question: "Nguyên tắc bảo mật nào quan trọng nhất trong cybersecurity?",
      options: [
        {
          id: "a",
          text: "Chỉ cần firewall mạnh",
          isCorrect: false,
          percentage: 20,
        },
        {
          id: "b",
          text: "Defense in depth (nhiều lớp bảo vệ)",
          isCorrect: true,
          percentage: 65,
        },
        {
          id: "c",
          text: "Chỉ bảo vệ ở network level",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Defense in depth sử dụng nhiều lớp bảo mật khác nhau để tạo ra hệ thống phòng thủ toàn diện, không dựa vào một điểm bảo vệ duy nhất.",
    },
    {
      id: 2,
      question:
        "Penetration Testing khác với Vulnerability Assessment như thế nào?",
      options: [
        {
          id: "a",
          text: "Pen test chỉ tìm lỗ hổng, vuln assessment khai thác",
          isCorrect: false,
          percentage: 25,
        },
        {
          id: "b",
          text: "Pen test mô phỏng tấn công thực tế, vuln assessment chỉ scan",
          isCorrect: true,
          percentage: 60,
        },
        {
          id: "c",
          text: "Không có sự khác biệt",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Penetration testing mô phỏng cuộc tấn công thực tế để đánh giá mức độ thiệt hại, trong khi vulnerability assessment chỉ tìm và liệt kê các lỗ hổng.",
    },
    {
      id: 3,
      question: "Incident Response quan trọng vì lý do nào?",
      options: [
        {
          id: "a",
          text: "Giảm thiểu thiệt hại và phục hồi nhanh chóng",
          isCorrect: true,
          percentage: 70,
        },
        {
          id: "b",
          text: "Tìm ra ai là kẻ tấn công",
          isCorrect: false,
          percentage: 20,
        },
        {
          id: "c",
          text: "Chỉ để báo cáo cho leadership",
          isCorrect: false,
          percentage: 10,
        },
      ],
      explanation:
        "Incident response hiệu quả giúp giảm thiểu thiệt hại, khôi phục dịch vụ nhanh chóng, và học hỏi từ sự cố để tăng cường bảo mật.",
    },
  ],

  "blockchain-developer": [
    {
      id: 1,
      question: "Smart Contract quan trọng trong blockchain vì lý do nào?",
      options: [
        {
          id: "a",
          text: "Tự động thực thi mà không cần bên thứ ba",
          isCorrect: true,
          percentage: 60,
        },
        {
          id: "b",
          text: "Chỉ để lưu trữ dữ liệu",
          isCorrect: false,
          percentage: 20,
        },
        {
          id: "c",
          text: "Làm cho blockchain nhanh hơn",
          isCorrect: false,
          percentage: 20,
        },
      ],
      explanation:
        "Smart contracts tự động thực thi theo điều kiện định trước, loại bỏ nhu cầu intermediary và tăng tính minh bạch, tin cậy.",
    },
    {
      id: 2,
      question:
        "DeFi (Decentralized Finance) khác với traditional finance như thế nào?",
      options: [
        {
          id: "a",
          text: "Không có sự khác biệt",
          isCorrect: false,
          percentage: 15,
        },
        {
          id: "b",
          text: "Loại bỏ intermediaries và tăng accessibility",
          isCorrect: true,
          percentage: 65,
        },
        {
          id: "c",
          text: "Chỉ khác về công nghệ",
          isCorrect: false,
          percentage: 20,
        },
      ],
      explanation:
        "DeFi loại bỏ các trung gian tài chính truyền thống, cho phép truy cập dịch vụ tài chính 24/7 từ bất kỳ đâu với internet.",
    },
    {
      id: 3,
      question: "Web3.js được sử dụng để làm gì?",
      options: [
        {
          id: "a",
          text: "Tạo ra blockchain mới",
          isCorrect: false,
          percentage: 20,
        },
        {
          id: "b",
          text: "Kết nối ứng dụng web với Ethereum blockchain",
          isCorrect: true,
          percentage: 65,
        },
        {
          id: "c",
          text: "Thay thế cho HTML/CSS",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Web3.js là thư viện JavaScript cho phép web applications tương tác với Ethereum blockchain, đọc dữ liệu và thực thi smart contracts.",
    },
  ],
};

const DirectionDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [showResult, setShowResult] = useState(false);
  const [hasStartedQuiz, setHasStartedQuiz] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  const career = careerPaths.find((item) => item.id === id);
  const quizQuestions = quizQuestionsByCareer[id || ""] || [];
  const currentQuestion = quizQuestions[currentQuestionIndex];

  useEffect(() => {
    if (!career || quizQuestions.length === 0) {
      navigate("/dinh-huong");
    }
  }, [career, quizQuestions.length, navigate]);

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption("");
      setShowResult(false);
    } else {
      // Đã hoàn thành tất cả câu hỏi
      setIsQuizCompleted(true);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setSelectedOption("");
      setShowResult(false);
    }
  };

  const handleStartQuiz = () => {
    setHasStartedQuiz(true);
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption("");
    setShowResult(false);
    setIsQuizCompleted(false);
    setHasStartedQuiz(true);
  };

  if (!career || !currentQuestion) {
    return null;
  }

  return (
    <Layout>
      <BannerBreadcrumb
        pageName={`Định hướng: ${career.title}`}
        image="/images_uside/banner_direction.png"
      />

      <section
        className="py-16 sm:py-20 lg:py-24 min-h-screen"
        style={{
          background: "var(--color-background)",
        }}
      >
        {/* Custom CSS Animations */}
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            
            @keyframes slideInLeft {
              from { 
                opacity: 0;
                transform: translateX(-50px);
              }
              to { 
                opacity: 1;
                transform: translateX(0);
              }
            }
            
            @keyframes slideInRight {
              from { 
                opacity: 0;
                transform: translateX(50px);
              }
              to { 
                opacity: 1;
                transform: translateX(0);
              }
            }
            
            @keyframes fadeInUp {
              from { 
                opacity: 0;
                transform: translateY(30px);
              }
              to { 
                opacity: 1;
                transform: translateY(0);
              }
            }
            
            @keyframes scaleIn {
              from { 
                transform: scale(0.9);
              }
              to { 
                transform: scale(1);
              }
            }
            
            .animate-fade-in {
              animation: fadeIn 0.6s ease-out;
            }
            
            .animate-fade-in-up {
              animation: fadeInUp 0.8s ease-out;
            }
            
            .animate-slide-in-left {
              animation: slideInLeft 0.8s ease-out;
            }
            
            .animate-slide-in-right {
              animation: slideInRight 0.8s ease-out;
            }
          `
        }} />
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <button
            onClick={() => navigate("/dinh-huong")}
            className={`
              inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-xl
              text-sm font-medium transition-all duration-300
              transform hover:scale-105 active:scale-95
            `}
            style={{
              color: "var(--color-text-primary)",
              background: "var(--color-background)",
              boxShadow: `
                6px 6px 12px var(--color-shadow),
                -6px -6px 12px #FAFBFF
              `,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `
                8px 8px 16px var(--color-shadow),
                -8px -8px 16px #FAFBFF,
                0 0 15px rgba(0, 210, 255, 0.1)
              `;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = `
                6px 6px 12px var(--color-shadow),
                -6px -6px 12px #FAFBFF
              `;
            }}
          >
            <span>←</span>
            Quay lại
          </button>

          <div className="starter mb-8">
            <div
              className="p-6 sm:p-8 rounded-3xl text-center transform transition-all duration-700 ease-in-out animate-fade-in-up"
              style={{
                background: "var(--color-background)",
                boxShadow: `
                  4px 4px 8px var(--color-shadow),
                  -4px -4px 8px #FAFBFF
                `,
                animation: 'fadeInUp 0.6s ease-out',
              }}
            >
              <div
                className="text-6xl mb-4"
                style={{ color: "var(--color-accent)" }}
              >
                🎯
              </div>
              <h2 
                className="text-xl sm:text-2xl font-bold mb-4"
                style={{ color: "var(--color-text-primary)" }}
              >
                Bắt đầu khám phá
              </h2>
              <p 
                className="text-base sm:text-lg mb-6 max-w-2xl mx-auto"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Hãy trả lời một số câu hỏi để khám phá khả năng và sở thích của bạn trong lĩnh vực <strong>{career.title}</strong>. 
                Điều này sẽ giúp bạn hiểu rõ hơn về con đường nghề nghiệp này.
              </p>
              
              {!hasStartedQuiz ? (
                <button
                  onClick={handleStartQuiz}
                  className={`
                    px-8 py-4 rounded-2xl font-bold text-lg text-white
                    transition-all duration-300 transform hover:scale-105 active:scale-95
                    shadow-lg hover:shadow-xl cursor-pointer
                  `}
                  style={{
                    background: "var(--color-accent)",
                    boxShadow: `
                      6px 6px 12px var(--color-shadow),
                      -6px -6px 12px rgba(255,255,255,0.1)
                    `,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `
                      8px 8px 16px var(--color-shadow),
                      -8px -8px 16px rgba(255,255,255,0.1),
                      0 0 25px rgba(0, 210, 255, 0.3)
                    `;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = `
                      6px 6px 12px var(--color-shadow),
                      -6px -6px 12px rgba(255,255,255,0.1)
                    `;
                  }}
                >
                  🚀 Bắt đầu ngay
                </button>
              ) : (
                <div className="flex items-center justify-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full animate-pulse"
                    style={{ background: "var(--color-accent)" }}
                  />
                  <span 
                    className="text-lg font-medium"
                    style={{ color: "var(--color-accent)" }}
                  >
                    Đã bắt đầu quiz
                  </span>
                  <div
                    className="w-3 h-3 rounded-full animate-pulse"
                    style={{ background: "var(--color-accent)" }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Quiz Section */}
          {hasStartedQuiz && !isQuizCompleted && (
            <div className="grid lg:grid-cols-2 gap-8 animate-fade-in">
            {/* Question */}
            <div
              className="p-6 sm:p-8 rounded-3xl transform transition-all duration-700 ease-in-out animate-slide-in-left"
              style={{
                background: "var(--color-background)",
                boxShadow: `
                  4px 4px 8px var(--color-shadow),
                -4px -4px 8px #FAFBFF
                `,
                animation: 'slideInLeft 0.8s ease-out, fadeIn 0.8s ease-out',
              }}
            >
              {/* Question Progress */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span
                    className="text-sm font-medium"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    Câu hỏi {currentQuestionIndex + 1} / {quizQuestions.length}
                  </span>
                  <span
                    className="text-sm font-medium"
                    style={{ color: "var(--color-accent)" }}
                  >
                    {Math.round(
                      ((currentQuestionIndex + 1) / quizQuestions.length) * 100
                    )}
                    %
                  </span>
                </div>
                <div
                  className="h-2 rounded-full overflow-hidden"
                  style={{
                    background: "var(--color-background)",
                    boxShadow: `
                      inset 4px 4px 8px var(--color-shadow),
                      inset -4px -4px 8px #FAFBFF
                    `,
                  }}
                >
                  <div
                    className="h-full transition-all duration-500 rounded-full"
                    style={{
                      width: `${
                        ((currentQuestionIndex + 1) / quizQuestions.length) *
                        100
                      }%`,
                      background: "var(--color-accent)",
                    }}
                  />
                </div>
              </div>

              <h2
                className="text-xl sm:text-2xl font-bold mb-6"
                style={{ color: "var(--color-text-primary)" }}
              >
                {currentQuestion.question}
              </h2>

              {/* Options */}
              <div className="space-y-4">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={option.id}
                    onClick={() => handleOptionSelect(option.id)}
                    disabled={showResult}
                    className={`
                      w-full p-4 rounded-2xl text-left transition-all duration-500
                      transform hover:scale-[1.02] active:scale-98 animate-fade-in-up
                      ${selectedOption === option.id ? "ring-2" : ""}
                      ${
                        showResult && option.isCorrect ? "border-green-400" : ""
                      }
                      ${
                        showResult &&
                        selectedOption === option.id &&
                        !option.isCorrect
                          ? "border-red-400"
                          : ""
                      }
                    `}
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      color: "var(--color-text-primary)",
                      background: "var(--color-background)",
                      boxShadow: `
                        4px 4px 8px var(--color-shadow),
                -4px -4px 8px #FAFBFF
                      `,
                      ...(selectedOption === option.id && {
                        outline: `2px solid var(--color-accent)`,
                        outlineOffset: "2px",
                      }),
                    }}
                    onMouseEnter={(e) => {
                      if (!showResult) {
                        e.currentTarget.style.boxShadow = `
                          4px 4px 8px var(--color-shadow),
                          -4px -4px 8px #FAFBFF,
                          0 0 20px rgba(0, 210, 255, 0.1)
                        `;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!showResult) {
                        e.currentTarget.style.boxShadow = `
                          4px 4px 8px var(--color-shadow),
                -4px -4px 8px #FAFBFF
                        `;
                      }
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`
                          w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold
                          ${
                            showResult && option.isCorrect
                              ? "bg-green-400 text-white"
                              : ""
                          }
                          ${
                            showResult &&
                            selectedOption === option.id &&
                            !option.isCorrect
                              ? "bg-red-400 text-white"
                              : ""
                          }
                        `}
                        style={{
                          background: showResult
                            ? undefined
                            : "var(--color-accent)",
                          color: showResult ? undefined : "white",
                        }}
                      >
                        {option.id.toUpperCase()}
                      </div>
                      <span className="flex-1">{option.text}</span>
                      {showResult && (
                        <span
                          className="text-sm font-medium"
                          style={{ color: "var(--color-accent)" }}
                        >
                          {option.percentage}%
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center mt-8">
                <button
                  onClick={handlePrevQuestion}
                  disabled={currentQuestionIndex === 0}
                  className={`
                    px-6 py-3 rounded-xl font-medium transition-all duration-300
                    transform hover:scale-105 active:scale-95
                    ${
                      currentQuestionIndex === 0
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }
                  `}
                  style={{
                    color: "var(--color-text-primary)",
                    background: "var(--color-background)",
                    boxShadow:
                      currentQuestionIndex === 0
                        ? "none"
                        : `
                      6px 6px 12px var(--color-shadow),
                      -6px -6px 12px #FAFBFF
                    `,
                  }}
                >
                  ← Trước
                </button>

                <button
                  onClick={handleNextQuestion}
                  disabled={currentQuestionIndex === quizQuestions.length - 1 && !selectedOption}
                  className={`
                    px-6 py-3 rounded-xl font-medium text-white transition-all duration-300
                    transform hover:scale-105 active:scale-95 cursor-pointer
                    ${
                      !selectedOption && currentQuestionIndex === quizQuestions.length - 1
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }
                  `}
                  style={{
                    background:
                      !selectedOption && currentQuestionIndex === quizQuestions.length - 1
                        ? "#gray-400"
                        : "var(--color-accent)",
                    boxShadow:
                      !selectedOption && currentQuestionIndex === quizQuestions.length - 1
                        ? "none"
                        : `
                      6px 6px 12px var(--color-shadow),
                      -6px -6px 12px rgba(255,255,255,0.1)
                    `,
                  }}
                >
                  {currentQuestionIndex === quizQuestions.length - 1 ? "🏁 Hoàn thành" : "Tiếp →"}
                </button>
              </div>
            </div>

            {/* Results/Analysis */}
            {showResult && (
              <div
                className="p-6 sm:p-8 rounded-3xl transform transition-all duration-700 ease-in-out animate-slide-in-right"
                style={{
                  background: "var(--color-background)",
                  boxShadow: `
                    4px 4px 8px var(--color-shadow),
                  -4px -4px 8px #FAFBFF
                  `,
                  animation: 'slideInRight 0.8s ease-out, fadeIn 0.8s ease-out',
                }}
              >
                <>
                  <h3
                    className="text-xl font-bold mb-6"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    📊 Phân tích kết quả
                  </h3>

                  {/* Results Chart */}
                  <div className="space-y-4 mb-6">
                    {currentQuestion.options.map((option) => (
                      <div key={option.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span
                            className="text-sm font-medium"
                            style={{ color: "var(--color-text-primary)" }}
                          >
                            {option.id.toUpperCase()}. {option.text}
                          </span>
                          <span
                            className="text-sm font-bold"
                            style={{ color: "var(--color-accent)" }}
                          >
                            {option.percentage}%
                          </span>
                        </div>
                        <div
                          className="h-3 rounded-full overflow-hidden"
                          style={{
                            background: "var(--color-background)",
                            boxShadow: `
                              inset 3px 3px 6px var(--color-shadow),
                              inset -3px -3px 6px #FAFBFF
                            `,
                          }}
                        >
                          <div
                            className="h-full transition-all duration-1000 rounded-full"
                            style={{
                              width: `${option.percentage}%`,
                              background: option.isCorrect
                                ? "#22c55e"
                                : selectedOption === option.id
                                ? "#ef4444"
                                : "var(--color-accent)",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Explanation */}
                  <div
                    className="p-4 rounded-2xl"
                    style={{
                      background: "var(--color-background)",
                      boxShadow: `
                        inset 6px 6px 12px var(--color-shadow),
                        inset -6px -6px 12px #FAFBFF
                      `,
                    }}
                  >
                    <h4
                      className="font-semibold mb-2 flex items-center gap-2"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      💡 Giải thích
                    </h4>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {currentQuestion.explanation}
                    </p>
                  </div>
                </>
              </div>
            )}
          </div>
        )}

          {/* Quiz Completed Section */}
          {isQuizCompleted && (
            <div className="w-full max-w-7xl mx-auto animate-fade-in-up">
              <div
                className="p-6 sm:p-8 rounded-3xl transform transition-all duration-1000 ease-in-out"
                style={{
                  background: "var(--color-background)",
                  boxShadow: `
                    4px 4px 8px var(--color-shadow),
                    -4px -4px 8px #FAFBFF
                  `,
                  animation: 'fadeInUp 1.2s ease-out, scaleIn 1.2s ease-out',
                }}
              >
                {/* Quiz Completion Message */}
                <div className="text-center py-8 relative overflow-hidden">
                  {/* Simple Fireworks flying up */}
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute"
                        style={{
                          left: `${15 + (i * 15)}%`,
                          bottom: '10%',
                          animation: `firework-${i} 3s ease-out infinite`,
                          animationDelay: `${i * 0.5}s`,
                        }}
                      >
                        <div
                          className="text-2xl"
                          style={{
                            color: ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#1dd1a1', '#ff7675'][i],
                          }}
                        >
                          🎆
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CSS Animation Styles */}
                  <style dangerouslySetInnerHTML={{
                    __html: `
                      @keyframes firework-0 {
                        0% { transform: translateY(0) scale(0.5); opacity: 0; }
                        50% { transform: translateY(-200px) scale(1); opacity: 1; }
                        100% { transform: translateY(-400px) scale(1.5); opacity: 0; }
                      }
                      @keyframes firework-1 {
                        0% { transform: translateY(0) scale(0.5); opacity: 0; }
                        50% { transform: translateY(-180px) scale(1); opacity: 1; }
                        100% { transform: translateY(-360px) scale(1.5); opacity: 0; }
                      }
                      @keyframes firework-2 {
                        0% { transform: translateY(0) scale(0.5); opacity: 0; }
                        50% { transform: translateY(-220px) scale(1); opacity: 1; }
                        100% { transform: translateY(-420px) scale(1.5); opacity: 0; }
                      }
                      @keyframes firework-3 {
                        0% { transform: translateY(0) scale(0.5); opacity: 0; }
                        50% { transform: translateY(-190px) scale(1); opacity: 1; }
                        100% { transform: translateY(-380px) scale(1.5); opacity: 0; }
                      }
                      @keyframes firework-4 {
                        0% { transform: translateY(0) scale(0.5); opacity: 0; }
                        50% { transform: translateY(-210px) scale(1); opacity: 1; }
                        100% { transform: translateY(-410px) scale(1.5); opacity: 0; }
                      }
                      @keyframes firework-5 {
                        0% { transform: translateY(0) scale(0.5); opacity: 0; }
                        50% { transform: translateY(-170px) scale(1); opacity: 1; }
                        100% { transform: translateY(-340px) scale(1.5); opacity: 0; }
                      }
                    `
                  }} />

                  <div
                    className="text-8xl mb-6 animate-bounce relative z-10"
                    style={{ color: "var(--color-accent)" }}
                  >
                    🎉
                  </div>
                  <h3
                    className="text-2xl sm:text-3xl font-bold mb-4"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    Chúc mừng! Bạn đã hoàn thành quiz
                  </h3>
                  <div
                    className="p-6 rounded-2xl mb-6"
                    style={{
                      background: "var(--color-background)",
                      boxShadow: `
                        inset 6px 6px 12px var(--color-shadow),
                        inset -6px -6px 12px #FAFBFF
                      `,
                    }}
                  >
                    <p
                      className="text-lg leading-relaxed mb-4"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      Cảm ơn bạn đã dành thời gian khám phá lĩnh vực <strong>{career.title}</strong>! 
                      Hy vọng những câu hỏi này đã giúp bạn hiểu rõ hơn về con đường nghề nghiệp này.
                    </p>
                    <div
                      className="flex items-center justify-center gap-2 text-lg font-semibold"
                      style={{ color: "var(--color-accent)" }}
                    >
                      <span>✨</span>
                      <span>Chúc bạn thành công trên con đường sự nghiệp!</span>
                      <span>✨</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={handleRestartQuiz}
                      className={`
                        px-6 py-3 rounded-xl font-medium text-white
                        transition-all duration-300 transform hover:scale-105 active:scale-95
                      `}
                      style={{
                        background: "var(--color-accent)",
                        boxShadow: `
                          6px 6px 12px var(--color-shadow),
                          -6px -6px 12px rgba(255,255,255,0.1)
                        `,
                      }}
                    >
                      🔄 Làm lại quiz
                    </button>
                    
                    <button
                      onClick={() => navigate("/dinh-huong")}
                      className={`
                        px-6 py-3 rounded-xl font-medium transition-all duration-300
                        transform hover:scale-105 active:scale-95
                      `}
                      style={{
                        color: "var(--color-text-primary)",
                        background: "var(--color-background)",
                        boxShadow: `
                          6px 6px 12px var(--color-shadow),
                          -6px -6px 12px #FAFBFF
                        `,
                      }}
                    >
                      🏠 Về trang định hướng
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default DirectionDetailPage;
