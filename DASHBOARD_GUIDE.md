# Dashboard Quản lý Tin tức - Hướng dẫn sử dụng

## 🎯 Tổng quan
Dashboard quản lý tin tức là một giao diện web hoàn chỉnh cho phép bạn:
- ✅ Tạo tin tức mới
- ✅ Chỉnh sửa tin tức có sẵn
- ✅ Xóa tin tức
- ✅ Ghim/bỏ ghim tin tức quan trọng
- ✅ Xem thống kê tổng quan
- ✅ Lọc và tìm kiếm tin tức
- ✅ Xuất dữ liệu

## 🚀 Truy cập Dashboard
Truy cập dashboard qua URL: `/dashboard`

## 📊 Các tính năng chính

### 1. Thống kê tổng quan
- **Tổng tin tức**: Hiển thị số lượng tất cả tin tức
- **Đã xuất bản**: Số tin tức đã được xuất bản
- **Bản nháp**: Số tin tức đang ở trạng thái nháp
- **Tin ghim**: Số tin tức được ghim
- **Đã lưu trữ**: Số tin tức đã lưu trữ

### 2. Tạo tin tức mới
1. Click nút **"Tạo tin tức mới"**
2. Điền các thông tin:
   - **Tiêu đề*** (bắt buộc)
   - **Tóm tắt*** (bắt buộc)
   - **Nội dung*** (bắt buộc) - Hỗ trợ HTML cơ bản
   - **Hình ảnh** (tùy chọn) - URL hình ảnh
   - **Tác giả** (mặc định: Admin)
   - **Danh mục** - Chọn từ dropdown
   - **Tags** - Thêm các từ khóa
   - **Ghim tin tức** - Checkbox để ghim tin
3. Click **"Lưu tin tức"**

### 3. Chỉnh sửa tin tức
1. Click icon **✏️ Edit** trên dòng tin tức muốn chỉnh sửa
2. Form sẽ mở với dữ liệu có sẵn
3. Chỉnh sửa các thông tin cần thiết
4. Click **"Lưu tin tức"**

### 4. Xóa tin tức
1. Click icon **🗑️ Delete** trên dòng tin tức muốn xóa
2. Xác nhận trong dialog popup
3. Tin tức sẽ bị xóa vĩnh viễn

### 5. Ghim/Bỏ ghim tin tức
1. Click icon **📌 Pin** để ghim tin tức quan trọng
2. Click icon **📌 PinOff** để bỏ ghim
3. Tin ghim sẽ được ưu tiên hiển thị đầu tiên

### 6. Bộ lọc và tìm kiếm
- **Tìm kiếm**: Tìm theo tiêu đề, nội dung, tác giả, tags
- **Lọc theo danh mục**: Cập nhật, Bảo mật, Đối tác, Tuyển dụng, Công nghệ, Sự kiện
- **Lọc theo trạng thái**: Đã xuất bản, Bản nháp, Đã lưu trữ

### 7. Xuất dữ liệu
Click nút **"Xuất dữ liệu"** để tải file JSON chứa tất cả tin tức đã lọc

## 🔧 Cấu trúc dữ liệu

### Tin tức được lưu trữ với các trường:
```typescript
{
  id: string,              // ID tự động tạo
  title: string,           // Tiêu đề
  excerpt: string,         // Tóm tắt
  content: string,         // Nội dung HTML
  image?: string,          // URL hình ảnh
  author: string,          // Tác giả
  category: string,        // Danh mục
  tags: string[],          // Mảng tags
  pinned: boolean,         // Trạng thái ghim
  status: string,          // published/draft/archived
  viewCount: number,       // Số lượt xem
  likeCount: number,       // Số lượt thích
  createdAt: Date,         // Ngày tạo
  updatedAt: Date          // Ngày cập nhật
}
```

## 💡 Tips sử dụng

1. **HTML trong nội dung**: Bạn có thể sử dụng các tag HTML cơ bản như:
   - `<h3>Tiêu đề</h3>`
   - `<p>Đoạn văn</p>`
   - `<ul><li>Danh sách</li></ul>`
   - `<strong>Chữ đậm</strong>`

2. **Ghim tin quan trọng**: Sử dụng tính năng ghim cho tin tức quan trọng để hiển thị ưu tiên

3. **Tags hiệu quả**: Sử dụng tags ngắn gọn, dễ tìm kiếm

4. **Hình ảnh**: Sử dụng URL hình ảnh từ thư mục public hoặc CDN

## 🛠️ Kỹ thuật

- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Firebase Firestore
- **Icons**: Lucide React
- **State Management**: React Hooks
- **Realtime**: Firebase onSnapshot

## 🔄 Tích hợp với hệ thống hiện tại

Dashboard tích hợp hoàn toàn với:
- ✅ Trang tin tức công khai (`/news`)
- ✅ Chi tiết tin tức (`/news/:id`)
- ✅ Hệ thống thông báo realtime
- ✅ Firebase Firestore database

Tất cả tin tức tạo từ dashboard sẽ tự động hiển thị trên trang tin tức công khai và đồng bộ realtime.
