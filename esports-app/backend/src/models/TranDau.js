// Model: ánh xạ bảng TranDau
const db = require('../config/db');

exports.getByGiaiDau = async (maGiaiDau, ngay) => {
  let sql = `SELECT t.MaTran, t.MaGiaiDau, t.MaDoi1, t.MaDoi2, d1.TenDoi AS TenDoi1, d2.TenDoi AS TenDoi2,
                    t.NgayThiDau, t.TiSo
             FROM TranDau t
             JOIN DoiTuyen d1 ON d1.MaDoi = t.MaDoi1
             JOIN DoiTuyen d2 ON d2.MaDoi = t.MaDoi2
             WHERE t.MaGiaiDau = ?`;
  const params = [maGiaiDau];
  if (ngay) { sql += ' AND t.NgayThiDau = ?'; params.push(ngay); }
  sql += ' ORDER BY t.NgayThiDau, t.MaTran';
  const [rows] = await db.query(sql, params);
  return rows;
};

exports.isDoiDangKy = async (maGiaiDau, maDoi) => {
  const [rows] = await db.query('SELECT 1 FROM DangKy WHERE MaGiaiDau = ? AND MaDoi = ?', [maGiaiDau, maDoi]);
  return rows.length > 0;
};

exports.create = async ({ MaGiaiDau, MaDoi1, MaDoi2, NgayThiDau }) => {
  const [r] = await db.query(
    'INSERT INTO TranDau (MaGiaiDau, MaDoi1, MaDoi2, NgayThiDau) VALUES (?, ?, ?, ?)',
    [MaGiaiDau, MaDoi1, MaDoi2, NgayThiDau]);
  return r.insertId;
};

exports.updateTiSo = async (maTran, tiSo) => {
  const [r] = await db.query('UPDATE TranDau SET TiSo = ? WHERE MaTran = ?', [tiSo, maTran]);
  return r.affectedRows;
};
