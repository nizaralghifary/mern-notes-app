## Simple Notes App with MERN
Ini adalah aplikasi catatan sederhana yang dibuat dengan MERN (MongoDB, Express, React, Node)

**Live Link**

https://notes-app.nizaralghifary.my.id/

## Instalation

**Clone Repository**
```bash
git clone https://github.com/nizaralghifary/mern-notes-app.git
cd mern-notes-app
```

**Install Library**
```bash
cd frontend
npm i
```
```bash
cd backend
npm i
```

**Set Up Environment Variable**

Buka terminal lalu jalankan kode
```bash
 console.log(require('crypto').randomBytes(32).toString('hex'))
```

Buat file `.env` di folder backend, lalu copy hasil dari kode diatas ke file `.env`
```env
ACCESS_TOKEN_SECRET =
```

**MongoDB URI**

Ubah file `config.json` di folder backend dengan mongodb_uri kamu

**Run Program**

Di frontend jalankan
```bash
npm run dev
```

Di backend dengan folder api jalankan
```bash
nodemon index.js
```
