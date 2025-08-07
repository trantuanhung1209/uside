# USide React Application

Ứng dụng React hiện đại được xây dựng với TypeScript và Vite, có cấu trúc thư mục được tổ chức tốt để phát triển và bảo trì dễ dàng.

## 🚀 Công nghệ sử dụng

- **React 18** với TypeScript
- **Vite** - Build tool nhanh và hiện đại
- **Tailwind CSS** - Framework CSS utility-first
- **ESLint** - Linting code
- **Cấu trúc thư mục có tổ chức** - Dễ dàng mở rộng và bảo trì

## 📁 Cấu trúc dự án

```
src/
├── components/          # Các component tái sử dụng
│   ├── ui/             # UI components cơ bản (Button, Input, etc.)
│   └── layout/         # Layout components (Header, Layout, etc.)
├── hooks/              # Custom React hooks
├── services/           # API services và external integrations
├── utils/              # Utility functions và helpers
├── types/              # TypeScript type definitions
├── constants/          # Application constants
├── pages/              # Page components
└── styles/             # Global styles
```

## 🛠️ Cài đặt và chạy dự án

1. **Cài đặt dependencies:**
   ```bash
   npm install
   ```

2. **Chạy development server:**
   ```bash
   npm run dev
   ```

3. **Build production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

## 🎯 Tính năng chính

- ✅ **TypeScript** - Type safety và IntelliSense tốt hơn
- ✅ **Component Architecture** - Components được tổ chức theo loại
- ✅ **Custom Hooks** - Logic tái sử dụng với useLocalStorage, useDebounce, useToggle
- ✅ **API Service** - Service class để handle HTTP requests
- ✅ **Utility Functions** - Các hàm tiện ích như debounce, formatDate, validation
- ✅ **Responsive Design** - Tailwind CSS với responsive utilities
- ✅ **Environment Variables** - Cấu hình environment dễ dàng

## 📝 Hướng dẫn phát triển

### Tạo component mới
```typescript
// src/components/ui/NewComponent.tsx
import React from 'react';

interface NewComponentProps {
  title: string;
  onClick?: () => void;
}

const NewComponent: React.FC<NewComponentProps> = ({ title, onClick }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold">{title}</h3>
      {onClick && (
        <button onClick={onClick} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
          Click me
        </button>
      )}
    </div>
  );
};

export default NewComponent;
```

### Sử dụng API Service
```typescript
import { apiService } from '../services';

// GET request
const fetchUsers = async () => {
  try {
    const response = await apiService.get<User[]>('/users');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch users:', error);
  }
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
