// ===== Data & Admin =====
const ADMIN_PASSWORD = "admin123";
let anggota = [];
let pengumuman = [];

// ===== Menu Toggle =====
function toggleMenu() {
  document.getElementById('main-nav').classList.toggle('active');
}

// ===== Show Page =====
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// ===== Admin Login/Logout =====
function loginAdmin() {
  const pass = document.getElementById('admin-pass').value;
  if(pass === ADMIN_PASSWORD){
    document.getElementById('login-box').style.display='none';
    document.getElementById('admin-panel').style.display='block';
  } else alert('Password salah!');
}

function logoutAdmin() {
  document.getElementById('login-box').style.display='block';
  document.getElementById('admin-panel').style.display='none';
}

// ===== Tambah Data =====
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
  const role =
