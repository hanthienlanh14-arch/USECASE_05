// Màn hình 1: Tạo giải đấu + danh sách giải đấu
async function taiDanhSach() {
  const tbody = document.getElementById('bangGiaiDau');
  try {
    const ds = await callApi('/giaidau');
    tbody.innerHTML = ds.map(g => `
      <tr>
        <td>GD${String(g.MaGiaiDau).padStart(2, '0')}</td>
        <td><a href="lichthidau.html?id=${g.MaGiaiDau}">${esc(g.TenGiaiDau)}</a></td>
        <td>${fmtDate(g.NgayBatDau)}</td>
        <td>${fmtDate(g.NgayKetThuc)}</td>
        <td><span class="badge ${badgeClass(g.TrangThai)}">${esc(g.TrangThai)}</span></td>
      </tr>`).join('') || '<tr><td colspan="5" class="empty">Chưa có giải đấu</td></tr>';
  } catch (e) { showMsg('Không tải được danh sách giải đấu: ' + e.message); }
}

document.getElementById('formGiaiDau').addEventListener('submit', async (ev) => {
  ev.preventDefault();
  const f = ev.target;
  try {
    const r = await callApi('/giaidau', 'POST', {
      TenGiaiDau: f.TenGiaiDau.value,
      NgayBatDau: f.NgayBatDau.value || null,
      NgayKetThuc: f.NgayKetThuc.value || null,
      TrangThai: f.TrangThai.value
    });
    // Prototype: "Lưu giải đấu" -> chuyển sang màn hình Lịch thi đấu
    location.href = 'lichthidau.html?id=' + r.MaGiaiDau;
  } catch (e) { showMsg(e.message); }
});

taiDanhSach();
