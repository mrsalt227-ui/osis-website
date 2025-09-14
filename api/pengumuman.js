import fs from 'fs';
import path from 'path';

const ADMIN_PASSWORD = "admin123";

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), 'pengumuman.json');

  if (req.method === 'GET') {
    // Fetch pengumuman
    fs.readFile(filePath, 'utf8', (err, data) => {
      if(err) return res.status(500).json({ error: 'Gagal load data' });
      res.status(200).json(JSON.parse(data));
    });
  } else if (req.method === 'POST') {
    // Tambah pengumuman
    const { title, content, password } = req.body;
    if(password !== ADMIN_PASSWORD) return res.status(401).json({ error: 'Password salah' });
    if(!title || !content) return res.status(400).json({ error: 'Title & content required' });

    fs.readFile(filePath, 'utf8', (err, data) => {
      if(err) return res.status(500).json({ error: 'Gagal load data' });
      const json = JSON.parse(data);
      json.unshift({ title, content });
      fs.writeFile(filePath, JSON.stringify(json, null, 2), err => {
        if(err) return res.status(500).json({ error: 'Gagal simpan data' });
        res.status(200).json({ success: true });
      });
    });
  } else {
    res.setHeader('Allow', ['GET','POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
