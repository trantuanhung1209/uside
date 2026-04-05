# USide Studio - Hệ Thống Tiện Ích Hỗ Trợ Sinh Viên IUH

<div align="center">

[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-7.0-646CFF?logo=vite)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1-06B6D4?logo=tailwindcss)](https://tailwindcss.com)

USide Studio là một ứng dụng web hiện đại cung cấp hệ thống tiện ích toàn diện hỗ trợ sinh viên Đại học Công nghiệp Thành phố Hồ Chí Minh (IUH).

[Trang Chủ](#tổng-quan) • [Tính Năng](#-tính-năng) • [Cài Đặt](#-cài-đặt) • [Sử Dụng](#-sử-dụng) • [Cấu Trúc Dự Án](#-cấu-trúc-dự-án)

</div>

---

## 📋 Tổng Quan

USide Studio là nền tảng tích hợp cung cấp các công cụ và tài nguyên để hỗ trợ quá trình học tập và phát triển cá nhân của sinh viên IUH. Ứng dụng được xây dựng với các công nghệ web hiện đại nhất, đảm bảo hiệu suất cao, bảo mật tốt và trải nghiệm người dùng tuyệt vời.

### 🎯 Đối Tượng Sử Dụng
- 👨‍🎓 Sinh viên IUH
- 👨‍💼 Nhân viên quản lý
- 👨‍💻 Nhà phát triển

---

## ✨ Tính Năng

### 🏠 Trang Chủ
- Dashboard trực quan với interface thú vị
- Thông tin tổng quan về các dịch vụ
- Trực cảnh 3D tương tác (Spline Design)
- Tối ưu hóa hiệu suất (LCP, Web Vitals)

### 📰 Quản Lý Tin Tức
- Hiển thị tin tức mới nhất
- Chi tiết từng bài viết tin tức
- Quản lý tin tức (Admin)
- Thông báo tin tức real-time
- Đánh dấu tin đã đọc

### 🚀 Hướng Dẫn Hỗ Trợ
- Danh sách các hướng dẫn chi tiết
- Chi tiết hướng dẫn về các chủ đề
- Tìm kiếm và lọc hướng dẫn
- Thư viện hỗ trợ toàn diện

### 👥 Quản Lý Công Ty & Ngành Nghề
- Danh sách ngành nghề & cơ hội việc làm
- Quản lý thông tin tuyển dụng (Admin)
- Chi tiết về các cơ hội phát triển sự nghiệp

### 🎭 Thư Viện Sinh Viên
- Quản lý thông tin học sinh
- Danh sách các club/tổ chức sinh viên
- Tương tác cộng đồng

### 🎵 Trò Chơi & Giải Trí
- Hỗ trợ phát nhạc nền (Music Player)
- Không gian riêng cho giải trí
- Tối ưu hóa trải nghiệm người dùng

### 👤 Đăng Nhập & Bảo Mật
- Đăng nhập Admin bảo mật
- Xác thực dựa trên Firebase
- Bảo vệ route (Protected Routes)
- Quản lý phiên làm việc

### 📧 Hỗ Trợ & Liên Hệ
- Form liên hệ trực tuyến
- Gửi email thông qua EmailJS
- Xử lý logic validation
- Phản hồi người dùng tức thời

### 💾 Quản Lý Dữ Liệu
- Tích hợp Firebase Firestore
- Tích hợp Supabase PostgreSQL
- Lưu trữ ảnh trên Firebase Storage

---

## 🛠️ Cài Đặt

### Yêu Cầu Tiên Quyết
- **Node.js**: v16 trở lên
- **npm**: v8 trở lên (hoặc yarn/pnpm)

### Bước 1: Clone Repository

```bash
git clone https://github.com/trantuanhung1209/uside.git
cd uside
```

### Bước 2: Cài Đặt Dependencies

```bash
npm install
```

### Bước 3: Cấu Hình Environment Variables

Tạo file `.env.local` trong thư mục gốc dự án:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key

# API Configuration
VITE_API_URL=http://localhost:3000
```

### Bước 4: Khởi Động Dev Server

```bash
npm run dev
```

Truy cập tại `http://localhost:5173`

---

## 🚀 Sử Dụng

### Các Lệnh Có Sẵn

```bash
# Chạy development server
npm run dev

# Build production
npm run build

# Preview build
npm run preview

# Lint code
npm run lint
```

### Cấu Trúc Dự Án

```
src/
├── components/              # Các component React
│   ├── debug/              # Components debug
│   │   ├── DailyResultsDebug.tsx
│   │   ├── FirebaseDebug.tsx
│   │   ├── GuildSeeder.tsx
│   │   └── NewsDebug.tsx
│   ├── examples/            # Component ví dụ
│   │   ├── AdvancedQueryExample.tsx
│   │   └── ...
│   ├── layout/             # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── ...
│   ├── ui/                 # UI components cơ bản
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── ...
│   └── index.ts
│
├── pages/                   # Page components
│   ├── HomePage.tsx
│   ├── AboutPage.tsx
│   ├── NewsPage.tsx
│   ├── NewsDetailPage.tsx
│   ├── DirectionPage.tsx
│   ├── DirectionDetail.tsx
│   ├── AdminLoginPage.tsx
│   ├── AdminPage.tsx
│   ├── GuildManagementPage.tsx
│   ├── NewsManagementPage.tsx
│   ├── OpportunitiesManagementPage.tsx
│   ├── ContactPage.tsx
│   ├── NotFoundPage.tsx
│   └── index.ts
│
├── hooks/                   # Custom React hooks
│   ├── useAccentColor.ts
│   ├── useAdminAuth.ts
│   ├── useAppLoading.ts
│   ├── useContactForm.ts
│   ├── useFirebaseAuth.ts
│   ├── useImageUpload.ts
│   ├── useLazyIntersection.ts
│   ├── useMusic.ts
│   ├── useNewsNotification.ts
│   ├── useNewsNotificationContext.ts
│   ├── useReadNews.ts
│   ├── useRealtimeNews.ts
│   ├── useScrollToTop.ts
│   └── index.ts
│
├── services/                # Services & API
│   ├── authService.ts       # Firebase authentication
│   ├── newsService.ts       # News CRUD
│   ├── careerService.ts     # Career management
│   ├── guildService.ts      # Guild management
│   ├── firestoreService.ts  # Firestore operations
│   ├── imageUploadService.ts # Image upload
│   ├── storageService.ts    # Firebase storage
│   ├── dailyResultsService.ts # Daily results
│   ├── emailService.ts      # Email sending
│   └── index.ts
│
├── contexts/                # React contexts
│   ├── AccentColorContext.tsx
│   ├── AdminAuthContext.tsx
│   ├── MusicContext.tsx
│   ├── NewsNotificationContext.tsx
│   └── ReadNewsContext.tsx
│
├── types/                   # TypeScript types
│   ├── api.ts
│   ├── common.ts
│   └── index.ts
│
├── constants/               # Constants
│   ├── accentColors.ts
│   ├── index.ts
│   ├── seoConfig.ts
│   └── tvChannels.ts
│
├── data/                    # Data files
│   ├── careerPaths.ts
│   ├── newsData.ts
│   ├── quizQuestions.ts
│   └── index.ts
│
├── utils/                   # Utility functions
│   ├── dateUtils.ts         # Date formatting
│   ├── performanceOptimization.ts
│   ├── lcpOptimizer.ts      # LCP optimization
│   ├── pushNewsToFirestore.ts
│   ├── quizUtils.ts
│   ├── structuredData.ts
│   └── index.ts
│
├── styles/                  # Global styles
│   ├── extensions.css
│   ├── robot-loading.css
│   └── index.css
│
├── config/                  # Configuration files
│   ├── firebase.ts
│   ├── supabase.ts
│   └── supabaseAdmin.ts
│
├── assets/                  # Assets
├── App.tsx                  # Root component
├── main.tsx                 # Entry point
└── vite-env.d.ts           # Vite environment types
```

### Công Nghệ Sử Dụng

#### Frontend
- **React 19.1.0** - UI library
- **TypeScript 5.8** - Type safety
- **Vite 7.0** - Build tool
- **Tailwind CSS 4.1** - Styling
- **React Router 7.7** - Routing
- **Framer Motion 12.23** - Animations

#### Backend & Database
- **Firebase** - Authentication, Firestore, Storage
- **Supabase** - PostgreSQL database
- **EmailJS** - Email service

#### UI & Icons
- **Lucide React 0.541** - Icons
- **React Icons 5.5** - Icon library
- **React Markdown** - Markdown rendering

#### Performance
- **Web Vitals** - Performance monitoring
- **Terser** - Code minification

#### Developer Tools
- **ESLint** - Code linting
- **Vite React Plugin** - React optimization

---

## 🔐 Bảo Mật

### Best Practices
- ✅ Không commit file `.env` (sử dụng `.env.local`)
- ✅ Sử dụng xác thực Firebase để bảo vệ quyền truy cập
- ✅ Protected routes cho trang admin
- ✅ Validation form trên cả client và server
- ✅ CORS configuration cho API requests

### Environment Variables
- Tất cả credentials phải được lưu trong file `.env.local`
- Không bao giờ commit file `.env` lên Git
- Sử dụng `VITE_` prefix cho các biến client-side

---

## 📈 Tối Ưu Hóa Hiệu Suất

### LCP (Largest Contentful Paint) Optimization
- Preload critical images
- Preload fonts
- DNS prefetch cho external resources
- Resource hints (preconnect, prefetch)

### Bundle Optimization
- Code splitting với Vite
- Separate vendor chunks
- Manual chunks cho Firebase, Router, UI libraries
- Minification với Terser

### Web Vitals
- Real User Monitoring
- Performance metrics tracking
- CWV optimization

---

## 👨‍💻 Hướng Dẫn Phát Triển

### Quy Ước Code
- Sử dụng TypeScript cho tất cả các file
- Functional components với hooks
- Đặt tên biến có ý nghĩa
- Viết comments cho logic phức tạp
- Tuân theo Tailwind CSS conventions

### Tạo Component Mới

```typescript
// src/components/ui/MyComponent.tsx
import React from 'react';

interface MyComponentProps {
  title: string;
  onClick?: () => void;
}

const MyComponent: React.FC<MyComponentProps> = ({ title, onClick }) => {
  return (
    <div className="p-4 rounded-lg bg-white">
      <h2 className="text-lg font-bold">{title}</h2>
      {onClick && (
        <button onClick={onClick} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
          Click me
        </button>
      )}
    </div>
  );
};

export default MyComponent;
```

### Tạo Custom Hook

```typescript
// src/hooks/useMyHook.ts
import { useState, useEffect } from 'react';

export const useMyHook = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Hook logic here
  }, []);

  return { data };
};
```

### Tạo Service

```typescript
// src/services/myService.ts
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const myService = {
  getItems: async () => {
    const response = await axios.get(`${API_URL}/items`);
    return response.data;
  },
};
```

---

## 📝 Cấu Hình Firebase & Supabase

### Firebase Setup
1. Tạo project trên [Firebase Console](https://console.firebase.google.com)
2. Kích hoạt Firestore, Authentication, Storage
3. Lấy firebase config và thêm vào `.env.local`
4. Xem file [src/config/firebase.ts](src/config/firebase.ts)

### Supabase Setup
1. Tạo project trên [Supabase](https://supabase.com)
2. Lấy URL và API key
3. Thêm vào `.env.local`
4. Xem file [src/config/supabase.ts](src/config/supabase.ts)

---

## 🐛 Troubleshooting

### Vấn đề thường gặp

**Lỗi: Cannot find module 'firebase'**
```bash
npm install firebase
```

**Build thất bại**
```bash
rm -rf node_modules
npm install
npm run build
```

**Dev server không start**
- Kiểm tra port 5173 có bị chiếm không
- Xoá cache: `rm -rf .vite`
- Restart server: `npm run dev`

---

## 📞 Hỗ Trợ & Liên Hệ

### Liên Hệ Để Hỗ Trợ
- 📧 Email: Sử dụng form liên hệ trên trang web
- 🐛 Báo cáo bug: Tạo issue trên GitHub
- 💡 Đề xuất tính năng: Thảo luận trên Issues

---

## 📄 Giấy Phép

Dự án này được phát hành dưới giấy phép MIT. Xem file [LICENSE](LICENSE) để chi tiết.

---

## 👥 Đóng Góp

Chúng tôi đón chào mọi đóng góp! Hãy:

1. Fork repository
2. Tạo branch cho feature của bạn (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

---

## 📊 Thống Kê Dự Án

- **Total Dependencies**: 20+
- **Development Dependencies**: 15+
- **Supported Browsers**: Chrome, Firefox, Safari, Edge
- **Node.js Version**: v16+
- **Package Manager**: npm/yarn/pnpm

---

<div align="center">

**[↑ Quay lên đầu](#uside-studio---hệ-thống-tiện-ích-hỗ-trợ-sinh-viên-iuh)**

Made with ❤️ by [trantuanhung1209](https://github.com/trantuanhung1209)
};

// POST request
const createUser = async (userData: CreateUserRequest) => {
  try {
    const response = await apiService.post<User>('/users', userData);
    return response.data;
  } catch (error) {
    console.error('Failed to create user:', error);
  }
};
```

### Sử dụng Custom Hooks
```typescript
import { useLocalStorage, useDebounce } from '../hooks';

const MyComponent = () => {
  const [user, setUser] = useLocalStorage('user', null);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Search effect chỉ chạy khi debouncedSearchTerm thay đổi
  useEffect(() => {
    if (debouncedSearchTerm) {
      // Perform search
    }
  }, [debouncedSearchTerm]);
};
```

## 🔧 Scripts

- `npm run dev` - Chạy development server
- `npm run build` - Build production
- `npm run preview` - Preview production build
- `npm run lint` - Chạy ESLint

## 📦 Dependencies chính

- `react` - UI library
- `react-dom` - React DOM bindings
- `typescript` - Type safety
- `vite` - Build tool
- `tailwindcss` - CSS framework

## 🤝 Đóng góp

1. Fork dự án
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## 📄 License

Dự án này được phân phối dưới MIT License. Xem file `LICENSE` để biết thêm chi tiết.

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
