// Hàm kiểm tra dữ liệu đầu vào dùng chung (sửa lỗi BUG-01..05)
const TRANG_THAI = ['Sắp diễn ra', 'Đang diễn ra', 'Kết thúc'];

const isDate = (s) => typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s) && !isNaN(new Date(s));
const isId = (v) => Number.isInteger(Number(v)) && Number(v) > 0;

// Trả về chuỗi lỗi hoặc null nếu hợp lệ
exports.giaiDau = ({ TenGiaiDau, NgayBatDau, NgayKetThuc, TrangThai }) => {
  if (typeof TenGiaiDau !== 'string' || !TenGiaiDau.trim()) return 'Tên giải đấu là bắt buộc';
  if (TenGiaiDau.trim().length > 100) return 'Tên giải đấu tối đa 100 ký tự';
  if (!isDate(NgayBatDau) || !isDate(NgayKetThuc)) return 'Ngày bắt đầu và ngày kết thúc là bắt buộc';
  if (NgayKetThuc < NgayBatDau) return 'Ngày kết thúc phải sau hoặc bằng ngày bắt đầu';
  if (!TRANG_THAI.includes(TrangThai)) return 'Trạng thái không hợp lệ';
  return null;
};

exports.tiSo = (v) => {
  if (typeof v !== 'string' || !/^\d{1,2}\s*-\s*\d{1,2}$/.test(v.trim())) return null;
  const [a, b] = v.split('-').map(x => x.trim());
  return `${Number(a)} - ${Number(b)}`;          // chuẩn hóa "3-1" -> "3 - 1"
};

exports.isDate = isDate;
exports.isId = isId;
