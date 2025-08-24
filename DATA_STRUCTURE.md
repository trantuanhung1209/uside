# Data Structure Documentation

Tài liệu này mô tả cấu trúc dữ liệu được tách riêng để dễ dàng chuyển đổi sang database sau này.

## Cấu trúc thư mục

```
src/
├── data/                    # Dữ liệu tĩnh (sẽ chuyển sang database)
│   ├── careerPaths.ts      # Dữ liệu nghề nghiệp
│   ├── quizQuestions.ts    # Dữ liệu câu hỏi quiz
│   └── index.ts            # Export và utility functions
├── services/                # Service layer để truy cập dữ liệu
│   ├── careerService.ts    # Career và Quiz services
│   └── index.ts            # Export services
└── pages/
    └── DirectionDetail.tsx # Component sử dụng dữ liệu
```

## 📊 Cấu trúc dữ liệu

### 1. CareerPath Interface
```typescript
interface CareerPath {
  id: string;              // Unique identifier
  title: string;           // Tên nghề nghiệp
  description: string;     // Mô tả
  image?: string;          // Đường dẫn hình ảnh
  icon: string;            // Icon emoji
  skills: string[];        // Danh sách kỹ năng
  opportunities: string;   // Cơ hội nghề nghiệp
  gradient: string;        // CSS gradient class
}
```

### 2. Question Interface
```typescript
interface Question {
  id: number;              // ID câu hỏi
  question: string;        // Nội dung câu hỏi
  options: QuizOption[];   // Các lựa chọn
  explanation: string;     // Giải thích đáp án
}

interface QuizOption {
  id: string;              // ID lựa chọn (a, b, c)
  text: string;            // Nội dung lựa chọn
  isCorrect: boolean;      // Đáp án đúng/sai
  percentage: number;      // Phần trăm người chọn
}
```

## 🔧 Service Layer

### CareerService
Xử lý tất cả các thao tác liên quan đến nghề nghiệp:

```typescript
// Lấy tất cả nghề nghiệp
const careers = await CareerService.getAllCareers();

// Lấy nghề nghiệp theo ID
const career = await CareerService.getCareerById('web-developer');

// Tìm nghề nghiệp theo kỹ năng
const careers = await CareerService.searchCareersBySkill('JavaScript');

// Lấy câu hỏi quiz cho nghề nghiệp
const questions = await CareerService.getQuizQuestionsByCareer('web-developer');
```

### QuizService
Xử lý logic quiz và kết quả:

```typescript
// Submit câu trả lời
const result = await QuizService.submitAnswer('web-developer', 1, 'a');

// Kết quả trả về:
// {
//   isCorrect: boolean,
//   explanation: string,
//   statistics: [{ optionId: string, percentage: number }]
// }
```

## 🚀 Migration Plan để chuyển sang Database

### Phase 1: Chuẩn bị Database Schema

```sql
-- Bảng careers
CREATE TABLE careers (
  id VARCHAR(50) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image VARCHAR(255),
  icon VARCHAR(10),
  opportunities TEXT,
  gradient VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Bảng career_skills
CREATE TABLE career_skills (
  id INT AUTO_INCREMENT PRIMARY KEY,
  career_id VARCHAR(50),
  skill VARCHAR(100),
  FOREIGN KEY (career_id) REFERENCES careers(id)
);

-- Bảng quiz_questions
CREATE TABLE quiz_questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  career_id VARCHAR(50),
  question TEXT NOT NULL,
  explanation TEXT,
  order_index INT,
  FOREIGN KEY (career_id) REFERENCES careers(id)
);

-- Bảng quiz_options
CREATE TABLE quiz_options (
  id INT AUTO_INCREMENT PRIMARY KEY,
  question_id INT,
  option_id VARCHAR(5),
  text TEXT NOT NULL,
  is_correct BOOLEAN DEFAULT FALSE,
  percentage INT DEFAULT 0,
  FOREIGN KEY (question_id) REFERENCES quiz_questions(id)
);
```

### Phase 2: Update Services

Chỉ cần thay đổi implementation trong `CareerService` và `QuizService`:

```typescript
// Thay vì:
return Promise.resolve(careerPaths);

// Sẽ thành:
return await db.careers.findAll();
```

### Phase 3: Migration Script

Tạo script để import dữ liệu từ file TypeScript vào database:

```typescript
// scripts/migrate-data.ts
import { careerPaths, quizQuestionsByCareer } from '../src/data';
import { database } from '../src/config/database';

async function migrateData() {
  // Import careers
  for (const career of careerPaths) {
    await database.careers.create(career);
  }
  
  // Import quiz questions
  for (const [careerId, questions] of Object.entries(quizQuestionsByCareer)) {
    for (const question of questions) {
      await database.quizQuestions.create({
        ...question,
        career_id: careerId
      });
    }
  }
}
```

## 🎯 Lợi ích của cấu trúc này

### 1. **Separation of Concerns**
- Dữ liệu tách biệt khỏi UI logic
- Service layer cung cấp abstraction
- Dễ dàng test và maintain

### 2. **Database Ready**
- Cấu trúc service sẵn sàng cho async operations
- Interface đã được thiết kế phù hợp với database
- Migration đơn giản chỉ cần thay implementation

### 3. **Type Safety**
- TypeScript interfaces đảm bảo type safety
- IDE support tốt hơn
- Catch errors tại compile time

### 4. **Scalability**
- Dễ thêm caching layer
- Có thể implement pagination
- Support cho advanced queries

### 5. **Future Features**
- User progress tracking
- Quiz analytics
- Career recommendations
- A/B testing cho questions

## 📝 Cách sử dụng trong Components

```typescript
// Trong component
import { CareerService } from '../services';

function MyComponent() {
  const [careers, setCareers] = useState([]);
  
  useEffect(() => {
    const loadCareers = async () => {
      const data = await CareerService.getAllCareers();
      setCareers(data);
    };
    
    loadCareers();
  }, []);
  
  // ...rest of component
}
```

Với cấu trúc này, việc chuyển đổi sang database sẽ rất đơn giản và không ảnh hưởng đến UI components!
