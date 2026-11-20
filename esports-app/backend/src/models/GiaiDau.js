// Model: ánh xạ bảng GiaiDau
const db = require('../config/db');

exports.getAll = async () => {
  const [rows] = await db.query('SELECT * FROM GiaiDau ORDER BY MaGiaiDau');
  return rows;
};

exports.getById = async (id) => {
  const [rows] = await db.query('SELECT * FROM GiaiDau WHERE MaGiaiDau = ?', [id]);
  return rows[0];
};

exports.create = async ({ TenGiaiDau, NgayBatDau, NgayKetThuc, TrangThai }) => {
  const [r] = await db.query(
    'INSERT INTO GiaiDau (TenGiaiDau, NgayBatDau, NgayKetThuc, TrangThai) VALUES (?, ?, ?, ?)',
    [TenGiaiDau, NgayBatDau, NgayKetThuc, TrangThai]);
  return r.insertId;
};

// Các đội đã đăng ký giải (bảng DangKy) - dùng cho dropdown trong popup
exports.getDoiDaDangKy = async (id) => {
  const [rows] = await db.query(
    `SELECT d.MaDoi, d.TenDoi FROM DangKy k JOIN DoiTuyen d ON d.MaDoi = k.MaDoi
     WHERE k.MaGiaiDau = ? ORDER BY d.TenDoi`, [id]);
  return rows;
};
