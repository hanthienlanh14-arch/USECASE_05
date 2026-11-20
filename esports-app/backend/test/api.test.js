// Kiểm thử API (chạy khi server đang bật): npm test
const { test } = require('node:test');
const assert = require('node:assert');
const BASE = process.env.BASE_URL || 'http://localhost:3000/api';

const call = async (path, method = 'GET', body) => {
  const r = await fetch(BASE + path, { method, headers: { 'Content-Type': 'application/json' }, body: body && JSON.stringify(body) });
  return { status: r.status, data: await r.json().catch(() => ({})) };
};

test('TC-01 Lấy danh sách giải đấu', async () => {
  const r = await call('/giaidau');
  assert.strictEqual(r.status, 200);
  assert.ok(Array.isArray(r.data) && r.data.length >= 3);
});

test('TC-02 Tạo giải đấu hợp lệ', async () => {
  const r = await call('/giaidau', 'POST', { TenGiaiDau: 'Giải kiểm thử', NgayBatDau: '2027-01-10', NgayKetThuc: '2027-01-15', TrangThai: 'Sắp diễn ra' });
  assert.strictEqual(r.status, 201);
  assert.ok(r.data.MaGiaiDau > 0);
});

test('TC-03 Tạo giải đấu thiếu tên', async () => {
  const r = await call('/giaidau', 'POST', { TenGiaiDau: '', NgayBatDau: '2027-01-10', NgayKetThuc: '2027-01-15', TrangThai: 'Sắp diễn ra' });
  assert.strictEqual(r.status, 400);
});

test('TC-04 Xem lịch thi đấu của giải đang diễn ra', async () => {
  const r = await call('/giaidau/2/trandau');
  assert.strictEqual(r.status, 200);
  assert.ok(r.data.tranDau.length >= 3 && r.data.tranDau[0].TenDoi1);
});

test('TC-05 Thêm trận đấu hợp lệ', async () => {
  const r = await call('/trandau', 'POST', { MaGiaiDau: 2, MaDoi1: 1, MaDoi2: 3, NgayThiDau: '2026-11-20' });
  assert.strictEqual(r.status, 201);
});

test('TC-06 Cập nhật tỉ số hợp lệ và đọc lại', async () => {
  const r = await call('/trandau/3/tiso', 'PUT', { TiSo: '3 - 1' });
  assert.strictEqual(r.status, 200);
  const g = await call('/giaidau/2/trandau');
  assert.strictEqual(g.data.tranDau.find(t => t.MaTran === 3).TiSo, '3 - 1');
});

test('TC-07 Ngày kết thúc trước ngày bắt đầu phải bị từ chối', async () => {
  const r = await call('/giaidau', 'POST', { TenGiaiDau: 'Giải ngày sai', NgayBatDau: '2027-02-20', NgayKetThuc: '2027-02-10', TrangThai: 'Sắp diễn ra' });
  assert.strictEqual(r.status, 400);
});

test('TC-08 Hai đội trong một trận phải khác nhau', async () => {
  const r = await call('/trandau', 'POST', { MaGiaiDau: 2, MaDoi1: 1, MaDoi2: 1, NgayThiDau: '2026-11-21' });
  assert.strictEqual(r.status, 400);
});

test('TC-09 Tỉ số sai định dạng phải bị từ chối', async () => {
  const r = await call('/trandau/1/tiso', 'PUT', { TiSo: 'abc' });
  assert.strictEqual(r.status, 400);
});

test('TC-10 Tên giải chỉ gồm khoảng trắng phải bị từ chối', async () => {
  const r = await call('/giaidau', 'POST', { TenGiaiDau: '   ', NgayBatDau: '2027-03-01', NgayKetThuc: '2027-03-05', TrangThai: 'Sắp diễn ra' });
  assert.strictEqual(r.status, 400);
});

test('TC-11 Đội chưa đăng ký giải không được thêm vào trận', async () => {
  const r = await call('/trandau', 'POST', { MaGiaiDau: 2, MaDoi1: 4, MaDoi2: 1, NgayThiDau: '2026-11-22' });
  assert.strictEqual(r.status, 400);
});

test('TC-12 Cập nhật tỉ số cho trận không tồn tại', async () => {
  const r = await call('/trandau/9999/tiso', 'PUT', { TiSo: '1 - 0' });
  assert.strictEqual(r.status, 404);
});
