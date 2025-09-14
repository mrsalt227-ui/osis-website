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
    const div = document.createElement("div");
    div.className="card small";
    div.innerHTML = `<strong>${p.title}</strong><br>${p.content}`;
    list.appendChild(div);
  });
}
function renderAnggota(){
  const list = document.getElementById("anggota-list");
  list.innerHTML = "";
  anggota.forEach((m)=> {
    const li = document.createElement("li");
    li.textContent = `${m.name} — ${m.role}`;
    list.appendChild(li);
  });
}

// Tahun footer
document.getElementById("yr").textContent = new Date().getFullYear();

// ========================
// Efek scroll header + teks + gambar
// ========================
const header = document.querySelector("header");
const headerTitle = header.querySelector("h1");
const headerPhotos = header.querySelectorAll(".header-photos img");
const logo = header.querySelector(".logo");

function shrinkHeaderOnScroll() {
  const scrollY = window.scrollY;
  const maxShrink = 100; // maksimal header menyusut 100px
  const newHeight = Math.max(120, 220 - scrollY); // minimal height 120px
  const newPadding = Math.max(8, 20 - scrollY / 10); // padding mengecil
  const newFont = Math.max(1.2, 2 - scrollY / 200); // font mengecil
  const newImgHeight = Math.max(60, 180 - scrollY / 2); // gambar samping mengecil
  const newLogoHeight = Math.max(40, 120 - scrollY / 2); // logo mengecil

  header.style.height = newHeight + "px";
  header.style.padding = newPadding + "px";
  headerTitle.style.fontSize = newFont + "rem";

  headerPhotos.forEach(img => {
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
