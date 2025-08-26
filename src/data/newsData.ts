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
}

export const newsData: NewsItem[] = [
  {
    id: 1,
    title: "USide ra mắt phiên bản 2.0",
    date: "7 tháng 8, 2025",
    excerpt:
      "Phiên bản mới với nhiều tính năng cải tiến và giao diện được thiết kế lại hoàn toàn.",
    content: `
      <p>USide tự hào giới thiệu phiên bản 2.0 với nhiều cải tiến đáng kể trong trải nghiệm người dùng và hiệu suất.</p>
      
      <h3>Tính năng mới</h3>
      <ul>
        <li>Giao diện người dùng được thiết kế lại hoàn toàn</li>
        <li>Hiệu suất cải thiện 40% so với phiên bản trước</li>
        <li>Tích hợp AI để cá nhân hóa trải nghiệm</li>
        <li>Hỗ trợ đa ngôn ngữ</li>
      </ul>
      
      <p>Chúng tôi tin rằng phiên bản 2.0 sẽ mang lại trải nghiệm tốt nhất cho người dùng.</p>
    `,
    image: "/images_uside/news.png",
    author: "Đội ngũ USide",
    category: "update",
    tags: ["UI/UX", "Performance", "Features"],
  },
  {
    id: 2,
    title: "Cập nhật bảo mật quan trọng",
    date: "5 tháng 8, 2025",
    excerpt:
      "Chúng tôi đã cập nhật các biện pháp bảo mật mới nhất để bảo vệ dữ liệu người dùng.",
    content: `
      <p>Bảo mật là ưu tiên hàng đầu của USide. Chúng tôi đã triển khai các cập nhật bảo mật quan trọng.</p>
      
      <h3>Các cải tiến bảo mật</h3>
      <ul>
        <li>Mã hóa end-to-end cho tất cả dữ liệu</li>
        <li>Xác thực hai yếu tố (2FA)</li>
        <li>Kiểm tra bảo mật định kỳ</li>
        <li>Tuân thủ các tiêu chuẩn bảo mật quốc tế</li>
      </ul>
      
      <p>Dữ liệu của bạn được bảo vệ với các công nghệ bảo mật tiên tiến nhất.</p>
    `,
    image: "/images_uside/mascot_robot.png",
    author: "Team Security",
    category: "security",
    tags: ["Security", "Privacy", "Protection"],
  },
  {
    id: 3,
    title: "Hợp tác với các đối tác công nghệ",
    date: "1 tháng 8, 2025",
    excerpt:
      "USide chính thức hợp tác với các công ty công nghệ hàng đầu để mở rộng dịch vụ.",
    content: `
      <p>Chúng tôi vui mừng thông báo về các quan hệ đối tác chiến lược mới với các công ty công nghệ hàng đầu.</p>
      
      <h3>Lợi ích từ việc hợp tác</h3>
      <ul>
        <li>Mở rộng phạm vi dịch vụ</li>
        <li>Tích hợp công nghệ tiên tiến</li>
        <li>Cải thiện trải nghiệm người dùng</li>
        <li>Tăng cường khả năng cạnh tranh</li>
      </ul>
      
      <p>Những hợp tác này sẽ giúp USide phát triển mạnh mẽ hơn trong tương lai.</p>
    `,
    image: "/images_uside/uside_light.png",
    author: "Ban lãnh đạo",
    category: "partnership",
    tags: ["Partnership", "Expansion", "Growth"],
  },
  {
    id: 4,
    title: "Tuyển dụng Frontend Developer",
    date: "26 tháng 8, 2025",
    excerpt:
      "USide đang tìm kiếm Frontend Developer tài năng để gia nhập đội ngũ phát triển.",
    content: `
      <p>USide đang tìm kiếm Frontend Developer tài năng để gia nhập đội ngũ phát triển sản phẩm.</p>
      <h3>Yêu cầu</h3>
      <ul>
        <li>Kinh nghiệm với React và TypeScript</li>
        <li>Hiểu biết về UI/UX</li>
        <li>Kỹ năng teamwork tốt</li>
      </ul>
      <p>Hãy gia nhập để cùng chúng tôi xây dựng những sản phẩm đột phá!</p>
    `,
    image: "/images_uside/join_team.png",
    author: "HR Team",
    category: "recruitment",
    tags: ["React", "TypeScript", "Career"],
  },
  {
    id: 5,
    title: "Ứng dụng AI trong phát triển sản phẩm",
    date: "12 tháng 8, 2025",
    excerpt:
      "Khám phá cách USide tích hợp AI để cải thiện trải nghiệm người dùng.",
    content: `
      <p>AI đang được tích hợp mạnh mẽ vào các sản phẩm của USide.</p>
      <ul>
        <li>Tự động hóa quy trình phát triển</li>
        <li>Cá nhân hóa trải nghiệm người dùng</li>
        <li>Phân tích dữ liệu thông minh</li>
      </ul>
      <p>Đây là bước tiến quan trọng giúp USide duy trì sự đổi mới.</p>
    `,
    image: "/images_uside/pet_cloud_uside.png",
    author: "AI Team",
    category: "technology",
    tags: ["AI", "Machine Learning", "Innovation"],
  },
  {
    id: 6,
    title: "USide Tech Conference 2025",
    date: "10 tháng 8, 2025",
    excerpt:
      "Sự kiện công nghệ lớn nhất năm với những chuyên gia hàng đầu trong ngành.",
    content: `
      <p>USide Tech Conference 2025 sẽ quy tụ nhiều chuyên gia công nghệ trong và ngoài nước.</p>
      <h3>Nội dung nổi bật</h3>
      <ul>
        <li>Các phiên thảo luận về xu hướng công nghệ mới</li>
        <li>Networking với cộng đồng công nghệ</li>
        <li>Workshop trải nghiệm sản phẩm USide</li>
      </ul>
      <p>Đừng bỏ lỡ sự kiện công nghệ lớn nhất trong năm!</p>
    `,
    image: "/images_uside/pet_cloud_uside.png",
    author: "Event Team",
    category: "event",
    tags: ["Conference", "Networking", "Learning"],
  },
];

