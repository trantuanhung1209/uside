# Hướng dẫn Khắc phục Lỗi Upload Image

## Vấn đề
Lỗi: **"new row violates row-level security policy"** khi upload image lên Supabase Storage.

## Nguyên nhân
- Row Level Security (RLS) được bật trên Supabase Storage bucket `news-images`
- Ứng dụng sử dụng Firebase Auth nhưng Supabase không nhận diện được session này
- Supabase yêu cầu user được xác thực để upload file

## Giải pháp đã triển khai

### 1. Tạo Admin Client (Đã hoàn thành)
- Tạo file `src/config/supabaseAdmin.ts` để sử dụng service role key
- Cập nhật `ImageUploadService` để sử dụng admin client khi có thể

### 2. Cập nhật Environment Variables (Cần làm)

Thêm service role key vào file `.env`:

```bash
# Lấy từ Supabase Dashboard > Settings > API > service_role key
VITE_SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im14dWdoeGhtaW9jYm1neHp1a3lvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NjM5MzU1MSwiZXhwIjoyMDcxOTY5NTUxfQ.YOUR_SERVICE_ROLE_KEY
```

### 3. Các bước để lấy Service Role Key

1. Vào [Supabase Dashboard](https://supabase.com/dashboard)
2. Chọn project `mxughxhmiocbmgxzukyo`
3. Vào **Settings** → **API**
4. Copy giá trị `service_role key` (không phải anon key)
5. Paste vào file `.env` của bạn

### 4. Giải pháp thay thế (nếu không muốn dùng service role)

#### Option A: Disable RLS cho Storage
1. Vào Supabase Dashboard
2. **Storage** → **news-images** → **Settings**
3. Tắt "Enable RLS"

#### Option B: Tạo Policy cho Storage
Tạo policy cho phép authenticated users upload:

```sql
CREATE POLICY "Allow authenticated uploads" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'news-images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Allow public read" ON storage.objects
FOR SELECT USING (bucket_id = 'news-images');
```

## Kiểm tra sau khi khắc phục

1. Restart dev server: `npm run dev`
2. Thử upload một image mới
3. Kiểm tra console không còn lỗi RLS

## Bảo mật

⚠️ **Lưu ý quan trọng**: 
- Service role key có quyền admin toàn bộ database
- Chỉ sử dụng cho operations cần thiết
- Không commit key này vào git
- Đảm bảo file `.env` có trong `.gitignore`
