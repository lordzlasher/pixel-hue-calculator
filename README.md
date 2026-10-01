# 🎯 LED Screen Rental Calculator

Web-based calculator untuk membantu kebutuhan **LED screen rental**, mulai dari perhitungan pixel resolution, kebutuhan hardware, hingga kebutuhan daya dan genset.

Aplikasi berjalan sepenuhnya di browser menggunakan **HTML, CSS, dan JavaScript**.

---

## ✨ Features

### 🖥️ 1. Pixel Calculator

Digunakan untuk menghitung dan menyesuaikan resolusi LED berdasarkan source resolution dan target resolution.

**Mode yang tersedia:**

* 🔲 **Fit**
* 🖼️ **Fill**
* ↔️ **Stretch**
* 🎯 **Original**

**Fitur tambahan:**

* ✂️ Perhitungan crop
* 👁️ Live preview
* 📐 Hasil resolusi
* 📋 Copy hasil perhitungan

---

### 🧰 2. LED Screen Rental Hardware Calculator

Menghitung kebutuhan hardware berdasarkan ukuran LED screen dan pixel pitch.

#### 📏 Pixel Pitch

* 🔹 **P3.9**
* 🔹 **P2.6**

#### 🧱 Cabinet

Sistem menggunakan dua ukuran cabinet:

* 📦 500 × 500 mm
* 📦 500 × 1000 mm

Komposisi cabinet dihitung otomatis dengan memprioritaskan **500 × 1000 mm**, kemudian menggunakan 500 × 500 mm untuk bagian yang tersisa.

#### 📊 Perhitungan Hardware

Modul menghitung:

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

Setiap box LED dihitung berdasarkan:

```text
1 Box = 3 m²
```

---

### ⚡ 3. LED Power & Genset Calculator

Digunakan untuk menghitung kebutuhan **daya maksimal LED** dan estimasi kapasitas **genset**.

#### 📐 Input Ukuran

Input dapat dilakukan melalui:

* 📏 Panjang × tinggi LED
* 📐 Total luas LED

#### 🖥️ Jenis LED

Pilihan LED yang tersedia:

* 🔵 Qiangli Saga P3.9
* 🔵 Qiangli New Lite P3.9
* 🟢 Qiangli Saga P2.6
* 🟢 Qiangli New Lite P2.6
* 🟠 Lampro Maven P3.9
* 🟠 Lampro LRS P2.6

Perhitungan cabinet menggunakan sistem yang sama dengan Hardware Calculator, yaitu memprioritaskan **500 × 1000 mm**.

---

## ⚡ Power Calculation

Perhitungan daya menggunakan **maximum power** dari masing-masing jenis LED.

Untuk LED dengan rentang konsumsi daya, sistem menggunakan nilai tertinggi.

### 🔌 Power Factor

Konversi Watt ke kVA menggunakan:

```text
PF = 0.8
```

Formula:

```text
kVA = Watt / (1000 × 0.8)
```

### 🛡️ Safety Margin

Setelah mendapatkan kebutuhan kVA, sistem menambahkan:

```text
Safety Margin = 20%
```

Formula kebutuhan genset:

```text
Genset kVA = kVA × 1.20
```

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

> ⚠️ Untuk perhitungan **maximum power**, sistem menggunakan nilai tertinggi dari setiap range.

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

* 🔩 Bottom level: 4 baut per stand
* 🔩 Level di atasnya: 2 baut per stand

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
└── 📂 js/
    └── ⚙️ app.js
```

---

## 🛠️ Technology

* 🌐 HTML5
* 🎨 CSS3
* ⚙️ JavaScript
* 💨 Tailwind CSS CDN

Tidak membutuhkan backend atau database.

---

## 🚀 How to Run

Buka file:

```text
index.html
```

langsung menggunakan browser.

Atau gunakan local development server seperti **Live Server** pada VS Code.

---

## 🧩 Modules

Aplikasi memiliki tiga modul utama:

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
```

---

## 📋 Summary

**LED Screen Rental Calculator** menyediakan satu aplikasi untuk membantu kebutuhan:

* 🖥️ **Pixel & Resolution Calculation**
* 🧰 **LED Rental Hardware Calculation**
* ⚡ **Power Consumption Calculation**
* 🔌 **Genset Capacity Estimation**

Semua perhitungan dilakukan secara langsung di browser tanpa membutuhkan backend.

---

## 📄 License
