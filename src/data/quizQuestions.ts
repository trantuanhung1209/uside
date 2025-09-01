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
        "Trong một dự án phần mềm, bạn nghĩ tester mang lại giá trị lớn nhất ở giai đoạn nào: khi phát triển, khi bàn giao hay khi bảo trì?",
      options: [
        { id: "a", text: "Khi phát triển", isCorrect: false, percentage: 20 },
        { id: "b", text: "Khi bàn giao", isCorrect: true, percentage: 60 },
        { id: "c", text: "Khi bảo trì", isCorrect: false, percentage: 20 },
      ],
      explanation:
        "Tester giúp đảm bảo chất lượng sản phẩm trước khi bàn giao cho khách hàng.",
    },
    {
      id: 2,
      question:
        "Nếu team đang test thủ công 100 test case lặp lại hàng ngày, bạn sẽ thuyết phục sếp đầu tư automation bằng lập luận nào?",
      options: [
        {
          id: "a",
          text: "Automation giúp tiết kiệm thời gian, giảm sai sót",
          isCorrect: true,
          percentage: 65,
        },
        {
          id: "b",
          text: "Vẫn test thủ công cho quen",
          isCorrect: false,
          percentage: 20,
        },
        {
          id: "c",
          text: "Đợi khách hàng yêu cầu rồi mới làm",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Automation Testing giúp tiết kiệm chi phí và tăng độ tin cậy trong dài hạn.",
    },
    {
      id: 3,
      question:
        "Nếu bạn gửi một bug report thiếu thông tin, developer thường phản ứng thế nào? Bạn sẽ làm gì để bug report của mình luôn hữu ích?",
      options: [
        {
          id: "a",
          text: "Ghi rõ tên bug, bước tái hiện, mức độ ảnh hưởng",
          isCorrect: true,
          percentage: 75,
        },
        {
          id: "b",
          text: "Chỉ gửi ảnh chụp màn hình",
          isCorrect: false,
          percentage: 15,
        },
        {
          id: "c",
          text: "Đưa luôn mã nguồn chi tiết",
          isCorrect: false,
          percentage: 10,
        },
      ],
      explanation:
        "Bug report rõ ràng giúp developer tái hiện lỗi dễ dàng và tiết kiệm thời gian fix.",
    },
    {
      id: 4,
      question:
        "Nếu chỉ viết Unit Test mà không có Integration Test thì rủi ro gì có thể xảy ra?",
      options: [
        {
          id: "a",
          text: "Không phát hiện được lỗi khi các module kết hợp",
          isCorrect: true,
          percentage: 65,
        },
        {
          id: "b",
          text: "Không kiểm tra giao diện",
          isCorrect: false,
          percentage: 20,
        },
        {
          id: "c",
          text: "Không kiểm tra được tốc độ hệ thống",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Unit Test chỉ đảm bảo từng phần nhỏ chạy đúng, cần Integration Test để đảm bảo sự phối hợp.",
    },
    {
      id: 5,
      question:
        "Bạn đã bao giờ gặp tình huống fix một bug xong lại làm hỏng tính năng cũ chưa? Regression Testing sẽ giúp xử lý tình huống đó như thế nào?",
      options: [
        {
          id: "a",
          text: "Đảm bảo tính năng cũ vẫn hoạt động sau khi sửa",
          isCorrect: true,
          percentage: 70,
        },
        {
          id: "b",
          text: "Tìm ra tính năng mới",
          isCorrect: false,
          percentage: 15,
        },
        {
          id: "c",
          text: "Đánh giá lại giao diện",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Regression Test giúp phát hiện lỗi phát sinh sau khi code thay đổi.",
    },
    {
      id: 6,
      question:
        "Bạn thường dùng Jira, Trello hay Excel để quản lý bug? Với team nhỏ hoặc startup, công cụ nào là tối ưu hơn?",
      options: [
        { id: "a", text: "Jira", isCorrect: true, percentage: 75 },
        { id: "b", text: "MS Word", isCorrect: false, percentage: 10 },
        { id: "c", text: "Figma", isCorrect: false, percentage: 15 },
      ],
      explanation:
        "Jira phổ biến cho team lớn, Trello/Excel đơn giản phù hợp team nhỏ.",
    },
    {
      id: 7,
      question:
        "Nếu build mới bị lỗi ngay ở smoke test, bạn sẽ xử lý ra sao để tiết kiệm thời gian cho team?",
      options: [
        {
          id: "a",
          text: "Thông báo ngay để dừng test chi tiết",
          isCorrect: true,
          percentage: 70,
        },
        {
          id: "b",
          text: "Vẫn tiếp tục test cho đủ checklist",
          isCorrect: false,
          percentage: 20,
        },
        {
          id: "c",
          text: "Đợi release ra thị trường mới xử lý",
          isCorrect: false,
          percentage: 10,
        },
      ],
      explanation:
        "Smoke Test giúp phát hiện sớm build lỗi, tiết kiệm công sức test chi tiết.",
    },
    {
      id: 8,
      question:
        "Nếu Postman không đủ cho API phức tạp (nhiều flow, dữ liệu động), bạn sẽ chọn giải pháp nào khác?",
      options: [
        { id: "a", text: "Postman", isCorrect: true, percentage: 70 },
        { id: "b", text: "Photoshop", isCorrect: false, percentage: 15 },
        { id: "c", text: "Excel", isCorrect: false, percentage: 15 },
      ],
      explanation:
        "Postman phổ biến, nhưng với hệ thống lớn có thể dùng Newman, RestAssured, JMeter.",
    },
    {
      id: 9,
      question:
        "Nếu hệ thống bị chậm khi có 1,000 người dùng cùng lúc, bạn sẽ dùng performance testing để chứng minh vấn đề này như thế nào?",
      options: [
        {
          id: "a",
          text: "Đo khả năng chịu tải và tốc độ phản hồi",
          isCorrect: true,
          percentage: 75,
        },
        {
          id: "b",
          text: "Đánh giá tính thân thiện giao diện",
          isCorrect: false,
          percentage: 15,
        },
        {
          id: "c",
          text: "Đo quy trình developer",
          isCorrect: false,
          percentage: 10,
        },
      ],
      explanation:
        "Performance Test giúp đo tải, tốc độ, ổn định của hệ thống.",
    },
    {
      id: 10,
      question:
        "Bạn từng viết test case nào giúp phát hiện bug nghiêm trọng chưa? Bạn có thể kể lại ví dụ?",
      options: [
        {
          id: "a",
          text: "Kịch bản mô tả bước test và kết quả mong đợi",
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
        "Test case giúp kiểm tra tính năng cụ thể và phát hiện bug tiềm ẩn.",
    },
    {
      id: 11,
      question:
        "Khi phát hiện bug, bạn sẽ làm thế nào để đảm bảo team xử lý nhanh và hiệu quả?",
      options: [
        {
          id: "a",
          text: "Bỏ qua vì không quan trọng",
          isCorrect: false,
          percentage: 10,
        },
        {
          id: "b",
          text: "Ghi bug report chi tiết và gửi kịp thời",
          isCorrect: true,
          percentage: 75,
        },
        {
          id: "c",
          text: "Chỉ báo miệng với developer",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Một bug report chuẩn giúp team fix nhanh và giảm tranh cãi.",
    },
    {
      id: 12,
      question:
        "Khi gặp lỗi khó tái hiện, bạn thường xử lý thế nào để không bỏ sót bug?",
      options: [
        {
          id: "a",
          text: "Bỏ qua vì mất thời gian",
          isCorrect: false,
          percentage: 10,
        },
        {
          id: "b",
          text: "Thử nhiều lần và ghi rõ điều kiện tái hiện",
          isCorrect: true,
          percentage: 70,
        },
        {
          id: "c",
          text: "Gửi ngay cho developer không cần chi tiết",
          isCorrect: false,
          percentage: 20,
        },
      ],
      explanation:
        "Ghi rõ môi trường, bước thực hiện sẽ giúp developer fix dễ dàng.",
    },
    {
      id: 13,
      question:
        "Nếu phải test đi test lại cùng một chức năng, bạn sẽ giữ động lực như thế nào?",
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
      explanation: "Kiên nhẫn và kỷ luật là phẩm chất quan trọng với tester.",
    },
    {
      id: 14,
      question:
        "Khi làm việc nhóm, bạn sẽ trao đổi với developer và business analyst như thế nào để tránh hiểu nhầm?",
      options: [
        {
          id: "a",
          text: "Chủ động trao đổi và xác nhận yêu cầu",
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
      explanation: "Giao tiếp hiệu quả giúp giảm bug từ yêu cầu chưa rõ ràng.",
    },
    {
      id: 15,
      question:
        "Khi gặp một lỗi lạ, bạn có thấy hứng thú tìm nguyên nhân sâu xa không?",
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
      explanation: "Tò mò và phân tích lỗi là động lực quan trọng của tester.",
    },
    {
      id: 16,
      question:
        "Nếu developer phản hồi gay gắt về bug bạn báo, bạn sẽ xử lý như thế nào?",
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
        { id: "c", text: "Bỏ qua bug luôn", isCorrect: false, percentage: 15 },
      ],
      explanation:
        "Bằng chứng rõ ràng giúp giải quyết mâu thuẫn hiệu quả hơn tranh cãi.",
    },
    {
      id: 17,
      question: "Nếu deadline gấp, bạn sẽ chọn ưu tiên test theo cách nào?",
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
        "Kỹ năng ưu tiên giúp đảm bảo chất lượng trong thời gian giới hạn.",
    },
    {
      id: 18,
      question:
        "Bạn có hay tò mò cách sản phẩm hoạt động bên trong không? Sự tò mò này giúp ích gì khi test?",
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
        "Tính tò mò giúp đặt nhiều câu hỏi và phát hiện bug tiềm ẩn.",
    },
    {
      id: 19,
      question:
        "Khi test case thất bại, bạn thường phản ứng thế nào để xử lý tình huống?",
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
          text: "Đổ lỗi ngay cho developer",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Một tester giỏi sẽ phân tích nguyên nhân trước khi báo cáo bug.",
    },
    {
      id: 20,
      question:
        "Theo bạn, yếu tố quan trọng nhất để trở thành một tester giỏi là gì?",
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
        "Kiên nhẫn và sự tỉ mỉ là yếu tố then chốt để trở thành tester giỏi.",
    },
  ],
  "web-developer": [
    {
      id: 1,
      question:
        "Nếu không có HTML, bạn nghĩ website sẽ gặp vấn đề gì trong việc hiển thị?",
      options: [
        {
          id: "a",
          text: "Không có cấu trúc và nội dung rõ ràng",
          isCorrect: true,
          percentage: 72,
        },
        {
          id: "b",
          text: "Không thể kết nối cơ sở dữ liệu",
          isCorrect: false,
          percentage: 15,
        },
        {
          id: "c",
          text: "Không thể thêm hiệu ứng động",
          isCorrect: false,
          percentage: 13,
        },
      ],
      explanation:
        "HTML là nền tảng để trình duyệt hiểu cấu trúc của website. Nếu thiếu HTML, website chỉ còn là văn bản rời rạc, không có bố cục.",
    },
    {
      id: 2,
      question: "Bạn sẽ thuyết phục một người không dùng CSS như thế nào?",
      options: [
        {
          id: "a",
          text: "Không có CSS thì website sẽ chỉ là văn bản thô, khó sử dụng",
          isCorrect: true,
          percentage: 74,
        },
        {
          id: "b",
          text: "Vẫn đẹp như bình thường nhưng chạy chậm hơn",
          isCorrect: false,
          percentage: 14,
        },
        {
          id: "c",
          text: "Không ảnh hưởng gì vì CSS chỉ là phần phụ",
          isCorrect: false,
          percentage: 12,
        },
      ],
      explanation:
        "CSS quyết định giao diện và trải nghiệm người dùng. Không có CSS thì website không thể tạo layout, màu sắc hay responsive.",
    },
    {
      id: 3,
      question:
        "Nếu không có JavaScript, người dùng sẽ gặp khó khăn gì trên web?",
      options: [
        {
          id: "a",
          text: "Không có tương tác động như form validation, popup",
          isCorrect: true,
          percentage: 77,
        },
        {
          id: "b",
          text: "Không thể viết văn bản lên website",
          isCorrect: false,
          percentage: 11,
        },
        {
          id: "c",
          text: "Không thể hiển thị hình ảnh",
          isCorrect: false,
          percentage: 12,
        },
      ],
      explanation:
        "JavaScript tạo sự tương tác và logic động cho website. Thiếu nó, web chỉ còn hiển thị tĩnh.",
    },
    {
      id: 4,
      question:
        "Nếu không có framework như React/Vue/Angular, Frontend Developer sẽ gặp khó khăn gì?",
      options: [
        {
          id: "a",
          text: "Phải tự viết lại nhiều logic phức tạp, khó bảo trì",
          isCorrect: true,
          percentage: 70,
        },
        {
          id: "b",
          text: "Không thể kết nối cơ sở dữ liệu",
          isCorrect: false,
          percentage: 15,
        },
        {
          id: "c",
          text: "Không thể viết HTML",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Framework frontend giúp tái sử dụng component, quản lý state và tối ưu trải nghiệm. Nếu không có, code dễ bị lặp và khó mở rộng.",
    },
    {
      id: 5,
      question:
        "Nếu một website chỉ có frontend mà không có backend thì hạn chế lớn nhất là gì?",
      options: [
        {
          id: "a",
          text: "Không thể xử lý logic phức tạp và lưu trữ dữ liệu",
          isCorrect: true,
          percentage: 73,
        },
        {
          id: "b",
          text: "Website sẽ chạy chậm hơn",
          isCorrect: false,
          percentage: 13,
        },
        {
          id: "c",
          text: "Không thể hiển thị hình ảnh",
          isCorrect: false,
          percentage: 14,
        },
      ],
      explanation:
        "Backend chịu trách nhiệm xử lý dữ liệu, logic nghiệp vụ và API. Nếu không có, website chỉ dừng ở mức tĩnh.",
    },
    {
      id: 6,
      question: "Khi làm việc nhóm, Git giúp bạn tránh rắc rối gì?",
      options: [
        {
          id: "a",
          text: "Tránh ghi đè code của nhau và theo dõi thay đổi",
          isCorrect: true,
          percentage: 78,
        },
        { id: "b", text: "Tự động viết CSS", isCorrect: false, percentage: 12 },
        {
          id: "c",
          text: "Tự động deploy web",
          isCorrect: false,
          percentage: 10,
        },
      ],
      explanation:
        "Git giúp quản lý phiên bản code, hỗ trợ merge, rollback và cộng tác mà không lo mất dữ liệu.",
    },
    {
      id: 7,
      question:
        "Nếu bạn muốn trở thành một Web Developer toàn diện, kỹ năng nào sau đây nên học trước tiên?",
      options: [
        {
          id: "a",
          text: "HTML, CSS và JavaScript để xây dựng nền tảng Frontend",
          isCorrect: true,
          percentage: 75,
        },
        {
          id: "b",
          text: "Các framework nâng cao như React hoặc Angular ngay từ đầu",
          isCorrect: false,
          percentage: 12,
        },
        {
          id: "c",
          text: "Cấu hình máy chủ và cơ sở dữ liệu phức tạp",
          isCorrect: false,
          percentage: 13,
        },
      ],
      explanation:
        "Sinh viên muốn theo đuổi web development nên bắt đầu từ **HTML, CSS và JavaScript** vì đây là nền tảng căn bản để hiểu cách một trang web được xây dựng và hiển thị. Sau khi nắm vững, mới nên học tiếp framework (React, Angular, Vue) hoặc backend (Node.js, PHP, Python...). Điều này giúp phát triển tư duy hệ thống, tránh học 'mất gốc' và dễ dàng tiếp cận các công nghệ nâng cao.",
    },
    {
      id: 8,
      question: "Nếu không có API, các ứng dụng web sẽ bị hạn chế thế nào?",
      options: [
        {
          id: "a",
          text: "Không thể giao tiếp và chia sẻ dữ liệu giữa hệ thống",
          isCorrect: true,
          percentage: 71,
        },
        {
          id: "b",
          text: "Không thể viết CSS",
          isCorrect: false,
          percentage: 14,
        },
        {
          id: "c",
          text: "Không thể hiển thị giao diện",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "API (Application Programming Interface) là một bộ quy tắc và giao thức cho phép các ứng dụng khác nhau giao tiếp và trao đổi dữ liệu với nhau. Không có API thì ứng dụng bị cô lập.",
    },
    {
      id: 9,
      question: "Nếu một website không responsive thì hậu quả là gì?",
      options: [
        {
          id: "a",
          text: "Người dùng di động khó sử dụng, trải nghiệm tệ",
          isCorrect: true,
          percentage: 81,
        },
        {
          id: "b",
          text: "Website tự động tạo nội dung mới",
          isCorrect: false,
          percentage: 10,
        },
        { id: "c", text: "Không cần CSS nữa", isCorrect: false, percentage: 9 },
      ],
      explanation:
        "Responsive Design dịch nghĩa là **'thiết kế đáp ứng'**. Trong phát triển web, nó chỉ cách xây dựng giao diện có khả năng **tự điều chỉnh bố cục, hình ảnh, chữ và các thành phần** sao cho phù hợp với nhiều thiết bị khác nhau (máy tính, máy tính bảng, điện thoại). \n\nCụ thể, kỹ thuật này thường sử dụng **media queries trong CSS, grid/flexbox layout và hình ảnh co giãn** để website vẫn dễ đọc, dễ dùng dù trên màn hình lớn hay nhỏ. \nVí dụ: cùng một website, trên PC hiển thị 3 cột nội dung, nhưng khi mở trên điện thoại nó sẽ tự động sắp xếp thành 1 cột duy nhất.",
    },
    {
      id: 10,
      question:
        "Nếu một website không có database, giới hạn lớn nhất sẽ là gì?",
      options: [
        {
          id: "a",
          text: "Không thể lưu trữ và quản lý dữ liệu người dùng",
          isCorrect: true,
          percentage: 76,
        },
        {
          id: "b",
          text: "Không thể viết HTML",
          isCorrect: false,
          percentage: 12,
        },
        {
          id: "c",
          text: "Không thể thay đổi màu sắc",
          isCorrect: false,
          percentage: 12,
        },
      ],
      explanation:
        "Database (cơ sở dữ liệu) là hệ thống dùng để **lưu trữ, tổ chức và truy xuất dữ liệu** một cách hiệu quả. Trong phát triển web, hai loại database phổ biến nhất là:\n\n- **SQL (Relational Database)**: tổ chức dữ liệu theo bảng (table), quan hệ (relation) – ví dụ MySQL, PostgreSQL, SQL Server.\n- **NoSQL (Non-relational Database)**: lưu trữ dữ liệu linh hoạt (document, key-value, column, graph) – ví dụ MongoDB, Redis, Cassandra.\n\nNgoài ra còn có các loại database chuyên biệt như:\n- **Graph Database**: lưu trữ dữ liệu theo đồ thị, dùng trong mạng xã hội, recommendation (ví dụ: Neo4j).\n- **Vector Database**: tối ưu cho AI/ML, tìm kiếm ngữ nghĩa và dữ liệu embedding (ví dụ: Pinecone, Weaviate).\n\nTuy nhiều loại tồn tại, nhưng SQL và NoSQL là nền tảng quan trọng nhất mà sinh viên nên tìm hiểu trước khi đi sâu vào các hệ thống đặc thù.",
    },
    {
      id: 11,
      question:
        "Bạn sẽ chọn code nhanh nhưng khó bảo trì hay code chậm hơn nhưng dễ bảo trì?",
      options: [
        {
          id: "a",
          text: "Chọn code dễ bảo trì để dự án phát triển lâu dài",
          isCorrect: true,
          percentage: 70,
        },
        {
          id: "b",
          text: "Chọn code nhanh để chạy deadline",
          isCorrect: false,
          percentage: 18,
        },
        {
          id: "c",
          text: "Tùy tình huống, cả hai đều quan trọng",
          isCorrect: false,
          percentage: 12,
        },
      ],
      explanation:
        "Trong thực tế, tốc độ viết code ban đầu có thể giúp bạn ra sản phẩm nhanh, nhưng về lâu dài thì **chất lượng và khả năng bảo trì** mới quyết định sự thành công của dự án. Code dễ đọc, dễ mở rộng sẽ tiết kiệm thời gian fix bug và thêm tính năng sau này. Vì vậy, kỹ năng 'viết code rõ ràng, có cấu trúc' là thứ sinh viên nên rèn luyện ngay từ sớm, thay vì chỉ tập trung vào tốc độ.",
    },
    {
      id: 12,
      question:
        "Trong ngành Web Development, tại sao việc học công nghệ mới liên tục lại quan trọng?",
      options: [
        {
          id: "a",
          text: "Vì công nghệ web luôn thay đổi, giúp developer bắt kịp xu hướng và cơ hội nghề nghiệp",
          isCorrect: true,
          percentage: 68,
        },
        {
          id: "b",
          text: "Vì học công nghệ mới giúp bỏ qua hoàn toàn kiến thức cũ",
          isCorrect: false,
          percentage: 17,
        },
        {
          id: "c",
          text: "Vì chỉ cần học 1 framework là đủ cho cả sự nghiệp",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Web Development là một trong những lĩnh vực công nghệ thay đổi nhanh nhất: framework mới, chuẩn web mới, công cụ tối ưu mới xuất hiện liên tục. Developer nào cập nhật tốt sẽ dễ dàng tiếp cận các dự án hiện đại và có lợi thế cạnh tranh trong sự nghiệp. Tuy nhiên, việc học công nghệ mới không có nghĩa là bỏ qua nền tảng — kiến thức cơ bản như HTML, CSS, JavaScript và nguyên lý lập trình vẫn là nền móng quan trọng để tiếp thu nhanh các công nghệ mới.",
    },
    {
      id: 13,
      question:
        "Tại sao kỹ năng làm việc nhóm lại quan trọng trong phát triển web?",
      options: [
        {
          id: "a",
          text: "Vì dự án web thường cần phối hợp frontend, backend và thiết kế",
          isCorrect: true,
          percentage: 72,
        },
        {
          id: "b",
          text: "Vì teamwork giúp tiết kiệm chi phí phần cứng",
          isCorrect: false,
          percentage: 15,
        },
        {
          id: "c",
          text: "Vì teamwork giúp tránh phải học công nghệ mới",
          isCorrect: false,
          percentage: 13,
        },
      ],
      explanation:
        "Trong phát triển web, teamwork đảm bảo sự phối hợp giữa các vai trò khác nhau (frontend, backend, UI/UX, tester). Một developer giỏi không chỉ biết code, mà còn biết giao tiếp và hợp tác để dự án hoàn thành đúng hạn, chất lượng.",
    },
    {
      id: 14,
      question:
        "Một Web Developer cần chú ý gì khi phải làm việc nhiều giờ liên tục trước máy tính?",
      options: [
        {
          id: "a",
          text: "Quản lý thời gian, nghỉ giải lao và bảo vệ sức khỏe",
          isCorrect: true,
          percentage: 66,
        },
        {
          id: "b",
          text: "Cố gắng làm liên tục để tiết kiệm thời gian",
          isCorrect: false,
          percentage: 18,
        },
        {
          id: "c",
          text: "Không cần quan tâm vì ngồi càng lâu càng giỏi",
          isCorrect: false,
          percentage: 16,
        },
      ],
      explanation:
        "Web Developer thường phải ngồi lâu trước máy tính. Biết cách quản lý thời gian, nghỉ ngắn giữa giờ, tập thể dục nhẹ sẽ giúp duy trì năng suất và tránh các vấn đề sức khỏe lâu dài.",
    },
    {
      id: 15,
      question:
        "Tại sao kỹ năng đọc tài liệu (documentation) quan trọng với Web Developer?",
      options: [
        {
          id: "a",
          text: "Vì documentation là nguồn chính thống để hiểu công nghệ",
          isCorrect: true,
          percentage: 70,
        },
        {
          id: "b",
          text: "Vì documentation luôn có video hướng dẫn",
          isCorrect: false,
          percentage: 15,
        },
        {
          id: "c",
          text: "Vì chỉ cần đọc tài liệu là không phải code",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Documentation là nguồn chính xác và cập nhật nhất từ nhà phát triển công nghệ. Biết cách đọc và tra cứu docs giúp Web Developer giải quyết vấn đề nhanh hơn và hiểu sâu hơn, thay vì chỉ phụ thuộc vào tutorial.",
    },
    {
      id: 16,
      question: "Khi đối mặt với deadline gấp, bạn sẽ chọn cách nào?",
      options: [
        {
          id: "a",
          text: "Lập kế hoạch, ưu tiên công việc quan trọng",
          isCorrect: true,
          percentage: 74,
        },
        {
          id: "b",
          text: "Làm thật nhanh mà không cần plan",
          isCorrect: false,
          percentage: 16,
        },
        {
          id: "c",
          text: "Để đến gần deadline mới bắt đầu",
          isCorrect: false,
          percentage: 10,
        },
      ],
      explanation:
        "Quản lý thời gian và sắp xếp ưu tiên là kỹ năng sống còn trong lập trình. Lập kế hoạch hợp lý giúp tránh bug gấp rút và đảm bảo chất lượng sản phẩm.",
    },
    {
      id: 17,
      question:
        "Chia sẻ kiến thức trong cộng đồng lập trình mang lại lợi ích gì?",
      options: [
        {
          id: "a",
          text: "Giúp củng cố kiến thức của bản thân và xây dựng uy tín",
          isCorrect: true,
          percentage: 69,
        },
        {
          id: "b",
          text: "Làm mất thời gian mà không có ích lợi",
          isCorrect: false,
          percentage: 17,
        },
        {
          id: "c",
          text: "Khi chia sẻ thì kiến thức của mình sẽ bị người khác lấy mất",
          isCorrect: false,
          percentage: 14,
        },
      ],
      explanation:
        "Việc chia sẻ kiến thức (qua blog, talk, mentoring) vừa giúp củng cố kiến thức của bản thân, vừa đóng góp cho cộng đồng. Đây cũng là cách để xây dựng uy tín và mở rộng cơ hội nghề nghiệp.",
    },
    {
      id: 18,
      question:
        "Code review giúp ích gì cho quá trình học tập của Web Developer?",
      options: [
        {
          id: "a",
          text: "Giúp học hỏi từ feedback và cải thiện kỹ năng",
          isCorrect: true,
          percentage: 71,
        },
        {
          id: "b",
          text: "Chỉ làm mất thời gian mà không có giá trị",
          isCorrect: false,
          percentage: 19,
        },
        {
          id: "c",
          text: "Chủ yếu để chấm điểm hơn là để học",
          isCorrect: false,
          percentage: 10,
        },
      ],
      explanation:
        "Code review không chỉ để tìm bug mà còn để học hỏi coding style, best practice và tư duy giải quyết vấn đề từ người khác. Đây là công cụ học tập rất mạnh cho developer.",
    },
    {
      id: 19,
      question: "Làm dự án cá nhân và dự án nhóm khác nhau thế nào?",
      options: [
        {
          id: "a",
          text: "Dự án cá nhân giúp tự chủ, dự án nhóm giúp rèn teamwork",
          isCorrect: true,
          percentage: 65,
        },
        {
          id: "b",
          text: "Dự án nhóm luôn khó hơn cá nhân",
          isCorrect: false,
          percentage: 20,
        },
        {
          id: "c",
          text: "Dự án cá nhân không có giá trị thực tế",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Dự án cá nhân giúp sinh viên chủ động học kỹ năng mới và thể hiện năng lực riêng, trong khi dự án nhóm rèn khả năng phối hợp. Cả hai đều quan trọng để phát triển sự nghiệp.",
    },
    {
      id: 20,
      question:
        "Vì sao tự học là kỹ năng quan trọng hàng đầu với Web Developer?",
      options: [
        {
          id: "a",
          text: "Vì công nghệ luôn thay đổi, developer phải tự cập nhật",
          isCorrect: true,
          percentage: 76,
        },
        {
          id: "b",
          text: "Vì công nghệ không bao giờ thay đổi",
          isCorrect: false,
          percentage: 12,
        },
        {
          id: "c",
          text: "Vì chỉ cần học một lần là đủ cho cả sự nghiệp",
          isCorrect: false,
          percentage: 12,
        },
      ],
      explanation:
        "Ngành web biến đổi liên tục: framework mới, chuẩn mới, công cụ mới. Khả năng tự học giúp developer bắt kịp xu hướng, thích nghi nhanh với dự án và có lợi thế cạnh tranh trên thị trường việc làm.",
    },
  ],

  "mobile-developer": [
    {
      id: 1,
      question:
        "Startup nhỏ cần ra mắt app trên cả iOS và Android với chi phí hạn chế. Bạn nên chọn native hay cross-platform? Vì sao?",
      options: [
        {
          id: "a",
          text: "Native (Swift/Kotlin) để có hiệu năng tối đa",
          isCorrect: false,
          percentage: 25,
        },
        {
          id: "b",
          text: "Cross-platform (Flutter/React Native) để tiết kiệm chi phí và codebase chung",
          isCorrect: true,
          percentage: 60,
        },
        {
          id: "c",
          text: "Web app chạy trên trình duyệt, không cần app store",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Cross-platform phù hợp với startup cần tốc độ và chi phí thấp. Native cho hiệu năng tối đa, web app ít trải nghiệm native.",
    },
    {
      id: 2,
      question:
        "Nếu team bạn đã có nhiều developer JavaScript, chọn React Native hay Flutter sẽ hợp lý hơn?",
      options: [
        {
          id: "a",
          text: "React Native vì tận dụng kiến thức JS sẵn có",
          isCorrect: true,
          percentage: 65,
        },
        {
          id: "b",
          text: "Flutter vì UI đẹp và performance ổn định",
          isCorrect: false,
          percentage: 25,
        },
        {
          id: "c",
          text: "Viết app bằng C++ để tối ưu đa nền tảng",
          isCorrect: false,
          percentage: 10,
        },
      ],
      explanation:
        "Với team mạnh JavaScript, React Native là lựa chọn tối ưu vì tận dụng kỹ năng sẵn có, giảm thời gian học tập. Bạn có thể bắt tay vào dự án ngay nhờ cú pháp gần với React và hệ sinh thái JavaScript phong phú. Flutter cho UI mượt mà và hiệu suất cao, nhưng yêu cầu học Dart từ đầu, tốn thời gian hơn.",
    },
    {
      id: 3,
      question:
        "App chat của bạn bị delay khi load tin nhắn. Bạn nghĩ nên kiểm tra API hay UI trước?",
      options: [
        {
          id: "a",
          text: "API trước, vì thường liên quan tốc độ server và dữ liệu",
          isCorrect: true,
          percentage: 55,
        },
        {
          id: "b",
          text: "UI trước, vì render giao diện cũng có thể gây chậm",
          isCorrect: false,
          percentage: 35,
        },
        {
          id: "c",
          text: "Kiểm tra màu sắc của theme app",
          isCorrect: false,
          percentage: 10,
        },
      ],
      explanation:
        "Hầu hết delay do API hoặc network. Nếu API ổn, mới kiểm tra UI render.",
    },
    {
      id: 4,
      question:
        "Một user review 1★ chê app lag. Team nên làm gì để biến feedback này thành cơ hội?",
      options: [
        {
          id: "a",
          text: "Phân tích nguyên nhân, fix bug và phản hồi user",
          isCorrect: true,
          percentage: 70,
        },
        {
          id: "b",
          text: "Bỏ qua vì feedback tiêu cực không hữu ích",
          isCorrect: false,
          percentage: 15,
        },
        {
          id: "c",
          text: "Trả lời bằng bình luận châm biếm",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Feedback tiêu cực giúp phát hiện lỗi và tăng uy tín nếu team phản hồi tích cực.",
    },
    {
      id: 5,
      question:
        "Bạn cần app hiển thị mượt trên cả máy flagship và máy tầm trung. Bạn sẽ ưu tiên tối ưu ở đâu?",
      options: [
        {
          id: "a",
          text: "Giảm animation và tối ưu bộ nhớ cho máy yếu",
          isCorrect: true,
          percentage: 65,
        },
        {
          id: "b",
          text: "Tập trung tính năng cao cấp cho flagship",
          isCorrect: false,
          percentage: 20,
        },
        {
          id: "c",
          text: "Bỏ qua tối ưu, chờ thiết bị mới ra mắt",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Tối ưu cho máy tầm trung quan trọng vì nhóm user này chiếm số đông.",
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
        "App chạy mượt trên iPhone nhưng lag trên máy Android tầm trung. Hệ quả lớn nhất sẽ là gì?",
      options: [
        {
          id: "a",
          text: "User Android rời bỏ app trước, giảm retention",
          isCorrect: true,
          percentage: 60,
        },
        {
          id: "b",
          text: "Không quan trọng, flagship mới vẫn chạy tốt",
          isCorrect: false,
          percentage: 25,
        },
        {
          id: "c",
          text: "Chỉ ảnh hưởng đến developer, không liên quan đến user",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Nhóm user Android phổ biến, nếu trải nghiệm kém sẽ rời bỏ nhanh, ảnh hưởng retention.",
    },
    {
      id: 12,
      question:
        "Người dùng bấm nút nhưng app phản hồi chậm 2 giây. Điều này tác động thế nào?",
      options: [
        {
          id: "a",
          text: "User thấy app kém UX, dễ bỏ dùng",
          isCorrect: true,
          percentage: 65,
        },
        {
          id: "b",
          text: "Chỉ làm backend chạy chậm hơn",
          isCorrect: false,
          percentage: 20,
        },
        {
          id: "c",
          text: "Không ảnh hưởng, miễn là kết quả đúng",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation: "UX flow và responsiveness quyết định sự hài lòng của user.",
    },
    {
      id: 13,
      question:
        "Nếu developer không cập nhật framework mới trong 3–5 năm, rủi ro lớn nhất là gì?",
      options: [
        {
          id: "a",
          text: "Khó duy trì sản phẩm, dễ tụt hậu và bảo mật kém",
          isCorrect: true,
          percentage: 70,
        },
        {
          id: "b",
          text: "Code chậm hơn ngay lập tức",
          isCorrect: false,
          percentage: 20,
        },
        {
          id: "c",
          text: "Không có rủi ro gì nghiêm trọng",
          isCorrect: false,
          percentage: 10,
        },
      ],
      explanation:
        "Công nghệ thay đổi nhanh, không cập nhật dễ dẫn đến lỗ hổng và tụt hậu.",
    },
    {
      id: 14,
      question: "Feedback tiêu cực từ người dùng có giá trị gì?",
      options: [
        {
          id: "a",
          text: "Là dữ liệu quý để cải thiện app",
          isCorrect: true,
          percentage: 70,
        },
        {
          id: "b",
          text: "Chỉ khiến developer nản lòng",
          isCorrect: false,
          percentage: 20,
        },
        {
          id: "c",
          text: "Không liên quan đến dev",
          isCorrect: false,
          percentage: 10,
        },
      ],
      explanation:
        "Feedback là cơ hội cải tiến sản phẩm. Các công ty lớn coi feedback như tài sản để phát triển.",
    },
    {
      id: 15,
      question: "Bạn đang debug một bug khó. Điều gì giúp bạn nhất?",
      options: [
        {
          id: "a",
          text: "Khả năng tập trung liên tục nhiều giờ để phân tích",
          isCorrect: true,
          percentage: 55,
        },
        {
          id: "b",
          text: "Chỉ code chậm rãi từng chút cho chắc",
          isCorrect: false,
          percentage: 25,
        },
        {
          id: "c",
          text: "Không cần tập trung, cứ làm linh tinh cũng ra",
          isCorrect: false,
          percentage: 20,
        },
      ],
      explanation: "Debug cần sự tập trung cao độ để không bỏ sót chi tiết.",
    },
    {
      id: 16,
      question:
        "Team phát triển app mà không có quy trình rõ ràng sẽ dễ gặp vấn đề gì?",
      options: [
        {
          id: "a",
          text: "Khó kiểm soát chất lượng và dễ xung đột teamwork",
          isCorrect: true,
          percentage: 65,
        },
        {
          id: "b",
          text: "Giảm sáng tạo của developer",
          isCorrect: false,
          percentage: 20,
        },
        {
          id: "c",
          text: "Không có vấn đề gì, làm freestyle vẫn ổn",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Quy trình rõ ràng đảm bảo phối hợp hiệu quả, sản phẩm ổn định hơn.",
    },
    {
      id: 17,
      question: "Cách hiệu quả nhất để giải quyết lỗi khó trong code là gì?",
      options: [
        {
          id: "a",
          text: "Tìm tài liệu, hỏi cộng đồng",
          isCorrect: true,
          percentage: 65,
        },
        {
          id: "b",
          text: "Mò mẫm mãi đến khi xong",
          isCorrect: false,
          percentage: 25,
        },
        {
          id: "c",
          text: "Bỏ qua lỗi và làm việc khác",
          isCorrect: false,
          percentage: 10,
        },
      ],
      explanation:
        "Kỹ năng search và khai thác cộng đồng (StackOverflow, GitHub) là chìa khóa vượt qua vấn đề kỹ thuật.",
    },
    {
      id: 18,
      question: "Developer học thêm UI/UX sẽ có lợi thế gì trong team?",
      options: [
        {
          id: "a",
          text: "Hiểu design, giao tiếp với designer tốt hơn",
          isCorrect: true,
          percentage: 65,
        },
        {
          id: "b",
          text: "Không có lợi ích gì, chỉ tốn thời gian",
          isCorrect: false,
          percentage: 20,
        },
        {
          id: "c",
          text: "Chỉ hữu ích với designer, không liên quan dev",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Biết UI/UX giúp dev code hợp lý hơn và giao tiếp với designer hiệu quả, sản phẩm cuối chất lượng hơn.",
    },
    {
      id: 19,
      question: "Luyện giải thuật và cấu trúc dữ liệu giúp ích gì?",
      options: [
        {
          id: "a",
          text: "Giúp code mượt, ít bug, dễ maintain",
          isCorrect: true,
          percentage: 55,
        },
        {
          id: "b",
          text: "Chỉ để thi phỏng vấn",
          isCorrect: false,
          percentage: 30,
        },
        {
          id: "c",
          text: "Không ảnh hưởng gì đến dev thực tế",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Logic tốt giúp xử lý vấn đề hiệu quả, tối ưu hiệu năng và viết code sạch hơn.",
    },
    {
      id: 20,
      question:
        "Bạn phải chọn: tính năng khó về kỹ thuật nhưng ít user dùng, hoặc tính năng đơn giản nhưng có hàng nghìn user dùng. Bạn chọn gì?",
      options: [
        {
          id: "a",
          text: "Tính năng đơn giản nhưng impact lớn cho user",
          isCorrect: true,
          percentage: 70,
        },
        {
          id: "b",
          text: "Tính năng khó để thử thách bản thân",
          isCorrect: false,
          percentage: 20,
        },
        {
          id: "c",
          text: "Không chọn gì, để team quyết định",
          isCorrect: false,
          percentage: 10,
        },
      ],
      explanation:
        "Developer thường ưu tiên giá trị cho user, giúp sản phẩm thành công hơn.",
    },
  ],
  designer: [
    {
      id: 1,
      question:
        "Bạn đang thiết kế app đặt đồ ăn. Khách hàng than phiền rằng app khó tìm món ăn, dù giao diện màu sắc đẹp. Vấn đề này liên quan nhiều hơn đến yếu tố nào?",
      options: [
        {
          id: "a",
          text: "UX – hành trình và trải nghiệm tìm món",
          isCorrect: true,
          percentage: 70,
        },
        {
          id: "b",
          text: "UI – màu sắc và icon chưa bắt mắt",
          isCorrect: false,
          percentage: 20,
        },
        {
          id: "c",
          text: "Performance – tốc độ tải dữ liệu",
          isCorrect: false,
          percentage: 10,
        },
      ],
      explanation:
        "Đây là vấn đề về trải nghiệm (UX), không phải chỉ là giao diện (UI).",
    },
    {
      id: 2,
      question:
        "Client yêu cầu chỉnh màu sắc và icon ngay, nhưng người dùng gặp khó khăn khi checkout. Bạn ưu tiên xử lý gì trước?",
      options: [
        {
          id: "a",
          text: "Tối ưu UX ở bước checkout để giảm tỷ lệ bỏ giỏ hàng",
          isCorrect: true,
          percentage: 65,
        },
        {
          id: "b",
          text: "Chỉnh màu sắc và icon theo yêu cầu client",
          isCorrect: false,
          percentage: 20,
        },
        {
          id: "c",
          text: "Làm song song cả hai mà không ưu tiên",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Checkout ảnh hưởng trực tiếp đến doanh thu, nên cần ưu tiên cải thiện UX.",
    },
    {
      id: 3,
      question:
        "Bạn đang làm landing page. Người dùng test nói không thấy nút 'Đăng ký'. Bạn xử lý thế nào?",
      options: [
        {
          id: "a",
          text: "Điều chỉnh visual hierarchy: tăng kích thước, màu tương phản, vị trí nổi bật",
          isCorrect: true,
          percentage: 72,
        },
        {
          id: "b",
          text: "Thêm nhiều màu sặc sỡ để gây chú ý",
          isCorrect: false,
          percentage: 18,
        },
        {
          id: "c",
          text: "Ẩn bớt nội dung khác để nút nổi bật",
          isCorrect: false,
          percentage: 10,
        },
      ],
      explanation:
        "Visual hierarchy giúp dẫn hướng mắt người dùng đến hành động chính.",
    },
    {
      id: 4,
      question:
        "Team bạn bàn cãi giữa việc dùng grid system hay thiết kế tự do. Vì sao grid system nên được chọn?",
      options: [
        {
          id: "a",
          text: "Giúp bố cục nhất quán và dễ căn chỉnh",
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
          text: "Tự động tạo wireframe",
          isCorrect: false,
          percentage: 20,
        },
      ],
      explanation:
        "Grid tạo sự đồng bộ và gọn gàng, dễ maintain hơn trong team.",
    },
    {
      id: 5,
      question:
        "Một user nói rằng họ không biết đâu là thông tin chính trên dashboard. Bạn sẽ ưu tiên cách nào để xử lý?",
      options: [
        {
          id: "a",
          text: "Dùng kích thước, tương phản, khoảng trắng và vị trí để tạo thứ bậc thị giác",
          isCorrect: true,
          percentage: 64,
        },
        {
          id: "b",
          text: "Dùng thật nhiều màu sặc sỡ",
          isCorrect: false,
          percentage: 18,
        },
        {
          id: "c",
          text: "Ẩn bớt thông tin phụ đi",
          isCorrect: false,
          percentage: 18,
        },
      ],
      explanation:
        "Visual hierarchy điều hướng sự chú ý của người dùng hiệu quả hơn.",
    },
    {
      id: 6,
      question:
        "Trong một bài viết dài, người dùng phản hồi rằng chữ quá dày đặc và khó đọc. Bạn nên chỉnh gì trước?",
      options: [
        {
          id: "a",
          text: "Tăng line-height (leading) để giãn dòng",
          isCorrect: true,
          percentage: 70,
        },
        {
          id: "b",
          text: "Điều chỉnh kerning (khoảng cách giữa ký tự)",
          isCorrect: false,
          percentage: 16,
        },
        {
          id: "c",
          text: "Đổi font chữ sang bold",
          isCorrect: false,
          percentage: 14,
        },
      ],
      explanation:
        "Leading giúp văn bản thoáng và dễ đọc hơn, đặc biệt trên màn hình.",
    },
    {
      id: 7,
      question:
        "Một trang web có text màu xám nhạt trên nền trắng khiến người mù màu khó đọc. Theo WCAG, bạn nên làm gì?",
      options: [
        {
          id: "a",
          text: "Tăng độ tương phản màu để cải thiện accessibility",
          isCorrect: true,
          percentage: 66,
        },
        {
          id: "b",
          text: "Tối ưu hiệu năng frontend",
          isCorrect: false,
          percentage: 18,
        },
        {
          id: "c",
          text: "Tập trung vào bảo mật UI",
          isCorrect: false,
          percentage: 16,
        },
      ],
      explanation:
        "WCAG nhấn mạnh accessibility – đảm bảo mọi người đều sử dụng được.",
    },
    {
      id: 8,
      question:
        "Trong Figma, bạn cần đảm bảo button giữ đồng bộ trên nhiều màn hình. Giải pháp nào hiệu quả nhất?",
      options: [
        {
          id: "a",
          text: "Tạo Component và tái sử dụng",
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
          text: "Dán nội dung lorem ipsum vào",
          isCorrect: false,
          percentage: 17,
        },
      ],
      explanation:
        "Component tạo một nguồn duy nhất (single source of truth) cho UI element.",
    },
    {
      id: 9,
      question:
        "Bạn đang làm web cho nhiều thiết bị. Khi nào nên chọn responsive thay vì adaptive design?",
      options: [
        {
          id: "a",
          text: "Khi muốn layout linh hoạt, co giãn theo tỷ lệ màn hình",
          isCorrect: true,
          percentage: 62,
        },
        {
          id: "b",
          text: "Khi chỉ cần thiết kế riêng cho mobile và desktop",
          isCorrect: false,
          percentage: 20,
        },
        {
          id: "c",
          text: "Khi không có khác biệt gì giữa hai phương pháp",
          isCorrect: false,
          percentage: 18,
        },
      ],
      explanation:
        "Responsive phù hợp khi muốn 1 layout co giãn tự nhiên, thay vì nhiều layout cố định.",
    },
    {
      id: 10,
      question:
        "Team đang áp dụng Atomic Design. Bạn cần sắp xếp từ nhỏ đến lớn, thứ tự đúng là gì?",
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
        "Atomic Design đi từ phần tử nhỏ nhất (atoms) đến layout hoàn chỉnh (pages).",
    },

    {
      id: 11,
      question:
        "Khi nhận brief từ client nhưng yêu cầu còn mơ hồ, bạn sẽ làm gì đầu tiên?",
      options: [
        {
          id: "a",
          text: "Phỏng vấn hoặc khảo sát để hiểu người dùng và mục tiêu kinh doanh",
          isCorrect: true,
          percentage: 64,
        },
        {
          id: "b",
          text: "Mở ngay Figma và thiết kế theo cảm nhận",
          isCorrect: false,
          percentage: 22,
        },
        {
          id: "c",
          text: "Tìm template có sẵn để ráp thử",
          isCorrect: false,
          percentage: 14,
        },
      ],
      explanation:
        "Bắt đầu từ user & business goals giúp tránh thiết kế 'đẹp nhưng sai mục tiêu'.",
    },
    {
      id: 12,
      question:
        "Khi client góp ý rằng màu sắc chưa hợp lý, bạn thường phản ứng thế nào?",
      options: [
        {
          id: "a",
          text: "Hỏi lại tiêu chí đánh giá, đưa ra lựa chọn A/B test",
          isCorrect: true,
          percentage: 68,
        },
        {
          id: "b",
          text: "Cố bảo vệ phương án ban đầu đến cùng",
          isCorrect: false,
          percentage: 18,
        },
        {
          id: "c",
          text: "Bỏ qua vì 'thẩm mỹ mỗi người mỗi khác'",
          isCorrect: false,
          percentage: 14,
        },
      ],
      explanation:
        "Designer hiệu quả chuyển feedback thành giả thuyết để kiểm chứng, thay vì tranh luận cảm tính.",
    },
    {
      id: 13,
      question:
        "Khi yêu cầu sản phẩm chưa rõ ràng, bạn chọn cách tiếp cận nào?",
      options: [
        {
          id: "a",
          text: "Đặt câu hỏi làm rõ, phác thảo nhanh để test ý tưởng",
          isCorrect: true,
          percentage: 65,
        },
        {
          id: "b",
          text: "Tự suy diễn và thiết kế theo kinh nghiệm",
          isCorrect: false,
          percentage: 20,
        },
        {
          id: "c",
          text: "Chờ đến khi PM gửi tài liệu chi tiết",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Làm rõ sớm giúp tiết kiệm iteration về sau và tránh lệch kỳ vọng.",
    },
    {
      id: 14,
      question:
        "Bạn có deadline gấp cho một dự án nhiều màn hình. Cách quản lý hiệu quả nhất là gì?",
      options: [
        {
          id: "a",
          text: "Chia nhỏ thành mốc (wireframe → visual → prototype) và báo sớm rủi ro",
          isCorrect: true,
          percentage: 62,
        },
        {
          id: "b",
          text: "Dồn việc về cuối tuần để làm nước rút",
          isCorrect: false,
          percentage: 24,
        },
        {
          id: "c",
          text: "Làm tuần tự theo cảm hứng, không kế hoạch",
          isCorrect: false,
          percentage: 14,
        },
      ],
      explanation:
        "Quản lý tiến độ theo pha giúp minh bạch trạng thái và giảm nguy cơ trễ hạn.",
    },
    {
      id: 15,
      question:
        "Khi team phát triển sản phẩm lâu dài, bạn ưu tiên gì trong việc thiết kế?",
      options: [
        {
          id: "a",
          text: "Xây dựng design system (token, component, guideline) để tái sử dụng",
          isCorrect: true,
          percentage: 66,
        },
        {
          id: "b",
          text: "Thiết kế từng màn hình riêng biệt",
          isCorrect: false,
          percentage: 20,
        },
        {
          id: "c",
          text: "Chỉ dùng component có sẵn, không tinh chỉnh",
          isCorrect: false,
          percentage: 14,
        },
      ],
      explanation:
        "Design system giúp sản phẩm nhất quán, tăng tốc độ phát triển và giảm lỗi khi scale.",
    },
    {
      id: 16,
      question:
        "Một người dùng khiếm thị than phiền không thể điều hướng sản phẩm. Bạn sẽ kiểm tra yếu tố nào trước?",
      options: [
        {
          id: "a",
          text: "Độ tương phản, kích cỡ chữ, trạng thái focus/hover",
          isCorrect: true,
          percentage: 70,
        },
        {
          id: "b",
          text: "Chỉ kiểm tra trên màn hình của chính mình",
          isCorrect: false,
          percentage: 18,
        },
        {
          id: "c",
          text: "Để developer xử lý khi code",
          isCorrect: false,
          percentage: 12,
        },
      ],
      explanation:
        "Accessibility nên được cân nhắc ngay từ thiết kế, không đợi đến giai đoạn phát triển.",
    },
    {
      id: 17,
      question:
        "Khi prototype chưa đạt, cách tiếp cận nào giúp cải tiến hiệu quả?",
      options: [
        {
          id: "a",
          text: "Thiết kế → test nhanh với user → điều chỉnh → lặp lại",
          isCorrect: true,
          percentage: 64,
        },
        {
          id: "b",
          text: "Cố hoàn thiện một lần để tiết kiệm công",
          isCorrect: false,
          percentage: 22,
        },
        {
          id: "c",
          text: "Chỉ sửa khi client yêu cầu",
          isCorrect: false,
          percentage: 14,
        },
      ],
      explanation:
        "Iteration liên tục giúp tiệm cận nhu cầu thực tế thay vì dự đoán ban đầu.",
    },
    {
      id: 18,
      question:
        "Bạn cần handoff thiết kế cho developer. Cách nào giảm rủi ro sai lệch nhất?",
      options: [
        {
          id: "a",
          text: "Chuẩn bị spec rõ (spacing, token màu, trạng thái), variant và asset",
          isCorrect: true,
          percentage: 68,
        },
        {
          id: "b",
          text: "Gửi file ảnh kèm mô tả sơ bộ",
          isCorrect: false,
          percentage: 20,
        },
        {
          id: "c",
          text: "Để developer tự suy luận từ màn hình",
          isCorrect: false,
          percentage: 12,
        },
      ],
      explanation:
        "Handoff chi tiết giúp tiết kiệm thời gian debug và build đúng ý định thiết kế.",
    },
    {
      id: 19,
      question:
        "Bạn muốn sản phẩm vừa hiện đại vừa bền vững. Cách tiếp cận phù hợp nhất là gì?",
      options: [
        {
          id: "a",
          text: "Theo dõi trend nhưng ưu tiên nguyên lý nền tảng (typography, usability)",
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
        "Kết hợp trend và nguyên tắc nền tảng giúp sản phẩm vừa mới mẻ vừa lâu bền.",
    },
    {
      id: 20,
      question:
        "Điều gì khiến bạn cảm thấy hứng thú và có động lực nhất khi làm designer?",
      options: [
        {
          id: "a",
          text: "Tạo ra giải pháp hữu ích, dễ dùng cho người thật",
          isCorrect: true,
          percentage: 66,
        },
        {
          id: "b",
          text: "Biến mọi sản phẩm thành thứ thật bắt mắt",
          isCorrect: false,
          percentage: 22,
        },
        {
          id: "c",
          text: "Thử nghiệm công cụ, plugin mới",
          isCorrect: false,
          percentage: 12,
        },
      ],
      explanation:
        "Động lực bền vững đến từ việc tạo giá trị cho user & business, thẩm mỹ và công cụ chỉ là phương tiện.",
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
          text: "BRD (Business Requirements Document) nêu mục tiêu & nhu cầu kinh doanh; FRD (Functional Requirements Document) mô tả chi tiết chức năng để developer thực hiện",
          isCorrect: true,
          percentage: 68,
        },
        {
          id: "b",
          text: "BRD do developer viết; FRD do business viết",
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
        "Khi làm việc với nhiều stakeholder (business, dev, ops, legal), bạn sẽ làm gì để đảm bảo họ hiểu nhau?",
      options: [
        {
          id: "a",
          text: "Dịch ngôn ngữ kỹ thuật sang phi-kỹ thuật và ngược lại, đảm bảo mọi bên hiểu đúng ý nhau",
          isCorrect: true,
          percentage: 62,
        },
        {
          id: "b",
          text: "Chỉ giao tiếp tốt với một nhóm mà mình quen thuộc",
          isCorrect: false,
          percentage: 26,
        },
        {
          id: "c",
          text: "Tránh giao tiếp nhiều, để tự họ hiểu nhau",
          isCorrect: false,
          percentage: 12,
        },
      ],
      explanation:
        "Giao tiếp linh hoạt là then chốt cho BA: vừa lắng nghe yêu cầu business, vừa diễn giải rõ ràng cho technical team mà không mất ý nghĩa.",
    },
    {
      id: 12,
      question: "Khi nhận yêu cầu mơ hồ hoặc mâu thuẫn, bạn sẽ xử lý thế nào?",
      options: [
        {
          id: "a",
          text: "Chủ động đặt câu hỏi, tổ chức workshop để làm rõ trước khi design/implement",
          isCorrect: true,
          percentage: 64,
        },
        {
          id: "b",
          text: "Chờ người khác giải thích hoặc xác nhận",
          isCorrect: false,
          percentage: 22,
        },
        {
          id: "c",
          text: "Tự đưa giải pháp mặc định mà không hỏi thêm",
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
        "Bạn thiên về 'chi tiết nhỏ' hay 'bức tranh lớn'? Trong tình huống yêu cầu phức tạp, bạn xử lý ra sao?",
      options: [
        {
          id: "a",
          text: "Cân bằng: vừa nắm big picture vừa chú trọng chi tiết nhỏ để dev/test implement đúng",
          isCorrect: true,
          percentage: 60,
        },
        {
          id: "b",
          text: "Chỉ tập trung bức tranh lớn, bỏ qua chi tiết nhỏ",
          isCorrect: false,
          percentage: 25,
        },
        {
          id: "c",
          text: "Chỉ chú ý chi tiết nhỏ, bỏ tầm nhìn tổng thể",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "BA hiệu quả cần vừa hiểu mục tiêu kinh doanh, vừa đảm bảo các yêu cầu chi tiết để dev/test implement đúng chức năng.",
    },
    {
      id: 14,
      question:
        "Khi dẫn workshop thu thập yêu cầu, bạn làm thế nào để buổi họp hiệu quả?",
      options: [
        {
          id: "a",
          text: "Dẫn dắt, điều phối ý kiến, tóm tắt kết luận và đưa ra next step rõ ràng",
          isCorrect: true,
          percentage: 63,
        },
        {
          id: "b",
          text: "Ngại làm chủ buổi, để PM/UX dẫn",
          isCorrect: false,
          percentage: 23,
        },
        {
          id: "c",
          text: "Chỉ lắng nghe, không can thiệp",
          isCorrect: false,
          percentage: 14,
        },
      ],
      explanation:
        "Facilitation giúp BA điều phối stakeholder, giữ mục tiêu buổi rõ ràng, tạo kết luận có thể hành động.",
    },
    {
      id: 15,
      question: "Khi tài nguyên hạn chế, bạn ưu tiên yêu cầu nào trước?",
      options: [
        {
          id: "a",
          text: "Thảo luận với stakeholder, dùng framework MoSCoW/RICE, quyết định dựa trên giá trị & rủi ro",
          isCorrect: true,
          percentage: 66,
        },
        {
          id: "b",
          text: "Ưu tiên theo người dễ tiếp cận nhất",
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
        "BA tốt dùng tiêu chí giá trị, chi phí, rủi ro, dependencies để ưu tiên thay vì cảm tính.",
    },
    {
      id: 16,
      question: "Khi cần kiểm chứng giả thuyết, bạn dùng dữ liệu như thế nào?",
      options: [
        {
          id: "a",
          text: "Dùng Excel/SQL cơ bản để phân tích, đo lường impact, test giả thuyết",
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
          text: "Giao phân tích cho data team",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Đọc dữ liệu giúp BA kiểm chứng giả thuyết, đo lường impact, và đặt KPI thực tế.",
    },
    {
      id: 17,
      question: "Bạn viết acceptance criteria cho user story thế nào?",
      options: [
        {
          id: "a",
          text: "Luôn viết GIVEN-WHEN-THEN hoặc checklist rõ ràng để dev/test hiểu chuẩn đầu ra",
          isCorrect: true,
          percentage: 65,
        },
        {
          id: "b",
          text: "Không, nói miệng là đủ",
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
        "Acceptance criteria rõ ràng giảm tranh luận, tăng khả năng pass UAT ngay lần đầu.",
    },
    {
      id: 18,
      question: "Khi stakeholder mâu thuẫn về scope, bạn xử lý ra sao?",
      options: [
        {
          id: "a",
          text: "Thu thập quan điểm, phân tích chi phí/lợi ích, đề xuất trade-off hoặc escalate nếu cần",
          isCorrect: true,
          percentage: 67,
        },
        {
          id: "b",
          text: "Theo ý người có tiếng nói lớn nhất",
          isCorrect: false,
          percentage: 18,
        },
        {
          id: "c",
          text: "Bỏ qua xung đột, tiếp tục công việc",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "BA cần minh bạch các tác động, dùng dữ liệu/tiêu chí đưa ra đề xuất hoặc escalate khi không thể cân bằng.",
    },
    {
      id: 19,
      question: "Bạn quản lý time và task trong vòng lặp iteration thế nào?",
      options: [
        {
          id: "a",
          text: "Chia nhỏ công việc, đặt milestone (wireframe → spec → review → handoff), cập nhật thường xuyên",
          isCorrect: true,
          percentage: 64,
        },
        {
          id: "b",
          text: "Làm tất cả spec trước rồi review",
          isCorrect: false,
          percentage: 20,
        },
        {
          id: "c",
          text: "Để task phát sinh rồi giải quyết",
          isCorrect: false,
          percentage: 16,
        },
      ],
      explanation:
        "Phân chia giai đoạn giúp kiểm soát scope, giảm rework, phát hiện sai lệch sớm và điều chỉnh kịp thời.",
    },
    {
      id: 20,
      question:
        "Bạn làm gì để học hỏi liên tục công cụ BA, domain knowledge và phân tích dữ liệu?",
      options: [
        {
          id: "a",
          text: "Thường xuyên cập nhật kỹ năng, tìm hiểu domain sâu, áp dụng vào công việc",
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
        "Cập nhật liên tục giúp BA đưa ra giải pháp phù hợp, đáng tin cậy và nâng cao hiệu quả công việc.",
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
        "Wireframe biểu diễn cấu trúc & thứ tự thông tin; low-fidelity prototype minh hoạ flow & tương tác cơ bản; high-fidelity prototype thể hiện visual, micro-interactions và cảm giác gần giống sản phẩm thật — dùng để test sâu và handoff cho developer.",
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
        "Design system gồm design tokens, components, guidelines và patterns giúp giữ đồng nhất trải nghiệm, tái sử dụng, giảm tráo đổi giữa design-developer, đồng thời hỗ trợ scale sản phẩm khi team lớn lên.",
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
        "Khi gặp một yêu cầu thiết kế mới, bạn sẽ làm gì trước tiên để hiểu người dùng?",
      options: [
        {
          id: "a",
          text: "Phỏng vấn hoặc khảo sát người dùng, tìm hiểu mục tiêu và bối cảnh",
          isCorrect: true,
          percentage: 64,
        },
        {
          id: "b",
          text: "Hỏi ý kiến stakeholders và dựa vào đó",
          isCorrect: false,
          percentage: 22,
        },
        {
          id: "c",
          text: "Bắt đầu vẽ theo cảm nhận của mình",
          isCorrect: false,
          percentage: 14,
        },
      ],
      explanation:
        "Hiểu người dùng qua research giúp định hướng thiết kế đúng, tạo giả thuyết có giá trị và giảm rủi ro thiết kế sai mục tiêu.",
    },
    {
      id: 12,
      question:
        "Nếu dữ liệu user cho thấy một feature bạn thiết kế ít được dùng, bạn sẽ xử lý thế nào?",
      options: [
        {
          id: "a",
          text: "Phân tích dữ liệu, thảo luận với PM/developer và đề xuất cải tiến",
          isCorrect: true,
          percentage: 62,
        },
        {
          id: "b",
          text: "Bỏ qua vì dữ liệu do người khác cung cấp",
          isCorrect: false,
          percentage: 26,
        },
        {
          id: "c",
          text: "Tin vào cảm giác của mình và không thay đổi",
          isCorrect: false,
          percentage: 12,
        },
      ],
      explanation:
        "Sử dụng data giúp ưu tiên cải tiến có tác động thực sự, chứng minh quyết định với stakeholder.",
    },
    {
      id: 13,
      question:
        "Bạn có hai lựa chọn: prototype nhanh low-fi hay làm high-fi hoàn chỉnh. Bạn chọn thế nào?",
      options: [
        {
          id: "a",
          text: "Prototype nhanh low-fi để kiểm chứng ý tưởng trước khi đầu tư nhiều",
          isCorrect: true,
          percentage: 66,
        },
        {
          id: "b",
          text: "Làm ngay high-fi để vừa mắt team và stakeholders",
          isCorrect: false,
          percentage: 18,
        },
        {
          id: "c",
          text: "Tốn nhiều thời gian suy nghĩ trước khi làm bất cứ prototype nào",
          isCorrect: false,
          percentage: 16,
        },
      ],
      explanation:
        "Prototype nhanh giúp kiểm chứng giả thuyết sớm, tiết kiệm thời gian và chi phí trước khi đầu tư sâu.",
    },
    {
      id: 14,
      question:
        "Nếu nhận feedback trái chiều từ các stakeholder, bạn sẽ làm gì?",
      options: [
        {
          id: "a",
          text: "Lắng nghe, tổng hợp, hỏi rõ tiêu chí và đề xuất trade-off dựa trên dữ liệu",
          isCorrect: true,
          percentage: 67,
        },
        {
          id: "b",
          text: "Bảo vệ thiết kế ban đầu vì bạn tin nó đúng",
          isCorrect: false,
          percentage: 18,
        },
        {
          id: "c",
          text: "Bỏ qua và tiếp tục theo ý mình",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Tách cảm xúc khỏi dữ liệu, tập trung vào mục tiêu sản phẩm và đưa ra giải pháp cân bằng.",
    },
    {
      id: 15,
      question: "Khi handoff cho developer, bạn sẽ làm gì để tránh sai lệch?",
      options: [
        {
          id: "a",
          text: "Viết spec rõ ràng, cung cấp spacing, token, variant, states và assets",
          isCorrect: true,
          percentage: 70,
        },
        {
          id: "b",
          text: "Chỉ gửi file Figma và trao đổi miệng",
          isCorrect: false,
          percentage: 18,
        },
        {
          id: "c",
          text: "Để developer tự suy ra từ màn hình",
          isCorrect: false,
          percentage: 12,
        },
      ],
      explanation:
        "Handoff chất lượng giảm rework, tăng tốc dev và đảm bảo sản phẩm đúng thiết kế.",
    },
    {
      id: 16,
      question:
        "Bạn có nên xây dựng design system cho project nhỏ và project lớn không?",
      options: [
        {
          id: "a",
          text: "Có — scale lớn cần design system, project nhỏ vẫn nên có tư duy component",
          isCorrect: true,
          percentage: 65,
        },
        {
          id: "b",
          text: "Không cần thiết cho project nhỏ",
          isCorrect: false,
          percentage: 20,
        },
        {
          id: "c",
          text: "Tránh vì giới hạn sáng tạo",
          isCorrect: false,
          percentage: 15,
        },
      ],
      explanation:
        "Design system giúp consistency, giảm technical debt; tư duy component vẫn quan trọng với mọi project.",
    },
    {
      id: 17,
      question:
        "Nếu UX tốt nhưng tốn chi phí/giới hạn kỹ thuật, bạn sẽ làm gì?",
      options: [
        {
          id: "a",
          text: "Cân nhắc trade-off giữa giá trị người dùng, chi phí và feasibility",
          isCorrect: true,
          percentage: 68,
        },
        {
          id: "b",
          text: "Luôn ưu tiên UX dù vượt budget/tech",
          isCorrect: false,
          percentage: 18,
        },
        {
          id: "c",
          text: "Theo developer nếu họ nói khó",
          isCorrect: false,
          percentage: 14,
        },
      ],
      explanation:
        "Trade-off giúp cân bằng UX, cost và kỹ thuật; phối hợp với PM/dev để tìm giải pháp khả thi.",
    },
    {
      id: 18,
      question:
        "Bạn test sản phẩm với người dùng thật định kỳ hay chỉ khi dự án lớn?",
      options: [
        {
          id: "a",
          text: "Test định kỳ để điều chỉnh dựa trên evidence",
          isCorrect: true,
          percentage: 63,
        },
        {
          id: "b",
          text: "Chỉ test khi dự án lớn",
          isCorrect: false,
          percentage: 23,
        },
        {
          id: "c",
          text: "Tin vào cảm nhận cá nhân",
          isCorrect: false,
          percentage: 14,
        },
      ],
      explanation:
        "Usability test định kỳ giúp phát hiện vấn đề thực tế, ưu tiên fix, tăng khả năng sản phẩm phù hợp người dùng.",
    },
    {
      id: 19,
      question:
        "Bạn có cập nhật công cụ mới (plugin, analytics, prototyping) thường xuyên không?",
      options: [
        {
          id: "a",
          text: "Có — để nâng cao hiệu quả và mở rộng workflow",
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
          text: "Không quan tâm",
          isCorrect: false,
          percentage: 14,
        },
      ],
      explanation:
        "Liên tục học công cụ giúp tăng tốc độ, mở rộng phương pháp và tích hợp workflow tốt hơn.",
    },
    {
      id: 20,
      question: "Điều gì giúp bạn phù hợp nhất với vai trò Product Designer?",
      options: [
        {
          id: "a",
          text: "Kết hợp tư duy sản phẩm, empathy với người dùng và kỹ năng triển khai",
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
          text: "Biết viết code thành thạo",
          isCorrect: false,
          percentage: 12,
        },
      ],
      explanation:
        "Product Designer giỏi cần product sense, empathy và kỹ năng thực thi; visual đẹp hay code chỉ là lợi thế.",
    },
  ],
};
