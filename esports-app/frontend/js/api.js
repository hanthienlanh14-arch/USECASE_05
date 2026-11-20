// Hàm dùng chung: gọi API backend + định dạng ngày
const API = '/api';

async function callApi(path, method = 'GET', body) {
  const res = await fetch(API + path, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Có lỗi xảy ra');
  return data;
}

// '2026-11-14' -> '14/11/2026'
function fmtDate(d) { return d ? d.split('-').reverse().join('/') : ''; }

function badgeClass(tt) {
  return tt === 'Đang diễn ra' ? 'live' : tt === 'Sắp diễn ra' ? 'soon' : 'end';
}

function showMsg(text, type = 'error') {
  const el = document.getElementById('msg');
  el.textContent = text;
  el.className = 'msg show ' + type;
}

// Chống XSS: mã hóa ký tự HTML trước khi chèn vào innerHTML (sửa BUG-06)
function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
