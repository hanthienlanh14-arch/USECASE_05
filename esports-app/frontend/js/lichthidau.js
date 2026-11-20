// Màn hình 2: Lịch thi đấu, thêm trận, cập nhật tỉ số
const $ = (id) => document.getElementById(id);
let maGiai = new URLSearchParams(location.search).get('id');
let dsTran = [];
let tranChon = null;

async function taiDanhSachGiai() {
  const ds = await callApi('/giaidau');
  $('gd').innerHTML = ds.map(g => `<option value="${g.MaGiaiDau}">${esc(g.TenGiaiDau)}</option>`).join('');
  if (!maGiai && ds.length) maGiai = ds.find(g => g.TrangThai === 'Đang diễn ra')?.MaGiaiDau || ds[0].MaGiaiDau;
  $('gd').value = maGiai;
}

async function taiLich() {
  tranChon = null;
  try {
    const q = $('ngay').value ? '?ngay=' + $('ngay').value : '';
    const data = await callApi(`/giaidau/${maGiai}/trandau${q}`);
    dsTran = data.tranDau;
    $('tieuDe').innerHTML = 'Lịch thi đấu – ' + esc(data.giaiDau.TenGiaiDau);
    $('badgeGiai').innerHTML = `<span class="badge ${badgeClass(data.giaiDau.TrangThai)}">${esc(data.giaiDau.TrangThai)}</span>`;
    // nạp danh sách ngày (chỉ khi đang xem "Tất cả ngày")
    if (!$('ngay').value) {
      const ngays = [...new Set(dsTran.map(t => t.NgayThiDau))];
      $('ngay').innerHTML = '<option value="">Tất cả ngày</option>' + ngays.map(n => `<option value="${n}">${fmtDate(n)}</option>`).join('');
    }
    renderBang();
  } catch (e) { showMsg(e.message); }
}

function renderBang() {
  $('bangTran').innerHTML = dsTran.map(t => `
    <tr class="selectable ${tranChon === t.MaTran ? 'selected' : ''}" data-id="${t.MaTran}">
      <td>TD${String(t.MaTran).padStart(2, '0')}</td>
      <td>${esc(t.TenDoi1)}</td><td>${esc(t.TenDoi2)}</td>
      <td>${fmtDate(t.NgayThiDau)}</td>
      <td class="score">${esc(t.TiSo) || 'Chưa đấu'}</td>
    </tr>`).join('') || '<tr><td colspan="5" class="empty">Chưa có trận đấu nào</td></tr>';
  document.querySelectorAll('tr.selectable').forEach(tr => tr.onclick = () => { tranChon = +tr.dataset.id; renderBang(); });
}

$('gd').onchange = () => { maGiai = $('gd').value; $('ngay').value = ''; history.replaceState(null, '', '?id=' + maGiai); taiLich(); };
$('ngay').onchange = taiLich;

// ----- Thêm trận đấu -----
$('moPopup').onclick = async () => {
  $('msgPopup').className = 'msg';
  const doi = await callApi(`/giaidau/${maGiai}/doituyen`);
  const opts = doi.map(d => `<option value="${d.MaDoi}">${esc(d.TenDoi)}</option>`).join('');
  $('d1').innerHTML = opts; $('d2').innerHTML = opts;
  if (doi.length > 1) $('d2').selectedIndex = 1;
  $('popup').showModal();
};
$('dong').onclick = () => $('popup').close();
$('formTran').onsubmit = async (ev) => {
  ev.preventDefault();
  try {
    await callApi('/trandau', 'POST', { MaGiaiDau: maGiai, MaDoi1: $('d1').value, MaDoi2: $('d2').value, NgayThiDau: $('nt').value });
    $('popup').close(); $('ngay').value = ''; showMsg('Đã thêm trận đấu', 'ok'); taiLich();
  } catch (e) { $('msgPopup').textContent = e.message; $('msgPopup').className = 'msg show error'; }
};

// ----- Cập nhật tỉ số -----
$('moTiSo').onclick = () => {
  const t = dsTran.find(x => x.MaTran === tranChon);
  if (!t) return showMsg('Hãy chọn một trận đấu trong bảng trước');
  $('tenTran').innerHTML = `<b>${esc(t.TenDoi1)}</b> vs <b>${esc(t.TenDoi2)}</b>`;
  $('tiso').value = t.TiSo || ''; $('msgTiSo').className = 'msg';
  $('popupTiSo').showModal();
};
$('dongTiSo').onclick = () => $('popupTiSo').close();
$('formTiSo').onsubmit = async (ev) => {
  ev.preventDefault();
  try {
    await callApi(`/trandau/${tranChon}/tiso`, 'PUT', { TiSo: $('tiso').value });
    $('popupTiSo').close(); showMsg('Đã cập nhật tỉ số', 'ok'); taiLich();
  } catch (e) { $('msgTiSo').textContent = e.message; $('msgTiSo').className = 'msg show error'; }
};

(async () => { await taiDanhSachGiai(); await taiLich(); })();
