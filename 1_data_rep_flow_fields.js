let dependencies = {};

let besuText25 = '';
let commonText25 = '';
let tekuText25 = '';

let besuText24 = '';
let commonText24 = '';
let tekuText24 = '';

let besuText23 = '';
let commonText23 = '';
let tekuText23 = '';

let besuText22 = '';
let commonText22 = '';
let tekuText22 = '';

const noiseScale = 0.01;
const besuParticles = [];
const tekuParticles = [];
const commonParticles = [];
let currentIteration = 0; 

function preload() {
    besuText25 = loadStrings('data/besu-25.1.0_dependencies_all_gav.txt');
    commonText25 = loadStrings('data/overlap_with_version-25.1.0.txt');
    tekuText25 = loadStrings('data/teku-25.1.0_dependencies_all.txt');

    besuText24 = loadStrings('data/besu-24.1.0_dependencies_all_gav.txt');
    commonText24 = loadStrings('data/overlap_with_version-24.1.0.txt');
    tekuText24 = loadStrings('data/teku-24.1.0_dependencies_all.txt');

    besuText23 = loadStrings('data/besu-23.1.0_dependencies_all_gav.txt');
    commonText23 = loadStrings('data/overlap_with_version-23.1.0.txt');
    tekuText23 = loadStrings('data/teku-23.1.0_dependencies_all.txt');

    besuText22 = loadStrings('data/besu-22.1.0_dependencies_all_gav.txt');
    commonText22 = loadStrings('data/overlap_with_version-22.1.0.txt');
    tekuText22 = loadStrings('data/teku-22.1.0_dependencies_all.txt');
}

function setup() {
    processData();
    let canvas = createCanvas(500, 500);
    colorMode(HSB);
    background(0, 0, 0);

    // Center the canvas
    let x = (windowWidth - width) / 2;
    let y = (windowHeight - height) / 2;
    canvas.position(x, y);

    let version = Object.keys(dependencies)[0];
    let numBesu = dependencies[version]["Besu"];
    let numTeku = dependencies[version]["Teku"];
    let numCommon = dependencies[version]["Common"];

    let besuColor = color(320, 100, 100);  
    let commonColor = color(50, 100, 100); 
    let tekuColor = color(200, 100, 100);  

    let clusterHeight = height / 6; 
    let spacing = height / 4; 

    // Besu (Top)
    for (let i = 0; i < numBesu; i++) {
        besuParticles.push({ pos: createVector(random(width), random(spacing - clusterHeight, spacing + clusterHeight)), col: besuColor });
    }
    // Common (Middle)
    for (let i = 0; i < numCommon; i++) {
        commonParticles.push({ pos: createVector(random(width), random(2 * spacing - clusterHeight, 2 * spacing + clusterHeight)), col: commonColor });
    }
    // Teku (Bottom)
    for (let i = 0; i < numTeku; i++) {
        tekuParticles.push({ pos: createVector(random(width), random(3 * spacing - clusterHeight, 3 * spacing + clusterHeight)), col: tekuColor });
    }
}
function draw() {
    // if (currentIteration === 1000) {
    //     noLoop();
    // }
    background(0, 0, 0, 0.01);

    // Draw and update Besu particles (Top)
    for (let p of besuParticles) {
        stroke(p.col);
        point(p.pos.x, p.pos.y);
        updateParticle(p);
    }

    // Draw and update Common particles (Middle)
    for (let p of commonParticles) {
        stroke(p.col);
        point(p.pos.x, p.pos.y);
        updateParticle(p);
    }

    // Draw and update Teku particles (Bottom)
    for (let p of tekuParticles) {
        stroke(p.col);
        point(p.pos.x, p.pos.y);
        updateParticle(p);
    }

    currentIteration++; 
}

// Perlin Noise
// function updateParticle(p) {
//     let n = noise(p.pos.x * noiseScale, p.pos.y * noiseScale);
//     let a = TAU * n;
//     p.pos.x += cos(a);
//     p.pos.y += sin(a);

//     if (!onScreen(p.pos)) {
//         p.pos.x = random(width);
//         p.pos.y = random(height);
//     }
// }


// Sinusoidal Waves
// let time = 0;

// function updateParticle(p) {
//     p.pos.x += sin(time + p.pos.y * 0.01) * 2;
//     p.pos.y += cos(time + p.pos.x * 0.01) * 2;
    
//     time += 0.001;
// }

// // Cellular Automata
// function updateParticle(p, index) {
//     let n = (index % 2 === 0) ? 1 : -1;
//     p.pos.x += n * 2;
//     p.pos.y += sin(p.pos.x * 0.01) * 2;
// }

// Brownian Motion (Random Walk)
function updateParticle(p) {
    p.pos.x += random(-1, 1);
    p.pos.y += random(-1, 1);
}


// Ensure particles stay inside the canvas
function onScreen(v) {
    return v.x >= 0 && v.x <= width && v.y >= 0 && v.y <= height;
}

function processData() {
    dependencies = {
        "25.1.0": {
            "Besu": besuText25.length,
            "Teku": tekuText25.length,
            "Common": commonText25.length
        },
        "24.1.0": {
            "Besu": besuText24.length,
            "Teku": tekuText24.length,
            "Common": commonText24.length
        },
        "23.1.0": {
            "Besu": besuText23.length,
            "Teku": tekuText23.length,
            "Common": commonText23.length
        },
        "22.1.0": {
            "Besu": besuText22.length,
            "Teku": tekuText22.length,
            "Common": commonText22.length
        }
    };
    console.log(dependencies);
}