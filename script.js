// ===================
// Data dan admin
// ===================
const ADMIN_PASSWORD = "admin123";
let anggota = [];
let pengumuman = [];

// ===================
// Menu dan navigasi
// ===================
function toggleMenu(){
  document.getElementById('main-nav').classList.toggle('active');
}

function showPage(id){
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  setTimeout(()=>{ document.getElementById(id).classList.add("active"); },50);
}

// ===================
// Login / Logout Admin
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
// Tambah pengumuman
// ===================
document.getElementById("form-ann").addEventListener("submit", e => {
  e.preventDefault();
  const title = document.getElementById("ann-title").value;
  const content = document.getElementById("ann-content").value;
  pengumuman.push({title, content});
  renderPengumuman();
  e.target.reset();
});

// ===================
// Tambah anggota
// ===================
document.getElementById("form-member").addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("mem-name").value;
  const role = document.getElementById("mem-role").value;
  anggota.push({name, role});
  renderAnggota();
  e.target.reset();
});

// ===================
// Render daftar
// ===================
function renderPengumuman(){
  const list = document.getElementById("pengumuman-list");
  list.innerHTML = "";
  pengumuman.forEach((p) => {
    const div = document.createElement("div");
    div.className = "card small";
    div.innerHTML = `<strong>${p.title}</strong><br>${p.content}`;
    list.appendChild(div);
  });
}

function renderAnggota(){
  const list = document.getElementById("anggota-list");
  list.innerHTML = "";
  anggota.forEach((m) => {
    const li = document.createElement("li");
    li.textContent = `${m.name} — ${m.role}`;
    list.appendChild(li);
  });
}

// ===================
// Header shrink saat scroll
// ===================
const header = document.querySelector("header");
const headerTitle = header.querySelector("h1");
const headerPhotos = header.querySelectorAll(".header-photos img");
const main = document.querySelector("main");

function shrinkHeaderOnScroll() {
  const scrollY = window.scrollY;

  // Header default
  const defaultHeight = 220;
  const minHeight = 120;
  const defaultPadding = 20;
  const minPadding = 8;
  const defaultFont = 2; // rem
  const minFont = 1.2;

  // Hitung nilai baru berdasarkan scroll
  const newHeight = Math.max(minHeight, defaultHeight - scrollY);
  const newPadding = Math.max(minPadding, defaultPadding - scrollY / 10);
  const newFont = Math.max(minFont, defaultFont - scrollY / 200);
  const newImgHeight = Math.max(60, 180 - scrollY / 2);
  const newLogoHeight = Math.max(40, 120 - scrollY / 2);

  // Terapkan ke header dan anak-anak
  header.style.height = newHeight + "px";
  header.style.padding = newPadding + "px";
  headerTitle.style.fontSize = newFont + "rem";

  headerPhotos.forEach(img => {
    if (img.classList.contains("logo")) {
      img.style.height = newLogoHeight + "px";
    } else {
      img.style.height = newImgHeight + "px";
    }
  });

  // Pastikan main content selalu di bawah header
  main.style.marginTop = newHeight + "px";
}

window.addEventListener("scroll", shrinkHeaderOnScroll);
window.addEventListener("resize", shrinkHeaderOnScroll);
shrinkHeaderOnScroll();


// ===================
// Footer tahun otomatis
// ===================
document.getElementById("yr").textContent = new Date().getFullYear();
