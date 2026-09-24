# Pixelhue Pixel Calculator + Visualizer

A responsive web-based calculator and visualizer for configuring source and target resolutions on Pixelhue LED/video switcher workflows.

## Features

- Source resolution calculator
- Target LED screen resolution calculator
- Four display modes:
  - **Fit**
  - **Fill**
  - **Stretch**
  - **Original**
- Automatic crop calculation
- Automatic X/Y offset calculation
- Even-pixel adjustment for crop dimensions
- Real-time visual preview
- Copyable Pixelhue parameter output
- Responsive interface for desktop, tablet, and mobile
- No backend required

## Project Structure

```text
pixelhue-pixel-calculator/
│
├── index.html
│
├── css/
│   └── style.css
│
├── js/
│   └── app.js
│
├── README.md
│
└── .gitignore
```

## How to Use

1. Enter the source/input resolution.
2. Enter the target LED screen resolution.
3. Select the desired display mode.
4. Review the calculated Width, Height, X Offset, and Y Offset.
5. Use the Live Preview to verify the crop area.
6. Click **Salin Teks** to copy the detailed parameters.

## Display Modes

### Fit

Displays the complete source inside the target aspect ratio without cropping. Depending on the aspect ratio, black space may appear.

### Fill

Crops the source to match the target aspect ratio while keeping the image proportional.

### Stretch

Uses the original source dimensions and stretches the layer to the target resolution. This can change the visual aspect ratio.

### Original

Displays the source at its original pixel dimensions without crop or scaling.

## Technologies

- HTML5
- CSS3
- JavaScript
- Tailwind CSS CDN

## Running Locally

No build process is required.

Simply open:

```text
index.html
```

in a modern web browser.

## Disclaimer

This tool is intended as a practical calculation and visualization aid for Pixelhue workflows. Always verify calculated parameters against the actual switcher, processor, and LED configuration before use in a live production environment.