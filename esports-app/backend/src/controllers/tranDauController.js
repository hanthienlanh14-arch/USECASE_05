const TranDau = require('../models/TranDau');
const GiaiDau = require('../models/GiaiDau');
const check = require('./validate');

exports.list = async (req, res) => {
  try {
    const gd = await GiaiDau.getById(req.params.id);
    if (!gd) return res.status(404).json({ message: 'Không tìm thấy giải đấu' });
    res.json({ giaiDau: gd, tranDau: await TranDau.getByGiaiDau(req.params.id, req.query.ngay) });
  } catch (e) { console.error(e); res.status(500).json({ message: 'Lỗi máy chủ' }); }
};

exports.create = async (req, res) => {
  try {
    const { MaGiaiDau, MaDoi1, MaDoi2, NgayThiDau } = req.body;
    if (!check.isId(MaGiaiDau) || !check.isId(MaDoi1) || !check.isId(MaDoi2) || !check.isDate(NgayThiDau))
      return res.status(400).json({ message: 'Thiếu hoặc sai thông tin trận đấu' });
    if (Number(MaDoi1) === Number(MaDoi2))
      return res.status(400).json({ message: 'Hai đội trong một trận phải khác nhau' });
    if (!(await GiaiDau.getById(MaGiaiDau)))
      return res.status(404).json({ message: 'Không tìm thấy giải đấu' });
    if (!(await TranDau.isDoiDangKy(MaGiaiDau, MaDoi1)) || !(await TranDau.isDoiDangKy(MaGiaiDau, MaDoi2)))
      return res.status(400).json({ message: 'Cả hai đội phải đã đăng ký giải đấu này' });
    const id = await TranDau.create({ MaGiaiDau, MaDoi1, MaDoi2, NgayThiDau });
    res.status(201).json({ MaTran: id });
  } catch (e) { console.error(e); res.status(500).json({ message: 'Lỗi máy chủ' }); }
};

exports.updateTiSo = async (req, res) => {
  try {
    const tiSo = check.tiSo(req.body.TiSo);
    if (!tiSo) return res.status(400).json({ message: 'Tỉ số phải có dạng "số - số", ví dụ 2 - 1' });
    const n = await TranDau.updateTiSo(req.params.maTran, tiSo);
    if (!n) return res.status(404).json({ message: 'Không tìm thấy trận đấu' });
    res.json({ message: 'Đã cập nhật tỉ số' });
  } catch (e) { console.error(e); res.status(500).json({ message: 'Lỗi máy chủ' }); }
};
