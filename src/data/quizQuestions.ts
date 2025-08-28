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
      question: "Tester chủ yếu làm công việc gì?",
      options: [
        {
          id: "a",
          text: "Viết code chính cho sản phẩm",
          isCorrect: false,
          percentage: 15,
        },
        {
          id: "b",
          text: "Kiểm tra và đảm bảo chất lượng phần mềm",
          isCorrect: true,
          percentage: 70,
        },
        {
          id: "c",
          text: "Thiết kế giao diện người dùng",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Tester chịu trách nhiệm kiểm tra, phát hiện lỗi và đảm bảo sản phẩm hoạt động đúng yêu cầu.",
    },
    {
      id: 2,
      question: "Automation Testing là gì?",
      options: [
        {
          id: "a",
          text: "Việc tester test thủ công",
          isCorrect: false,
          percentage: 20,
        },
        {
          id: "b",
          text: "Sử dụng công cụ để tự động chạy test case",
          isCorrect: true,
          percentage: 65,
        },
        {
          id: "c",
          text: "Test do khách hàng thực hiện",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Automation Testing giúp tiết kiệm thời gian bằng cách dùng tool/script để chạy test lặp lại.",
    },
    {
      id: 3,
      question: "Bug report cần chứa thông tin gì?",
      options: [
        {
          id: "a",
          text: "Tên bug, bước tái hiện, mức độ ảnh hưởng",
          isCorrect: true,
          percentage: 75,
        },
        {
          id: "b",
          text: "Chỉ ảnh chụp màn hình",
          isCorrect: false,
          percentage: 15,
        },
        {
          id: "c",
          text: "Mã nguồn chi tiết",
          isCorrect: false,
          percentage: 10,
        },
      ],
      explanation:
        "Một bug report chuẩn cần mô tả rõ để dev dễ tái hiện và sửa lỗi.",
    },
    {
      id: 4,
      question: "Unit Testing kiểm thử ở mức nào?",
      options: [
        { id: "a", text: "Toàn bộ hệ thống", isCorrect: false, percentage: 20 },
        {
          id: "b",
          text: "Từng module hoặc hàm nhỏ",
          isCorrect: true,
          percentage: 65,
        },
        {
          id: "c",
          text: "Trải nghiệm người dùng",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Unit Testing tập trung kiểm tra các thành phần nhỏ nhất của chương trình.",
    },
    {
      id: 5,
      question: "Regression Testing nhằm mục đích gì?",
      options: [
        {
          id: "a",
          text: "Đảm bảo tính năng cũ vẫn hoạt động sau khi sửa/chỉnh",
          isCorrect: true,
          percentage: 70,
        },
        {
          id: "b",
          text: "Tìm tính năng mới",
          isCorrect: false,
          percentage: 15,
        },
        {
          id: "c",
          text: "Đánh giá giao diện",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Regression test giúp phát hiện lỗi phát sinh khi có sự thay đổi trong code.",
    },
    {
      id: 6,
      question: "Công cụ phổ biến để quản lý bug là gì?",
      options: [
        { id: "a", text: "Jira", isCorrect: true, percentage: 75 },
        { id: "b", text: "MS Word", isCorrect: false, percentage: 10 },
        { id: "c", text: "Figma", isCorrect: false, percentage: 15 },
      ],
      explanation:
        "Jira là công cụ phổ biến dùng để quản lý bug, task, và theo dõi tiến độ.",
    },
    {
      id: 7,
      question: "Smoke Testing thường được dùng khi nào?",
      options: [
        {
          id: "a",
          text: "Ngay sau khi build mới",
          isCorrect: true,
          percentage: 70,
        },
        {
          id: "b",
          text: "Chỉ khi kết thúc dự án",
          isCorrect: false,
          percentage: 20,
        },
        {
          id: "c",
          text: "Sau khi release ra thị trường",
          isCorrect: false,
          percentage: 10,
        },
      ],
      explanation:
        "Smoke test nhanh để kiểm tra build có ổn định trước khi test chi tiết hay không.",
    },
    {
      id: 8,
      question: "API Testing được thực hiện bằng công cụ nào?",
      options: [
        { id: "a", text: "Postman", isCorrect: true, percentage: 70 },
        { id: "b", text: "Photoshop", isCorrect: false, percentage: 15 },
        { id: "c", text: "Excel", isCorrect: false, percentage: 15 },
      ],
      explanation:
        "Postman là công cụ phổ biến để test API, kiểm tra request và response.",
    },
    {
      id: 9,
      question: "Performance Testing giúp kiểm tra điều gì?",
      options: [
        {
          id: "a",
          text: "Khả năng chịu tải và tốc độ phản hồi",
          isCorrect: true,
          percentage: 75,
        },
        {
          id: "b",
          text: "Tính thân thiện giao diện",
          isCorrect: false,
          percentage: 15,
        },
        { id: "c", text: "Quy trình dev", isCorrect: false, percentage: 10 },
      ],
      explanation:
        "Performance test đo tốc độ, độ ổn định và khả năng chịu tải của hệ thống.",
    },
    {
      id: 10,
      question: "Test case là gì?",
      options: [
        {
          id: "a",
          text: "Một kịch bản mô tả bước test và kết quả mong đợi",
          isCorrect: true,
          percentage: 70,
        },
        {
          id: "b",
          text: "Báo cáo cuối dự án",
          isCorrect: false,
          percentage: 15,
        },
        { id: "c", text: "Đoạn code mẫu", isCorrect: false, percentage: 15 },
      ],
      explanation:
        "Test case định nghĩa cách kiểm tra một tính năng cụ thể và kết quả mong đợi.",
    },
    {
      id: 11,
      question: "Bạn thường làm gì khi phát hiện bug?",
      options: [
        {
          id: "a",
          text: "Bỏ qua vì không quan trọng",
          isCorrect: false,
          percentage: 10,
        },
        {
          id: "b",
          text: "Ghi bug report chi tiết",
          isCorrect: true,
          percentage: 75,
        },
        {
          id: "c",
          text: "Chỉ báo miệng với dev",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Một tester chuyên nghiệp luôn báo cáo bug có hệ thống để dễ theo dõi và sửa.",
    },
    {
      id: 12,
      question: "Khi gặp lỗi khó tái hiện, bạn sẽ làm gì?",
      options: [
        {
          id: "a",
          text: "Bỏ qua vì mất thời gian",
          isCorrect: false,
          percentage: 10,
        },
        {
          id: "b",
          text: "Thử tái hiện nhiều lần và ghi rõ điều kiện",
          isCorrect: true,
          percentage: 70,
        },
        {
          id: "c",
          text: "Gửi ngay cho dev không cần chi tiết",
          isCorrect: false,
          percentage: 20,
        },
      ],
      explanation:
        "Tester cần cố gắng tái hiện và ghi rõ môi trường, bước thực hiện để dev có thể fix.",
    },
    {
      id: 13,
      question:
        "Bạn có kiên nhẫn khi phải test đi test lại cùng một chức năng?",
      options: [
        {
          id: "a",
          text: "Có, vì đó là bản chất công việc",
          isCorrect: true,
          percentage: 75,
        },
        {
          id: "b",
          text: "Không, sẽ nhanh chán",
          isCorrect: false,
          percentage: 15,
        },
        {
          id: "c",
          text: "Chỉ khi có người yêu cầu",
          isCorrect: false,
          percentage: 10,
        },
      ],
      explanation: "Tính kiên nhẫn là một phẩm chất quan trọng với tester.",
    },
    {
      id: 14,
      question: "Khi làm việc nhóm, bạn thường...",
      options: [
        {
          id: "a",
          text: "Chủ động trao đổi với dev/BA",
          isCorrect: true,
          percentage: 70,
        },
        {
          id: "b",
          text: "Chỉ làm việc một mình",
          isCorrect: false,
          percentage: 15,
        },
        {
          id: "c",
          text: "Tránh giao tiếp vì phiền",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Tester giỏi cần hợp tác chặt chẽ với dev, BA, PM để đảm bảo chất lượng.",
    },
    {
      id: 15,
      question: "Bạn có thích tìm tòi, phân tích lỗi không?",
      options: [
        {
          id: "a",
          text: "Có, đó là điều thú vị nhất",
          isCorrect: true,
          percentage: 75,
        },
        {
          id: "b",
          text: "Không, muốn công việc nhanh gọn",
          isCorrect: false,
          percentage: 15,
        },
        {
          id: "c",
          text: "Chỉ phân tích khi bắt buộc",
          isCorrect: false,
          percentage: 10,
        },
      ],
      explanation:
        "Niềm yêu thích phân tích, tìm lỗi là động lực quan trọng để gắn bó với nghề tester.",
    },
    {
      id: 16,
      question:
        "Bạn xử lý như thế nào nếu bị dev phản hồi gay gắt về bug bạn báo?",
      options: [
        {
          id: "a",
          text: "Bình tĩnh, đối chiếu lại bằng chứng",
          isCorrect: true,
          percentage: 70,
        },
        {
          id: "b",
          text: "Tranh cãi đến cùng",
          isCorrect: false,
          percentage: 15,
        },
        { id: "c", text: "Bỏ qua luôn bug", isCorrect: false, percentage: 15 },
      ],
      explanation:
        "Tester cần giữ bình tĩnh, đưa bằng chứng cụ thể để làm rõ bug thay vì tranh cãi.",
    },
    {
      id: 17,
      question: "Nếu deadline gấp, bạn sẽ chọn cách nào?",
      options: [
        {
          id: "a",
          text: "Ưu tiên test tính năng quan trọng",
          isCorrect: true,
          percentage: 70,
        },
        { id: "b", text: "Test đại khái", isCorrect: false, percentage: 15 },
        { id: "c", text: "Không test nữa", isCorrect: false, percentage: 15 },
      ],
      explanation:
        "Kỹ năng quản lý ưu tiên giúp tester kiểm soát chất lượng trong thời gian giới hạn.",
    },
    {
      id: 18,
      question: "Bạn có hay tò mò cách sản phẩm hoạt động bên trong?",
      options: [
        {
          id: "a",
          text: "Có, thích khám phá logic hệ thống",
          isCorrect: true,
          percentage: 75,
        },
        {
          id: "b",
          text: "Không, chỉ quan tâm kết quả",
          isCorrect: false,
          percentage: 15,
        },
        { id: "c", text: "Tuỳ dự án", isCorrect: false, percentage: 10 },
      ],
      explanation:
        "Tính tò mò giúp tester đặt nhiều câu hỏi và phát hiện ra bug tiềm ẩn.",
    },
    {
      id: 19,
      question: "Bạn phản ứng thế nào khi test case thất bại?",
      options: [
        {
          id: "a",
          text: "Tìm nguyên nhân và báo cáo",
          isCorrect: true,
          percentage: 70,
        },
        {
          id: "b",
          text: "Bỏ qua vì rắc rối",
          isCorrect: false,
          percentage: 15,
        },
        {
          id: "c",
          text: "Đổ lỗi cho dev ngay",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Một tester giỏi sẽ phân tích nguyên nhân trước khi báo cáo bug.",
    },
    {
      id: 20,
      question: "Bạn thấy điều gì quan trọng nhất khi làm tester?",
      options: [
        {
          id: "a",
          text: "Kiên nhẫn và cẩn thận",
          isCorrect: true,
          percentage: 70,
        },
        {
          id: "b",
          text: "Nhanh chóng và đại khái",
          isCorrect: false,
          percentage: 15,
        },
        {
          id: "c",
          text: "Không cần phân tích sâu",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Kiên nhẫn và sự tỉ mỉ là yếu tố then chốt để trở thành một tester giỏi.",
    },
  ],
  "web-developer": [
    {
      id: 1,
      question: "HTML là gì trong phát triển web?",
      options: [
        {
          id: "a",
          text: "Ngôn ngữ lập trình tạo ra logic cho web",
          isCorrect: false,
          percentage: 15,
        },
        {
          id: "b",
          text: "Ngôn ngữ đánh dấu để tạo cấu trúc trang web",
          isCorrect: true,
          percentage: 70,
        },
        {
          id: "c",
          text: "Phần mềm để vẽ giao diện",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "HTML (HyperText Markup Language) dùng để tạo cấu trúc cơ bản cho trang web.",
    },
    {
      id: 2,
      question: "CSS được dùng để làm gì?",
      options: [
        {
          id: "a",
          text: "Tạo hiệu ứng và định dạng giao diện web",
          isCorrect: true,
          percentage: 65,
        },
        {
          id: "b",
          text: "Quản lý cơ sở dữ liệu",
          isCorrect: false,
          percentage: 20,
        },
        {
          id: "c",
          text: "Viết logic xử lý nghiệp vụ",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "CSS (Cascading Style Sheets) giúp định dạng giao diện, màu sắc, bố cục của trang web.",
    },
    {
      id: 3,
      question: "JavaScript đóng vai trò gì trong website?",
      options: [
        {
          id: "a",
          text: "Tạo sự tương tác động trên website",
          isCorrect: true,
          percentage: 75,
        },
        {
          id: "b",
          text: "Chỉ để lưu trữ dữ liệu",
          isCorrect: false,
          percentage: 10,
        },
        {
          id: "c",
          text: "Thay thế hoàn toàn HTML và CSS",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "JavaScript dùng để xử lý tương tác, sự kiện và logic động cho website.",
    },
    {
      id: 4,
      question: "Frontend Developer thường làm việc với công cụ nào?",
      options: [
        {
          id: "a",
          text: "React, Angular, Vue",
          isCorrect: true,
          percentage: 65,
        },
        { id: "b", text: "MySQL, MongoDB", isCorrect: false, percentage: 20 },
        {
          id: "c",
          text: "Docker, Kubernetes",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Frontend Developer thường sử dụng framework/libraries như React, Angular, Vue.",
    },
    {
      id: 5,
      question: "Backend Developer thường đảm nhận công việc gì?",
      options: [
        {
          id: "a",
          text: "Quản lý logic, dữ liệu và API cho hệ thống",
          isCorrect: true,
          percentage: 70,
        },
        {
          id: "b",
          text: "Chỉ thiết kế giao diện",
          isCorrect: false,
          percentage: 10,
        },
        {
          id: "c",
          text: "Làm SEO và quảng cáo",
          isCorrect: false,
          percentage: 20,
        },
      ],
      explanation:
        "Backend Developer chịu trách nhiệm về logic xử lý, kết nối cơ sở dữ liệu và API.",
    },
    {
      id: 6,
      question: "Git được dùng để làm gì?",
      options: [
        {
          id: "a",
          text: "Quản lý phiên bản code và làm việc nhóm",
          isCorrect: true,
          percentage: 75,
        },
        {
          id: "b",
          text: "Viết CSS nhanh hơn",
          isCorrect: false,
          percentage: 10,
        },
        {
          id: "c",
          text: "Tạo hosting miễn phí",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Git là hệ thống quản lý phiên bản, giúp dev theo dõi và phối hợp trong dự án.",
    },
    {
      id: 7,
      question: "Fullstack Developer nghĩa là gì?",
      options: [
        {
          id: "a",
          text: "Người làm cả Frontend và Backend",
          isCorrect: true,
          percentage: 80,
        },
        {
          id: "b",
          text: "Người chỉ quản lý cơ sở dữ liệu",
          isCorrect: false,
          percentage: 10,
        },
        {
          id: "c",
          text: "Người chuyên thiết kế UI/UX",
          isCorrect: false,
          percentage: 10,
        },
      ],
      explanation:
        "Fullstack Developer có khả năng làm cả frontend (giao diện) và backend (xử lý logic).",
    },
    {
      id: 8,
      question: "API là gì?",
      options: [
        {
          id: "a",
          text: "Giao diện cho phép ứng dụng giao tiếp với nhau",
          isCorrect: true,
          percentage: 70,
        },
        {
          id: "b",
          text: "Một ngôn ngữ lập trình mới",
          isCorrect: false,
          percentage: 15,
        },
        {
          id: "c",
          text: "Công cụ để vẽ giao diện",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "API (Application Programming Interface) cho phép các ứng dụng giao tiếp và trao đổi dữ liệu.",
    },
    {
      id: 9,
      question: "Responsive Design có nghĩa là gì?",
      options: [
        {
          id: "a",
          text: "Website hiển thị tốt trên nhiều thiết bị",
          isCorrect: true,
          percentage: 80,
        },
        {
          id: "b",
          text: "Website tự động tạo nội dung mới",
          isCorrect: false,
          percentage: 10,
        },
        {
          id: "c",
          text: "Website không cần dùng CSS",
          isCorrect: false,
          percentage: 10,
        },
      ],
      explanation:
        "Responsive Design giúp website hiển thị tốt trên PC, tablet, mobile.",
    },
    {
      id: 10,
      question: "Database phổ biến cho Web Developer là gì?",
      options: [
        {
          id: "a",
          text: "MySQL, PostgreSQL, MongoDB",
          isCorrect: true,
          percentage: 70,
        },
        {
          id: "b",
          text: "Photoshop, Illustrator",
          isCorrect: false,
          percentage: 15,
        },
        { id: "c", text: "Excel, Word", isCorrect: false, percentage: 15 },
      ],
      explanation:
        "Web Developer thường làm việc với cơ sở dữ liệu như MySQL, PostgreSQL, MongoDB.",
    },
    {
      id: 11,
      question: "Bạn có thích tìm tòi giải quyết lỗi (bug) khi code không?",
      options: [
        {
          id: "a",
          text: "Có, đó là cách mình học nhanh nhất",
          isCorrect: true,
          percentage: 65,
        },
        {
          id: "b",
          text: "Không, mình rất ghét phải sửa lỗi",
          isCorrect: false,
          percentage: 20,
        },
        {
          id: "c",
          text: "Tùy lỗi nhỏ hay lớn",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Tinh thần kiên nhẫn xử lý bug là một kỹ năng quan trọng với Web Developer.",
    },
    {
      id: 12,
      question: "Bạn cảm thấy thế nào khi phải học công nghệ mới liên tục?",
      options: [
        {
          id: "a",
          text: "Hứng thú vì luôn được cập nhật",
          isCorrect: true,
          percentage: 60,
        },
        {
          id: "b",
          text: "Áp lực vì thay đổi quá nhanh",
          isCorrect: false,
          percentage: 25,
        },
        {
          id: "c",
          text: "Không quan tâm lắm",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Ngành web thay đổi nhanh, phù hợp với người thích học hỏi công nghệ mới.",
    },
    {
      id: 13,
      question: "Bạn có thường xuyên rèn luyện khả năng làm việc nhóm không?",
      options: [
        {
          id: "a",
          text: "Có, vì teamwork rất quan trọng",
          isCorrect: true,
          percentage: 70,
        },
        {
          id: "b",
          text: "Không, mình chỉ muốn làm một mình",
          isCorrect: false,
          percentage: 15,
        },
        { id: "c", text: "Tùy dự án", isCorrect: false, percentage: 15 },
      ],
      explanation:
        "Phát triển web thường cần teamwork để phối hợp giữa frontend, backend và designer.",
    },
    {
      id: 14,
      question: "Bạn có thấy thoải mái khi ngồi máy tính nhiều giờ liền không?",
      options: [
        {
          id: "a",
          text: "Có, mình dễ tập trung khi code",
          isCorrect: true,
          percentage: 55,
        },
        {
          id: "b",
          text: "Không, mình khó chịu nếu ngồi lâu",
          isCorrect: false,
          percentage: 25,
        },
        { id: "c", text: "Tùy hôm", isCorrect: false, percentage: 20 },
      ],
      explanation:
        "Web Developer thường phải ngồi máy tính nhiều giờ để code và kiểm thử.",
    },
    {
      id: 15,
      question: "Bạn có kiên nhẫn đọc tài liệu kỹ thuật không?",
      options: [
        {
          id: "a",
          text: "Có, vì đọc docs giúp hiểu sâu",
          isCorrect: true,
          percentage: 65,
        },
        {
          id: "b",
          text: "Không, mình chỉ thích xem video hướng dẫn",
          isCorrect: false,
          percentage: 20,
        },
        {
          id: "c",
          text: "Tùy độ dài của tài liệu",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Kỹ năng đọc tài liệu kỹ thuật rất cần thiết cho Web Developer.",
    },
    {
      id: 16,
      question: "Bạn xử lý thế nào khi deadline gấp?",
      options: [
        {
          id: "a",
          text: "Lập kế hoạch và ưu tiên việc quan trọng",
          isCorrect: true,
          percentage: 70,
        },
        {
          id: "b",
          text: "Cố gắng làm nhanh mà không cần plan",
          isCorrect: false,
          percentage: 20,
        },
        {
          id: "c",
          text: "Chờ người khác nhắc mới làm",
          isCorrect: false,
          percentage: 10,
        },
      ],
      explanation:
        "Kỹ năng quản lý thời gian và ưu tiên công việc giúp đáp ứng deadline hiệu quả.",
    },
    {
      id: 17,
      question: "Bạn có thích chia sẻ kiến thức với người khác không?",
      options: [
        {
          id: "a",
          text: "Có, vì chia sẻ cũng là cách học",
          isCorrect: true,
          percentage: 65,
        },
        {
          id: "b",
          text: "Không, mình giữ kiến thức cho riêng mình",
          isCorrect: false,
          percentage: 20,
        },
        { id: "c", text: "Tùy trường hợp", isCorrect: false, percentage: 15 },
      ],
      explanation:
        "Người chia sẻ kiến thức thường tiến bộ nhanh hơn trong cộng đồng lập trình.",
    },
    {
      id: 18,
      question: "Bạn phản ứng thế nào khi code bị người khác review lỗi?",
      options: [
        {
          id: "a",
          text: "Xem lại và học hỏi từ feedback",
          isCorrect: true,
          percentage: 70,
        },
        {
          id: "b",
          text: "Khó chịu khi bị góp ý",
          isCorrect: false,
          percentage: 20,
        },
        { id: "c", text: "Bỏ qua góp ý", isCorrect: false, percentage: 10 },
      ],
      explanation:
        "Tiếp nhận feedback tích cực giúp bạn cải thiện kỹ năng code.",
    },
    {
      id: 19,
      question: "Bạn thích dự án cá nhân hay làm dự án nhóm hơn?",
      options: [
        {
          id: "a",
          text: "Cả hai, miễn được học hỏi",
          isCorrect: true,
          percentage: 60,
        },
        {
          id: "b",
          text: "Chỉ thích làm cá nhân",
          isCorrect: false,
          percentage: 25,
        },
        {
          id: "c",
          text: "Chỉ thích làm nhóm",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Web Developer cần linh hoạt, có thể làm cá nhân và cũng hợp tác tốt với nhóm.",
    },
    {
      id: 20,
      question:
        "Bạn có thường xuyên tự học thêm kỹ năng ngoài lớp/ công ty không?",
      options: [
        {
          id: "a",
          text: "Có, vì công nghệ luôn thay đổi",
          isCorrect: true,
          percentage: 75,
        },
        {
          id: "b",
          text: "Không, chỉ học khi bắt buộc",
          isCorrect: false,
          percentage: 15,
        },
        { id: "c", text: "Hiếm khi", isCorrect: false, percentage: 10 },
      ],
      explanation:
        "Khả năng tự học là yếu tố then chốt để thành công trong ngành Web Developer.",
    },
  ],

  "app-developer": [
    {
      id: 1,
      question: "App developer thường làm việc với nền tảng nào nhiều nhất?",
      options: [
        { id: "a", text: "iOS và Android", isCorrect: true, percentage: 70 },
        { id: "b", text: "Windows và macOS", isCorrect: false, percentage: 15 },
        { id: "c", text: "Linux và Ubuntu", isCorrect: false, percentage: 15 },
      ],
      explanation:
        "Phần lớn ứng dụng di động tập trung vào iOS (App Store) và Android (Google Play).",
    },
    {
      id: 2,
      question: "Ngôn ngữ chính để phát triển Android native app là gì?",
      options: [
        { id: "a", text: "Swift", isCorrect: false, percentage: 20 },
        { id: "b", text: "Kotlin", isCorrect: true, percentage: 60 },
        { id: "c", text: "C#", isCorrect: false, percentage: 20 },
      ],
      explanation:
        "Kotlin hiện là ngôn ngữ chính thức của Android, thay thế Java dần dần.",
    },
    {
      id: 3,
      question:
        "Swift thường được dùng để lập trình ứng dụng cho hệ điều hành nào?",
      options: [
        { id: "a", text: "Android", isCorrect: false, percentage: 15 },
        { id: "b", text: "iOS", isCorrect: true, percentage: 70 },
        { id: "c", text: "Windows", isCorrect: false, percentage: 15 },
      ],
      explanation: "Swift được Apple phát triển, dùng cho iOS, macOS, watchOS.",
    },
    {
      id: 4,
      question: "Cross-platform app development nghĩa là gì?",
      options: [
        {
          id: "a",
          text: "Ứng dụng chạy được nhiều hệ điều hành khác nhau",
          isCorrect: true,
          percentage: 65,
        },
        {
          id: "b",
          text: "Ứng dụng có nhiều giao diện",
          isCorrect: false,
          percentage: 20,
        },
        {
          id: "c",
          text: "Ứng dụng không cần kết nối mạng",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Cross-platform giúp một codebase chạy trên nhiều nền tảng (Android/iOS).",
    },
    {
      id: 5,
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
        "React Native tận dụng JavaScript – ngôn ngữ phổ biến, dễ học.",
    },
    {
      id: 6,
      question: "API trong phát triển ứng dụng có vai trò gì?",
      options: [
        {
          id: "a",
          text: "Kết nối app với server hoặc dịch vụ bên ngoài",
          isCorrect: true,
          percentage: 70,
        },
        {
          id: "b",
          text: "Thiết kế giao diện app",
          isCorrect: false,
          percentage: 15,
        },
        {
          id: "c",
          text: "Tối ưu dung lượng app",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "API cho phép app trao đổi dữ liệu với hệ thống hoặc dịch vụ khác.",
    },
    {
      id: 7,
      question: "UI/UX trong mobile app development khác nhau ở điểm nào?",
      options: [
        {
          id: "a",
          text: "UI là thiết kế giao diện, UX là trải nghiệm người dùng",
          isCorrect: true,
          percentage: 75,
        },
        {
          id: "b",
          text: "UI là backend, UX là frontend",
          isCorrect: false,
          percentage: 10,
        },
        {
          id: "c",
          text: "UI chỉ áp dụng cho website",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "UI tập trung vào bố cục và màu sắc, UX tập trung vào cảm nhận khi dùng app.",
    },
    {
      id: 8,
      question: "App lifecycle (vòng đời ứng dụng) giúp developer làm gì?",
      options: [
        {
          id: "a",
          text: "Quản lý trạng thái app khi mở, chạy, bị dừng",
          isCorrect: true,
          percentage: 65,
        },
        {
          id: "b",
          text: "Tự động viết code cho developer",
          isCorrect: false,
          percentage: 20,
        },
        {
          id: "c",
          text: "Quản lý bảo mật ứng dụng",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Hiểu vòng đời giúp xử lý logic khi app start, pause, resume.",
    },
    {
      id: 9,
      question:
        "Firebase thường được dùng để làm gì trong phát triển ứng dụng?",
      options: [
        {
          id: "a",
          text: "Cung cấp backend dịch vụ như auth, database, push notification",
          isCorrect: true,
          percentage: 70,
        },
        {
          id: "b",
          text: "Thiết kế UI nâng cao",
          isCorrect: false,
          percentage: 15,
        },
        {
          id: "c",
          text: "Viết tài liệu cho dự án",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Firebase là BaaS hỗ trợ auth, real-time DB, cloud messaging.",
    },
    {
      id: 10,
      question: "CI/CD trong phát triển app có nghĩa là gì?",
      options: [
        {
          id: "a",
          text: "Continuous Integration / Continuous Delivery",
          isCorrect: true,
          percentage: 60,
        },
        {
          id: "b",
          text: "Code Improvement / Code Debugging",
          isCorrect: false,
          percentage: 25,
        },
        {
          id: "c",
          text: "Cloud Integration / Cloud Deployment",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "CI/CD tự động build, test, deploy giúp rút ngắn vòng đời phát triển.",
    },

    // --- Nhóm 2: Self-reflection ---
    {
      id: 11,
      question:
        "Bạn có kiên nhẫn tối ưu hiệu năng app để chạy mượt trên nhiều thiết bị không?",
      options: [
        {
          id: "a",
          text: "Có, mình thích tinh chỉnh và tối ưu",
          isCorrect: true,
          percentage: 55,
        },
        {
          id: "b",
          text: "Chỉ khi app gặp lỗi lớn mới tối ưu",
          isCorrect: false,
          percentage: 30,
        },
        {
          id: "c",
          text: "Hiếm khi quan tâm, miễn app chạy được",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "App developer cần chú ý đến trải nghiệm người dùng trên mọi thiết bị; kiên nhẫn tối ưu là yếu tố quan trọng.",
    },
    {
      id: 12,
      question:
        "Bạn có quan tâm đến cách người dùng tương tác với app (UX flow, UI responsiveness) không?",
      options: [
        {
          id: "a",
          text: "Có, mình luôn test và cải thiện UX",
          isCorrect: true,
          percentage: 60,
        },
        {
          id: "b",
          text: "Chỉ thỉnh thoảng xem có vấn đề gì không",
          isCorrect: false,
          percentage: 25,
        },
        {
          id: "c",
          text: "Không, chỉ tập trung code backend",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Hiểu hành vi người dùng giúp app dễ dùng và tăng retention; điều này phản ánh tính chủ động và quan tâm đến trải nghiệm người dùng.",
    },
    {
      id: 13,
      question:
        "Bạn có thường xuyên cập nhật công nghệ mới (framework, thư viện) không?",
      options: [
        {
          id: "a",
          text: "Có, luôn thử cái mới",
          isCorrect: true,
          percentage: 65,
        },
        {
          id: "b",
          text: "Thỉnh thoảng khi cần",
          isCorrect: false,
          percentage: 25,
        },
        {
          id: "c",
          text: "Không, chỉ dùng cái quen thuộc",
          isCorrect: false,
          percentage: 10,
        },
      ],
      explanation:
        "Ngành app thay đổi nhanh, developer cần thích nghi với framework mới; đây là dấu hiệu của tính ham học hỏi và linh hoạt.",
    },
    {
      id: 14,
      question: "Bạn phản ứng thế nào khi app của bạn bị người dùng chê?",
      options: [
        {
          id: "a",
          text: "Xem đó là feedback để cải thiện",
          isCorrect: true,
          percentage: 70,
        },
        {
          id: "b",
          text: "Cảm thấy nản lòng",
          isCorrect: false,
          percentage: 20,
        },
        { id: "c", text: "Không quan tâm", isCorrect: false, percentage: 10 },
      ],
      explanation:
        "Phản hồi người dùng giúp cải thiện trải nghiệm app; khả năng tiếp nhận và học hỏi từ phản hồi là quan trọng cho developer.",
    },
    {
      id: 15,
      question: "Bạn có hay bị mất tập trung khi làm việc lâu?",
      options: [
        {
          id: "a",
          text: "Không, mình tập trung khá tốt",
          isCorrect: true,
          percentage: 50,
        },
        {
          id: "b",
          text: "Có, cần nhắc nhở hoặc giải lao",
          isCorrect: false,
          percentage: 35,
        },
        {
          id: "c",
          text: "Rất dễ mất tập trung",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Phát triển app đòi hỏi làm việc liên tục với code; khả năng tập trung tốt phản ánh tính kiên nhẫn và kỹ năng quản lý công việc.",
    },
    {
      id: 16,
      question: "Bạn thích làm việc theo kiểu nào?",
      options: [
        {
          id: "a",
          text: "Có quy trình rõ ràng, từng bước",
          isCorrect: true,
          percentage: 55,
        },
        {
          id: "b",
          text: "Thích tự do, ngẫu hứng",
          isCorrect: false,
          percentage: 25,
        },
        { id: "c", text: "Làm theo cảm xúc", isCorrect: false, percentage: 20 },
      ],
      explanation:
        "App development cần kỷ luật và quy trình để đảm bảo chất lượng sản phẩm; đây đánh giá tính tổ chức và khả năng làm việc chuyên nghiệp.",
    },
    {
      id: 17,
      question: "Khi gặp lỗi khó, bạn thường làm gì?",
      options: [
        {
          id: "a",
          text: "Tìm kiếm tài liệu, hỏi cộng đồng",
          isCorrect: true,
          percentage: 65,
        },
        {
          id: "b",
          text: "Thử mò mẫm mãi đến khi xong",
          isCorrect: false,
          percentage: 25,
        },
        {
          id: "c",
          text: "Bỏ qua và làm việc khác",
          isCorrect: false,
          percentage: 10,
        },
      ],
      explanation:
        "Kỹ năng tìm kiếm thông tin và học hỏi từ cộng đồng là chìa khóa để vượt qua vấn đề kỹ thuật, phản ánh tính chủ động và kiên nhẫn.",
    },
    {
      id: 18,
      question: "Bạn có sẵn sàng học thêm UI/UX khi cần cho dự án không?",
      options: [
        {
          id: "a",
          text: "Có, mình muốn hiểu cả design",
          isCorrect: true,
          percentage: 60,
        },
        {
          id: "b",
          text: "Không, chỉ muốn code",
          isCorrect: false,
          percentage: 25,
        },
        { id: "c", text: "Tùy dự án cụ thể", isCorrect: false, percentage: 15 },
      ],
      explanation:
        "App developer đôi khi cần kết hợp cả UI/UX để hoàn thiện sản phẩm; phản ánh tính linh hoạt và khả năng học hỏi liên ngành.",
    },
    {
      id: 19,
      question:
        "Bạn có hay luyện kỹ năng logic (giải thuật, cấu trúc dữ liệu)?",
      options: [
        {
          id: "a",
          text: "Có, luyện thường xuyên",
          isCorrect: true,
          percentage: 55,
        },
        {
          id: "b",
          text: "Thỉnh thoảng khi cần",
          isCorrect: false,
          percentage: 30,
        },
        { id: "c", text: "Hiếm khi luyện", isCorrect: false, percentage: 15 },
      ],
      explanation:
        "Logic tốt giúp code app mượt, ít bug và dễ maintain; đây là thước đo khả năng giải quyết vấn đề.",
    },
    {
      id: 20,
      question: "Bạn thấy hứng thú nhất với điều gì khi làm app?",
      options: [
        {
          id: "a",
          text: "Thấy người dùng trải nghiệm sản phẩm mình làm ra",
          isCorrect: true,
          percentage: 65,
        },
        {
          id: "b",
          text: "Quá trình viết code",
          isCorrect: false,
          percentage: 25,
        },
        {
          id: "c",
          text: "Thử thách kỹ thuật",
          isCorrect: false,
          percentage: 10,
        },
      ],
      explanation:
        "Động lực lớn của app developer là sản phẩm được nhiều người sử dụng; phản ánh mức độ hứng thú với sản phẩm và tính sáng tạo.",
    },
  ],
  designer: [
    {
      id: 1,
      question: "UI và UX khác nhau chủ yếu ở điểm nào?",
      options: [
        {
          id: "a",
          text: "UI là giao diện; UX là trải nghiệm tổng thể",
          isCorrect: true,
          percentage: 70,
        },
        {
          id: "b",
          text: "UI là backend; UX là frontend",
          isCorrect: false,
          percentage: 15,
        },
        {
          id: "c",
          text: "UI là nghiên cứu người dùng; UX là vẽ layout",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "UI tập trung vào lớp trình bày (màu, layout, thành phần hiển thị), còn UX bao quát hành trình người dùng, dòng chảy tác vụ và cảm nhận khi sử dụng.",
    },
    {
      id: 2,
      question: "Wireframe thường dùng để làm gì trong quy trình thiết kế?",
      options: [
        {
          id: "a",
          text: "Phác thảo bố cục và luồng chức năng ở mức độ thấp",
          isCorrect: true,
          percentage: 66,
        },
        {
          id: "b",
          text: "Tối ưu hiệu năng code",
          isCorrect: false,
          percentage: 14,
        },
        {
          id: "c",
          text: "Hoàn thiện hệ thống màu và ảnh cuối cùng",
          isCorrect: false,
          percentage: 20,
        },
      ],
      explanation:
        "Wireframe là bản khung ít chi tiết dùng để xác định bố cục, thứ tự ưu tiên thông tin và luồng tương tác trước khi đi vào chi tiết hình ảnh.",
    },
    {
      id: 3,
      question: "Hệ màu nào phù hợp cho thiết kế hiển thị trên màn hình?",
      options: [
        { id: "a", text: "RGB", isCorrect: true, percentage: 72 },
        { id: "b", text: "CMYK", isCorrect: false, percentage: 18 },
        { id: "c", text: "Pantone (PMS)", isCorrect: false, percentage: 10 },
      ],
      explanation:
        "RGB (Red–Green–Blue) là mô hình ánh sáng cộng, dùng cho màn hình. CMYK phục vụ in ấn; Pantone là hệ màu chuẩn cho in, không phù hợp trực tiếp cho hiển thị.",
    },
    {
      id: 4,
      question:
        "Mục đích chính của grid system trong thiết kế giao diện là gì?",
      options: [
        {
          id: "a",
          text: "Tạo cấu trúc nhất quán và căn chỉnh nội dung",
          isCorrect: true,
          percentage: 68,
        },
        {
          id: "b",
          text: "Giảm dung lượng hình ảnh",
          isCorrect: false,
          percentage: 12,
        },
        {
          id: "c",
          text: "Tự động sinh wireframe",
          isCorrect: false,
          percentage: 20,
        },
      ],
      explanation:
        "Grid cung cấp trục căn lề, nhịp (gutter) và cột giúp bố cục gọn gàng, nhất quán giữa các màn hình.",
    },
    {
      id: 5,
      question: "Visual hierarchy (thứ bậc thị giác) đạt được bằng cách nào?",
      options: [
        {
          id: "a",
          text: "Kích thước, tương phản, khoảng cách và vị trí",
          isCorrect: true,
          percentage: 64,
        },
        {
          id: "b",
          text: "Chỉ cần dùng nhiều màu sặc sỡ",
          isCorrect: false,
          percentage: 18,
        },
        {
          id: "c",
          text: "Ẩn bớt thông tin đi",
          isCorrect: false,
          percentage: 18,
        },
      ],
      explanation:
        "Thứ bậc thị giác hướng mắt người dùng bằng kích thước (scale), độ đậm/nhạt (contrast), khoảng trắng và vị trí để ưu tiên thông tin quan trọng.",
    },
    {
      id: 6,
      question:
        "Trong typography, 'leading' (line-height) điều chỉnh chủ yếu yếu tố nào?",
      options: [
        {
          id: "a",
          text: "Khoảng cách giữa các dòng chữ",
          isCorrect: true,
          percentage: 70,
        },
        {
          id: "b",
          text: "Khoảng cách giữa hai ký tự cụ thể",
          isCorrect: false,
          percentage: 16,
        },
        {
          id: "c",
          text: "Độ dày của nét chữ",
          isCorrect: false,
          percentage: 14,
        },
      ],
      explanation:
        "Leading là khoảng cách dòng; kerning điều chỉnh khoảng cách giữa cặp ký tự; tracking (letter-spacing) áp dụng cho cả chuỗi ký tự.",
    },
    {
      id: 7,
      question: "WCAG trong thiết kế đề cập chủ yếu đến vấn đề nào?",
      options: [
        {
          id: "a",
          text: "Khả năng tiếp cận cho mọi người dùng (accessibility)",
          isCorrect: true,
          percentage: 66,
        },
        {
          id: "b",
          text: "Chuẩn hoá hiệu năng frontend",
          isCorrect: false,
          percentage: 18,
        },
        { id: "c", text: "Bảo mật UI", isCorrect: false, percentage: 16 },
      ],
      explanation:
        "WCAG (Web Content Accessibility Guidelines) là bộ hướng dẫn giúp nội dung dễ tiếp cận cho người khiếm thị, khiếm thính, mù màu…",
    },
    {
      id: 8,
      question: "Trong Figma, Component giúp ích gì nhiều nhất?",
      options: [
        {
          id: "a",
          text: "Tái sử dụng, đồng bộ hoá các phần tử UI trên nhiều màn hình",
          isCorrect: true,
          percentage: 69,
        },
        {
          id: "b",
          text: "Xuất code HTML/CSS hoàn chỉnh",
          isCorrect: false,
          percentage: 14,
        },
        {
          id: "c",
          text: "Tự động tạo nội dung lorem ipsum",
          isCorrect: false,
          percentage: 17,
        },
      ],
      explanation:
        "Component tạo nguồn duy nhất (single source of truth); instance kế thừa và có thể override thuộc tính cho phù hợp ngữ cảnh.",
    },
    {
      id: 9,
      question: "Responsive design khác adaptive design ở điểm cốt lõi nào?",
      options: [
        {
          id: "a",
          text: "Responsive dùng layout linh hoạt theo tỉ lệ; adaptive dùng layout cố định theo các breakpoint",
          isCorrect: true,
          percentage: 62,
        },
        {
          id: "b",
          text: "Responsive chỉ dành cho mobile; adaptive chỉ cho desktop",
          isCorrect: false,
          percentage: 20,
        },
        {
          id: "c",
          text: "Không có khác biệt đáng kể",
          isCorrect: false,
          percentage: 18,
        },
      ],
      explanation:
        "Responsive co giãn dựa trên phần trăm/đơn vị linh hoạt; adaptive chuyển giữa một vài layout tiền định theo độ rộng màn hình.",
    },
    {
      id: 10,
      question:
        "Theo Atomic Design, đơn vị sắp xếp đúng theo thứ tự từ nhỏ đến lớn là gì?",
      options: [
        {
          id: "a",
          text: "Atoms → Molecules → Organisms → Templates → Pages",
          isCorrect: true,
          percentage: 67,
        },
        {
          id: "b",
          text: "Molecules → Atoms → Organisms → Pages → Templates",
          isCorrect: false,
          percentage: 18,
        },
        {
          id: "c",
          text: "Atoms → Organisms → Molecules → Pages → Templates",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Atomic Design tổ chức UI từ phần tử nhỏ nhất (atoms) kết hợp thành molecules, organisms và cuối cùng là templates/pages để đảm bảo nhất quán và tái sử dụng.",
    },

    {
      id: 11,
      question: "Khi nhận brief, bạn thường làm gì trước tiên?",
      options: [
        {
          id: "a",
          text: "Tìm hiểu người dùng và mục tiêu kinh doanh",
          isCorrect: true,
          percentage: 64,
        },
        {
          id: "b",
          text: "Mở Figma/PS và thiết kế ngay",
          isCorrect: false,
          percentage: 22,
        },
        {
          id: "c",
          text: "Tìm template sẵn để ráp",
          isCorrect: false,
          percentage: 14,
        },
      ],
      explanation:
        "Bắt đầu từ user & business goals giúp mô hình hoá vấn đề đúng, tránh thiết kế 'đẹp nhưng sai mục tiêu'.",
    },
    {
      id: 12,
      question: "Bạn đón nhận feedback như thế nào?",
      options: [
        {
          id: "a",
          text: "Ghi nhận, hỏi lại tiêu chí đánh giá và thử A/B nếu cần",
          isCorrect: true,
          percentage: 68,
        },
        {
          id: "b",
          text: "Cố bảo vệ phương án cũ đến cùng",
          isCorrect: false,
          percentage: 18,
        },
        {
          id: "c",
          text: "Bỏ qua vì 'thị hiếu mỗi người mỗi khác'",
          isCorrect: false,
          percentage: 14,
        },
      ],
      explanation:
        "Designer hiệu quả chuyển hoá ý kiến thành giả thuyết kiểm chứng được thay vì tranh luận cảm tính.",
    },
    {
      id: 13,
      question: "Khi yêu cầu chưa rõ, bạn sẽ…",
      options: [
        {
          id: "a",
          text: "Đặt câu hỏi làm rõ và phác thảo nhanh (sketch/prototype)",
          isCorrect: true,
          percentage: 65,
        },
        {
          id: "b",
          text: "Tự suy diễn và làm theo cảm nhận",
          isCorrect: false,
          percentage: 20,
        },
        {
          id: "c",
          text: "Chờ đến khi PM tự bổ sung",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Làm rõ sớm tiết kiệm thời gian iteration về sau và giảm rủi ro lệch kỳ vọng.",
    },
    {
      id: 14,
      question: "Bạn quản lý deadline thế nào?",
      options: [
        {
          id: "a",
          text: "Chia nhỏ mốc (wireframe → visual → prototype → handoff) và báo sớm khi có rủi ro",
          isCorrect: true,
          percentage: 62,
        },
        {
          id: "b",
          text: "Dồn việc cuối kỳ để 'nước rút'",
          isCorrect: false,
          percentage: 24,
        },
        {
          id: "c",
          text: "Làm tuần tự không theo kế hoạch",
          isCorrect: false,
          percentage: 14,
        },
      ],
      explanation:
        "Quản trị tiến độ theo pha giúp minh bạch trạng thái và giảm trễ hạn.",
    },
    {
      id: 15,
      question:
        "Bạn ưu tiên xây dựng hệ thống thành phần (design system) ra sao?",
      options: [
        {
          id: "a",
          text: "Tạo token, component, guideline để tái sử dụng",
          isCorrect: true,
          percentage: 66,
        },
        {
          id: "b",
          text: "Thiết kế từng màn độc lập",
          isCorrect: false,
          percentage: 20,
        },
        {
          id: "c",
          text: "Chỉ dùng component có sẵn không điều chỉnh",
          isCorrect: false,
          percentage: 14,
        },
      ],
      explanation:
        "Tư duy hệ thống giúp nhất quán, tăng tốc độ và giảm lỗi khi scale sản phẩm.",
    },
    {
      id: 16,
      question: "Về accessibility, thói quen của bạn là…",
      options: [
        {
          id: "a",
          text: "Kiểm tra độ tương phản, kích cỡ chữ, trạng thái focus/hover",
          isCorrect: true,
          percentage: 70,
        },
        {
          id: "b",
          text: "Chỉ kiểm tra trên màn hình của mình",
          isCorrect: false,
          percentage: 18,
        },
        {
          id: "c",
          text: "Để dev tự xử lý sau",
          isCorrect: false,
          percentage: 12,
        },
      ],
      explanation:
        "Thiết kế bao trùm (inclusive) đòi hỏi cân nhắc contrast, kích thước, khoảng trắng và trạng thái tương tác ngay từ giai đoạn thiết kế.",
    },
    {
      id: 17,
      question: "Bạn xử lý vòng lặp cải tiến (iteration) như thế nào?",
      options: [
        {
          id: "a",
          text: "Thiết kế → test nhanh với user/stakeholder → rút kinh nghiệm → lặp lại",
          isCorrect: true,
          percentage: 64,
        },
        {
          id: "b",
          text: "Làm một lần cho xong để tiết kiệm công",
          isCorrect: false,
          percentage: 22,
        },
        {
          id: "c",
          text: "Chỉ sửa khi bị yêu cầu",
          isCorrect: false,
          percentage: 14,
        },
      ],
      explanation:
        "Tư duy lặp (iterative) giúp tiến gần hơn đến fit thực tế thay vì kỳ vọng ban đầu.",
    },
    {
      id: 18,
      question: "Khi handoff cho dev, bạn thường…",
      options: [
        {
          id: "a",
          text: "Cung cấp spec rõ (spacing, token màu, trạng thái), variant và asset chuẩn",
          isCorrect: true,
          percentage: 68,
        },
        {
          id: "b",
          text: "Gửi file hình và mô tả sơ bộ",
          isCorrect: false,
          percentage: 20,
        },
        {
          id: "c",
          text: "Để dev tự suy ra từ màn hình",
          isCorrect: false,
          percentage: 12,
        },
      ],
      explanation:
        "Handoff chất lượng giúp giảm sai lệch xây dựng, tiết kiệm thời gian cho cả team.",
    },
    {
      id: 19,
      question: "Bạn cập nhật xu hướng thiết kế như thế nào?",
      options: [
        {
          id: "a",
          text: "Theo dõi trend nhưng ưu tiên nguyên lý nền tảng và dữ liệu",
          isCorrect: true,
          percentage: 63,
        },
        {
          id: "b",
          text: "Luôn chạy theo trend mới nhất",
          isCorrect: false,
          percentage: 23,
        },
        {
          id: "c",
          text: "Không quan tâm đến trend",
          isCorrect: false,
          percentage: 14,
        },
      ],
      explanation:
        "Cân bằng giữa nguyên tắc bền vững (typography, layout, khả dụng) và cập nhật xu hướng giúp sản phẩm hiện đại mà vẫn hiệu quả.",
    },
    {
      id: 20,
      question: "Điều khiến bạn hứng thú nhất khi làm designer là gì?",
      options: [
        {
          id: "a",
          text: "Tạo ra giải pháp hữu ích, dễ dùng cho người thật",
          isCorrect: true,
          percentage: 66,
        },
        {
          id: "b",
          text: "Làm mọi thứ thật bắt mắt",
          isCorrect: false,
          percentage: 22,
        },
        {
          id: "c",
          text: "Thử nghiệm công cụ mới",
          isCorrect: false,
          percentage: 12,
        },
      ],
      explanation:
        "Động lực bền vững của designer là tạo giá trị cho người dùng và doanh nghiệp; thẩm mỹ và công cụ là phương tiện, không phải mục tiêu cuối.",
    },
  ],

  "business-analyst": [
    {
      id: 1,
      question: "Business Analyst (BA) giống vai trò nào trong một bộ phim?",
      options: [
        { id: "a", text: "Diễn viên chính", isCorrect: false, percentage: 20 },
        {
          id: "b",
          text: "Phiên dịch viên giữa đạo diễn và diễn viên",
          isCorrect: true,
          percentage: 65,
        },
        { id: "c", text: "Khán giả", isCorrect: false, percentage: 15 },
      ],
      explanation:
        "BA đóng vai 'phiên dịch viên' giữa business (stakeholder/PM) và technical team: họ dịch nhu cầu doanh nghiệp thành yêu cầu kỹ thuật rõ ràng, đồng thời chuyển thông tin kỹ thuật về lại cho business theo cách dễ hiểu.",
    },
    {
      id: 2,
      question: "Nhiệm vụ cốt lõi của Business Analyst thường bao gồm gì?",
      options: [
        {
          id: "a",
          text: "Thiết kế giao diện người dùng",
          isCorrect: false,
          percentage: 18,
        },
        {
          id: "b",
          text: "Elicitation, phân tích, tài liệu hoá và xác thực yêu cầu",
          isCorrect: true,
          percentage: 70,
        },
        {
          id: "c",
          text: "Viết toàn bộ code backend",
          isCorrect: false,
          percentage: 12,
        },
      ],
      explanation:
        "BA tập trung thu thập (elicitation) yêu cầu, phân tích tính khả thi, viết tài liệu (BRD/FRD/user stories), và phối hợp xác thực (validation) để đảm bảo giải pháp đáp ứng mục tiêu kinh doanh.",
    },
    {
      id: 3,
      question: "Stakeholder là ai?",
      options: [
        {
          id: "a",
          text: "Chỉ người trả tiền cho dự án (sponsor)",
          isCorrect: false,
          percentage: 20,
        },
        {
          id: "b",
          text: "Bất kỳ bên nào có lợi ích hoặc bị ảnh hưởng bởi dự án",
          isCorrect: true,
          percentage: 65,
        },
        {
          id: "c",
          text: "Chỉ developer và tester",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Stakeholder có thể là sponsor, end-user, operations, legal, sales... BA cần xác định các stakeholder để hiểu góc nhìn, ưu tiên và rủi ro từ từng bên.",
    },
    {
      id: 4,
      question: "Kỹ thuật elicitation nào thường dùng để thu thập yêu cầu?",
      options: [
        {
          id: "a",
          text: "Interview, workshop, observation, survey",
          isCorrect: true,
          percentage: 68,
        },
        {
          id: "b",
          text: "Chỉ đọc email cũ rồi định nghĩa yêu cầu",
          isCorrect: false,
          percentage: 12,
        },
        {
          id: "c",
          text: "Viết code thử để kiểm chứng yêu cầu",
          isCorrect: false,
          percentage: 20,
        },
      ],
      explanation:
        "Elicitation dùng nhiều phương pháp: phỏng vấn sâu (interview), workshop/brainstorm để đồng ý chung, quan sát (observation) thực tế thao tác người dùng, và survey để mở rộng mẫu ý kiến.",
    },
    {
      id: 5,
      question:
        "Functional requirement khác Non-functional requirement ở điểm nào?",
      options: [
        {
          id: "a",
          text: "Functional mô tả hành vi/hàm chức năng; Non-functional mô tả thuộc tính chất lượng (hiệu năng, bảo mật)",
          isCorrect: true,
          percentage: 70,
        },
        {
          id: "b",
          text: "Functional dành cho UI; Non-functional dành cho backend",
          isCorrect: false,
          percentage: 15,
        },
        {
          id: "c",
          text: "Không có khác biệt, chỉ cách gọi thôi",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Functional requirement trả lời 'Hệ thống phải làm gì' (ví dụ: user đăng nhập). Non-functional yêu cầu về chất lượng 'Hệ thống phải nhanh/ổn định/bảo mật bao nhiêu' (ví dụ: thời gian phản hồi < 2s).",
    },
    {
      id: 6,
      question: "Use Case khác User Story như thế nào?",
      options: [
        {
          id: "a",
          text: "Use Case là mô tả chi tiết luồng và ngoại lệ; User Story ngắn, phù hợp Agile, tập trung giá trị người dùng",
          isCorrect: true,
          percentage: 66,
        },
        {
          id: "b",
          text: "Use Case dùng cho mobile; User Story cho web",
          isCorrect: false,
          percentage: 14,
        },
        {
          id: "c",
          text: "Hai khái niệm giống nhau hoàn toàn",
          isCorrect: false,
          percentage: 20,
        },
      ],
      explanation:
        "Use Case thường mô tả actor, luồng chính và luồng ngoại lệ ở mức chi tiết. User Story (As a..., I want..., so that...) ngắn gọn, dễ chuyển thành tasks trong sprint; có thể kèm acceptance criteria để rõ yêu cầu.",
    },
    {
      id: 7,
      question: "BRD và FRD khác nhau ở điểm nào?",
      options: [
        {
          id: "a",
          text: "BRD (Business Requirements Document) nêu mục tiêu & nhu cầu kinh doanh; FRD (Functional Requirements Document) mô tả chi tiết chức năng để dev thực hiện",
          isCorrect: true,
          percentage: 68,
        },
        {
          id: "b",
          text: "BRD do dev viết; FRD do business viết",
          isCorrect: false,
          percentage: 12,
        },
        {
          id: "c",
          text: "Không cần cả hai, chỉ cần prototype",
          isCorrect: false,
          percentage: 20,
        },
      ],
      explanation:
        "BRD tập trung vào giá trị kinh doanh, scope, KPI; FRD chi tiết các tính năng, input/output, validation, API contract—dùng làm chỉ dẫn kỹ thuật cho development/testing.",
    },
    {
      id: 8,
      question: "Phương pháp MoSCoW dùng để làm gì?",
      options: [
        {
          id: "a",
          text: "Phân loại mức độ ưu tiên yêu cầu: Must / Should / Could / Won't",
          isCorrect: true,
          percentage: 65,
        },
        {
          id: "b",
          text: "Một loại diagram mô tả process",
          isCorrect: false,
          percentage: 15,
        },
        {
          id: "c",
          text: "Kỹ thuật test performance",
          isCorrect: false,
          percentage: 20,
        },
      ],
      explanation:
        "MoSCoW giúp BA và stakeholders đồng ý về thứ tự ưu tiên tính năng: 'Must' bắt buộc cho ra mắt, 'Should' quan trọng nhưng có thể delay, 'Could' nice-to-have, 'Won't' loại bỏ khỏi phạm vi hiện tại.",
    },
    {
      id: 9,
      question: "AS-IS và TO-BE trong phân tích quy trình nghĩa là gì?",
      options: [
        {
          id: "a",
          text: "AS-IS: trạng thái hiện tại; TO-BE: trạng thái mong muốn; Gap analysis xác định khoảng cách và thay đổi cần thiết",
          isCorrect: true,
          percentage: 67,
        },
        {
          id: "b",
          text: "AS-IS: thiết kế mới; TO-BE: thiết kế cũ",
          isCorrect: false,
          percentage: 13,
        },
        {
          id: "c",
          text: "Hai khái niệm chỉ dùng trong marketing",
          isCorrect: false,
          percentage: 20,
        },
      ],
      explanation:
        "BA vẽ AS-IS để hiểu quy trình hiện hữu, thiết kế TO-BE để thể hiện quy trình tối ưu; gap analysis liệt kê khác biệt, rủi ro và bước chuyển đổi (people/process/technology).",
    },
    {
      id: 10,
      question:
        "Requirement Traceability Matrix (RTM) có mục đích chính là gì?",
      options: [
        {
          id: "a",
          text: "Map từng yêu cầu đến thiết kế, test case và user acceptance để đảm bảo không bỏ sót",
          isCorrect: true,
          percentage: 69,
        },
        {
          id: "b",
          text: "Lưu trữ mockup giao diện cuối cùng",
          isCorrect: false,
          percentage: 11,
        },
        {
          id: "c",
          text: "Một bảng tính để quản lý nhân sự",
          isCorrect: false,
          percentage: 20,
        },
      ],
      explanation:
        "RTM giúp theo dõi vòng đời yêu cầu: mỗi yêu cầu có thể trace đến design, development, test case và trạng thái chấp nhận, từ đó giảm rủi ro mất yêu cầu và hỗ trợ kiểm tra coverage khi release.",
    },

    {
      id: 11,
      question:
        "Bạn có thoải mái giao tiếp với nhiều loại stakeholder (business, dev, ops, legal)?",
      options: [
        {
          id: "a",
          text: "Có, mình dễ chuyển ngôn ngữ kỹ thuật và phi-kỹ thuật",
          isCorrect: true,
          percentage: 62,
        },
        {
          id: "b",
          text: "Chỉ thoải mái với một nhóm nhất định",
          isCorrect: false,
          percentage: 26,
        },
        {
          id: "c",
          text: "Không, mình ngại giao tiếp nhiều",
          isCorrect: false,
          percentage: 12,
        },
      ],
      explanation:
        "Giao tiếp linh hoạt là yếu tố then chốt cho BA: phải vừa lắng nghe yêu cầu business, vừa diễn giải rõ ràng cho technical team mà không mất ý nghĩa.",
    },
    {
      id: 12,
      question:
        "Bạn cảm thấy thế nào khi yêu cầu không rõ ràng hoặc mâu thuẫn?",
      options: [
        {
          id: "a",
          text: "Mình chủ động đặt câu hỏi, tổ chức workshop để làm rõ",
          isCorrect: true,
          percentage: 64,
        },
        {
          id: "b",
          text: "Mình chờ người khác làm rõ",
          isCorrect: false,
          percentage: 22,
        },
        {
          id: "c",
          text: "Mình tự đưa giải pháp mặc định mà không hỏi thêm",
          isCorrect: false,
          percentage: 14,
        },
      ],
      explanation:
        "Comfort với sự mơ hồ và chủ động tạo cấu trúc (questions, assumptions, prototypes) giúp BA giảm rủi ro và tiến dự án.",
    },
    {
      id: 13,
      question:
        "Bạn có thiên về 'chi tiết nhỏ' hay 'tầm nhìn lớn' khi phân tích?",
      options: [
        {
          id: "a",
          text: "Mình cân bằng: vừa nắm bức tranh lớn vừa chú trọng chi tiết",
          isCorrect: true,
          percentage: 60,
        },
        {
          id: "b",
          text: "Chỉ quan tâm bức tranh lớn",
          isCorrect: false,
          percentage: 25,
        },
        {
          id: "c",
          text: "Chỉ chú ý chi tiết nhỏ",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "BA hiệu quả cần vừa hiểu mục tiêu kinh doanh (big picture), vừa đảm bảo các yêu cầu chi tiết để dev/test implement đúng chức năng.",
    },
    {
      id: 14,
      question: "Khi dẫn workshop thu thập yêu cầu, bạn cảm thấy thế nào?",
      options: [
        {
          id: "a",
          text: "Thoải mái dẫn dắt, điều phối ý kiến và tóm tắt kết luận",
          isCorrect: true,
          percentage: 63,
        },
        {
          id: "b",
          text: "Ngại làm chủ buổi, thích để PM/UX chủ trì",
          isCorrect: false,
          percentage: 23,
        },
        {
          id: "c",
          text: "Thích chỉ lắng nghe, không can thiệp",
          isCorrect: false,
          percentage: 14,
        },
      ],
      explanation:
        "Facilitation là kỹ năng quan trọng: BA cần điều phối stakeholder khác nhau, giữ mục tiêu buổi rõ ràng và đưa ra kết luận có thể hành động.",
    },
    {
      id: 15,
      question: "Bạn xử lý ưu tiên khi tài nguyên hạn chế bằng cách nào?",
      options: [
        {
          id: "a",
          text: "Thảo luận với stakeholder, dùng framework (MoSCoW, RICE) và quyết định dựa trên giá trị & rủi ro",
          isCorrect: true,
          percentage: 66,
        },
        {
          id: "b",
          text: "Ưu tiên theo yêu cầu người dễ tiếp cận nhất",
          isCorrect: false,
          percentage: 18,
        },
        {
          id: "c",
          text: "Làm theo thứ tự nhận yêu cầu",
          isCorrect: false,
          percentage: 16,
        },
      ],
      explanation:
        "BA tốt dùng dữ liệu/tiêu chí để ưu tiên: giá trị kinh doanh, chi phí triển khai, rủi ro, dependencies—thay vì cảm tính hay thứ tự ngẫu nhiên.",
    },
    {
      id: 16,
      question:
        "Bạn có tự tin làm việc với dữ liệu (Excel/SQL/basic analytics) để kiểm chứng giả thuyết không?",
      options: [
        {
          id: "a",
          text: "Có, mình thường dùng Excel và SQL cơ bản để phân tích",
          isCorrect: true,
          percentage: 60,
        },
        {
          id: "b",
          text: "Chỉ dựa vào trực giác và ý kiến người dùng",
          isCorrect: false,
          percentage: 25,
        },
        {
          id: "c",
          text: "Không, mình giao việc phân tích cho data team",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Kỹ năng đọc dữ liệu giúp BA kiểm chứng giả thuyết, đo lường impact, và đặt KPI thực tế; không cần là data scientist nhưng hiểu SQL/Excel là lợi thế lớn.",
    },
    {
      id: 17,
      question:
        "Bạn có thói quen viết acceptance criteria rõ ràng cho mỗi user story?",
      options: [
        {
          id: "a",
          text: "Có, mình luôn viết GIVEN-WHEN-THEN hoặc checklist rõ ràng",
          isCorrect: true,
          percentage: 65,
        },
        {
          id: "b",
          text: "Không, mình nghĩ miệng là đủ",
          isCorrect: false,
          percentage: 20,
        },
        {
          id: "c",
          text: "Tùy lúc, khi cần thì viết",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Acceptance criteria rõ ràng giúp dev/test hiểu chuẩn đầu ra, giảm tranh luận và tăng khả năng pass user acceptance ngay lần đầu.",
    },
    {
      id: 18,
      question: "Khi có xung đột giữa stakeholder về scope, bạn thường làm gì?",
      options: [
        {
          id: "a",
          text: "Thu thập quan điểm, phân tích tác động (chi phí/lợi ích), đề xuất trade-off hoặc escalation nếu cần",
          isCorrect: true,
          percentage: 67,
        },
        {
          id: "b",
          text: "Theo ý kiến người có tiếng nói lớn nhất",
          isCorrect: false,
          percentage: 18,
        },
        {
          id: "c",
          text: "Bỏ qua xung đột và tiếp tục công việc",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "BA cần làm trung gian: minh bạch các tác động, dùng dữ liệu/tiêu chí để đưa ra đề xuất hoặc đưa vấn đề lên sponsor khi không thể cân bằng nội bộ.",
    },
    {
      id: 19,
      question:
        "Bạn quản lý time và task trong các vòng lặp (iteration) như thế nào?",
      options: [
        {
          id: "a",
          text: "Chia nhỏ công việc, đặt milestone (wireframe → spec → review → handoff) và cập nhật thường xuyên",
          isCorrect: true,
          percentage: 64,
        },
        {
          id: "b",
          text: "Làm tất cả spec trước rồi mới review",
          isCorrect: false,
          percentage: 20,
        },
        {
          id: "c",
          text: "Để từng task phát sinh rồi giải quyết",
          isCorrect: false,
          percentage: 16,
        },
      ],
      explanation:
        "Phân chia giai đoạn giúp kiểm soát scope, giảm rework; cập nhật liên tục với team giúp phát hiện sớm sai lệch và điều chỉnh kịp thời.",
    },
    {
      id: 20,
      question:
        "Bạn có động lực học hỏi liên tục (công cụ BA, domain knowledge, phân tích dữ liệu)?",
      options: [
        {
          id: "a",
          text: "Có, mình thường cập nhật kỹ năng và tìm hiểu domain sâu",
          isCorrect: true,
          percentage: 68,
        },
        {
          id: "b",
          text: "Chỉ học khi bị yêu cầu",
          isCorrect: false,
          percentage: 20,
        },
        {
          id: "c",
          text: "Không thích thay đổi, chỉ làm theo thói quen",
          isCorrect: false,
          percentage: 12,
        },
      ],
      explanation:
        "BA hiệu quả liên tục cập nhật công cụ (Jira, Confluence, Figma), kỹ thuật (process mapping, SQL) và domain knowledge để đưa ra giải pháp phù hợp và có độ tin cậy cao.",
    },
  ],

  "product-designer": [
    {
      id: 1,
      question: "Product Designer giống vai trò nào trong một quán cà phê?",
      options: [
        {
          id: "a",
          text: "Người pha chế (barista)",
          isCorrect: false,
          percentage: 20,
        },
        {
          id: "b",
          text: "Người thiết kế không gian và menu sao cho khách thích quay lại",
          isCorrect: true,
          percentage: 65,
        },
        {
          id: "c",
          text: "Khách hàng ngồi uống cà phê",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Product Designer quan tâm đến trải nghiệm tổng thể: hiểu nhu cầu khách, thiết kế dịch vụ/flow/menu và không gian để tạo ra sản phẩm hấp dẫn và dễ dùng — tương tự người thiết kế cả trải nghiệm trong quán, không chỉ phần 'pha chế' (visual) hay 'uống' (người dùng).",
    },
    {
      id: 2,
      question:
        "Product Designer khác UX Designer và UI Designer ở điểm nào chính?",
      options: [
        {
          id: "a",
          text: "Product Designer kết hợp chiến lược sản phẩm, UX và visual; UX tập trung research & interaction; UI tập trung visual",
          isCorrect: true,
          percentage: 68,
        },
        {
          id: "b",
          text: "Không khác — chỉ là tên gọi khác nhau",
          isCorrect: false,
          percentage: 12,
        },
        {
          id: "c",
          text: "Product Designer chỉ code phần frontend",
          isCorrect: false,
          percentage: 20,
        },
      ],
      explanation:
        "Product Designer mang góc nhìn sản phẩm (product thinking): hiểu business goal, roadmap, metrics; đồng thời đảm nhiệm research, interaction và visual. UX Designer tập trung sâu hơn vào nghiên cứu & flow; UI Designer chuyên về visual/graphic/interaction details.",
    },
    {
      id: 3,
      question: "MVP (Minimum Viable Product) là gì trong phát triển sản phẩm?",
      options: [
        {
          id: "a",
          text: "Phiên bản sản phẩm tối thiểu có đủ tính năng cốt lõi để kiểm chứng giả thuyết với người dùng",
          isCorrect: true,
          percentage: 70,
        },
        {
          id: "b",
          text: "Sản phẩm hoàn chỉnh nhất trước khi ra mắt",
          isCorrect: false,
          percentage: 10,
        },
        {
          id: "c",
          text: "Một loại mockup bằng giấy",
          isCorrect: false,
          percentage: 20,
        },
      ],
      explanation:
        "MVP tập trung vào giá trị cốt lõi (core value) để học nhanh từ người dùng với chi phí thấp: không phải là sản phẩm đầy đủ tính năng, mà là phiên bản đủ để kiểm chứng giả thuyết thị trường và hướng phát triển tiếp theo.",
    },
    {
      id: 4,
      question: "User research khác usability testing như thế nào?",
      options: [
        {
          id: "a",
          text: "User research khảo sát nhu cầu & hành vi; usability testing kiểm tra mức độ dễ dùng của giải pháp cụ thể",
          isCorrect: true,
          percentage: 67,
        },
        {
          id: "b",
          text: "Hai khái niệm giống nhau và dùng thay thế được",
          isCorrect: false,
          percentage: 13,
        },
        {
          id: "c",
          text: "User research chỉ làm ở giai đoạn cuối cùng",
          isCorrect: false,
          percentage: 20,
        },
      ],
      explanation:
        "User research (qualitative/quantitative) để hiểu vấn đề, bối cảnh, động lực người dùng; usability testing (moderated/unmoderated) để quan sát người dùng tương tác với prototype/sản phẩm và phát hiện vấn đề về khả dụng (usability) để sửa trước khi release.",
    },
    {
      id: 5,
      question:
        "Wireframe, prototype low-fidelity và high-fidelity khác nhau ở điểm gì?",
      options: [
        {
          id: "a",
          text: "Wireframe: bố cục đơn giản; Low-fi prototype: tương tác cơ bản; High-fi: gần giao diện thật, dùng cho user test sâu",
          isCorrect: true,
          percentage: 66,
        },
        {
          id: "b",
          text: "Wireframe là phiên bản cuối cùng của thiết kế",
          isCorrect: false,
          percentage: 12,
        },
        {
          id: "c",
          text: "Không có khái niệm low/high fidelity trong thiết kế",
          isCorrect: false,
          percentage: 22,
        },
      ],
      explanation:
        "Wireframe biểu diễn cấu trúc & thứ tự thông tin; low-fidelity prototype minh hoạ flow & tương tác cơ bản; high-fidelity prototype thể hiện visual, micro-interactions và cảm giác gần giống sản phẩm thật — dùng để test sâu và handoff cho dev.",
    },
    {
      id: 6,
      question:
        "Design system (hoặc component library) mang lại lợi ích gì cho team?",
      options: [
        {
          id: "a",
          text: "Đảm bảo nhất quán, tăng tốc thiết kế & dev, giảm rework và dễ scale",
          isCorrect: true,
          percentage: 72,
        },
        {
          id: "b",
          text: "Chỉ dùng để lưu logo và font",
          isCorrect: false,
          percentage: 10,
        },
        {
          id: "c",
          text: "Làm chậm quá trình vì phải tuân thủ nhiều quy tắc",
          isCorrect: false,
          percentage: 18,
        },
      ],
      explanation:
        "Design system gồm design tokens, components, guidelines và patterns giúp giữ đồng nhất trải nghiệm, tái sử dụng, giảm tráo đổi giữa design-dev, đồng thời hỗ trợ scale sản phẩm khi team lớn lên.",
    },
    {
      id: 7,
      question:
        "Product-market fit (PMF) là gì và làm sao product designer góp phần đạt được PMF?",
      options: [
        {
          id: "a",
          text: "PMF khi sản phẩm đáp ứng nhu cầu lớn của thị trường; designer giúp bằng cách validate hypotheses, tối ưu UX và giảm friction để tăng retention",
          isCorrect: true,
          percentage: 68,
        },
        {
          id: "b",
          text: "PMF chỉ là thuật ngữ marketing, không liên quan đến designer",
          isCorrect: false,
          percentage: 12,
        },
        {
          id: "c",
          text: "PMF là khi sản phẩm có nhiều tính năng nhất",
          isCorrect: false,
          percentage: 20,
        },
      ],
      explanation:
        "PMF đo lường mức độ phù hợp giữa sản phẩm và nhu cầu thị trường (giữ chân & tạo growth). Product designer đóng vai trò làm rõ giá trị sản phẩm, test hypotheses, cải thiện UX để người dùng thấy giá trị rõ rệt và quay lại.",
    },
    {
      id: 8,
      question:
        "A/B testing thường dùng để kiểm chứng điều gì trong product design?",
      options: [
        {
          id: "a",
          text: "So sánh hai biến thể để xem biến thể nào dẫn đến metric (CTR, conversion, retention) tốt hơn",
          isCorrect: true,
          percentage: 70,
        },
        {
          id: "b",
          text: "Làm mockup đẹp hơn cho presentation",
          isCorrect: false,
          percentage: 10,
        },
        {
          id: "c",
          text: "Thay thế user research hoàn toàn",
          isCorrect: false,
          percentage: 20,
        },
      ],
      explanation:
        "A/B test là thử nghiệm có đối chứng trên người dùng thực để đo tác động của thay đổi thiết kế lên KPI cụ thể. Nó bổ sung cho research và giúp ra quyết định dựa trên dữ liệu thay vì cảm tính.",
    },
    {
      id: 9,
      question: "Heuristic evaluation là gì và khi nào nên dùng?",
      options: [
        {
          id: "a",
          text: "Đánh giá giao diện dựa trên bộ nguyên tắc (heuristics) bởi chuyên gia để phát hiện vấn đề khả dụng trước user test",
          isCorrect: true,
          percentage: 66,
        },
        {
          id: "b",
          text: "Một loại prototype bằng giấy",
          isCorrect: false,
          percentage: 14,
        },
        {
          id: "c",
          text: "Kỹ thuật so sánh cạnh tranh (competitive analysis)",
          isCorrect: false,
          percentage: 20,
        },
      ],
      explanation:
        "Heuristic evaluation do designer/UX expert thực hiện, sử dụng các nguyên tắc như Nielsen's heuristics để nhanh chóng tìm lỗi usability, tiết kiệm thời gian trước khi tiến hành user testing.",
    },
    {
      id: 10,
      question:
        "Accessibility trong product design là gì và vì sao quan trọng?",
      options: [
        {
          id: "a",
          text: "Thiết kế để mọi người (kể cả người khuyết tật) có thể sử dụng sản phẩm — tăng khách hàng tiềm năng, giảm rủi ro pháp lý và cải thiện UX tổng thể",
          isCorrect: true,
          percentage: 71,
        },
        {
          id: "b",
          text: "Chỉ liên quan đến dùng màu cho người mù màu",
          isCorrect: false,
          percentage: 12,
        },
        {
          id: "c",
          text: "Không cần thiết nếu sản phẩm chỉ phục vụ nội bộ",
          isCorrect: false,
          percentage: 17,
        },
      ],
      explanation:
        "Accessibility (WCAG guidelines, keyboard nav, screen reader support, contrast, labels) mở rộng phạm vi người dùng, nâng cao chất lượng trải nghiệm cho tất cả người dùng và giúp tuân thủ quy định pháp lý ở nhiều thị trường.",
    },

    {
      id: 11,
      question:
        "Bạn có cảm thấy mình dễ đặt mình vào vị trí người dùng (empathy)?",
      options: [
        {
          id: "a",
          text: "Có — mình cố gắng hiểu mục tiêu, bối cảnh và cảm xúc của người dùng trước khi thiết kế",
          isCorrect: true,
          percentage: 64,
        },
        {
          id: "b",
          text: "Một phần — thường dựa vào ý kiến stakeholders nhiều hơn",
          isCorrect: false,
          percentage: 22,
        },
        {
          id: "c",
          text: "Hiếm khi — mình chủ yếu theo ý mình",
          isCorrect: false,
          percentage: 14,
        },
      ],
      explanation:
        "Empathy là kỹ năng nền tảng của product designer: hiểu người dùng giúp đặt câu hỏi đúng, tạo giả thuyết có giá trị và thiết kế giải pháp thực sự hữu ích.",
    },
    {
      id: 12,
      question:
        "Bạn có thoải mái làm việc với dữ liệu (analytics, funnel, retention metrics)?",
      options: [
        {
          id: "a",
          text: "Có — mình dùng dữ liệu để validate giả thuyết và đo impact",
          isCorrect: true,
          percentage: 62,
        },
        {
          id: "b",
          text: "Chỉ dùng dữ liệu khi PM hoặc data team cung cấp",
          isCorrect: false,
          percentage: 26,
        },
        {
          id: "c",
          text: "Không — mình làm theo cảm tính và trực giác",
          isCorrect: false,
          percentage: 12,
        },
      ],
      explanation:
        "Data literacy giúp designer ưu tiên các thay đổi có ảnh hưởng, đánh giá kết quả A/B test và chứng minh impact của thiết kế với stakeholder.",
    },
    {
      id: 13,
      question:
        "Bạn có sẵn sàng prototype nhanh (paper/low-fi) để validate ý tưởng không?",
      options: [
        {
          id: "a",
          text: "Có — mình ưu tiên học nhanh qua prototype trước khi làm chi tiết",
          isCorrect: true,
          percentage: 66,
        },
        {
          id: "b",
          text: "Thích làm ngay high-fi cho vừa mắt",
          isCorrect: false,
          percentage: 18,
        },
        {
          id: "c",
          text: "Không — mình cần time chuyên sâu để suy nghĩ",
          isCorrect: false,
          percentage: 16,
        },
      ],
      explanation:
        "Prototype nhanh giúp kiểm chứng giả thuyết sớm, tiết kiệm thời gian và tiền bạc bằng cách loại bỏ ý tưởng không phù hợp trước khi đầu tư cao.",
    },
    {
      id: 14,
      question:
        "Bạn phản ứng thế nào khi nhận feedback trái chiều từ stakeholders?",
      options: [
        {
          id: "a",
          text: "Lắng nghe, tổng hợp, hỏi rõ mục tiêu/tiêu chí và đề xuất trade-offs dựa trên dữ liệu",
          isCorrect: true,
          percentage: 67,
        },
        {
          id: "b",
          text: "Cố bảo vệ thiết kế ban đầu",
          isCorrect: false,
          percentage: 18,
        },
        {
          id: "c",
          text: "Bỏ qua feedback để tiếp tục ý mình",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Kỹ năng xử lý feedback hiệu quả là tách biệt cảm xúc cá nhân khỏi dữ liệu, tập trung vào mục tiêu sản phẩm và đưa ra giải pháp cân bằng giữa các yêu cầu.",
    },
    {
      id: 15,
      question:
        "Bạn có thói quen viết spec/handoff rõ ràng khi chuyển giao cho dev không?",
      options: [
        {
          id: "a",
          text: "Có — mình cung cấp spacing, token, variant, states và assets để giảm sai khác",
          isCorrect: true,
          percentage: 70,
        },
        {
          id: "b",
          text: "Gửi file Figma và nói chuyện miệng là đủ",
          isCorrect: false,
          percentage: 18,
        },
        {
          id: "c",
          text: "Để dev tự hiểu khi build",
          isCorrect: false,
          percentage: 12,
        },
      ],
      explanation:
        "Handoff chất lượng (spec rõ ràng, component variants, accessibility notes) giảm rework, tăng tốc dev và đảm bảo sản phẩm triển khai trùng với kỳ vọng thiết kế.",
    },
    {
      id: 16,
      question:
        "Bạn có ưu tiên xây dựng và duy trì design system khi sản phẩm scale không?",
      options: [
        {
          id: "a",
          text: "Có — mình thấy design system tiết kiệm thời gian dài hạn và giữ nhất quán",
          isCorrect: true,
          percentage: 65,
        },
        {
          id: "b",
          text: "Không quá cần thiết cho sản phẩm nhỏ",
          isCorrect: false,
          percentage: 20,
        },
        {
          id: "c",
          text: "Không thích vì cảm thấy hạn chế sáng tạo",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Design system là đầu tư: với scale, nó giúp giữ consistency, giảm technical debt và chuẩn hóa trải nghiệm; với project rất nhỏ có thể chưa cần nhưng vẫn nên có tư duy component.",
    },
    {
      id: 17,
      question:
        "Bạn có sẵn sàng cân nhắc trade-offs giữa UX và business/tech constraints?",
      options: [
        {
          id: "a",
          text: "Có — mình cân nhắc giá trị người dùng, chi phí và kỹ thuật để đề xuất giải pháp khả thi",
          isCorrect: true,
          percentage: 68,
        },
        {
          id: "b",
          text: "Luôn ưu tiên UX dù tốn kém",
          isCorrect: false,
          percentage: 18,
        },
        {
          id: "c",
          text: "Theo ý dev nếu họ nói khó",
          isCorrect: false,
          percentage: 14,
        },
      ],
      explanation:
        "Product design thực tế cần trade-off: designer phối hợp với PM và dev để tìm giải pháp tối ưu giữa trải nghiệm, thời gian và chi phí phát triển.",
    },
    {
      id: 18,
      question:
        "Bạn có thường xuyên test sản phẩm với người dùng thật (qualitative) không?",
      options: [
        {
          id: "a",
          text: "Có — test định kỳ giúp điều chỉnh hướng thiết kế dựa trên bằng chứng",
          isCorrect: true,
          percentage: 63,
        },
        {
          id: "b",
          text: "Hiếm khi — chỉ test khi có dự án lớn",
          isCorrect: false,
          percentage: 23,
        },
        {
          id: "c",
          text: "Không — mình tin vào cảm nhận và kinh nghiệm",
          isCorrect: false,
          percentage: 14,
        },
      ],
      explanation:
        "Usability testing định kỳ (moderated/unmoderated) giúp phát hiện vấn đề thực tế, ưu tiên fix và tăng khả năng sản phẩm phù hợp với nhu cầu người dùng.",
    },
    {
      id: 19,
      question:
        "Bạn có thói quen học hỏi công cụ mới (Figma plugins, prototyping tools, analytics) không?",
      options: [
        {
          id: "a",
          text: "Có — mình liên tục cập nhật để làm việc hiệu quả hơn",
          isCorrect: true,
          percentage: 66,
        },
        {
          id: "b",
          text: "Chỉ dùng công cụ quen thuộc",
          isCorrect: false,
          percentage: 20,
        },
        {
          id: "c",
          text: "Không quan tâm đến công cụ",
          isCorrect: false,
          percentage: 14,
        },
      ],
      explanation:
        "Liên tục học giúp designer nâng cao tốc độ, mở rộng phương pháp và tích hợp tốt hơn với workflow của team (ví dụ auto-layout, tokens, plugin automation).",
    },
    {
      id: 20,
      question: "Điều gì khiến bạn phù hợp với vai trò Product Designer nhất?",
      options: [
        {
          id: "a",
          text: "Sự kết hợp giữa tư duy sản phẩm, empathy với người dùng và kỹ năng thiết kế/triển khai",
          isCorrect: true,
          percentage: 70,
        },
        {
          id: "b",
          text: "Chỉ có khiếu thẩm mỹ và làm visual tốt",
          isCorrect: false,
          percentage: 18,
        },
        {
          id: "c",
          text: "Khả năng viết code thành thạo",
          isCorrect: false,
          percentage: 12,
        },
      ],
      explanation:
        "Product Designer hiệu quả cần product sense (hiểu business & metrics), empathy (hiểu người dùng) và kỹ năng thực thi (research, prototyping, handoff). Visual đẹp hay code biết thêm là lợi thế nhưng không thay thế tư duy sản phẩm.",
    },
  ],
};
