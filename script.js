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

const header = document.querySelector("header");
const headerTitle = header.querySelector("h1");
const headerPhotos = header.querySelectorAll(".header-photos img");
const main = document.querySelector("main");

function shrinkHeaderOnScroll(){
  const scrollY = window.scrollY;
  const minHeight = 120;
  const maxHeight = 220;
  const newHeight = Math.max(minHeight, maxHeight - scrollY);
  const newPadding = Math.max(8, 20 - scrollY / 10);
  const newFont = Math.max(1.2, 2 - scrollY / 200);
  const newImgHeight = Math.max(60, 180 - scrollY / 2);
  const newLogoHeight = Math.max(40, 120 - scrollY / 2);

  header.style.height = newHeight + "px";
  header.style.padding = newPadding + "px";
  headerTitle.style.fontSize = newFont + "rem";
  main.style.paddingTop = newHeight + "px"; // pastikan konten mulai di bawah header

  headerPhotos.forEach(img=>{
    if(img.classList.contains("logo")){
      img.style.height = newLogoHeight + "px";
    } else {
      img.style.height = newImgHeight + "px";
    }
  });
}

window.addEventListener("scroll", shrinkHeaderOnScroll);
window.addEventListener("resize", shrinkHeaderOnScroll);
shrinkHeaderOnScroll();
