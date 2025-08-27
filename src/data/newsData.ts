export interface NewsItem {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  image?: string;
  author?: string;
  category?: string;
  tags?: string[];
  pinned?: boolean; // Thêm field cho tin ghim
}

export const newsData: NewsItem[] = [
  {
    id: 1,
    title: "USide ra mắt phiên bản 2.0",
    date: "25 tháng 8, 2025",
    excerpt:
      "Phiên bản mới được nhóm sinh viên cải tiến mạnh mẽ về giao diện và hiệu suất.",
    content: `
      <p>USide 2.0 là kết quả của quá trình học hỏi và phát triển liên tục từ nhóm sinh viên.</p>
      
      <h3>Điểm mới</h3>
      <ul>
        <li>Giao diện được thiết kế lại trực quan, thân thiện hơn</li>
        <li>Hiệu suất cải thiện 40% so với phiên bản trước</li>
        <li>Thử nghiệm tích hợp AI để cá nhân hóa trải nghiệm</li>
        <li>Bổ sung hỗ trợ đa ngôn ngữ</li>
      </ul>
      
      <p>Chúng mình hy vọng phiên bản 2.0 mang lại trải nghiệm mượt mà hơn cho mọi người.</p>
    `,
    image: "/images_uside/news.png",
    author: "Nhóm phát triển USide",
    category: "update",
    tags: ["UI/UX", "Performance", "Features"],
    pinned: true, // Ghim tin này
  },
  {
    id: 2,
    title: "Cập nhật bảo mật cơ bản",
    date: "5 tháng 8, 2025",
    excerpt:
      "Nhóm đã bổ sung một số cơ chế bảo mật để bảo vệ dữ liệu thử nghiệm.",
    content: `
      <p>Bảo mật luôn là yếu tố quan trọng. Nhóm đã tìm hiểu và áp dụng các cơ chế cơ bản để bảo vệ dữ liệu.</p>
      
      <h3>Các bước thực hiện</h3>
      <ul>
        <li>Mã hóa dữ liệu khi lưu trữ và truyền tải</li>
        <li>Tích hợp xác thực hai lớp (2FA) thử nghiệm</li>
        <li>Thực hiện kiểm tra bảo mật định kỳ</li>
      </ul>
      
      <p>Đây là bước khởi đầu để chúng mình học hỏi thêm về bảo mật hệ thống.</p>
    `,
    image: "/images_uside/cloud_2d_2.jpg",
    author: "Nhóm bảo mật",
    category: "security",
    tags: ["Security", "Privacy"],
  },
  {
    id: 3,
    title: "Hợp tác và học hỏi từ cộng đồng công nghệ",
    date: "24 tháng 8, 2025",
    excerpt:
      "Nhóm USide tích cực kết nối và trao đổi kiến thức với các bạn cùng đam mê.",
    content: `
      <p>Trong quá trình phát triển, nhóm luôn tìm cơ hội học hỏi và hợp tác với cộng đồng công nghệ.</p>
      
      <h3>Lợi ích</h3>
      <ul>
        <li>Mở rộng kiến thức và kỹ năng</li>
        <li>Tiếp cận công nghệ mới</li>
        <li>Cải thiện sản phẩm qua phản hồi</li>
      </ul>
      
      <p>Chúng mình tin rằng việc hợp tác sẽ giúp dự án tiến xa hơn.</p>
    `,
    image: "/images_uside/cloud_2d_1.jpg",
    author: "Nhóm USide",
    category: "partnership",
    tags: ["Community", "Learning", "Growth"],
  },
  {
    id: 4,
    title: "Tham gia cùng nhóm USide",
    date: "26 tháng 8, 2025",
    excerpt:
      "Nhóm sinh viên USide luôn chào đón các bạn có đam mê công nghệ, muốn học hỏi và phát triển dự án cùng nhau.",
    content: `
      <p>USide được phát triển bởi một nhóm sinh viên yêu thích lập trình và sáng tạo sản phẩm công nghệ. 
    Chúng mình tin rằng việc học hỏi và xây dựng dự án thực tế sẽ giúp mỗi người trưởng thành hơn về kỹ năng lẫn tư duy.</p>
    
    <h3>Chúng mình mong muốn tìm thêm bạn đồng hành:</h3>
    <ul>
      <li>Yêu thích công nghệ và lập trình (React, TypeScript, UI/UX…)</li>
      <li>Sẵn sàng học hỏi, chia sẻ, làm việc nhóm</li>
      <li>Không cần quá giỏi, chỉ cần tinh thần cầu tiến và kiên nhẫn</li>
    </ul>
    
    <p>Nếu bạn quan tâm, hãy cùng tham gia để vừa học hỏi, vừa tạo ra những sản phẩm ý nghĩa trong thời sinh viên!</p>
    `,
    image: "/images_uside/join_team.png",
    author: "HR Team",
    category: "recruitment",
    tags: ["React", "TypeScript", "Career"],
    pinned: true, // Ghim tin tuyển dụng quan trọng
  },
  {
    id: 5,
    title: "USide Tech Sharing 2025",
    date: "10 tháng 8, 2025",
    excerpt:
      "Buổi chia sẻ nội bộ về xu hướng công nghệ và sản phẩm đang phát triển.",
    content: `
      <p>Nhóm USide tổ chức một buổi chia sẻ nhỏ về các xu hướng công nghệ mới và sản phẩm của nhóm.</p>
      <h3>Nội dung chính</h3>
      <ul>
        <li>Trao đổi kiến thức về công nghệ</li>
        <li>Trình bày demo sản phẩm</li>
        <li>Thảo luận và đóng góp ý tưởng</li>
      </ul>
      <p>Đây là cơ hội để các thành viên cùng học hỏi và phát triển.</p>
    `,
    image: "/images_uside/cloud_2d.jpg",
    author: "Nhóm sự kiện",
    category: "event",
    tags: ["Sharing", "Learning", "Community"],
  },
  {
    id: 6,
    title: "Ứng dụng AI trong phát triển sản phẩm",
    date: "12 tháng 8, 2025",
    excerpt:
      "Sự kiện công nghệ lớn nhất năm với những chuyên gia hàng đầu trong ngành.",
    content: `
       <p>AI là lĩnh vực thú vị và nhóm đang thử nghiệm ứng dụng vào USide.</p>
      <ul>
        <li>Tự động hóa một số quy trình</li>
        <li>Cá nhân hóa trải nghiệm</li>
        <li>Phân tích dữ liệu cơ bản</li>
      </ul>
      <p>Đây là bước thực hành để rèn luyện kỹ năng nghiên cứu công nghệ.</p>
    `,
    image: "/images_uside/pet_cloud_uside.png",
    author: "Event Team",
    category: "event",
    tags: ["Conference", "Networking", "Learning"],
  },
];
