// ===================
// Data dan admin
// ===================
const ADMIN_PASSWORD = "admin123";
let anggota = [];
let pengumuman = [];

// ===================
// Menu & navigasi
// ===================
function toggleMenu(){
  document.getElementById('main-nav').classList.toggle('active');
}

function showPage(id){
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  setTimeout(()=>{ document.getElementById(id).classList.add("active"); },50);
}

// ===================
// Admin login/logout
// ===================
function loginAdmin(){
  const pass = document.getElementById("admin-pass").value;
  if(pass === ADMIN_PASSWORD){
    document.getElementById("login-box").style.display="none";
    document.getElementById("admin-panel").style.display="block";
  } else {
    alert("Password salah!");
  }
}

function logoutAdmin(){
  document.getElementById("login-box").style.display="block";
  document.getElementById("admin-panel").style.display="none";
}

// ===================
// Tambah anggota & pengumuman
// ===================
document.getElementById("form-ann").addEventListener("submit", e => {
  e.preventDefault();
  const title = document.getElementById("ann-title").value;
  const content = document.getElementById("ann-content").value;
  pengumuman.push({title, content});
  renderPengumuman();
  e.target.reset();
});

document.getElementById("form-member").addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("mem-name").value;
  const role = document.getElementById("mem-role").value;
  anggota.push({name, role});
  renderAnggota();
  e.target.reset();
});

function renderPengumuman(){
  const list = document.getElementById("pengumuman-list");
  list.innerHTML = "";
  pengumuman.forEach(p => {
    const div = document.createElement("div");
    div.className = "card small";
    div.innerHTML = `<strong>${p.title}</strong><br>${p.content}`;
    list.appendChild(div);
  });
}

function renderAnggota(){
  const list = document.getElementById("anggota-list");
  list.innerHTML = "";
  anggota.forEach(m => {
    const li = document.createElement("li");
    li.textContent = `${m.name} — ${m.role}`;
    list.appendChild(li);
  });
}

// ===================
// Header shrink smooth
// ===================
const header = document.querySelector("header");
const headerTitle = header.querySelector("h1");
const headerPhotos = header.querySelectorAll(".header-photos img");
const main = document.querySelector("main");

function shrinkHeaderOnScroll() {
  const scrollY = window.scrollY;
  const minPadding = 8;
  const minFont = 1.2;
  const minImg = 60;
  const minLogo = 40;

  header.style.padding = Math.max(minPadding, 20 - scrollY / 10) + "px";
  headerTitle.style.fontSize = Math.max(minFont, 2 - scrollY / 200) + "rem";

  headerPhotos.forEach(img => {
    if(img.classList.contains("logo")){
      img.style.height = Math.max(minLogo, 120 - scrollY / 2) + "px";
    } else {
      img.style.height = Math.max(minImg, 180 - scrollY / 2) + "px";
    }
  });
}

window.addEventListener("scroll", shrinkHeaderOnScroll);
window.addEventListener("resize", shrinkHeaderOnScroll);
shrinkHeaderOnScroll();

// ===================
// Footer tahun otomatis
// ===================
document.getElementById("yr").textContent = new Date().getFullYear();
