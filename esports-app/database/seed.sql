SET NAMES utf8mb4;
USE QuanLyEsports;
INSERT INTO GiaiDau (TenGiaiDau, NgayBatDau, NgayKetThuc, TrangThai) VALUES
 ('Duy Tân Open 2025',      '2025-05-10', '2025-05-15', 'Kết thúc'),
 ('Liên Quân Mùa Xuân',     '2026-11-01', '2026-11-14', 'Đang diễn ra'),
 ('Valorant Campus Cup',    '2026-12-15', '2026-12-20', 'Sắp diễn ra');
INSERT INTO DoiTuyen (TenDoi, TenGame, TenDoiTruong) VALUES
 ('Team Phoenix',   'Liên Quân', 'Nguyễn Văn An'),
 ('Dragon Esports', 'Liên Quân', 'Trần Minh Bảo'),
 ('Night Owls',     'Liên Quân', 'Lê Hoàng Cường'),
 ('Storm Riders',   'Valorant',  'Phạm Quốc Dũng');
INSERT INTO DangKy (MaGiaiDau, MaDoi, NgayDangKy) VALUES
 (2,1,'2026-10-20'),(2,2,'2026-10-21'),(2,3,'2026-10-22'),
 (3,4,'2026-11-10'),(3,1,'2026-11-12');
INSERT INTO TranDau (MaGiaiDau, MaDoi1, MaDoi2, NgayThiDau, TiSo) VALUES
 (2,1,2,'2026-11-14','2 - 1'),
 (2,3,1,'2026-11-15','0 - 2'),
 (2,2,3,'2026-11-16',NULL);
