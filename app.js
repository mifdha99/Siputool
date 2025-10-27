// Bahasa Indonesia — logika frontend kecil untuk SiputTool (statik)
// Hashtag generator sederhana + kalender lokal + preview iframe

function generateHashtags(keyword) {
  if (!keyword) return [];
  const base = keyword.toLowerCase().replace(/[^a-z0-9]/g, '');
  const variants = [base, base + 'tok', base + 'viral', base + 'challenge', base + 'tips', base + 'id'];
  return Array.from(new Set(variants)).slice(0,6).map(t => '#' + t);
}

function renderTags(tags) {
  const el = document.getElementById('tags');
  el.innerHTML = '';
  if (!tags.length) {
    el.innerHTML = '<div class="text-slate-400">Belum ada tag — klik Generate.</div>';
    return;
  }
  tags.forEach(t => {
    const span = document.createElement('span');
    span.className = 'px-2 py-1 text-sm border rounded bg-emerald-50 text-emerald-800';
    span.textContent = t;
    el.appendChild(span);
  });
}

// Caption template copy
document.getElementById('copyCap').addEventListener('click', () => {
  const kw = document.getElementById('keyword').value || 'topik ini';
  const cap = `Tips singkat tentang ${kw} — tonton sampai akhir 🔥`;
  navigator.clipboard?.writeText(cap);
  alert('Template caption telah disalin.');
});

document.getElementById('genBtn').addEventListener('click', () => {
  const kw = document.getElementById('keyword').value.trim();
  const tags = generateHashtags(kw);
  renderTags(tags);
});

// Preview TikTok: buat iframe kalau URL diisi
document.getElementById('videoUrl').addEventListener('change', (e) => {
  const url = e.target.value.trim();
  const preview = document.getElementById('preview');
  preview.innerHTML = '';
  if (!url) {
    preview.innerHTML = '<div class="text-slate-400 text-sm">Preview akan tampil di sini jika URL dimasukkan.</div>';
    return;
  }
  // simple embed: gunakan iframe src = url (TikTok kadang blok)
  const iframe = document.createElement('iframe');
  iframe.className = 'w-full h-64 border rounded';
  iframe.src = url;
  iframe.sandbox = 'allow-scripts allow-same-origin';
  preview.appendChild(iframe);
});

// Kalender lokal (localStorage)
const CAL_KEY = 'siputtool_calendar';

function loadCalendar() {
  try {
    const raw = localStorage.getItem(CAL_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch(e) { return []; }
}

function saveCalendar(arr) {
  localStorage.setItem(CAL_KEY, JSON.stringify(arr));
}

function renderCalendar() {
  const el = document.getElementById('calendar');
  const arr = loadCalendar();
  if (!arr.length) {
    el.innerHTML = '<div class="text-slate-400">Belum ada jadwal. Tambahkan ide kamu.</div>';
    return;
  }
  el.innerHTML = '';
  arr.forEach(item => {
    const row = document.createElement('div');
    row.className = 'p-2 border rounded flex justify-between items-center bg-white';
    row.innerHTML = `
      <div>
        <div class="font-medium">${escapeHtml(item.title)}</div>
        <div class="text-sm text-slate-500">${item.date}</div>
      </div>
      <div class="flex gap-2">
        <button class="px-3 py-1 border rounded" data-id="${item.id}" onclick="alert('Ini demo scheduler. Integrasi API diperlukan untuk publish otomatis.')">Schedule</button>
        <button class="px-3 py-1 rounded bg-red-600 text-white" data-id="${item.id}">Hapus</button>
      </div>
    `;
    const delBtn = row.querySelector('button.bg-red-600');
    delBtn.addEventListener('click', () => {
      if (!confirm('Hapus item ini?')) return;
      const newArr = loadCalendar().filter(x => x.id !== item.id);
      saveCalendar(newArr);
      renderCalendar();
    });
    el.appendChild(row);
  });
}

function escapeHtml(unsafe) {
  return unsafe.replace(/[&<"'>]/g, function(m){ return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'})[m]; });
}

document.getElementById('addBtn').addEventListener('click', () => {
  const title = document.getElementById('title').value.trim();
  const date = document.getElementById('date').value;
  if (!title || !date) return alert('Isi judul dan tanggal dulu.');
  const arr = loadCalendar();
  arr.unshift({ id: Date.now(), title, date });
  saveCalendar(arr);
  document.getElementById('title').value = '';
  document.getElementById('date').value = '';
  renderCalendar();
});

// Inisialisasi
renderCalendar();
renderTags([]);
