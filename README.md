# LED Screen Rental Calculator

Web-based calculator untuk membantu menghitung kebutuhan **pixel resolution** dan **hardware LED screen rental** berdasarkan ukuran LED screen dan pixel pitch.

Program ini terdiri dari dua modul utama:

* **Pixel Calculator**
* **LED Screen Rental Hardware Calculator**

Dibuat menggunakan HTML, CSS, dan JavaScript tanpa backend.

---

## ✨ Features

### 1. Pixel Calculator

Pixel Calculator digunakan untuk menghitung kebutuhan resolusi LED screen berdasarkan:

* Source Resolution
* Target LED Resolution
* Aspect Ratio
* Mode tampilan

Mode yang tersedia:

* **Fit** — mempertahankan aspect ratio dan menyesuaikan gambar ke area target.
* **Fill** — mempertahankan aspect ratio dan melakukan crop pada bagian yang tidak diperlukan.
* **Stretch** — menyesuaikan gambar secara penuh ke target resolution.
* **Original** — menggunakan ukuran source resolution tanpa perubahan.

Calculator juga menyediakan:

* Hasil resolusi
* Informasi crop
* Preview
* Full text output
* Tombol **Copy**

---

# 2. LED Screen Rental Hardware Calculator

Hardware Calculator digunakan untuk memperkirakan kebutuhan hardware berdasarkan ukuran LED screen dalam meter.

Input yang tersedia:

* **Panjang LED**
* **Tinggi LED**
* **Pixel Pitch**

Pixel pitch yang tersedia:

* **P3.9**
* **P2.6**

Ukuran LED harus menggunakan kelipatan **0,5 meter**.

Contoh:

```text
4 × 3 m
4 × 3.5 m
10 × 3 m
10 × 4 m
```

---

## 📐 Perhitungan Resolusi LED

Resolusi otomatis dihitung berdasarkan pixel pitch.

| Pixel Pitch | Pixel per Meter |
| ----------- | --------------: |
| P3.9        |        256 px/m |
| P2.6        |        384 px/m |

Formula:

```text
Resolution Width  = Panjang × Pixel per Meter
Resolution Height = Tinggi × Pixel per Meter
```

### Contoh P3.9

LED:

```text
10 × 3 meter
```

Perhitungan:

```text
10 × 256 = 2560 px
3 × 256  = 768 px
```

Hasil:

```text
2560 × 768 px
```

### Contoh P2.6

LED:

```text
10 × 3 meter
```

Perhitungan:

```text
10 × 384 = 3840 px
3 × 384  = 1152 px
```

Hasil:

```text
3840 × 1152 px
```

---

# 🧱 Cabinet Calculation

Program menggunakan cabinet:

* Width: **500 mm**
* Height: **500 mm**
* Height: **1000 mm**

Cabinet tidak diputar/rotasi.

Sistem akan memprioritaskan penggunaan cabinet **500 × 1000 mm**, kemudian menggunakan cabinet **500 × 500 mm** untuk bagian yang tersisa.

Jumlah cabinet yang ditampilkan adalah **total cabinet**, bukan breakdown berdasarkan jenis cabinet.

### Contoh

LED:

```text
4 × 3.5 meter
```

Lebar:

```text
4 / 0.5 = 8 cabinet
```

Tinggi:

```text
1 m + 1 m + 1 m + 0.5 m
= 4 cabinet
```

Total:

```text
8 × 4 = 32 cabinet
```

Hasil:

```text
Total Cabinets: 32
```

---

# 🌐 LAN Runs

Perhitungan LAN menggunakan batas berdasarkan **total area**.

### P3.9

Maximum:

```text
10 m² per LAN run
```

Formula:

```text
LAN Runs = ceil(Total Area / 10)
```

### P2.6

Maximum:

```text
4 m² per LAN run
```

Formula:

```text
LAN Runs = ceil(Total Area / 4)
```

### Contoh

LED:

```text
4 × 3 m
```

Total area:

```text
12 m²
```

Untuk P3.9:

```text
ceil(12 / 10)
= 2 LAN Runs
```

---

# 🔌 Power Legran

Power Legran menggunakan batas berdasarkan total area.

Maximum:

```text
8 m² per Power Run
```

Formula:

```text
Power Legran Runs = ceil(Total Area / 8)
```

### Contoh

LED:

```text
4 × 3 m
```

Total area:

```text
12 m²
```

Maka:

```text
ceil(12 / 8)
= 2 Power Legran Runs
```

---

# 🔄 Loop Calculation

Program juga menghitung kebutuhan loop.

### Power Loop

```text
Power Loop = Total Cabinets - Power Legran Runs
```

### LAN Loop

```text
LAN Loop = Total Cabinets - LAN Runs
```

---

# 🏗️ Standing Bracket

Standing bracket dihitung berdasarkan:

* Panjang LED
* Tinggi LED
* Tinggi bracket: **1,5 meter**

Jumlah standing horizontal per level:

```text
Standing per Level = ceil(Panjang LED)
```

Jumlah level:

```text
Levels = max(1, floor(Tinggi LED / 1.5))
```

Contoh:

| Tinggi LED | Level |
| ---------- | ----: |
| 0.5–2.5 m  |     1 |
| 3–4 m      |     2 |
| 4.5–5.5 m  |     3 |
| 6–7 m      |     4 |
| 7.5–8.5 m  |     5 |

Total standing bracket:

```text
Total Standing = Standing per Level × Number of Levels
```

Program hanya menampilkan **total standing bracket**.

---

# 🔩 Klem & Baut

Setiap standing bracket menggunakan:

```text
1 Klem
```

Untuk baut:

### Bottom Level

Setiap stand menggunakan:

```text
4 baut
```

### Level di atasnya

Setiap stand menggunakan:

```text
2 baut
```

Sehingga:

```text
Klem = Total Standing
```

dan:

```text
Baut =
(Bottom Stand × 4)
+
(Upper Stand × 2)
```

Program menampilkan hasil akhir:

* Klem
* Baut

tanpa menampilkan breakdown bottom/upper level.

---

# 📦 Box LED

Program menghitung kebutuhan box LED berdasarkan luas area.

Setiap box dihitung berdasarkan:

```text
3 m²
```

Formula:

```text
Jumlah Box = ceil(Total Area / 3)
```

Contoh:

```text
LED = 10 × 3 m
Area = 30 m²
```

Maka:

```text
ceil(30 / 3)
= 10 box
```

---

# 📊 Hardware Calculator Output

Setelah ukuran LED dimasukkan, program menampilkan:

* Total Area
* Jumlah Box LED
* Resolusi LED
* Total Cabinets
* LAN Runs
* LAN Loop
* Power Legran Runs
* Power Loop
* Standing Bracket
* Klem
* Baut

Tersedia juga bagian:

**Ringkasan Parameter Hardware**

yang dapat disalin menggunakan tombol:

**Salin Teks**

---

# 🧮 Contoh Perhitungan

## Example 1 — P3.9

Input:

```text
Panjang : 10 m
Tinggi  : 3 m
Pitch   : P3.9
```

Hasil utama:

```text
Total Area       : 30 m²
Jumlah Box LED   : 10 box
Resolusi LED     : 2560 × 768 px
Total Cabinets   : 60 cabinet
LAN Runs         : 3 run
LAN Loop         : 57 loop
Power Legran     : 4 run
Power Loop       : 56 loop
Standing Bracket : 30 stand
Klem             : 30 klem
Baut             : 120 baut
```

---

## Example 2 — P2.6

Input:

```text
Panjang : 10 m
Tinggi  : 3 m
Pitch   : P2.6
```

Resolusi:

```text
3840 × 1152 px
```

Perhitungan LAN menggunakan batas:

```text
4 m² per LAN run
```

Sehingga:

```text
30 / 4 = 7.5
ceil(7.5) = 8 LAN Runs
```

---

# 🖥️ User Interface

Program menggunakan tampilan dark theme dengan dua module selector:

```text
Pixel Calculator
Hardware Calculator
```

Module dapat digunakan secara terpisah tanpa menggantikan fungsi calculator lainnya.

---

# 🛠️ Technology

Project ini dibuat menggunakan:

* HTML5
* CSS3
* JavaScript
* Tailwind CSS CDN

Tidak membutuhkan:

* Database
* Backend
* Server-side processing
* API

Semua kalkulasi dilakukan langsung di browser.

---

# 📁 Project Structure

```text
led-screen-rental-calculator/
│
├── index.html
│
├── css/
│   └── style.css
│
└── js/
    └── app.js
```

---

# 🚀 How to Run

Karena project ini merupakan aplikasi frontend sederhana, project dapat dijalankan langsung melalui browser.

### Cara 1 — Open langsung

Buka:

```text
index.html
```

menggunakan browser.

### Cara 2 — Local Server

Jika menggunakan VS Code, project dapat dijalankan menggunakan extension seperti **Live Server**.

Kemudian buka project melalui browser.

---

# 📌 Input Rules

Hardware Calculator menggunakan aturan berikut:

* Panjang LED menggunakan kelipatan 0,5 meter.
* Tinggi LED menggunakan kelipatan 0,5 meter.
* Pixel pitch hanya tersedia P3.9 dan P2.6.
* Cabinet width adalah 500 mm.
* Cabinet tidak menggunakan rotasi.
* Cabinet 500 × 1000 mm diprioritaskan sebelum cabinet 500 × 500 mm.
* Perhitungan LAN berdasarkan luas area.
* Perhitungan Power Legran berdasarkan luas area.
* Perhitungan Box LED berdasarkan 3 m² per box.

---

# 📋 Summary

Program ini dirancang sebagai tool praktis untuk membantu estimasi kebutuhan LED screen rental, mulai dari:

```text
Ukuran LED
     ↓
Total Area
     ↓
Resolusi LED
     ↓
Jumlah Cabinet
     ↓
Box LED
     ↓
LAN Runs & Loop
     ↓
Power Runs & Loop
     ↓
Standing Bracket
     ↓
Klem & Baut
```

Dengan dua calculator dalam satu aplikasi, program dapat digunakan untuk kebutuhan **perhitungan resolusi LED** maupun **estimasi hardware LED screen rental** secara cepat langsung dari browser.

---

## 📄 License

Tambahkan license sesuai kebutuhan project Anda.

Contoh:

```text
MIT License
```

Jika repository ini digunakan untuk kebutuhan komersial, pastikan license dan hak penggunaan source code sudah disesuaikan dengan kebutuhan project.
