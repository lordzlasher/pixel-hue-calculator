/* =========================================
   PIXELHUE PIXEL CALCULATOR
   Main Application Logic
========================================= */

let currentMode = "fill";


/* =========================================
   DOM ELEMENTS
========================================= */

const inputW = document.getElementById("inputW");
const inputH = document.getElementById("inputH");

const targetW = document.getElementById("targetW");
const targetH = document.getElementById("targetH");

const outputTemplate =
    document.getElementById("outputTemplate");

const resultMode =
    document.getElementById("resultMode");

const resultCropState =
    document.getElementById("resultCropState");

const resultWidth =
    document.getElementById("resultWidth");

const resultHeight =
    document.getElementById("resultHeight");

const resultWidthNote =
    document.getElementById("resultWidthNote");

const resultHeightNote =
    document.getElementById("resultHeightNote");

const resultOffsetX =
    document.getElementById("resultOffsetX");

const resultOffsetY =
    document.getElementById("resultOffsetY");

const previewContainer =
    document.getElementById("previewContainer");

const inputBox =
    document.getElementById("inputBox");

const cropBox =
    document.getElementById("cropBox");

const inputLabel =
    document.getElementById("inputLabel");

const cropLabel =
    document.getElementById("cropLabel");

const modeDescription =
    document.getElementById("mode-desc");

const copyButton =
    document.getElementById("copyButton");

const copyText =
    document.getElementById("copy-text");


/* =========================================
   MODE DESCRIPTIONS
========================================= */

const modeDescriptions = {

    fit:
        "Fit: Mengecilkan seluruh gambar input agar masuk ke dalam layar target (akan ada sisa black space).",

    fill:
        "Fill: Memotong (crop) input agar memenuhi layar target secara penuh tanpa gepeng.",

    stretch:
        "Stretch: Memaksa gambar input ditarik penuh sesuai ukuran target layar (visual akan gepeng).",

    original:
        "Original: Menampilkan input piksel-demi-piksel apa adanya di layar tanpa scaling."

};


/* =========================================
   INPUT EVENTS
========================================= */

[inputW, inputH, targetW, targetH].forEach(input => {
    input.addEventListener("input", calculatePixels);
});


/* =========================================
   MODE BUTTON EVENTS
========================================= */

document
    .querySelectorAll(".mode-btn")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => setMode(button.dataset.mode)
        );

    });


/* =========================================
   SET MODE
========================================= */

function setMode(mode) {

    currentMode = mode;


    /* Update buttons */

    document
        .querySelectorAll(".mode-btn")
        .forEach(button => {

            button.classList.remove("active");

        });


    const activeButton =
        document.getElementById(`btn-${mode}`);


    if (activeButton) {
        activeButton.classList.add("active");
    }


    /* Update description */

    modeDescription.innerText =
        modeDescriptions[mode] || "";


    /* Recalculate */

    calculatePixels();
}


/* =========================================
   MAIN CALCULATION
========================================= */

function calculatePixels() {

    const sourceWidth =
        parseInt(inputW.value) || 0;

    const sourceHeight =
        parseInt(inputH.value) || 0;

    const screenWidth =
        parseInt(targetW.value) || 0;

    const screenHeight =
        parseInt(targetH.value) || 0;


    /* -----------------------------------------
       VALIDATION
    ----------------------------------------- */

    if (
        sourceWidth <= 0 ||
        sourceHeight <= 0 ||
        screenWidth <= 0 ||
        screenHeight <= 0
    ) {
        resetPixelResults();
        return;
    }


    /* -----------------------------------------
       DEFAULT VALUES
    ----------------------------------------- */

    let cropState = "Disable";

    let newWidth = sourceWidth;
    let newHeight = sourceHeight;

    let offsetX = 0;
    let offsetY = 0;

    let noteWidthText = "";
    let noteHeightText = "";


    const inputRatio =
        sourceWidth / sourceHeight;

    const targetRatio =
        screenWidth / screenHeight;


    /* =========================================
       FILL
    ========================================== */

    if (currentMode === "fill") {

        cropState = "Enable";


        if (targetRatio < inputRatio) {

            /*
             Target lebih sempit.
             Crop kiri dan kanan.
            */

            newWidth =
                Math.round(
                    sourceHeight * targetRatio
                );


            if (newWidth % 2 !== 0) {
                newWidth++;
            }


            newHeight = sourceHeight;

            offsetX =
                Math.round(
                    (sourceWidth - newWidth) / 2
                );

            offsetY = 0;

            noteHeightText =
                " (Tetap utuh)";

        }

        else {

            /*
             Target lebih tinggi.
             Crop atas dan bawah.
            */

            newWidth = sourceWidth;

            newHeight =
                Math.round(
                    sourceWidth / targetRatio
                );


            if (newHeight % 2 !== 0) {
                newHeight++;
            }


            offsetX = 0;

            offsetY =
                Math.round(
                    (sourceHeight - newHeight) / 2
                );

            noteWidthText =
                " (Tetap utuh)";
        }
    }


    /* =========================================
       STRETCH
    ========================================== */

    else if (currentMode === "stretch") {

        cropState =
            "Disable (Atau isi parameter di bawah jika menu Crop tetap aktif)";

        newWidth = sourceWidth;
        newHeight = sourceHeight;

        offsetX = 0;
        offsetY = 0;

        noteWidthText =
            " (Tetap utuh)";

        noteHeightText =
            " (Tetap utuh)";
    }


    /* =========================================
       ORIGINAL
    ========================================== */

    else if (currentMode === "original") {

        cropState = "Disable";

        newWidth = sourceWidth;
        newHeight = sourceHeight;

        offsetX = 0;
        offsetY = 0;

        noteWidthText =
            " (Resolusi asli)";

        noteHeightText =
            " (Resolusi asli)";
    }


    /* =========================================
       FIT
    ========================================== */

    else if (currentMode === "fit") {

        cropState = "Disable";

        newWidth = sourceWidth;
        newHeight = sourceHeight;

        offsetX = 0;
        offsetY = 0;

        noteWidthText =
            " (Tidak di-crop)";

        noteHeightText =
            " (Tidak di-crop)";
    }


    /* =========================================
       GENERATE TEXT OUTPUT
    ========================================== */

    let template =
        `Berikut adalah parameter angka eksak yang harus Anda masukkan ke menu Input Crop atau Layer Crop di switcher Pixelhue Anda agar visual pas di tengah (Center) ${

            currentMode === "stretch"
                ? "dan meregang memenuhi layar (Stretch)"
                : currentMode === "fill"
                    ? "dan tidak gepeng"
                    : "sesuai mode pilihan"

        }:\n\n`;


    template +=
        `Mode: ${currentMode.toUpperCase()}\n`;

    template +=
        `Crop / State: ${cropState}\n`;

    template +=
        `Width (Lebar Baru): ${newWidth}${noteWidthText}\n`;

    template +=
        `Height (Tinggi): ${newHeight}${noteHeightText}\n`;

    template +=
        `X / Left Offset (Potongan Kiri): ${offsetX}\n`;

    template +=
        `Y / Top Offset: ${offsetY}\n\n`;


    /* =========================================
       MODE-SPECIFIC INSTRUCTIONS
    ========================================== */

    if (currentMode === "stretch") {

        template +=
            `Setelah input di-crop dengan angka di atas, buka menu Layer Anda pada screen LED tersebut, lalu set ukuran layarnya ke ukuran penuh yaitu Width: ${screenWidth} dan Height: ${screenHeight}. Pastikan opsi Lock Aspect Ratio pada Layer dalam posisi Disable agar gambar mau meregang memenuhi layar.`;

    }

    else if (currentMode === "fit") {

        template +=
            `Buka menu Layer Anda pada screen LED tersebut. Gunakan Width: ${screenWidth} dan Height: ${screenHeight}. Pertahankan aspect ratio agar gambar tidak gepeng. Karena mode Fit, kemungkinan akan terdapat black space pada sisi tertentu.`;

    }

    else if (currentMode === "original") {

        template +=
            `Buka menu Layer Anda pada screen LED tersebut. Gunakan ukuran input asli ${sourceWidth} × ${sourceHeight}. Mode Original tidak melakukan crop atau scaling pada source.`;

    }

    else {

        template +=
            `Setelah input di-crop dengan angka di atas, buka menu Layer Anda pada screen LED tersebut, lalu set ukuran layarnya ke ukuran penuh yaitu Width: ${screenWidth} dan Height: ${screenHeight}.`;
    }


    /* =========================================
       UPDATE TEXT OUTPUT
    ========================================== */

    outputTemplate.textContent =
        template;


    /* =========================================
       UPDATE RESULT CARD
    ========================================== */

    resultMode.innerText =
        currentMode.toUpperCase();

    resultCropState.innerText =
        cropState;

    resultWidth.innerText =
        newWidth;

    resultHeight.innerText =
        newHeight;

    resultWidthNote.innerText =
        noteWidthText
            ? noteWidthText.replace(/[()]/g, "")
            : "Hasil perhitungan";

    resultHeightNote.innerText =
        noteHeightText
            ? noteHeightText.replace(/[()]/g, "")
            : "Hasil perhitungan";

    resultOffsetX.innerText =
        offsetX;

    resultOffsetY.innerText =
        offsetY;


    /* =========================================
       UPDATE PREVIEW
    ========================================== */

    updatePreview(
        sourceWidth,
        sourceHeight,
        screenWidth,
        screenHeight,
        inputRatio,
        targetRatio,
        newWidth,
        newHeight,
        offsetX,
        offsetY
    );
}


/* =========================================
   LIVE PREVIEW
========================================= */

function updatePreview(
    sourceWidth,
    sourceHeight,
    screenWidth,
    screenHeight,
    inputRatio,
    targetRatio,
    newWidth,
    newHeight,
    offsetX,
    offsetY
) {

    inputLabel.innerText =
        `${sourceWidth}×${sourceHeight}`;

    cropLabel.innerText =
        `${screenWidth}×${screenHeight}`;


    const containerWidth =
        previewContainer.clientWidth - 24;

    const containerHeight =
        previewContainer.clientHeight - 24;


    let boxWidth;
    let boxHeight;


    /* Maintain source aspect ratio */

    if (
        inputRatio >
        containerWidth / containerHeight
    ) {

        boxWidth = containerWidth;

        boxHeight =
            containerWidth / inputRatio;

    }

    else {

        boxHeight = containerHeight;

        boxWidth =
            containerHeight * inputRatio;
    }


    inputBox.style.width =
        `${boxWidth}px`;

    inputBox.style.height =
        `${boxHeight}px`;


    /* =========================================
       FILL PREVIEW
    ========================================== */

    if (currentMode === "fill") {

        const scale =
            boxWidth / sourceWidth;


        cropBox.style.width =
            `${newWidth * scale}px`;

        cropBox.style.height =
            `${newHeight * scale}px`;

        cropBox.style.left =
            `${offsetX * scale}px`;

        cropBox.style.top =
            `${offsetY * scale}px`;
    }


    /* =========================================
       STRETCH / ORIGINAL
    ========================================== */

    else if (
        currentMode === "stretch" ||
        currentMode === "original"
    ) {

        cropBox.style.width = "100%";

        cropBox.style.height = "100%";

        cropBox.style.left = "0px";

        cropBox.style.top = "0px";
    }


    /* =========================================
       FIT
    ========================================== */

    else if (currentMode === "fit") {

        let cropWidth;
        let cropHeight;


        if (targetRatio > inputRatio) {

            cropWidth = boxWidth;

            cropHeight =
                boxWidth / targetRatio;

        }

        else {

            cropHeight = boxHeight;

            cropWidth =
                boxHeight * targetRatio;
        }


        cropBox.style.width =
            `${cropWidth}px`;

        cropBox.style.height =
            `${cropHeight}px`;


        cropBox.style.left =
            `${(boxWidth - cropWidth) / 2}px`;

        cropBox.style.top =
            `${(boxHeight - cropHeight) / 2}px`;
    }
}


/* =========================================
   COPY TO CLIPBOARD
========================================= */

function copyToClipboard() {

    const text =
        outputTemplate.textContent;


    if (!text) {
        return;
    }


    navigator.clipboard
        .writeText(text)
        .then(() => {

            copyText.innerText =
                "Tersalin!";


            setTimeout(() => {

                copyText.innerText =
                    "Salin Teks";

            }, 2000);

        })

        .catch(error => {

            console.error(
                "Gagal menyalin teks:",
                error
            );

        });
}


/* =========================================
   COPY BUTTON
========================================= */

copyButton.addEventListener(
    "click",
    copyToClipboard
);


/* =========================================
   WINDOW RESIZE
========================================= */

window.addEventListener(
    "resize",
    calculatePixels
);


/* =========================================
   PIXEL RESET / INITIALIZE
========================================= */

function resetPixelResults() {
    resultMode.innerText = "—";
    resultCropState.innerText = "—";
    resultWidth.innerText = "—";
    resultHeight.innerText = "—";
    resultWidthNote.innerText = "Masukkan ukuran";
    resultHeightNote.innerText = "Masukkan ukuran";
    resultOffsetX.innerText = "—";
    resultOffsetY.innerText = "—";
    outputTemplate.textContent = "Masukkan seluruh resolusi untuk melihat hasil.";

    inputBox.style.width = "0px";
    inputBox.style.height = "0px";
    cropBox.style.width = "0px";
    cropBox.style.height = "0px";
    cropBox.style.left = "0px";
    cropBox.style.top = "0px";
    inputLabel.innerText = "";
    cropLabel.innerText = "";
}

resetPixelResults();


/* =========================================
   HARDWARE CALCULATOR
========================================= */

const tabPixel = document.getElementById("tab-pixel");
const tabHardware = document.getElementById("tab-hardware");
const pixelCalculator = document.getElementById("pixelCalculator");
const hardwareCalculator = document.getElementById("hardwareCalculator");

const hardwareLength = document.getElementById("hardwareLength");
const hardwareHeight = document.getElementById("hardwareHeight");
const hardwarePitch = document.getElementById("hardwarePitch");
const hardwareMessage = document.getElementById("hardwareMessage");
const hardwareResults = document.getElementById("hardwareResults");

const hardwareArea = document.getElementById("hardwareArea");
const hardwareBoxes = document.getElementById("hardwareBoxes");
const hardwareResolution = document.getElementById("hardwareResolution");
const hardwareCabinets = document.getElementById("hardwareCabinets");
const hardwareLanRuns = document.getElementById("hardwareLanRuns");
const hardwareLanLoop = document.getElementById("hardwareLanLoop");
const hardwarePowerRuns = document.getElementById("hardwarePowerRuns");
const hardwarePowerLoop = document.getElementById("hardwarePowerLoop");
const hardwareStand = document.getElementById("hardwareStand");
const hardwareClamps = document.getElementById("hardwareClamps");
const hardwareBolts = document.getElementById("hardwareBolts");
const hardwareOutput = document.getElementById("hardwareOutput");
const hardwareCopyButton = document.getElementById("hardwareCopyButton");
const hardwareCopyText = document.getElementById("hardwareCopyText");

function setCalculatorTab(tab) {
    const isPixel = tab === "pixel";

    pixelCalculator.classList.toggle("hidden", !isPixel);
    hardwareCalculator.classList.toggle("hidden", isPixel);
    tabPixel.classList.toggle("active", isPixel);
    tabHardware.classList.toggle("active", !isPixel);
    tabPixel.setAttribute("aria-selected", String(isPixel));
    tabHardware.setAttribute("aria-selected", String(!isPixel));
}

tabPixel.addEventListener("click", () => setCalculatorTab("pixel"));
tabHardware.addEventListener("click", () => setCalculatorTab("hardware"));

[hardwareLength, hardwareHeight].forEach(input => {
    input.addEventListener("input", calculateHardware);
});
hardwarePitch.addEventListener("change", calculateHardware);

function isHalfMeter(value) {
    return Number.isFinite(value) && value >= 0.5 && Math.abs(value * 2 - Math.round(value * 2)) < 1e-9;
}

function calculateHardware() {
    const length = Number.parseFloat(hardwareLength.value);
    const height = Number.parseFloat(hardwareHeight.value);

    if (!isHalfMeter(length) || !isHalfMeter(height)) {
        hardwareResults.classList.add("hidden");
        hardwareMessage.classList.remove("hidden");
        hardwareMessage.innerText = "Masukkan panjang dan tinggi LED dalam kelipatan 0,5 meter.";
        return;
    }

    const area = length * height;
    const pitch = hardwarePitch.value;
    const pixelsPerMeter = pitch === "P2.6" ? 384 : 256;
    const resolutionWidth = Math.round(length * pixelsPerMeter);
    const resolutionHeight = Math.round(height * pixelsPerMeter);

    // Cabinet: 500 mm wide, 1000 mm cabinet height prioritized, 500 mm remainder.
    const cabinetsAcross = Math.round(length / 0.5);
    const fullMeterRows = Math.floor(height);
    const halfMeterRemainder = Math.round((height - fullMeterRows) * 2) / 2;
    const cabinetRows = fullMeterRows + (halfMeterRemainder > 0 ? 1 : 0);
    const totalCabinets = cabinetsAcross * cabinetRows;

    const lanLimit = pitch === "P2.6" ? 4 : 10;
    const lanRuns = Math.ceil(area / lanLimit);
    const powerRuns = Math.ceil(area / 8);
    const lanLoop = Math.max(0, totalCabinets - lanRuns);
    const powerLoop = Math.max(0, totalCabinets - powerRuns);

    // Standing levels: 0.5–2.5 m = 1 level, 3–4 m = 2, 4.5–5.5 m = 3, etc.
    const levels = Math.max(1, Math.floor(height / 1.5));
    const standsPerLevel = Math.ceil(length);
    const totalStand = standsPerLevel * levels;
    const bottomStands = standsPerLevel;
    const upperStands = Math.max(0, totalStand - bottomStands);
    const clamps = totalStand;
    const bolts = bottomStands * 4 + upperStands * 2;
    const boxes = Math.ceil(area / 3);

    hardwareArea.innerText = area.toLocaleString("id-ID", { maximumFractionDigits: 2 });
    hardwareBoxes.innerText = boxes;
    hardwareResolution.innerText = `${resolutionWidth} × ${resolutionHeight}`;
    hardwareCabinets.innerText = totalCabinets;
    hardwareLanRuns.innerText = lanRuns;
    hardwareLanLoop.innerText = lanLoop;
    hardwarePowerRuns.innerText = powerRuns;
    hardwarePowerLoop.innerText = powerLoop;
    hardwareStand.innerText = totalStand;
    hardwareClamps.innerText = clamps;
    hardwareBolts.innerText = bolts;
    hardwareOutput.textContent =
        `LED: ${length} × ${height} m\n` +
        `Pitch: ${pitch}\n` +
        `Total Area: ${area} m²\n` +
        `Jumlah Box LED: ${boxes} box\n` +
        `Resolusi LED: ${resolutionWidth} × ${resolutionHeight} px\n` +
        `Total Cabinets: ${totalCabinets} cabinet\n` +
        `LAN Runs: ${lanRuns} run\n` +
        `LAN Loop: ${lanLoop} loop\n` +
        `Power Legran Runs: ${powerRuns} run\n` +
        `Power Loop: ${powerLoop} loop\n` +
        `Standing Bracket: ${totalStand} stand\n` +
        `Klem: ${clamps} klem\n` +
        `Baut: ${bolts} baut`;

    hardwareMessage.classList.add("hidden");
    hardwareResults.classList.remove("hidden");
}

// Keep the initial state empty until the user enters valid dimensions.
setCalculatorTab("pixel");

hardwareCopyButton.addEventListener("click", async () => {
    try {
        await navigator.clipboard.writeText(hardwareOutput.textContent);
        hardwareCopyText.innerText = "Tersalin!";
        setTimeout(() => { hardwareCopyText.innerText = "Salin Teks"; }, 1500);
    } catch (error) {
        const textarea = document.createElement("textarea");
        textarea.value = hardwareOutput.textContent;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        textarea.remove();
        hardwareCopyText.innerText = "Tersalin!";
        setTimeout(() => { hardwareCopyText.innerText = "Salin Teks"; }, 1500);
    }
});


/* =========================================
   POWER & GENSET CALCULATOR
========================================= */

const tabPower = document.getElementById("tab-power");
const powerCalculator = document.getElementById("powerCalculator");
const powerModeDimensions = document.getElementById("powerModeDimensions");
const powerModeArea = document.getElementById("powerModeArea");
const powerDimensionInputs = document.getElementById("powerDimensionInputs");
const powerAreaInput = document.getElementById("powerAreaInput");
const powerLength = document.getElementById("powerLength");
const powerHeight = document.getElementById("powerHeight");
const powerTotalArea = document.getElementById("powerTotalArea");
const powerLedType = document.getElementById("powerLedType");
const powerLedTypeArea = document.getElementById("powerLedTypeArea");
const powerMessage = document.getElementById("powerMessage");
const powerResults = document.getElementById("powerResults");
const powerAreaResult = document.getElementById("powerAreaResult");
const powerTypeResult = document.getElementById("powerTypeResult");
const powerWattResult = document.getElementById("powerWattResult");
const powerKvaResult = document.getElementById("powerKvaResult");
const powerGensetResult = document.getElementById("powerGensetResult");
const powerCabinetInfo = document.getElementById("powerCabinetInfo");
const powerOutput = document.getElementById("powerOutput");
const powerCopyButton = document.getElementById("powerCopyButton");
const powerCopyText = document.getElementById("powerCopyText");

const powerLedSpecs = {
    "qiangli-saga-p39": {
        name: "Qiangli Saga P3.9",
        short: 180,
        long: 360,
        perM2: 720
    },
    "qiangli-new-lite-p39": {
        name: "Qiangli New Lite P3.9",
        short: 180,
        long: 360,
        perM2: 720
    },
    "qiangli-saga-p26": {
        name: "Qiangli Saga P2.6",
        short: 144,
        long: 288,
        perM2: 576
    },
    "qiangli-new-lite-p26": {
        name: "Qiangli New Lite P2.6",
        short: 144,
        long: 288,
        perM2: 576
    },
    "lampro-maven-p39": {
        name: "Lampro Maven P3.9",
        short: 157,
        long: 315,
        perM2: 630
    },
    "lampro-lrs-p26": {
        name: "Lampro LRS P2.6",
        short: 140,
        long: 280,
        perM2: 560
    }
};

let powerInputMode = "dimensions";

function setPowerInputMode(mode) {
    powerInputMode = mode;
    const dimensions = mode === "dimensions";
    powerDimensionInputs.classList.toggle("hidden", !dimensions);
    powerAreaInput.classList.toggle("hidden", dimensions);
    powerModeDimensions.classList.toggle("active", dimensions);
    powerModeArea.classList.toggle("active", !dimensions);
    calculatePower();
}

powerModeDimensions.addEventListener("click", () => setPowerInputMode("dimensions"));
powerModeArea.addEventListener("click", () => setPowerInputMode("area"));
[powerLength, powerHeight, powerTotalArea].forEach(input => input.addEventListener("input", calculatePower));
[powerLedType, powerLedTypeArea].forEach(select => select.addEventListener("change", calculatePower));

tabPower.addEventListener("click", () => setCalculatorTab("power"));

// Extend the existing tab function without changing the previous calculator logic.
const originalSetCalculatorTab = setCalculatorTab;
setCalculatorTab = function(tab) {
    originalSetCalculatorTab(tab === "power" ? "pixel" : tab);
    const isPower = tab === "power";
    if (isPower) {
        pixelCalculator.classList.add("hidden");
        hardwareCalculator.classList.add("hidden");
    }
    powerCalculator.classList.toggle("hidden", !isPower);
    tabPixel.classList.toggle("active", tab === "pixel");
    tabHardware.classList.toggle("active", tab === "hardware");
    tabPower.classList.toggle("active", isPower);
    tabPixel.setAttribute("aria-selected", String(tab === "pixel"));
    tabHardware.setAttribute("aria-selected", String(tab === "hardware"));
    tabPower.setAttribute("aria-selected", String(isPower));
};

function formatPowerNumber(value, digits = 2) {
    return value.toLocaleString("id-ID", {
        minimumFractionDigits: 0,
        maximumFractionDigits: digits
    });
}

function calculatePower() {
    const typeKey = powerInputMode === "dimensions" ? powerLedType.value : powerLedTypeArea.value;
    const spec = powerLedSpecs[typeKey];
    let area = 0;
    let totalWatt = 0;
    let cabinetInfo = "";

    if (powerInputMode === "dimensions") {
        const length = Number.parseFloat(powerLength.value);
        const height = Number.parseFloat(powerHeight.value);

        if (!isHalfMeter(length) || !isHalfMeter(height)) {
            powerResults.classList.add("hidden");
            powerMessage.classList.remove("hidden");
            powerMessage.innerText = "Masukkan panjang dan tinggi LED dalam kelipatan 0,5 meter.";
            return;
        }

        area = length * height;

        // Same cabinet composition logic as the Hardware Calculator:
        // 500x1000 mm cabinets are prioritized, with 500x500 mm for the remainder.
        const cabinetsAcross = Math.round(length / 0.5);
        const fullMeterRows = Math.floor(height);
        const halfMeterRemainder = Math.round((height - fullMeterRows) * 2) / 2;
        const longCabinets = cabinetsAcross * fullMeterRows;
        const shortCabinets = halfMeterRemainder > 0 ? cabinetsAcross : 0;
        const totalCabinets = longCabinets + shortCabinets;

        totalWatt = longCabinets * spec.long + shortCabinets * spec.short;
        cabinetInfo = `Komposisi cabinet: ${totalCabinets} cabinet (500×1000 mm diprioritaskan)`;
    } else {
        area = Number.parseFloat(powerTotalArea.value);

        if (!Number.isFinite(area) || area <= 0) {
            powerResults.classList.add("hidden");
            powerMessage.classList.remove("hidden");
            powerMessage.innerText = "Masukkan total luas LED yang lebih besar dari 0 m².";
            return;
        }

        // Area-only input uses the maximum specified load per square meter.
        totalWatt = area * spec.perM2;
        cabinetInfo = "Mode total luas: perhitungan daya menggunakan beban maksimal per m².";
    }

    const kva = totalWatt / (1000 * 0.8);
    const gensetKva = kva * 1.2;

    powerAreaResult.innerText = formatPowerNumber(area);
    powerTypeResult.innerText = spec.name;
    powerWattResult.innerText = formatPowerNumber(totalWatt);
    powerKvaResult.innerText = formatPowerNumber(kva);
    powerGensetResult.innerText = formatPowerNumber(gensetKva);
    powerCabinetInfo.innerText = cabinetInfo;
    powerCabinetInfo.classList.remove("hidden");

    powerOutput.textContent =
        `LED: ${spec.name}\n` +
        `Total Area: ${formatPowerNumber(area)} m²\n` +
        `Total Daya Maksimal: ${formatPowerNumber(totalWatt)} Watt\n` +
        `Power Factor: 0.8\n` +
        `Daya: ${formatPowerNumber(kva)} kVA\n` +
        `Safety Margin: 20%\n` +
        `Kebutuhan Genset: ${formatPowerNumber(gensetKva)} kVA`;

    powerMessage.classList.add("hidden");
    powerResults.classList.remove("hidden");
}

powerCopyButton.addEventListener("click", async () => {
    try {
        await navigator.clipboard.writeText(powerOutput.textContent);
        powerCopyText.innerText = "Tersalin!";
        setTimeout(() => { powerCopyText.innerText = "Salin Teks"; }, 1500);
    } catch (error) {
        const textarea = document.createElement("textarea");
        textarea.value = powerOutput.textContent;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        textarea.remove();
        powerCopyText.innerText = "Tersalin!";
        setTimeout(() => { powerCopyText.innerText = "Salin Teks"; }, 1500);
    }
});

setPowerInputMode("dimensions");
setCalculatorTab("pixel");
