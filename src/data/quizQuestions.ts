export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
  percentage: number;
}

export interface Question {
  id: number;
  question: string;
  options: QuizOption[];
  explanation: string;
}

export const quizQuestionsByCareer: Record<string, Question[]> = {
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
    {
      id: 4,
      question: "Nhiệm vụ hàng ngày của một Tester thường là gì?",
      options: [
        {
          id: "a",
          text: "Viết code tính năng mới",
          isCorrect: false,
          percentage: 20,
        },
        {
          id: "b",
          text: "Thực hiện test case, báo cáo bug, trao đổi với dev",
          isCorrect: true,
          percentage: 65,
        },
        {
          id: "c",
          text: "Thiết kế giao diện",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Tester thường xuyên chạy test case, báo cáo lỗi, trao đổi với lập trình viên và đảm bảo phần mềm đúng yêu cầu.",
    },
    {
      id: 5,
      question: "Người làm Tester cần kỹ năng nào nhiều nhất?",
      options: [
        {
          id: "a",
          text: "Quan sát chi tiết và tư duy logic",
          isCorrect: true,
          percentage: 70,
        },
        {
          id: "b",
          text: "Biết vẽ design đẹp",
          isCorrect: false,
          percentage: 15,
        },
        {
          id: "c",
          text: "Khả năng bán hàng",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Tester cần kỹ năng quan sát tỉ mỉ, tư duy logic để phát hiện lỗi và phân tích nguyên nhân.",
    },
    {
      id: 6,
      question: "Tester có cần biết lập trình không?",
      options: [
        {
          id: "a",
          text: "Không bao giờ cần",
          isCorrect: false,
          percentage: 25,
        },
        {
          id: "b",
          text: "Có, đặc biệt khi viết automation test",
          isCorrect: true,
          percentage: 60,
        },
        {
          id: "c",
          text: "Chỉ khi muốn làm dev",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Không phải Tester nào cũng phải code, nhưng kỹ năng lập trình giúp viết automation test và phân tích bug tốt hơn.",
    },
    {
      id: 7,
      question: "Bug report là gì?",
      options: [
        {
          id: "a",
          text: "Báo cáo chi tiết về lỗi phát hiện được",
          isCorrect: true,
          percentage: 70,
        },
        {
          id: "b",
          text: "Bản mô tả sản phẩm mới",
          isCorrect: false,
          percentage: 15,
        },
        {
          id: "c",
          text: "Email gửi khách hàng",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Bug report là tài liệu tester ghi lại lỗi: bước tái hiện, mức độ ảnh hưởng, môi trường chạy,… để dev có thể sửa dễ dàng.",
    },
    {
      id: 8,
      question: "Tester thường dùng công cụ nào?",
      options: [
        {
          id: "a",
          text: "Jira, Postman, Selenium",
          isCorrect: true,
          percentage: 65,
        },
        { id: "b", text: "Photoshop, Figma", isCorrect: false, percentage: 20 },
        { id: "c", text: "Excel duy nhất", isCorrect: false, percentage: 15 },
      ],
      explanation:
        "Jira để quản lý bug, Postman test API, Selenium cho automation – là công cụ quen thuộc của Tester.",
    },
    {
      id: 9,
      question: "Công việc Tester có phù hợp với người kiên nhẫn không?",
      options: [
        {
          id: "a",
          text: "Có, vì cần test đi test lại nhiều lần",
          isCorrect: true,
          percentage: 75,
        },
        {
          id: "b",
          text: "Không, vì tester chỉ test một lần",
          isCorrect: false,
          percentage: 15,
        },
        {
          id: "c",
          text: "Phụ thuộc vào project",
          isCorrect: false,
          percentage: 10,
        },
      ],
      explanation:
        "Tester cần tính kiên nhẫn vì nhiều khi phải kiểm thử lặp lại, tái hiện bug và làm việc tỉ mỉ.",
    },
    {
      id: 10,
      question: "Tester có tham gia vào giai đoạn nào của dự án?",
      options: [
        { id: "a", text: "Chỉ cuối dự án", isCorrect: false, percentage: 20 },
        {
          id: "b",
          text: "Từ khi phân tích yêu cầu đến khi release",
          isCorrect: true,
          percentage: 65,
        },
        {
          id: "c",
          text: "Chỉ khi khách hàng phản ánh lỗi",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Tester thường tham gia từ đầu để hiểu yêu cầu, viết test plan, và test xuyên suốt đến khi release.",
    },
    {
      id: 11,
      question: "Làm Tester có thể phát triển lên vị trí nào?",
      options: [
        {
          id: "a",
          text: "QA Lead, Test Manager, hoặc chuyển hướng sang Business Analyst",
          isCorrect: true,
          percentage: 70,
        },
        {
          id: "b",
          text: "Chỉ dừng ở mức nhân viên",
          isCorrect: false,
          percentage: 15,
        },
        {
          id: "c",
          text: "Chỉ có thể làm Dev",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Tester có lộ trình thăng tiến rõ ràng: Senior QA, QA Lead, Test Manager hoặc chuyển hướng sang BA/Automation.",
    },
    {
      id: 12,
      question: "Điểm thú vị nhất của nghề Tester là gì?",
      options: [
        {
          id: "a",
          text: "Được thử nghiệm nhiều sản phẩm trước khi ra mắt",
          isCorrect: true,
          percentage: 65,
        },
        {
          id: "b",
          text: "Không bao giờ gặp bug",
          isCorrect: false,
          percentage: 20,
        },
        {
          id: "c",
          text: "Không cần học gì thêm",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Tester là người đầu tiên trải nghiệm sản phẩm, phát hiện lỗi và góp phần tạo ra phần mềm chất lượng.",
    },
    {
      id: 13,
      question: "Một tester giỏi cần thái độ thế nào?",
      options: [
        {
          id: "a",
          text: "Tò mò, cẩn thận và sẵn sàng đặt câu hỏi",
          isCorrect: true,
          percentage: 70,
        },
        {
          id: "b",
          text: "Chỉ làm theo hướng dẫn",
          isCorrect: false,
          percentage: 20,
        },
        {
          id: "c",
          text: "Không cần hợp tác với ai",
          isCorrect: false,
          percentage: 10,
        },
      ],
      explanation:
        "Tinh thần tò mò và cẩn thận giúp tester phát hiện lỗi tiềm ẩn, đồng thời phối hợp với dev/BA để giải quyết.",
    },
    {
      id: 14,
      question: "Tester có phải chỉ làm việc một mình?",
      options: [
        {
          id: "a",
          text: "Không, tester thường làm việc nhóm với dev, BA, PM",
          isCorrect: true,
          percentage: 70,
        },
        { id: "b", text: "Có, luôn độc lập", isCorrect: false, percentage: 20 },
        {
          id: "c",
          text: "Chỉ phụ thuộc vào khách hàng",
          isCorrect: false,
          percentage: 10,
        },
      ],
      explanation:
        "Tester luôn làm việc trong team, trao đổi thường xuyên với dev, BA và PM để đảm bảo sản phẩm chất lượng.",
    },
    {
      id: 15,
      question:
        "Nếu bạn thích phân tích và phát hiện lỗi, nghề Tester có phù hợp?",
      options: [
        {
          id: "a",
          text: "Có, đó chính là bản chất công việc Tester",
          isCorrect: true,
          percentage: 75,
        },
        {
          id: "b",
          text: "Không, Tester không cần phát hiện lỗi",
          isCorrect: false,
          percentage: 15,
        },
        {
          id: "c",
          text: "Phụ thuộc vào công ty",
          isCorrect: false,
          percentage: 10,
        },
      ],
      explanation:
        "Nếu bạn có tính cách thích tìm tòi, phân tích và phát hiện vấn đề, nghề Tester sẽ rất phù hợp với bạn.",
    },
  ],

  "web-developer": [
    {
      id: 1,
      question: "Theo bạn, điều thú vị nhất khi làm Web Developer là gì?",
      options: [
        {
          id: "a",
          text: "Tạo ra trang web có người thật sử dụng",
          isCorrect: true,
          percentage: 55,
        },
        {
          id: "b",
          text: "Chỉ ngồi viết code không cần giao tiếp",
          isCorrect: false,
          percentage: 25,
        },
        {
          id: "c",
          text: "Không bao giờ gặp bug",
          isCorrect: false,
          percentage: 20,
        },
      ],
      explanation:
        "Web Developer được trải nghiệm cảm giác thấy sản phẩm mình làm ra được nhiều người sử dụng hằng ngày.",
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
    {
      id: 4,
      question: "Frontend Developer thường làm việc với công nghệ nào?",
      options: [
        {
          id: "a",
          text: "HTML, CSS, JavaScript",
          isCorrect: true,
          percentage: 70,
        },
        { id: "b", text: "Java, C++", isCorrect: false, percentage: 20 },
        { id: "c", text: "SQL, MongoDB", isCorrect: false, percentage: 10 },
      ],
      explanation:
        "Frontend tập trung vào giao diện người dùng nên các công nghệ nền tảng là HTML, CSS và JavaScript.",
    },
    {
      id: 5,
      question: "Backend Developer chịu trách nhiệm gì?",
      options: [
        {
          id: "a",
          text: "Thiết kế giao diện đẹp mắt",
          isCorrect: false,
          percentage: 20,
        },
        {
          id: "b",
          text: "Xử lý dữ liệu, logic và giao tiếp với database",
          isCorrect: true,
          percentage: 65,
        },
        {
          id: "c",
          text: "Chỉ viết tài liệu",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Backend Developer tập trung vào phần 'hậu trường' – xử lý logic nghiệp vụ, API, và kết nối với cơ sở dữ liệu.",
    },
    {
      id: 6,
      question: "Fullstack Developer là gì?",
      options: [
        {
          id: "a",
          text: "Người làm cả frontend và backend",
          isCorrect: true,
          percentage: 70,
        },
        {
          id: "b",
          text: "Người chỉ chuyên frontend",
          isCorrect: false,
          percentage: 15,
        },
        {
          id: "c",
          text: "Người thiết kế đồ họa",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Fullstack Developer có kỹ năng cả frontend (giao diện) lẫn backend (xử lý dữ liệu).",
    },
    {
      id: 7,
      question: "Git và GitHub thường dùng để làm gì?",
      options: [
        {
          id: "a",
          text: "Quản lý mã nguồn và làm việc nhóm",
          isCorrect: true,
          percentage: 75,
        },
        {
          id: "b",
          text: "Thiết kế giao diện UI",
          isCorrect: false,
          percentage: 15,
        },
        {
          id: "c",
          text: "Viết tài liệu dự án",
          isCorrect: false,
          percentage: 10,
        },
      ],
      explanation:
        "Git/GitHub giúp lưu trữ code, quản lý version và hỗ trợ teamwork hiệu quả.",
    },
    {
      id: 8,
      question: "Ngôn ngữ nào phổ biến cho backend web?",
      options: [
        { id: "a", text: "Python, PHP, Java", isCorrect: true, percentage: 65 },
        { id: "b", text: "HTML, CSS", isCorrect: false, percentage: 20 },
        { id: "c", text: "Photoshop script", isCorrect: false, percentage: 15 },
      ],
      explanation:
        "Backend thường dùng Python, PHP, Java, hoặc JavaScript (Node.js) để xử lý logic và kết nối database.",
    },
    {
      id: 9,
      question: "Cơ sở dữ liệu (Database) dùng để làm gì?",
      options: [
        {
          id: "a",
          text: "Lưu trữ và quản lý dữ liệu",
          isCorrect: true,
          percentage: 75,
        },
        {
          id: "b",
          text: "Trang trí giao diện",
          isCorrect: false,
          percentage: 15,
        },
        {
          id: "c",
          text: "Gửi email marketing",
          isCorrect: false,
          percentage: 10,
        },
      ],
      explanation:
        "Database giúp lưu trữ thông tin như tài khoản người dùng, sản phẩm, đơn hàng,... cho website.",
    },
    {
      id: 10,
      question: "Người mới học web thường bắt đầu từ đâu?",
      options: [
        {
          id: "a",
          text: "HTML, CSS, JavaScript cơ bản",
          isCorrect: true,
          percentage: 70,
        },
        {
          id: "b",
          text: "Trực tiếp học framework nâng cao",
          isCorrect: false,
          percentage: 20,
        },
        {
          id: "c",
          text: "Chỉ cần học design",
          isCorrect: false,
          percentage: 10,
        },
      ],
      explanation:
        "HTML, CSS và JavaScript là nền tảng để xây dựng web, bắt buộc trước khi học framework.",
    },
    {
      id: 11,
      question: "Framework frontend phổ biến hiện nay là gì?",
      options: [
        {
          id: "a",
          text: "React, Angular, Vue",
          isCorrect: true,
          percentage: 70,
        },
        { id: "b", text: "Laravel, Django", isCorrect: false, percentage: 20 },
        { id: "c", text: "Spring Boot", isCorrect: false, percentage: 10 },
      ],
      explanation:
        "React, Angular, và Vue là những framework frontend phổ biến để xây dựng UI hiện đại.",
    },
    {
      id: 12,
      question: "Web Developer có thể làm việc freelance không?",
      options: [
        {
          id: "a",
          text: "Có, vì nhu cầu website rất nhiều",
          isCorrect: true,
          percentage: 75,
        },
        {
          id: "b",
          text: "Không, chỉ có thể làm công ty",
          isCorrect: false,
          percentage: 15,
        },
        {
          id: "c",
          text: "Chỉ nếu biết design",
          isCorrect: false,
          percentage: 10,
        },
      ],
      explanation:
        "Web Developer có thể nhận dự án freelance như làm website bán hàng, blog, portfolio cho khách hàng.",
    },
    {
      id: 13,
      question: "Điểm khó khăn nhất của nghề Web Developer là gì?",
      options: [
        {
          id: "a",
          text: "Công nghệ thay đổi nhanh, phải học liên tục",
          isCorrect: true,
          percentage: 65,
        },
        {
          id: "b",
          text: "Không có việc để làm",
          isCorrect: false,
          percentage: 20,
        },
        {
          id: "c",
          text: "Không bao giờ gặp bug",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Web Developer phải luôn học hỏi công nghệ mới, vì framework, ngôn ngữ, và công cụ thay đổi liên tục.",
    },
    {
      id: 14,
      question: "Một kỹ năng mềm quan trọng của Web Developer là gì?",
      options: [
        {
          id: "a",
          text: "Giao tiếp và làm việc nhóm",
          isCorrect: true,
          percentage: 70,
        },
        {
          id: "b",
          text: "Chỉ cần code giỏi là đủ",
          isCorrect: false,
          percentage: 20,
        },
        {
          id: "c",
          text: "Không cần kỹ năng mềm",
          isCorrect: false,
          percentage: 10,
        },
      ],
      explanation:
        "Web Developer thường phối hợp với Designer, Tester, PM nên kỹ năng giao tiếp và teamwork rất quan trọng.",
    },
    {
      id: 15,
      question:
        "Nếu bạn thích sáng tạo và giải quyết vấn đề, nghề Web Developer có phù hợp?",
      options: [
        {
          id: "a",
          text: "Có, đó chính là bản chất công việc",
          isCorrect: true,
          percentage: 75,
        },
        {
          id: "b",
          text: "Không, web dev không cần sáng tạo",
          isCorrect: false,
          percentage: 15,
        },
        {
          id: "c",
          text: "Chỉ phù hợp với dân design",
          isCorrect: false,
          percentage: 10,
        },
      ],
      explanation:
        "Web Developer vừa cần sáng tạo để làm UI/UX hấp dẫn, vừa cần tư duy logic để giải quyết vấn đề kỹ thuật.",
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
        "React Native cho phép developers tận dụng JavaScript (ngôn ngữ phổ biến), giảm thời gian học và dễ tiếp cận.",
    },
    {
      id: 2,
      question: "Khi nào nên chọn Native development thay vì Cross-platform?",
      options: [
        {
          id: "a",
          text: "Khi cần performance tối ưu và tính năng đặc thù",
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
        "Native development phù hợp cho app yêu cầu tốc độ cao, game 3D, AR/VR hoặc tận dụng phần cứng đặc biệt của thiết bị.",
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
        "UI/UX tốt giữ chân người dùng và tạo trải nghiệm dễ chịu, trực tiếp ảnh hưởng đến thành công của app.",
    },
    {
      id: 4,
      question: "App Developer thường làm việc với ngôn ngữ nào?",
      options: [
        {
          id: "a",
          text: "Java/Kotlin cho Android, Swift cho iOS",
          isCorrect: true,
          percentage: 65,
        },
        { id: "b", text: "HTML và CSS", isCorrect: false, percentage: 20 },
        {
          id: "c",
          text: "Excel và PowerPoint",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Native Android dùng Java/Kotlin, iOS dùng Swift. Cross-platform thì dùng Flutter (Dart) hoặc React Native (JS).",
    },
    {
      id: 5,
      question: "Cross-platform development có lợi ích gì?",
      options: [
        {
          id: "a",
          text: "Code một lần chạy trên cả iOS và Android",
          isCorrect: true,
          percentage: 70,
        },
        {
          id: "b",
          text: "Không bao giờ có bug",
          isCorrect: false,
          percentage: 15,
        },
        { id: "c", text: "Miễn phí 100%", isCorrect: false, percentage: 15 },
      ],
      explanation:
        "Cross-platform giúp tiết kiệm chi phí và thời gian khi chỉ cần viết code 1 lần cho cả hai hệ điều hành.",
    },
    {
      id: 6,
      question: "Firebase thường được dùng để làm gì?",
      options: [
        {
          id: "a",
          text: "Hosting backend, authentication, database realtime",
          isCorrect: true,
          percentage: 70,
        },
        { id: "b", text: "Thiết kế UI", isCorrect: false, percentage: 20 },
        { id: "c", text: "Viết game 3D", isCorrect: false, percentage: 10 },
      ],
      explanation:
        "Firebase là backend-as-a-service, giúp dev triển khai app nhanh mà không cần tự xây dựng server phức tạp.",
    },
    {
      id: 7,
      question: "App Developer cần hiểu biết về App Store/Google Play vì sao?",
      options: [
        {
          id: "a",
          text: "Để biết cách publish và cập nhật app",
          isCorrect: true,
          percentage: 75,
        },
        { id: "b", text: "Để học marketing", isCorrect: false, percentage: 15 },
        {
          id: "c",
          text: "Không cần quan tâm",
          isCorrect: false,
          percentage: 10,
        },
      ],
      explanation:
        "Dev cần nắm quy trình upload, review, update và tuân thủ chính sách của App Store/Google Play.",
    },
    {
      id: 8,
      question: "Mobile app khác gì so với web app?",
      options: [
        {
          id: "a",
          text: "Có thể truy cập offline và tận dụng phần cứng (camera, GPS)",
          isCorrect: true,
          percentage: 65,
        },
        {
          id: "b",
          text: "Chạy trên trình duyệt",
          isCorrect: false,
          percentage: 20,
        },
        {
          id: "c",
          text: "Không bao giờ cần internet",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Mobile app có thể truy cập camera, GPS, push notification, hoạt động tốt cả khi offline.",
    },
    {
      id: 9,
      question: "Testing mobile app quan trọng vì sao?",
      options: [
        {
          id: "a",
          text: "Có quá nhiều thiết bị, độ phân giải, OS version khác nhau",
          isCorrect: true,
          percentage: 70,
        },
        {
          id: "b",
          text: "Để không ai chê UI xấu",
          isCorrect: false,
          percentage: 20,
        },
        {
          id: "c",
          text: "Không cần test, cứ publish",
          isCorrect: false,
          percentage: 10,
        },
      ],
      explanation:
        "Test đảm bảo app hoạt động ổn định trên nhiều loại máy và phiên bản hệ điều hành.",
    },
    {
      id: 10,
      question: "Một kỹ năng mềm quan trọng với App Developer là gì?",
      options: [
        {
          id: "a",
          text: "Khả năng giải quyết vấn đề",
          isCorrect: true,
          percentage: 65,
        },
        {
          id: "b",
          text: "Chỉ cần gõ code nhanh",
          isCorrect: false,
          percentage: 20,
        },
        {
          id: "c",
          text: "Không cần kỹ năng mềm",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Ngoài code, dev phải xử lý bug, tối ưu performance và làm việc với team, nên kỹ năng problem-solving rất quan trọng.",
    },
    {
      id: 11,
      question: "App Developer có thể làm việc freelance không?",
      options: [
        {
          id: "a",
          text: "Có, có thể nhận dự án riêng như app bán hàng, app booking",
          isCorrect: true,
          percentage: 70,
        },
        {
          id: "b",
          text: "Không, chỉ công ty mới thuê",
          isCorrect: false,
          percentage: 20,
        },
        {
          id: "c",
          text: "Chỉ khi biết design",
          isCorrect: false,
          percentage: 10,
        },
      ],
      explanation:
        "Nhu cầu app cá nhân/doanh nghiệp rất nhiều, freelancer có thể dễ dàng tìm khách hàng.",
    },
    {
      id: 12,
      question: "App performance kém thường gây hậu quả gì?",
      options: [
        {
          id: "a",
          text: "Người dùng gỡ app, đánh giá thấp",
          isCorrect: true,
          percentage: 75,
        },
        {
          id: "b",
          text: "Không ảnh hưởng gì",
          isCorrect: false,
          percentage: 15,
        },
        {
          id: "c",
          text: "Chỉ khiến dev buồn",
          isCorrect: false,
          percentage: 10,
        },
      ],
      explanation:
        "App chậm, lag dễ khiến user bỏ đi và ảnh hưởng trực tiếp đến rating cũng như doanh thu.",
    },
    {
      id: 13,
      question: "App Developer có cần học bảo mật (security) không?",
      options: [
        {
          id: "a",
          text: "Có, để bảo vệ dữ liệu người dùng",
          isCorrect: true,
          percentage: 70,
        },
        {
          id: "b",
          text: "Không, chỉ backend lo",
          isCorrect: false,
          percentage: 20,
        },
        { id: "c", text: "Không quan trọng", isCorrect: false, percentage: 10 },
      ],
      explanation:
        "Dev cần đảm bảo dữ liệu cá nhân, thanh toán, API đều an toàn, tránh hack và rò rỉ.",
    },
    {
      id: 14,
      question: "Điểm khó khăn lớn khi làm App Developer là gì?",
      options: [
        {
          id: "a",
          text: "Phải tối ưu cho nhiều thiết bị và hệ điều hành",
          isCorrect: true,
          percentage: 65,
        },
        {
          id: "b",
          text: "Không bao giờ có bug",
          isCorrect: false,
          percentage: 20,
        },
        {
          id: "c",
          text: "Không có công cụ hỗ trợ",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Có hàng trăm loại điện thoại Android với cấu hình khác nhau, đó là thử thách lớn khi làm app.",
    },
    {
      id: 15,
      question:
        "Nếu bạn thích tạo sản phẩm mà người dùng mang theo trong túi, nghề App Developer có phù hợp?",
      options: [
        {
          id: "a",
          text: "Có, vì app luôn gắn liền với đời sống hàng ngày",
          isCorrect: true,
          percentage: 75,
        },
        {
          id: "b",
          text: "Không, chỉ phù hợp với Web Developer",
          isCorrect: false,
          percentage: 15,
        },
        {
          id: "c",
          text: "Chỉ dành cho designer",
          isCorrect: false,
          percentage: 10,
        },
      ],
      explanation:
        "App Developer tạo ra ứng dụng mà người dùng sử dụng hằng ngày trên smartphone, từ mạng xã hội đến mua sắm và học tập.",
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
        "Consistency và usability quan trọng hơn cả, giúp người dùng dễ dàng làm quen và sử dụng sản phẩm.",
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
        "User research nên diễn ra liên tục: từ lên ý tưởng, test prototype, cho đến sau khi sản phẩm ra mắt.",
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
        "Prototype là bản nháp có thể tương tác, giúp kiểm chứng ý tưởng với user trước khi tốn công code.",
    },
    {
      id: 4,
      question: "UX viết tắt của cụm từ nào?",
      options: [
        { id: "a", text: "User Experience", isCorrect: true, percentage: 80 },
        {
          id: "b",
          text: "Unique Expression",
          isCorrect: false,
          percentage: 10,
        },
        { id: "c", text: "Ultra Extra", isCorrect: false, percentage: 10 },
      ],
      explanation:
        "UX là trải nghiệm người dùng – tập trung vào cách họ cảm nhận và sử dụng sản phẩm.",
    },
    {
      id: 5,
      question: "Wireframe được sử dụng để làm gì?",
      options: [
        {
          id: "a",
          text: "Vẽ layout cơ bản trước khi design chi tiết",
          isCorrect: true,
          percentage: 70,
        },
        {
          id: "b",
          text: "Thay thế cho code",
          isCorrect: false,
          percentage: 20,
        },
        {
          id: "c",
          text: "Trang trí cho đẹp",
          isCorrect: false,
          percentage: 10,
        },
      ],
      explanation:
        "Wireframe giống như khung xương của sản phẩm, giúp định hình cấu trúc và chức năng trước khi đi sâu vào chi tiết.",
    },
    {
      id: 6,
      question: "Màu sắc trong design ảnh hưởng đến điều gì?",
      options: [
        {
          id: "a",
          text: "Cảm xúc và hành vi của người dùng",
          isCorrect: true,
          percentage: 75,
        },
        { id: "b", text: "Chỉ để làm đẹp", isCorrect: false, percentage: 15 },
        {
          id: "c",
          text: "Không có tác dụng gì",
          isCorrect: false,
          percentage: 10,
        },
      ],
      explanation:
        "Màu sắc gợi cảm xúc, tạo điểm nhấn và điều hướng hành vi (ví dụ: nút màu đỏ dễ thu hút sự chú ý).",
    },
    {
      id: 7,
      question: "Typography trong UI/UX có vai trò gì?",
      options: [
        {
          id: "a",
          text: "Truyền tải thông tin rõ ràng, dễ đọc",
          isCorrect: true,
          percentage: 70,
        },
        {
          id: "b",
          text: "Chỉ để trang trí chữ",
          isCorrect: false,
          percentage: 20,
        },
        {
          id: "c",
          text: "Không quan trọng bằng hình ảnh",
          isCorrect: false,
          percentage: 10,
        },
      ],
      explanation:
        "Typography giúp người dùng tiếp nhận thông tin dễ dàng, là yếu tố cơ bản trong UI design.",
    },
    {
      id: 8,
      question: "Design Thinking là gì?",
      options: [
        {
          id: "a",
          text: "Quy trình giải quyết vấn đề dựa trên người dùng",
          isCorrect: true,
          percentage: 65,
        },
        {
          id: "b",
          text: "Một phong cách vẽ mới",
          isCorrect: false,
          percentage: 20,
        },
        {
          id: "c",
          text: "Cách sử dụng Photoshop",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Design Thinking tập trung vào con người, lắng nghe nhu cầu người dùng và tạo giải pháp sáng tạo.",
    },
    {
      id: 9,
      question: "Usability Testing được dùng để?",
      options: [
        {
          id: "a",
          text: "Quan sát người dùng tương tác với sản phẩm",
          isCorrect: true,
          percentage: 70,
        },
        {
          id: "b",
          text: "Kiểm tra tốc độ server",
          isCorrect: false,
          percentage: 15,
        },
        {
          id: "c",
          text: "Thiết kế banner quảng cáo",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Usability testing giúp hiểu xem người dùng có gặp khó khăn khi sử dụng sản phẩm hay không.",
    },
    {
      id: 10,
      question: "UI và UX khác nhau thế nào?",
      options: [
        {
          id: "a",
          text: "UI là giao diện, UX là trải nghiệm",
          isCorrect: true,
          percentage: 75,
        },
        { id: "b", text: "UI và UX là một", isCorrect: false, percentage: 15 },
        {
          id: "c",
          text: "UI chỉ dành cho mobile",
          isCorrect: false,
          percentage: 10,
        },
      ],
      explanation:
        "UI tập trung vào phần nhìn thấy (màu sắc, layout), UX tập trung vào hành trình và trải nghiệm của người dùng.",
    },
    {
      id: 11,
      question: "Một kỹ năng mềm quan trọng với Designer là gì?",
      options: [
        {
          id: "a",
          text: "Kỹ năng giao tiếp và thuyết trình",
          isCorrect: true,
          percentage: 65,
        },
        {
          id: "b",
          text: "Không cần, chỉ cần vẽ đẹp",
          isCorrect: false,
          percentage: 20,
        },
        { id: "c", text: "Biết code", isCorrect: false, percentage: 15 },
      ],
      explanation:
        "Designer cần giao tiếp tốt để trình bày ý tưởng, thuyết phục team và khách hàng.",
    },
    {
      id: 12,
      question: "Figma/Sketch/Adobe XD là công cụ dùng để?",
      options: [
        {
          id: "a",
          text: "Thiết kế UI/UX, prototype",
          isCorrect: true,
          percentage: 70,
        },
        {
          id: "b",
          text: "Lập trình backend",
          isCorrect: false,
          percentage: 15,
        },
        { id: "c", text: "Quản lý dự án", isCorrect: false, percentage: 15 },
      ],
      explanation:
        "Đây là các công cụ phổ biến để tạo UI, wireframe, prototype và cộng tác với developer.",
    },
    {
      id: 13,
      question: "Accessibility trong design có nghĩa là gì?",
      options: [
        {
          id: "a",
          text: "Thiết kế để ai cũng có thể sử dụng, kể cả người khuyết tật",
          isCorrect: true,
          percentage: 70,
        },
        {
          id: "b",
          text: "Chỉ tập trung vào người dùng chính",
          isCorrect: false,
          percentage: 20,
        },
        { id: "c", text: "Không quan trọng", isCorrect: false, percentage: 10 },
      ],
      explanation:
        "Accessibility giúp sản phẩm thân thiện với tất cả mọi người, từ người khiếm thị đến người lớn tuổi.",
    },
    {
      id: 14,
      question: "Designer có cần hiểu code không?",
      options: [
        {
          id: "a",
          text: "Không bắt buộc, nhưng hiểu cơ bản giúp giao tiếp tốt với dev",
          isCorrect: true,
          percentage: 65,
        },
        {
          id: "b",
          text: "Phải code giỏi như developer",
          isCorrect: false,
          percentage: 20,
        },
        {
          id: "c",
          text: "Không bao giờ cần",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Biết HTML/CSS cơ bản giúp designer giao tiếp hiệu quả hơn với dev, nhưng không cần code chuyên sâu.",
    },
    {
      id: 15,
      question:
        "Nếu bạn thích sáng tạo và quan tâm đến trải nghiệm người dùng, nghề Designer có phù hợp?",
      options: [
        {
          id: "a",
          text: "Có, vì Designer kết hợp nghệ thuật và công nghệ để giúp cuộc sống dễ dàng hơn",
          isCorrect: true,
          percentage: 75,
        },
        {
          id: "b",
          text: "Không, chỉ phù hợp với coder",
          isCorrect: false,
          percentage: 15,
        },
        {
          id: "c",
          text: "Chỉ dành cho người vẽ giỏi",
          isCorrect: false,
          percentage: 10,
        },
      ],
      explanation:
        "Designer không chỉ cần vẽ đẹp mà còn phải hiểu người dùng. Nếu bạn thích sáng tạo và đồng cảm với người khác, đây là nghề phù hợp.",
    },
  ],

  "project-manager": [
  {
    id: 1,
    question: "Project Manager thường giống vai trò nào trong một đội bóng?",
    options: [
      { id: "a", text: "Cầu thủ ghi bàn", isCorrect: false, percentage: 20 },
      { id: "b", text: "Huấn luyện viên, người sắp xếp chiến thuật", isCorrect: true, percentage: 65 },
      { id: "c", text: "Cổ động viên", isCorrect: false, percentage: 15 },
    ],
    explanation:
      "PM giống như huấn luyện viên: không trực tiếp 'đá bóng' nhưng định hướng, chia vai trò và giữ tinh thần đội ngũ.",
  },
  {
    id: 2,
    question: "Kỹ năng quan trọng nhất của một Project Manager là gì?",
    options: [
      { id: "a", text: "Lập trình giỏi", isCorrect: false, percentage: 15 },
      { id: "b", text: "Quản lý con người và giao tiếp tốt", isCorrect: true, percentage: 70 },
      { id: "c", text: "Thiết kế đẹp", isCorrect: false, percentage: 15 },
    ],
    explanation:
      "PM không nhất thiết phải code hay design, nhưng cần giao tiếp giỏi và giữ kết nối giữa các thành viên.",
  },
  {
    id: 3,
    question: "Một dự án thường thất bại vì lý do gì?",
    options: [
      { id: "a", text: "Không có ý tưởng hay", isCorrect: false, percentage: 20 },
      { id: "b", text: "Quản lý kém: thiếu kế hoạch, trễ deadline", isCorrect: true, percentage: 65 },
      { id: "c", text: "Không có đủ màu sắc trong thiết kế", isCorrect: false, percentage: 15 },
    ],
    explanation:
      "Nhiều dự án thất bại không phải vì ý tưởng tệ, mà do quản lý kém: không rõ ràng timeline, ngân sách, hay phân công.",
  },
  {
    id: 4,
    question: "PM làm gì khi team có mâu thuẫn?",
    options: [
      { id: "a", text: "Đứng ngoài để họ tự giải quyết", isCorrect: false, percentage: 20 },
      { id: "b", text: "Trung gian lắng nghe, tìm cách dung hòa", isCorrect: true, percentage: 65 },
      { id: "c", text: "Chọn phe mình thích", isCorrect: false, percentage: 15 },
    ],
    explanation:
      "PM giống như 'người giữ hòa khí', giúp cả team hợp tác thay vì chia rẽ.",
  },
  {
    id: 5,
    question: "Timeline trong quản lý dự án nghĩa là gì?",
    options: [
      { id: "a", text: "Bảng kế hoạch thời gian để hoàn thành công việc", isCorrect: true, percentage: 70 },
      { id: "b", text: "Mốc để chụp ảnh kỷ niệm", isCorrect: false, percentage: 15 },
      { id: "c", text: "Biểu đồ tài chính", isCorrect: false, percentage: 15 },
    ],
    explanation:
      "Timeline giống như lịch trình, giúp cả team biết khi nào cần hoàn thành từng giai đoạn.",
  },
  {
    id: 6,
    question: "Công cụ nào phổ biến giúp PM quản lý công việc?",
    options: [
      { id: "a", text: "Jira, Trello, Asana", isCorrect: true, percentage: 70 },
      { id: "b", text: "Photoshop", isCorrect: false, percentage: 15 },
      { id: "c", text: "VS Code", isCorrect: false, percentage: 15 },
    ],
    explanation:
      "Jira, Trello, Asana là công cụ quản lý task, timeline và tiến độ cho cả team.",
  },
  {
    id: 7,
    question: "Ngân sách (budget) trong dự án dùng để làm gì?",
    options: [
      { id: "a", text: "Xác định chi phí cần để hoàn thành dự án", isCorrect: true, percentage: 75 },
      { id: "b", text: "Dùng để thưởng team đi ăn", isCorrect: false, percentage: 15 },
      { id: "c", text: "Không cần thiết", isCorrect: false, percentage: 10 },
    ],
    explanation:
      "Budget giúp PM tính toán chi phí, tránh lãng phí và đảm bảo dự án khả thi.",
  },
  {
    id: 8,
    question: "PM có cần biết kỹ thuật (code, design) không?",
    options: [
      { id: "a", text: "Không bắt buộc, nhưng hiểu cơ bản giúp nói chuyện với team", isCorrect: true, percentage: 65 },
      { id: "b", text: "Phải giỏi như developer", isCorrect: false, percentage: 20 },
      { id: "c", text: "Không cần biết gì cả", isCorrect: false, percentage: 15 },
    ],
    explanation:
      "PM không cần làm chuyên môn, nhưng biết cơ bản giúp giao tiếp và đưa quyết định thực tế.",
  },
  {
    id: 9,
    question: "Agile là gì trong quản lý dự án?",
    options: [
      { id: "a", text: "Phương pháp linh hoạt, chia nhỏ công việc theo sprint", isCorrect: true, percentage: 70 },
      { id: "b", text: "Một loại phần mềm", isCorrect: false, percentage: 15 },
      { id: "c", text: "Tên của một công ty", isCorrect: false, percentage: 15 },
    ],
    explanation:
      "Agile là phương pháp phổ biến, giúp team làm việc linh hoạt và thích ứng nhanh với thay đổi.",
  },
  {
    id: 10,
    question: "Khi dự án bị trễ deadline, PM nên làm gì?",
    options: [
      { id: "a", text: "Báo cáo tình hình, thương lượng lại với khách hàng", isCorrect: true, percentage: 65 },
      { id: "b", text: "Giấu đi và hy vọng không ai phát hiện", isCorrect: false, percentage: 20 },
      { id: "c", text: "Đổ lỗi cho team", isCorrect: false, percentage: 15 },
    ],
    explanation:
      "PM cần minh bạch tình hình, thảo luận với khách hàng để đưa ra giải pháp.",
  },
  {
    id: 11,
    question: "Stakeholder là ai trong dự án?",
    options: [
      { id: "a", text: "Những người có liên quan hoặc bị ảnh hưởng bởi dự án", isCorrect: true, percentage: 70 },
      { id: "b", text: "Chỉ developer", isCorrect: false, percentage: 15 },
      { id: "c", text: "Người ngoài cuộc", isCorrect: false, percentage: 15 },
    ],
    explanation:
      "Stakeholder có thể là khách hàng, sếp, hoặc người dùng cuối – tất cả những ai quan tâm đến dự án.",
  },
  {
    id: 12,
    question: "Risk Management (quản lý rủi ro) là gì?",
    options: [
      { id: "a", text: "Dự đoán vấn đề có thể xảy ra và chuẩn bị cách xử lý", isCorrect: true, percentage: 65 },
      { id: "b", text: "Chỉ xử lý khi sự cố xảy ra", isCorrect: false, percentage: 20 },
      { id: "c", text: "Không quan trọng", isCorrect: false, percentage: 15 },
    ],
    explanation:
      "Quản lý rủi ro giúp dự án ít bị bất ngờ và có phương án ứng phó kịp thời.",
  },
  {
    id: 13,
    question: "PM khác với Team Leader ở điểm nào?",
    options: [
      { id: "a", text: "PM quản lý toàn bộ dự án, Team Leader tập trung vào nhóm cụ thể", isCorrect: true, percentage: 70 },
      { id: "b", text: "Không có gì khác", isCorrect: false, percentage: 15 },
      { id: "c", text: "PM chỉ quản lý tài chính", isCorrect: false, percentage: 15 },
    ],
    explanation:
      "PM nhìn toàn cảnh dự án (timeline, budget, stakeholder), còn Team Leader chỉ phụ trách nhóm chuyên môn.",
  },
  {
    id: 14,
    question: "Daily Standup trong Agile có ý nghĩa gì?",
    options: [
      { id: "a", text: "Cuộc họp ngắn để team cập nhật tiến độ mỗi ngày", isCorrect: true, percentage: 75 },
      { id: "b", text: "Buổi party hàng ngày", isCorrect: false, percentage: 15 },
      { id: "c", text: "Báo cáo cho khách hàng", isCorrect: false, percentage: 10 },
    ],
    explanation:
      "Daily standup chỉ 15 phút, giúp team cập nhật công việc, chướng ngại và phối hợp nhịp nhàng.",
  },
  {
    id: 15,
    question: "Nếu bạn thích tổ chức, sắp xếp và kết nối mọi người, nghề Project Manager có phù hợp?",
    options: [
      { id: "a", text: "Có, PM là người giữ nhịp cho cả dự án", isCorrect: true, percentage: 75 },
      { id: "b", text: "Không, PM chỉ cần biết code", isCorrect: false, percentage: 15 },
      { id: "c", text: "Chỉ phù hợp với người giỏi tài chính", isCorrect: false, percentage: 10 },
    ],
    explanation:
      "PM phù hợp cho người thích điều phối, quản lý và làm việc với con người, chứ không chỉ giỏi kỹ thuật.",
  },
],


  "business-analyst": [
  {
    id: 1,
    question: "Business Analyst (BA) giống vai trò nào trong một bộ phim?",
    options: [
      { id: "a", text: "Diễn viên chính", isCorrect: false, percentage: 20 },
      { id: "b", text: "Phiên dịch viên giữa đạo diễn và diễn viên", isCorrect: true, percentage: 65 },
      { id: "c", text: "Khán giả", isCorrect: false, percentage: 15 }
    ],
    explanation:
      "BA giống như 'phiên dịch viên' – chuyển đổi nhu cầu của khách hàng thành ngôn ngữ dễ hiểu cho team kỹ thuật."
  },
  {
    id: 2,
    question: "Kỹ năng quan trọng nhất của BA là gì?",
    options: [
      { id: "a", text: "Lập trình giỏi", isCorrect: false, percentage: 15 },
      { id: "b", text: "Phân tích và giao tiếp tốt", isCorrect: true, percentage: 70 },
      { id: "c", text: "Thiết kế giao diện đẹp", isCorrect: false, percentage: 15 }
    ],
    explanation:
      "BA không cần code hay design, nhưng phải phân tích và giao tiếp tốt để hiểu và truyền đạt yêu cầu."
  },
  {
    id: 3,
    question: "Tài liệu quan trọng mà BA thường tạo ra là gì?",
    options: [
      { id: "a", text: "Requirement Document (tài liệu yêu cầu)", isCorrect: true, percentage: 70 },
      { id: "b", text: "Slide quảng cáo", isCorrect: false, percentage: 15 },
      { id: "c", text: "Mã nguồn phần mềm", isCorrect: false, percentage: 15 }
    ],
    explanation:
      "Requirement Document mô tả chi tiết yêu cầu của khách hàng để dev và tester hiểu rõ."
  },
  {
    id: 4,
    question: "BA thường làm việc nhiều nhất với ai?",
    options: [
      { id: "a", text: "Khách hàng và team dev/tester", isCorrect: true, percentage: 75 },
      { id: "b", text: "Chỉ với designer", isCorrect: false, percentage: 15 },
      { id: "c", text: "Không làm việc với ai", isCorrect: false, percentage: 10 }
    ],
    explanation:
      "BA là cầu nối giữa khách hàng và team kỹ thuật, đảm bảo hai bên hiểu đúng ý nhau."
  },
  {
    id: 5,
    question: "Khi khách hàng chỉ nói mơ hồ 'tôi muốn app dễ dùng', BA sẽ làm gì?",
    options: [
      { id: "a", text: "Hỏi chi tiết, phân tích để làm rõ yêu cầu", isCorrect: true, percentage: 70 },
      { id: "b", text: "Đoán và đưa cho dev làm luôn", isCorrect: false, percentage: 20 },
      { id: "c", text: "Bỏ qua vì không cụ thể", isCorrect: false, percentage: 10 }
    ],
    explanation:
      "BA phải đào sâu, đặt câu hỏi để biến ý mơ hồ thành yêu cầu cụ thể."
  },
  {
    id: 6,
    question: "Use Case trong BA có nghĩa là gì?",
    options: [
      { id: "a", text: "Mô tả cách người dùng tương tác với hệ thống", isCorrect: true, percentage: 70 },
      { id: "b", text: "Một loại case điện thoại", isCorrect: false, percentage: 15 },
      { id: "c", text: "Cách viết code", isCorrect: false, percentage: 15 }
    ],
    explanation:
      "Use Case giúp mô tả hành vi người dùng và cách hệ thống phản hồi."
  },
  {
    id: 7,
    question: "BA có cần biết code không?",
    options: [
      { id: "a", text: "Không bắt buộc, chỉ cần hiểu cơ bản để trao đổi với dev", isCorrect: true, percentage: 65 },
      { id: "b", text: "Phải code giỏi như developer", isCorrect: false, percentage: 20 },
      { id: "c", text: "Không cần biết gì về công nghệ", isCorrect: false, percentage: 15 }
    ],
    explanation:
      "BA không code, nhưng hiểu cơ bản sẽ giúp giao tiếp và đưa yêu cầu chính xác hơn."
  },
  {
    id: 8,
    question: "BA và PM (Project Manager) khác nhau ở đâu?",
    options: [
      { id: "a", text: "BA phân tích yêu cầu, PM quản lý tiến độ và con người", isCorrect: true, percentage: 70 },
      { id: "b", text: "Không khác gì nhau", isCorrect: false, percentage: 15 },
      { id: "c", text: "BA chỉ làm việc với tài chính", isCorrect: false, percentage: 15 }
    ],
    explanation:
      "BA tập trung vào yêu cầu và giải pháp, còn PM tập trung vào timeline, budget và tổ chức."
  },
  {
    id: 9,
    question: "Khi dev nói: 'Yêu cầu này không khả thi về mặt kỹ thuật', BA nên làm gì?",
    options: [
      { id: "a", text: "Trao đổi lại với khách hàng để tìm giải pháp thay thế", isCorrect: true, percentage: 70 },
      { id: "b", text: "Bắt dev làm cho bằng được", isCorrect: false, percentage: 15 },
      { id: "c", text: "Bỏ qua yêu cầu đó", isCorrect: false, percentage: 15 }
    ],
    explanation:
      "BA cần làm trung gian, cân bằng giữa yêu cầu khách hàng và khả năng kỹ thuật."
  },
  {
    id: 10,
    question: "Một ngày điển hình của BA thường gồm việc gì?",
    options: [
      { id: "a", text: "Họp với khách hàng, viết tài liệu, trao đổi với dev/tester", isCorrect: true, percentage: 75 },
      { id: "b", text: "Ngồi code cả ngày", isCorrect: false, percentage: 15 },
      { id: "c", text: "Chỉ thiết kế giao diện", isCorrect: false, percentage: 10 }
    ],
    explanation:
      "BA thường xuyên làm việc với nhiều bên để giữ cho yêu cầu rõ ràng và cập nhật."
  },
  {
    id: 11,
    question: "BA có tham gia vào việc test sản phẩm không?",
    options: [
      { id: "a", text: "Có, BA thường kiểm tra xem sản phẩm có đáp ứng yêu cầu đã ghi không", isCorrect: true, percentage: 70 },
      { id: "b", text: "Không, đó chỉ là việc của QA", isCorrect: false, percentage: 20 },
      { id: "c", text: "BA chỉ viết tài liệu", isCorrect: false, percentage: 10 }
    ],
    explanation:
      "BA tham gia UAT (User Acceptance Test) để xác nhận sản phẩm đúng yêu cầu khách hàng."
  },
  {
    id: 12,
    question: "Khi khách hàng liên tục đổi yêu cầu, BA nên làm gì?",
    options: [
      { id: "a", text: "Quản lý thay đổi, ghi nhận và đánh giá tác động", isCorrect: true, percentage: 65 },
      { id: "b", text: "Phớt lờ và giữ nguyên", isCorrect: false, percentage: 20 },
      { id: "c", text: "Bỏ luôn dự án", isCorrect: false, percentage: 15 }
    ],
    explanation:
      "BA cần quản lý change request để tránh ảnh hưởng quá lớn đến tiến độ và chất lượng."
  },
  {
    id: 13,
    question: "Kỹ năng mềm nào đặc biệt quan trọng với BA?",
    options: [
      { id: "a", text: "Kỹ năng lắng nghe và đặt câu hỏi", isCorrect: true, percentage: 70 },
      { id: "b", text: "Chỉ cần kỹ thuật", isCorrect: false, percentage: 15 },
      { id: "c", text: "Chỉ cần vẽ đẹp", isCorrect: false, percentage: 15 }
    ],
    explanation:
      "BA giỏi đặt câu hỏi và lắng nghe giúp khai thác đúng nhu cầu khách hàng."
  },
  {
    id: 14,
    question: "BA có cần hiểu về ngành kinh doanh (domain knowledge) không?",
    options: [
      { id: "a", text: "Có, để đưa ra giải pháp phù hợp thực tế", isCorrect: true, percentage: 75 },
      { id: "b", text: "Không, chỉ cần biết công cụ", isCorrect: false, percentage: 15 },
      { id: "c", text: "Không liên quan gì", isCorrect: false, percentage: 10 }
    ],
    explanation:
      "Hiểu ngành (banking, e-commerce, healthcare, v.v.) giúp BA phân tích đúng và tư vấn giá trị hơn."
  },
  {
    id: 15,
    question: "Nếu bạn thích phân tích, kết nối khách hàng với team kỹ thuật, nghề BA có phù hợp?",
    options: [
      { id: "a", text: "Có, BA là cầu nối quan trọng trong dự án", isCorrect: true, percentage: 75 },
      { id: "b", text: "Không, chỉ phù hợp cho coder", isCorrect: false, percentage: 15 },
      { id: "c", text: "Không, BA chỉ viết tài chính", isCorrect: false, percentage: 10 }
    ],
    explanation:
      "Nghề BA phù hợp cho người thích tìm hiểu vấn đề, phân tích và kết nối các bên để tạo ra giải pháp."
  }
],

  "product-designer": [
  {
    id: 1,
    question: "Product Designer giống vai trò nào trong một quán cà phê?",
    options: [
      { id: "a", text: "Người pha chế (barista)", isCorrect: false, percentage: 20 },
      { id: "b", text: "Người thiết kế không gian và menu sao cho khách thích quay lại", isCorrect: true, percentage: 65 },
      { id: "c", text: "Khách hàng ngồi uống cà phê", isCorrect: false, percentage: 15 }
    ],
    explanation:
      "Product Designer không chỉ quan tâm đến giao diện, mà còn trải nghiệm tổng thể – giống như thiết kế không gian và menu để khách thấy thoải mái và hài lòng."
  },
  {
    id: 2,
    question: "Điểm khác biệt của Product Designer so với UI/UX Designer là gì?",
    options: [
      { id: "a", text: "Chỉ tập trung vào màu sắc", isCorrect: false, percentage: 15 },
      { id: "b", text: "Ngoài UI/UX còn quan tâm đến business goal và strategy", isCorrect: true, percentage: 70 },
      { id: "c", text: "Không khác gì", isCorrect: false, percentage: 15 }
    ],
    explanation:
      "Product Designer nhìn rộng hơn UI/UX, vừa thiết kế trải nghiệm vừa cân nhắc mục tiêu kinh doanh."
  },
  {
    id: 3,
    question: "Kỹ năng quan trọng nhất của Product Designer là gì?",
    options: [
      { id: "a", text: "Vẽ đẹp", isCorrect: false, percentage: 20 },
      { id: "b", text: "Tư duy thiết kế kết hợp phân tích người dùng và kinh doanh", isCorrect: true, percentage: 65 },
      { id: "c", text: "Code giỏi như developer", isCorrect: false, percentage: 15 }
    ],
    explanation:
      "Vẽ đẹp là lợi thế, nhưng điều quan trọng là tư duy thiết kế và khả năng cân bằng giữa user needs và business goals."
  },
  {
    id: 4,
    question: "Khi thiết kế sản phẩm, Product Designer phải để ý điều gì đầu tiên?",
    options: [
      { id: "a", text: "Khách hàng muốn gì và vấn đề họ gặp phải", isCorrect: true, percentage: 70 },
      { id: "b", text: "Trend màu sắc mới nhất", isCorrect: false, percentage: 15 },
      { id: "c", text: "Ý thích cá nhân của designer", isCorrect: false, percentage: 15 }
    ],
    explanation:
      "Thiết kế sản phẩm bắt đầu từ việc giải quyết vấn đề thực sự của người dùng."
  },
  {
    id: 5,
    question: "Wireframe trong công việc của Product Designer là gì?",
    options: [
      { id: "a", text: "Bản phác thảo khung xương sản phẩm", isCorrect: true, percentage: 75 },
      { id: "b", text: "Ảnh 3D sản phẩm", isCorrect: false, percentage: 15 },
      { id: "c", text: "Đoạn code đầu tiên", isCorrect: false, percentage: 10 }
    ],
    explanation:
      "Wireframe là bản phác đơn giản để nhanh chóng hình dung layout và flow trước khi đi vào chi tiết."
  },
  {
    id: 6,
    question: "Product Designer thường làm việc nhiều nhất với ai?",
    options: [
      { id: "a", text: "Chỉ với designer khác", isCorrect: false, percentage: 15 },
      { id: "b", text: "Developer, Product Manager, và Stakeholder", isCorrect: true, percentage: 70 },
      { id: "c", text: "Không cần teamwork", isCorrect: false, percentage: 15 }
    ],
    explanation:
      "Product Designer là cầu nối giữa nhiều bên để sản phẩm vừa đẹp vừa dùng tốt, lại khả thi."
  },
  {
    id: 7,
    question: "Một sản phẩm đẹp nhưng khó dùng, Product Designer sẽ nghĩ gì?",
    options: [
      { id: "a", text: "Vẫn tốt vì nhìn sang", isCorrect: false, percentage: 15 },
      { id: "b", text: "Chưa thành công vì UX kém", isCorrect: true, percentage: 70 },
      { id: "c", text: "Không quan trọng, dev sẽ sửa", isCorrect: false, percentage: 15 }
    ],
    explanation:
      "Sản phẩm thành công phải kết hợp giữa tính thẩm mỹ và trải nghiệm người dùng."
  },
  {
    id: 8,
    question: "Design System là gì?",
    options: [
      { id: "a", text: "Bộ guideline và component giúp thiết kế nhất quán", isCorrect: true, percentage: 75 },
      { id: "b", text: "Một phần mềm thiết kế", isCorrect: false, percentage: 15 },
      { id: "c", text: "Logo của công ty", isCorrect: false, percentage: 10 }
    ],
    explanation:
      "Design System giúp team tiết kiệm thời gian, giữ sự đồng nhất trong sản phẩm."
  },
  {
    id: 9,
    question: "Product Designer có cần biết về nghiên cứu người dùng (User Research) không?",
    options: [
      { id: "a", text: "Có, để hiểu insight người dùng", isCorrect: true, percentage: 70 },
      { id: "b", text: "Không, chỉ cần biết vẽ", isCorrect: false, percentage: 15 },
      { id: "c", text: "Đó là việc của marketing", isCorrect: false, percentage: 15 }
    ],
    explanation:
      "Nghiên cứu người dùng giúp Product Designer đưa ra giải pháp thực tế và hữu ích."
  },
  {
    id: 10,
    question: "Prototype trong thiết kế sản phẩm có mục đích gì?",
    options: [
      { id: "a", text: "Test ý tưởng trước khi build thật", isCorrect: true, percentage: 70 },
      { id: "b", text: "Thay thế cho sản phẩm chính thức", isCorrect: false, percentage: 15 },
      { id: "c", text: "Chỉ để làm đẹp portfolio", isCorrect: false, percentage: 15 }
    ],
    explanation:
      "Prototype cho phép thử nghiệm và nhận feedback sớm, giảm rủi ro."
  },
  {
    id: 11,
    question: "Product Designer có cần biết code không?",
    options: [
      { id: "a", text: "Không bắt buộc, nhưng biết cơ bản để giao tiếp với dev", isCorrect: true, percentage: 65 },
      { id: "b", text: "Phải giỏi code như developer", isCorrect: false, percentage: 20 },
      { id: "c", text: "Không cần quan tâm đến code", isCorrect: false, percentage: 15 }
    ],
    explanation:
      "Biết chút front-end giúp Product Designer thiết kế khả thi và trao đổi tốt với dev."
  },
  {
    id: 12,
    question: "Một ngày điển hình của Product Designer thường gồm việc gì?",
    options: [
      { id: "a", text: "Nghiên cứu user, vẽ wireframe, làm prototype, họp với team", isCorrect: true, percentage: 70 },
      { id: "b", text: "Ngồi code cả ngày", isCorrect: false, percentage: 15 },
      { id: "c", text: "Chỉ vẽ logo", isCorrect: false, percentage: 15 }
    ],
    explanation:
      "Product Designer vừa sáng tạo vừa cộng tác, làm việc đa dạng chứ không chỉ vẽ."
  },
  {
    id: 13,
    question: "Nếu khách hàng muốn 'tất cả tính năng trong một app', Product Designer sẽ làm gì?",
    options: [
      { id: "a", text: "Phân tích ưu tiên, chọn tính năng cốt lõi", isCorrect: true, percentage: 70 },
      { id: "b", text: "Làm hết luôn cho nhanh", isCorrect: false, percentage: 15 },
      { id: "c", text: "Từ chối làm việc", isCorrect: false, percentage: 15 }
    ],
    explanation:
      "Product Designer phải biết ưu tiên, tránh biến sản phẩm thành 'nồi lẩu thập cẩm'."
  },
  {
    id: 14,
    question: "Product Designer có liên quan đến business không?",
    options: [
      { id: "a", text: "Có, cần cân bằng giữa nhu cầu người dùng và mục tiêu kinh doanh", isCorrect: true, percentage: 75 },
      { id: "b", text: "Không, chỉ quan tâm đến cái đẹp", isCorrect: false, percentage: 15 },
      { id: "c", text: "Đó là việc của CEO", isCorrect: false, percentage: 10 }
    ],
    explanation:
      "Product Designer thành công phải hiểu business để thiết kế giải pháp vừa hữu ích vừa sinh lời."
  },
  {
    id: 15,
    question: "Nếu bạn thích vừa sáng tạo, vừa phân tích, vừa làm việc đa lĩnh vực, nghề Product Designer có phù hợp?",
    options: [
      { id: "a", text: "Có, Product Designer kết hợp design + user research + business thinking", isCorrect: true, percentage: 75 },
      { id: "b", text: "Không, chỉ hợp cho coder", isCorrect: false, percentage: 15 },
      { id: "c", text: "Không, chỉ hợp cho dân marketing", isCorrect: false, percentage: 10 }
    ],
    explanation:
      "Product Designer là nghề phù hợp cho những ai thích đa kỹ năng và tạo ra sản phẩm toàn diện."
  }
],

};
