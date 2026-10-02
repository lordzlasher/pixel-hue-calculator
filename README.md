# 🎯 LED Screen Rental Calculator

Web-based calculator untuk membantu kebutuhan **LED screen rental**, mulai dari perhitungan resolusi LED, kebutuhan hardware, konsumsi daya & genset, hingga kebutuhan komponen stage/riser.

Aplikasi berjalan langsung di browser menggunakan **HTML, CSS, dan JavaScript** tanpa backend atau database.

---

## ✨ Features

### 🖥️ 1. Pixel Calculator

Digunakan untuk menghitung dan menyesuaikan resolusi LED berdasarkan source resolution dan target resolution.

**Mode:**

* 🔲 **Fit**
* 🖼️ **Fill**
* ↔️ **Stretch**
* 🎯 **Original**

**Fitur:**

* 📐 Perhitungan resolusi
* ✂️ Crop calculation
* 👁️ Live preview
* 📋 Copy hasil perhitungan

---

### 🧰 2. LED Screen Rental Hardware Calculator

Menghitung kebutuhan hardware LED screen berdasarkan ukuran dan pixel pitch.

#### 📏 Pixel Pitch

* 🔵 **P3.9**
* 🟢 **P2.6**

#### 🧱 Cabinet

Ukuran cabinet:

* 📦 500 × 500 mm
* 📦 500 × 1000 mm

Sistem otomatis memprioritaskan penggunaan **500 × 1000 mm**, kemudian menggunakan 500 × 500 mm untuk bagian yang tersisa.

#### 📊 Perhitungan

* 📐 Total Area
* 🖥️ Resolusi LED
* 📦 Jumlah Box LED
* 🧱 Total Cabinet
* 🌐 LAN Runs
* 🔄 LAN Loop
* ⚡ Power Legran Runs
* 🔄 Power Loop
* 🏗️ Standing Bracket
* 🔩 Klem
* 🔧 Baut

#### 🖥️ Resolusi LED

| Pixel Pitch | Resolusi per Meter |
| ----------- | -----------------: |
| 🔵 P3.9     |           256 px/m |
| 🟢 P2.6     |           384 px/m |

#### 📦 Box LED

```text
1 Box = 3 m²
```

---

### ⚡ 3. LED Power & Genset Calculator

Menghitung kebutuhan **daya maksimal LED** dan estimasi kapasitas genset.

#### 📐 Input

User dapat memasukkan:

* 📏 Panjang × tinggi LED
* 📐 Total luas LED

#### 🖥️ Jenis LED

* 🔵 Qiangli Saga P3.9
* 🔵 Qiangli New Lite P3.9
* 🟢 Qiangli Saga P2.6
* 🟢 Qiangli New Lite P2.6
* 🟠 Lampro Maven P3.9
* 🟠 Lampro LRS P2.6

Perhitungan cabinet menggunakan sistem yang sama dengan Hardware Calculator dengan prioritas **500 × 1000 mm**.

#### 🔌 Power Factor

```text
PF = 0.8
```

Formula:

```text
kVA = Watt / (1000 × 0.8)
```

#### 🛡️ Safety Margin

```text
Safety Margin = 20%
```

Kebutuhan genset:

```text
Genset kVA = kVA × 1.20
```

Untuk LED yang memiliki range konsumsi daya, perhitungan menggunakan **nilai daya maksimum**.

---

### 🏗️ 4. Stage / Riser Calculator

Digunakan untuk menghitung kebutuhan komponen **stage/riser** berdasarkan jumlah Stage Module.

User hanya memasukkan:

> **Jumlah Stage Module**

Tidak diperlukan input panjang dan lebar karena riser selalu disusun **memanjang secara horizontal** dengan lebar tetap 122 cm.

#### 📐 Ukuran Stage Module

Setiap Stage Module berukuran:

```text
122 × 122 cm
```

Ukuran riser otomatis:

```text
Panjang = Jumlah Module × 122 cm
Lebar   = 122 cm
```

Contoh ukuran:

```text
1 Module → 122 × 122 cm
2 Module → 244 × 122 cm
3 Module → 366 × 122 cm
4 Module → 488 × 122 cm
```

#### 🧩 Komponen

Modul menghitung:

* 🟫 Dek Panggung (**Stage Module**)
* 🔩 Palang Samping (**Stage Brace**)
* 🦵 Kaki Panggung (**Stage Stand**)
* ⚙️ Tatakan Dasar (**Adjustable Base**)

#### 🧮 Formula

**Stage Module**

```text
Stage Module = Jumlah Module
```

**Stage Brace**

```text
Stage Brace = (Jumlah Module × 3) + 1
```

**Stage Stand**

```text
Stage Stand = (Jumlah Module × 2) + 2
```

**Adjustable Base**

```text
Adjustable Base = Stage Stand
```

#### 👁️ Live Preview

Stage/Riser Calculator dilengkapi **live preview** yang berubah secara realtime berdasarkan jumlah module.

Preview menampilkan secara visual:

* 🟫 Dek panggung
* 🔩 Palang/rangka
* 🦵 Kaki panggung
* ⚙️ Adjustable base
* 📏 Label ukuran
* 🏷️ Nama komponen dalam Bahasa Indonesia dan English

Preview akan menyesuaikan skala secara otomatis agar tetap terlihat rapi ketika jumlah module bertambah.

#### 🖼️ Stage Reference

Modul juga menyediakan **gambar referensi stage/riser** sebagai gambaran visual bentuk stage yang digunakan.

> ℹ️ Live preview merupakan visualisasi konseptual dan bukan gambar teknis konstruksi.

---

## 📊 LED Power Specification

| LED Screen               | 500 × 500 mm | 500 × 1000 mm | Maximum Load |
| ------------------------ | -----------: | ------------: | -----------: |
| 🔵 Qiangli Saga P3.9     |        180 W |         360 W |     720 W/m² |
| 🔵 Qiangli New Lite P3.9 |        180 W |         360 W |     720 W/m² |
| 🟢 Qiangli Saga P2.6     |        144 W |         288 W |     576 W/m² |
| 🟢 Qiangli New Lite P2.6 |        144 W |         288 W |     576 W/m² |
| 🟠 Lampro Maven P3.9     |    150–157 W |     300–315 W |     630 W/m² |
| 🟠 Lampro LRS P2.6       |    130–140 W |     260–280 W |     560 W/m² |

Untuk perhitungan **maximum power**, sistem menggunakan nilai tertinggi dari setiap range.

---

## 🧮 Hardware Calculation Rules

### 🌐 LAN

**P3.9**

```text
LAN Runs = ceil(Total Area / 10)
```

**P2.6**

```text
LAN Runs = ceil(Total Area / 4)
```

### ⚡ Power Legran

```text
Power Runs = ceil(Total Area / 8)
```

### 🔄 Loop

```text
LAN Loop = Total Cabinets - LAN Runs

Power Loop = Total Cabinets - Power Runs
```

### 🏗️ Standing Bracket

Standing bracket menggunakan tinggi **1,5 meter per level**.

Jumlah level dihitung berdasarkan tinggi LED dan jumlah standing horizontal berdasarkan panjang LED.

### 🔩 Klem & Baut

Setiap standing bracket menggunakan:

```text
1 Klem
```

Baut:

* 🔩 Bottom level → 4 baut per stand
* 🔩 Level di atasnya → 2 baut per stand

---

## 📁 Project Structure

```text
led-screen-rental-calculator/
│
├── 📄 index.html
│
├── 📂 css/
│   └── 🎨 style.css
│
├── 📂 js/
│   └── ⚙️ app.js
│
└── 📂 assets/
    └── 🖼️ stage-reference.png
```

---

## 🛠️ Technology

* 🌐 HTML5
* 🎨 CSS3
* ⚙️ JavaScript
* 💨 Tailwind CSS CDN

Tidak membutuhkan:

* 🗄️ Database
* 🔌 Backend
* 🌐 API

Semua kalkulasi dilakukan langsung di browser.

---

## 🚀 How to Run

Buka:

```text
index.html
```

langsung menggunakan browser.

Atau gunakan local development server seperti **Live Server** pada VS Code.

---

## 🧩 Modules

Aplikasi saat ini memiliki **4 modul utama**:

```text
🖥️ Pixel Calculator
        │
        ├── 📐 Resolution
        ├── ✂️ Crop
        └── 👁️ Preview

🧰 Hardware Calculator
        │
        ├── 🧱 Cabinet
        ├── 🌐 LAN
        ├── ⚡ Power
        ├── 🏗️ Standing
        └── 🔩 Accessories

⚡ Power & Genset Calculator
        │
        ├── 📐 Total Area
        ├── ⚡ Maximum Power
        ├── 🔌 kVA
        └── 🛡️ Genset + 20% Safety Margin

🏗️ Stage / Riser Calculator
        │
        ├── 🟫 Stage Module
        ├── 🔩 Stage Brace
        ├── 🦵 Stage Stand
        ├── ⚙️ Adjustable Base
        └── 👁️ Live Preview
```

---

## 📋 Summary

**LED Screen Rental Calculator** menyediakan satu aplikasi untuk membantu kebutuhan:

* 🖥️ **Pixel & Resolution Calculation**
* 🧰 **LED Rental Hardware Calculation**
* ⚡ **Power Consumption Calculation**
* 🔌 **Genset Capacity Estimation**
* 🏗️ **Stage / Riser Calculation**

Semua perhitungan dilakukan langsung di browser tanpa membutuhkan backend.

---

## 📄 License

Tambahkan license sesuai kebutuhan repository dan penggunaan project.
