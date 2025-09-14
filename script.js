document.addEventListener('DOMContentLoaded', function() {
  // ===================
  // DATA & LOCAL STORAGE
  // ===================
  const ADMIN_PASSWORD = "admin123";
  let anggota = JSON.parse(localStorage.getItem('anggota')) || [];
  let pengumuman = JSON.parse(localStorage.getItem('pengumuman')) || [];

  const main = document.querySelector('main');
  const header = document.querySelector('header');
  const headerTitle = header.querySelector('h1');
  const headerPhotos = header.querySelectorAll('.header-photos img');

  // ===================
  // MENU & NAV
  // ===================
  window.toggleMenu = function() {
    document.getElementById('main-nav').classList.toggle('active');
  }

  window.showPage = function(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    if(window.innerWidth <= 768){
      const nav = document.getElementById('main-nav');
      if(nav.classList.contains('active')) nav.classList.remove('active');
    }
  }

  // ===================
  // ADMIN LOGIN / LOGOUT
  // ===================
  window.loginAdmin = function() {
    const pass = document.getElementById('admin-pass').value;
    if(pass === ADMIN_PASSWORD){
      document.getElementById('login-box').style.display='none';
      document.getElementById('admin-panel').style.display='block';
    } else alert('Password salah!');
  }

  window.logoutAdmin = function() {
    document.getElementById('login-box').style.display='block';
    document.getElementById('admin-panel').style.display='none';
  }

  // ===================
  // TAMBAH PENGUMUMAN & ANGGOTA
  // ===================
  document.getElementById('form-ann').addEventListener('submit', e=>{
    e.preventDefault();
    const title = document.getElementById('ann-title').value;
    const content = document.getElementById('ann-content').value;
    pengumuman.push({title, content});
    localStorage.setItem('pengumuman', JSON.stringify(pengumuman));
    renderPengumuman();
    e.target.reset();
  });

  document.getElementById('form-member').addEventListener('submit', e=>{
    e.preventDefault();
    const name = document.getElementById('mem-name').value;
    const role = document.getElementById('mem-role').value;
    anggota.push({name, role});
    localStorage.setItem('anggota', JSON.stringify(anggota));
    renderAnggota();
    e.target.reset();
  });

  // ===================
  // RENDER PENGUMUMAN & ANGGOTA
  // ===================
  function renderPengumuman() {
    const list = document.getElementById('pengumuman-list');
    if(!list) return; // safety
    list.innerHTML = '';
    pengumuman.forEach(p=>{
      const div = document.createElement('div');
      div.className = 'card small';
      div.innerHTML = `<strong>${p.title}</strong><br>${p.content}`;
      list.appendChild(div);
    });
  }

  function renderAnggota() {
    const list = document.getElementById('anggota-list');
    if(!list) return;
    list.innerHTML='';
    anggota.forEach(m=>{
      const li = document.createElement('li');
      li.textContent=`${m.name} — ${m.role}`;
      list.appendChild(li);
    });
  }

  // ===================
  // FOOTER TAHUN
  // ===================
  const yrEl = document.getElementById('yr');
  if(yrEl) yrEl.textContent = new Date().getFullYear();

  // ===================
  // HEADER SHRINK
  // ===================
  function shrinkHeaderOnScroll() {
    const scrollY = window.scrollY;
    const minHeight = 120;
    const maxHeight = 220;
    const newHeight = Math.max(minHeight, maxHeight - scrollY);
    const newPadding = Math.max(8, 20 - scrollY / 10);
    const newFont = Math.max(1.2, 2 - scrollY / 200);
    const newImgHeight = Math.max(60, 180 - scrollY / 2);
    const newLogoHeight = Math.max(40, 120 - scrollY / 2);

    header.style.height = newHeight+'px';
    header.style.padding = newPadding+'px';
    headerTitle.style.fontSize = newFont+'rem';
    main.style.marginTop = newHeight+'px';

    headerPhotos.forEach(img=>{
      if(img.classList.contains('logo')) img.style.height = newLogoHeight+'px';
      else img.style.height = newImgHeight+'px';
    });
  }

  window.addEventListener('scroll', shrinkHeaderOnScroll);
  window.addEventListener('resize', shrinkHeaderOnScroll);
  shrinkHeaderOnScroll();

  // ===================
  // INITIAL RENDER
  // ===================
  renderPengumuman();
  renderAnggota();
});
