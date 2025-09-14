const ADMIN_PASSWORD = "admin123";
let anggota = [];
let pengumuman = [];

// Toggle menu
function toggleMenu() {
  document.getElementById('main-nav').classList.toggle('active');
}

// Show Page
function showPage(id){
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');

  // Tutup menu hanya jika HP
  if(window.innerWidth <= 768){
    const nav = document.getElementById('main-nav');
    if(nav.classList.contains('active')) nav.classList.remove('active');
  }
}

// Admin login/logout
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

// Tambah pengumuman
document.getElementById('form-ann').addEventListener('submit', e=>{
  e.preventDefault();
  const title = document.getElementById('ann-title').value;
  const content = document.getElementById('ann-content').value;
  pengumuman.push({title, content});
  renderPengumuman();
  e.target.reset();
});

// Tambah anggota
document.getElementById('form-member').addEventListener('submit', e=>{
  e.preventDefault();
  const name = document.getElementById('mem-name').value;
  const role = document.getElementById('mem-role').value;
  anggota.push({name, role});
 
