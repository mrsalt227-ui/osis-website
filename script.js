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

function updateHeaderScale() {
  const scrollY = window.scrollY;
  const isMobile = window.innerWidth <= 768;
  const minScale = isMobile ? 0.8 : 0.7; // batas minimal
  const scale = Math.max(minScale, 1 - scrollY / 500);

  header.style.transform = `scale(${scale})`;
  headerTitle.style.transform = `scale(${scale})`;
  headerPhotos.forEach(img => {
    img.style.transform = `scale(${scale})`;
  });
}

window.addEventListener("scroll", updateHeaderScale);
window.addEventListener("resize", updateHeaderScale);
updateHeaderScale();
