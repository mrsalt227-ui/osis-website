const ADMIN_PASSWORD = "admin123";
let anggota = [];
let pengumuman = [];

// Toggle menu responsive
function toggleMenu(){
  document.getElementById('main-nav').classList.toggle('active');
}

// Navigasi antar halaman
function showPage(id){
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
  setTimeout(()=>{ document.getElementById(id).classList.add("active"); },50);
}

// Login admin
function loginAdmin(){
  const pass = document.getElementById("admin-pass").value;
  if(pass === ADMIN_PASSWORD){
    document.getElementById("login-box").style.display="none";
    document.getElementById("admin-panel").style.display="block";
  } else {
    alert("Password salah!");
  }
}

// Logout admin
function logoutAdmin(){
  document.getElementById("login-box").style.display="block";
  document.getElementById("admin-panel").style.display="none";
}

// Tambah pengumuman
document.getElementById("form-ann").addEventListener("submit", e=>{
  e.preventDefault();
  const title = document.getElementById("ann-title").value;
  const content = document.getElementById("ann-content").value;
  pengumuman.push({title,content});
  renderPengumuman();
  e.target.reset();
});

// Tambah anggota
document.getElementById("form-member").addEventListener("submit", e=>{
  e.preventDefault();
  const name = document.getElementById("mem-name").value;
  const role = document.getElementById("mem-role").value;
  anggota.push({name,role});
  renderAnggota();
  e.target.reset();
});

// Render daftar
function renderPengumuman(){
  const list = document.getElementById("pengumuman-list");
  list.innerHTML = "";
  pengumuman.forEach((p)=> {
    const div =
