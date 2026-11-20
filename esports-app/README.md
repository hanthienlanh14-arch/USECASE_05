# Hệ thống quản lý giải đấu Esports – Nhóm 1

Module: **Quản lý giải đấu & lịch thi đấu** (Tạo giải đấu, thêm trận đấu, cập nhật tỉ số).

## Tech Stack
- Frontend: HTML / CSS / JavaScript thuần
- Backend: Node.js (Express) + mysql2
- Database: MySQL 8 / MariaDB 10.x
- Công cụ: VS Code, Git/GitHub, Figma

## Cài đặt & chạy
1. Tạo CSDL (dùng utf8mb4 để không lỗi tiếng Việt):
   ```
   mysql -u root -p --default-character-set=utf8mb4 < database/schema.sql
   mysql -u root -p --default-character-set=utf8mb4 < database/seed.sql
   ```
2. Cấu hình backend:
   ```
   cd backend
   cp .env.example .env      # sửa DB_USER / DB_PASSWORD cho đúng máy của bạn
   npm install
   npm start
   ```
3. Mở trình duyệt: http://localhost:3000 (backend phục vụ luôn thư mục `frontend/`).
4. Chạy kiểm thử API (khi server đang bật): `npm test`

## API
| Method | URL | Chức năng |
|---|---|---|
| GET | /api/giaidau | Danh sách giải đấu |
| POST | /api/giaidau | Tạo giải đấu |
| GET | /api/giaidau/:id/doituyen | Đội đã đăng ký giải |
| GET | /api/giaidau/:id/trandau?ngay= | Lịch thi đấu của giải |
| POST | /api/trandau | Thêm trận đấu |
| PUT | /api/trandau/:maTran/tiso | Cập nhật tỉ số |
