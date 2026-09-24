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

document
    .querySelectorAll("input[type='number']")
    .forEach(input => {

        input.addEventListener(
            "input",
            calculatePixels
        );

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

        outputTemplate.innerText =
            "Masukkan angka resolusi yang valid.";

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
   INITIALIZE
========================================= */

calculatePixels();