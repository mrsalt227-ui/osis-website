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
