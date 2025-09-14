const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// Endpoint untuk fetch pengumuman
app.get('/api/pengumuman', (req, res) => {
  const filePath = path.join(__dirname, 'pengumuman.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if(err) return res.status(500).send({ error: 'Gagal load data' });
    res.send(JSON.parse(data));
  });
});

// Endpoint untuk admin tambah pengumuman
app.post('/api/pengumuman', (req, res) => {
  const { title, content, password } = req.body;
  const ADMIN_PASSWORD = "admin123";

  if(password !== ADMIN_PASSWORD) return res.status(401).send({ error: 'Password salah' });
  if(!title || !content) return res.status(400).send({ error: 'Title & content required' });

  const filePath = path.join(__dirname, 'pengumuman.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if(err) return res.status(500).send({ error: 'Gagal load data' });
    const json = JSON.parse(data);
    json.unshift({ title, content }); // tambah di awal
    fs.writeFile(filePath, JSON.stringify(json, null, 2), err => {
      if(err) return res.status(500).send({ error: 'Gagal simpan data' });
      res.send({ success: true });
    });
  });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
