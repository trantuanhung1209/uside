export interface CareerPath {
  id: string;
  title: string;
  description: string;
  image?: string;
  icon: string;
  skills: string[];
  opportunities: string;
  gradient: string;
}

export const careerPaths: CareerPath[] = [
  {
    id: "software-tester",
    title: "Software Tester",
    description:
      "Chuyên gia kiểm thử phần mềm, đảm bảo chất lượng và hiệu suất của các ứng dụng.",
    image: "/images_uside/tester.jpg",
    icon: "/images_uside/test_icon.png",
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
    image: "/images_uside/web_dev.jpg",
    icon: "/images_uside/web_dev_icon.png",
    skills: ["HTML/CSS", "JavaScript", "React/Vue", "Node.js", "Database"],
    opportunities: "Cơ hội việc làm đa dạng từ startup đến tập đoàn lớn.",
    gradient: "from-green-400 to-blue-500",
  },
  {
    id: "mobile-developer",
    title: "Mobile Developer",
    description: "Tạo ra các ứng dụng di động sáng tạo cho iOS và Android.",
    image: "/images_uside/dev_app.jpg",
    icon: "/images_uside/app_dev_icon.png",
    skills: ["React Native", "Flutter", "Swift", "Kotlin", "UI/UX Design"],
    opportunities:
      "Thị trường mobile đang bùng nổ với triển vọng tăng trưởng mạnh.",
    gradient: "from-purple-400 to-pink-500",
  },
  {
    id: "designer",
    title: "UI/UX Designer",
    description: "Thiết kế trải nghiệm người dùng trực quan và thân thiện.",
    image: "/images_uside/ui_ux.jpg",
    icon: "/images_uside/designer_icon.png",
    skills: ["Figma", "Adobe Creative Suite", "User Research", "Prototyping"],
    opportunities:
      "Vai trò quan trọng trong mọi dự án số hóa và chuyển đổi công nghệ.",
    gradient: "from-pink-400 to-red-500",
  },
  {
    id: "business-analyst",
    title: "Business Analyst",
    description:
      "Phân tích yêu cầu, tối ưu hóa quy trình và làm cầu nối giữa khách hàng và đội kỹ thuật.",
    image: "/images_uside/it_ba.jpg",
    icon: "/images_uside/business_analyst_icon.png",
    skills: [
      "Requirement Analysis",
      "Process Modeling",
      "SQL/Data Analysis",
      "Documentation",
      "Communication",
    ],
    opportunities:
      "Được săn đón trong các doanh nghiệp đang chuyển đổi số và mở rộng quy mô.",
    gradient: "from-orange-400 to-red-500",
  },
  {
    id: "product-designer",
    title: "Product Designer",
    description:
      "Thiết kế sản phẩm số với trải nghiệm người dùng tối ưu và giao diện đẹp mắt.",
    image: "/images_uside/product_designer.jpg",
    icon: "/images_uside/product_designer_icon.png",
    skills: [
      "User Research",
      "Prototyping",
      "Visual Design",
      "Interaction Design",
      "Design Thinking",
    ],
    opportunities:
      "Nhu cầu cao trong các công ty công nghệ, startup sáng tạo và sản phẩm số toàn cầu.",
    gradient: "from-red-400 to-pink-500",
  },
];
