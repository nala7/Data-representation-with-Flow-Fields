let besuText = "";
let tekuText = "";
let commonText = "";
let besuColor;
let tekuColor;
let commonColor;

function preload() {
    besuText = loadStrings('data/besu_filtered_dependencies.txt');
    commonText = loadStrings('data/overlap_with_version-25.1.0.txt');
    tekuText = loadStrings('data/teku_filtered_dependencies.txt');
}

function setup() {
    createCanvas(1500, 800);
    background(0);
    textSize(12);

    let startX = 20;
    let startY = 40;
    let maxWidth = width - 40; // Text wrapping width

    besuColor = color(94, 235, 52); // Green
    tekuColor = color(235, 52, 208); // Pink
    commonColor = color(52, 235, 235); // Cyan

    // Join all text sections into a single continuous text
    let fullText = besuText.join(' ') + commonText.join(' ') + tekuText.join(' ');

    DisplayText(fullText, startX, startY, maxWidth);
}

function DisplayText(content, x, y, maxWidth) {
    let words = content.split(' ');
    let currentLine = "";
    let lineHeight = textAscent() + textDescent();
    let currentColor = besuColor;
    let colorIndex = 0;
    let besuLength = besuText.join(' ').split(' ').length;
    let commonLength = commonText.join(' ').split(' ').length;
    textSize(6);
    fill(currentColor);
    for (let i = 0; i < words.length; i++) {
        let testLine = currentLine + words[i] + " ";
        
        if (textWidth(testLine) > maxWidth) {
            text(currentLine, x, y);
            currentLine = words[i] + " ";
            y += lineHeight;
        } else {
            currentLine = testLine;
        }

        // color 
        if (i === besuLength) {
            colorIndex = 1;
            fill(tekuColor);
        } else if (i === besuLength + commonLength) {
            colorIndex = 2;
            fill(commonColor);
        }
    }

    text(currentLine, x, y); // Draw the last line
}
