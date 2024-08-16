const grid = document.querySelector('.grid');
const gridSize = 8;  // 8x8 grid

// Color boundaries (to avoid full black and full white)
const minBrightness = 50;
const maxBrightness = 205;

// Generate four random corner colors
const cornerColors = [
    generateRandomColor(),  // Top-left corner
    generateRandomColor(),  // Top-right corner
    generateRandomColor(),  // Bottom-left corner
    generateRandomColor()   // Bottom-right corner
];

// Create the matrix grid
function createGrid() {
    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        
        // Assign gradient color based on corner colors
        cell.style.backgroundColor = getColorFromCorners(i);

        grid.appendChild(cell);
    }
}

// Generate a random color within brightness limits
function generateRandomColor() {
    const red = Math.floor(Math.random() * (255 - 0) + 0);
    const green = Math.floor(Math.random() * (maxBrightness - minBrightness) + minBrightness);
    const blue = Math.floor(Math.random() * (255 - 0) + 0);
    return `rgb(${red}, ${green}, ${blue})`;
}

// Interpolate color between four corners based on cell position
function getColorFromCorners(index) {
    const x = index % gridSize;
    const y = Math.floor(index / gridSize);

    const topLeft = parseRgb(cornerColors[0]);
    const topRight = parseRgb(cornerColors[1]);
    const bottomLeft = parseRgb(cornerColors[2]);
    const bottomRight = parseRgb(cornerColors[3]);

    // Calculate the interpolation factor
    const tx = x / (gridSize - 1);
    const ty = y / (gridSize - 1);

    // Interpolate between the corners
    const red = interpolate(topLeft.r, topRight.r, bottomLeft.r, bottomRight.r, tx, ty);
    const green = interpolate(topLeft.g, topRight.g, bottomLeft.g, bottomRight.g, tx, ty);
    const blue = interpolate(topLeft.b, topRight.b, bottomLeft.b, bottomRight.b, tx, ty);

    // Apply brightness constraints
    const brightness = Math.floor(minBrightness + (maxBrightness - minBrightness) * ty);

    return `rgb(${Math.min(Math.max(red, 0), 255)}, ${brightness}, ${Math.min(Math.max(blue, 0), 255)})`;
}

// Interpolate between four corner values
function interpolate(topLeft, topRight, bottomLeft, bottomRight, tx, ty) {
    return Math.round(
        (1 - tx) * ((1 - ty) * topLeft + ty * bottomLeft) +
        tx * ((1 - ty) * topRight + ty * bottomRight)
    );
}

// Convert RGB string to object
function parseRgb(rgbStr) {
    const [r, g, b] = rgbStr.match(/\d+/g).map(Number);
    return { r, g, b };
}

// Initialize the grid
createGrid();
