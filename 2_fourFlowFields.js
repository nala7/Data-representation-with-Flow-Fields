const dependencies = {
    "22.1.0": { "Besu": 376, "Teku": 374, "Common": 116 },
    "23.1.0": { "Besu": 437, "Teku": 427, "Common": 140 },
    "24.1.0": { "Besu": 449, "Teku": 424, "Common": 130 },
    "25.1.0": { "Besu": 462, "Teku": 432, "Common": 178 }
};

const noiseScale = 0.01;
let canvases = [];
let allParticles = [];
let updateFunctions = [];
let currentIterations = [];
let time = 0; // Time for Sinusoidal Waves

function setup() {
    let canvasSize = 400;
    let canvas = createCanvas(canvasSize * 2, canvasSize * 2);
    colorMode(HSB);

    // Center the canvas
    let x = (windowWidth - width) / 2;
    let y = (windowHeight - height) / 2;
    canvas.position(x, y);

    let versions = Object.keys(dependencies);

    for (let i = 0; i < versions.length; i++) {
        let canvas = createGraphics(canvasSize, canvasSize); // Create separate canvases
        canvases.push(canvas);

        let version = versions[i];
        let particles = generateParticles(dependencies[version], canvasSize);
        allParticles.push(particles);

        // Assign a different update function per version
        updateFunctions.push(getUpdateFunction(i));

        currentIterations.push(0);
    }
}

function draw() {
    background(0);

    for (let i = 0; i < canvases.length; i++) {
        if (currentIterations[i] < 80) {
            canvases[i].background(0, 0, 0, 0.01);

            let particles = allParticles[i];
            let updateFunction = updateFunctions[i];

            for (let j = 0; j < particles.length; j++) {
                let p = particles[j];
                canvases[i].stroke(p.col);
                canvases[i].point(p.pos.x, p.pos.y);
                updateFunction(p, j); // Call the update function
            }

            currentIterations[i]++;
        }

        // Draw each canvas in a 2x2 grid layout
        let cols = 2;
        let x = (i % cols) * 420;
        let y = floor(i / cols) * 420;
        image(canvases[i], x, y);
    }

    time += 0.001; // Increment time for sinusoidal movement
}

// Function to generate particles
function generateParticles(versionData, size) {
    let particles = [];
    let clusterHeight = size / 6;
    let spacing = size / 4;

    let colors = {
        Besu: color(340, 100, 100),  
        Common: color(50, 100, 100), 
        Teku: color(150, 100, 100)
    };

    for (let key in versionData) {
        let numParticles = versionData[key];
        let col = colors[key];
        let section = (key === "Besu") ? spacing :
                      (key === "Common") ? 2 * spacing :
                      (key === "Teku") ? 3 * spacing : 0;

        for (let i = 0; i < numParticles; i++) {
            particles.push({ 
                pos: createVector(random(size), random(section - clusterHeight, section + clusterHeight)), 
                col: col 
            });
        }
    }

    return particles;
}

// Returns an update function based on index
function getUpdateFunction(index) {
    switch (index) {
        case 0: return updateParticlePerlin;   
        case 1: return updateParticleSinusoidal; 
        case 2: return updateParticleCellular;   
        case 3: return updateParticleBrownian;  
    }
}

// Perlin Noise Movement
function updateParticlePerlin(p) {
    let n = noise(p.pos.x * noiseScale, p.pos.y * noiseScale);
    let a = TAU * n; // Angle (TAU = 2 * PI)
    p.pos.x += cos(a);
    p.pos.y += sin(a);

    resetIfOffscreen(p);
}

// Sinusoidal Waves Movement
function updateParticleSinusoidal(p) {
    p.pos.x += sin(time + p.pos.y * 0.01) * 2;
    p.pos.y += cos(time + p.pos.x * 0.01) * 2;
    
    resetIfOffscreen(p);
}

// Cellular Automata Movement
function updateParticleCellular(p, index) {
    let n = (index % 2 === 0) ? 1 : -1;
    p.pos.x += n * 2;
    p.pos.y += sin(p.pos.x * 0.01) * 2;

    resetIfOffscreen(p);
}

// Brownian Motion (Random Walk)
function updateParticleBrownian(p) {
    p.pos.x += random(-1, 1);
    p.pos.y += random(-1, 1);

    resetIfOffscreen(p);
}

// Ensure particles stay inside the canvas
function resetIfOffscreen(p) {
    if (p.pos.x < 0 || p.pos.x > 400 || p.pos.y < 0 || p.pos.y > 400) {
        p.pos.x = random(400);
        p.pos.y = random(400);
    }
}
