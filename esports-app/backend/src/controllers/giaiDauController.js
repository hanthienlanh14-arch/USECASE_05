const GiaiDau = require('../models/GiaiDau');
const check = require('./validate');

exports.list = async (req, res) => {
  try { res.json(await GiaiDau.getAll()); }
  catch (e) { console.error(e); res.status(500).json({ message: 'Lỗi máy chủ' }); }
};

exports.create = async (req, res) => {
  try {
    const { TenGiaiDau, NgayBatDau, NgayKetThuc, TrangThai } = req.body;
    const loi = check.giaiDau(req.body);
    if (loi) return res.status(400).json({ message: loi });
    const id = await GiaiDau.create({ TenGiaiDau: TenGiaiDau.trim(), NgayBatDau, NgayKetThuc, TrangThai });
    res.status(201).json({ MaGiaiDau: id });
  } catch (e) { console.error(e); res.status(500).json({ message: 'Lỗi máy chủ' }); }
};

exports.doiDaDangKy = async (req, res) => {
  try { res.json(await GiaiDau.getDoiDaDangKy(req.params.id)); }
  catch (e) { console.error(e); res.status(500).json({ message: 'Lỗi máy chủ' }); }
};
