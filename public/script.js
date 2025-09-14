// ============================
// OSIS WEBSITE - JSON PENGUMUMAN
// ============================

// Menu toggle (responsive)
function toggleMenu() {
  document.getElementById('main-nav').classList.toggle('active');
}

// Navigasi halaman
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  if (window.innerWidth <= 768) document.getElementById('main-nav').classList.remove('active');
}

// ============================
// Render Pengumuman dari JSON
// ============================
async function loadPengumuman() {
  try {
    const res = await fetch('pengumuman.json');
    const data = await res.json();
    const list = document.getElementById('pengumuman-list');
    list.innerHTML = '';
    data.forEach(p => {
      const div = document.createElement('div');
      div.className = 'card small';
      div.innerHTML = `<strong>${p.title}</strong><br>${p.content}`;
      list.appendChild(div);
    });
  } catch(err) {
    console.error('Gagal load pengumuman:', err);
  }
}

// Load pengumuman saat halaman siap
document.addEventListener('DOMContentLoaded', () => {
  loadPengumuman();
  // Opsional: auto refresh tiap 10 detik
  setInterval(loadPengumuman, 10000);
});

// ============================
// Fetch & Render Pengumuman
// ============================
async function loadPengumuman() {
  try {
    const res = await fetch('/api/pengumuman');
    const data = await res.json();
    const list = document.getElementById('pengumuman-list');
    list.innerHTML = '';
    data.forEach(p => {
      const div = document.createElement('div');
      div.className = 'card small';
      div.innerHTML = `<strong>${p.title}</strong><br>${p.content}`;
      list.appendChild(div);
    });
  } catch(err) {
    console.error('Gagal load pengumuman:', err);
  }
}

// Panggil saat halaman load
document.addEventListener('DOMContentLoaded', () => {
  loadPengumuman();
  setInterval(loadPengumuman, 5000); // auto refresh tiap 5 detik
});

// Fetch pengumuman
async function loadPengumuman() {
  try {
    const res = await fetch('/api/pengumuman');
    const data = await res.json();
    const list = document.getElementById('pengumuman-list');
    list.innerHTML = '';
    data.forEach(p => {
      const div = document.createElement('div');
      div.className = 'card small';
      div.innerHTML = `<strong>${p.title}</strong><br>${p.content}`;
      list.appendChild(div);
    });
  } catch(err) {
    console.error(err);
  }
}

// Load saat DOM siap
document.addEventListener('DOMContentLoaded', () => {
  loadPengumuman();
  setInterval(loadPengumuman, 5000);
});

// Admin submit form
document.getElementById('form-ann').addEventListener('submit', async e => {
  e.preventDefault();
  const title = document.getElementById('ann-title').value;
  const content = document.getElementById('ann-content').value;
  const password = document.getElementById('admin-pass').value;

  try {
    const res = await fetch('/api/pengumuman', {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify({ title, content, password })
    });
    const data = await res.json();
    if(data.success){
      e.target.reset();
      loadPengumuman();
      alert('Pengumuman berhasil ditambahkan!');
    } else {
      alert(data.error || 'Gagal menambahkan pengumuman');
    }
  } catch(err) {
    alert('Gagal menambahkan pengumuman');
    console.error(err);
  }
});


// ============================
// Admin Submit Form
// ============================
document.getElementById('form-ann').addEventListener('submit', async e => {
  e.preventDefault();
  const title = document.getElementById('ann-title').value;
  const content = document.getElementById('ann-content').value;
  const password = document.getElementById('admin-pass').value;

  try {
    const res = await fetch('/api/pengumuman', {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify({ title, content, password })
    });
    const data = await res.json();
    if(data.success) {
      e.target.reset();
      loadPengumuman();
      alert('Pengumuman berhasil ditambahkan!');
    } else {
      alert(data.error || 'Gagal menambahkan pengumuman');
    }
  } catch(err) {
    alert('Gagal menambahkan pengumuman');
    console.error(err);
  }
});


// ============================
// Admin login / logout (simple)
// ============================
const ADMIN_PASSWORD = "admin123";

function loginAdmin() {
  const pass = document.getElementById('admin-pass').value;
  if(pass === ADMIN_PASSWORD) {
    document.getElementById('login-box').style.display = 'none';
    document.getElementById('admin-panel').style.display = 'block';
  } else alert("Password salah!");
}

function logoutAdmin() {
  document.getElementById('login-box').style.display = 'block';
  document.getElementById('admin-panel').style.display = 'none';
}

// ============================
// Header shrink saat scroll
// ============================
const header = document.querySelector('header');
const headerTitle = header.querySelector('h1');
const headerPhotos = header.querySelectorAll('.header-photos img');
const main = document.querySelector('main');

function shrinkHeader() {
  const scrollY = window.scrollY;
  const minH = 120, maxH = 220;
  const newH = Math.max(minH, maxH - scrollY);
  const newPad = Math.max(8, 20 - scrollY/10);
  const newFont = Math.max(1.2, 2 - scrollY/200);
  const newImgH = Math.max(60, 180 - scrollY/2);
  const newLogoH = Math.max(40, 120 - scrollY/2);

  header.style.height = newH + 'px';
  header.style.padding = newPad + 'px';
  headerTitle.style.fontSize = newFont + 'rem';
  main.style.paddingTop = newH + 'px';

  headerPhotos.forEach(img => {
    if(img.classList.contains('logo')) img.style.height = newLogoH + 'px';
    else img.style.height = newImgH + 'px';
  });
}

window.addEventListener('scroll', shrinkHeader);
window.addEventListener('resize', shrinkHeader);
shrinkHeader();
