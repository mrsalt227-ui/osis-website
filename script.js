// ===============
// Admin & Data
// ===============
const ADMIN_PASSWORD = "admin123";
let anggota = [];
let pengumuman = [];

// ===============
// Menu Toggle
// ===============
function toggleMenu() {
  document.getElementById('main-nav').classList.toggle('active');
}

function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// ===============
// Admin Login/Logout
// ===============
function loginAdmin() {
  const pass = document.getElementById('admin-pass').value;
  if(pass === ADMIN_PASSWORD){
    document.getElementById('login-box').style.display='none';
    document.getElementById('admin-panel').style.display='block';
  } else {
    alert('Password salah!');
  }
}

function logoutAdmin() {
  document.getElementById('login-box').style.display='block';
  document.getElementById('admin-panel').style.display='none';
}

// ===============
// Tambah Data
// ===============
document.getElementById('form-ann').addEventListener('submit', e=>{
  e.preventDefault();
  const title = document.getElementById('ann-title').value;
  const content = document.getElementById('ann-content').value;
  pengumuman.push({title, content});
  renderPengumuman();
  e.target.reset();
});

document.getElementById('form-member').addEventListener('submit', e=>{
  e.preventDefault();
  const name = document.getElementById('mem-name').value;
  const role = document.getElementById('mem-role').value;
  anggota.push({name, role});
  renderAnggota();
  e.target.reset();
});

function renderPengumuman() {
  const list = document.getElementById('pengumuman-list');
  list.innerHTML = '';
  pengumuman.forEach(p=>{
    const div = document.createElement('div');
    div.className='card small';
    div.innerHTML = `<strong>${p.title}</strong><br>${p.content}`;
    list.appendChild(div);
  });
}

function renderAnggota() {
  const list = document.getElementById('anggota-list');
  list.innerHTML='';
  anggota.forEach(m=>{
    const li=document.createElement('li');
    li.textContent=`${m.name} — ${m.role}`;
    list.appendChild(li);
  });
}

// ===============
// Header shrink smooth
// ===============
const header = document.querySelector('header');
const headerTitle = header.querySelector('h1');
const headerPhotos = header.querySelectorAll('.header-photos img');
const main = document.querySelector('main');

function shrinkHeaderOnScroll() {
  const scrollY = window.scrollY;
  header.style.padding = Math.max(8, 
