const grid = document.querySelector('.grid');
const gridSize = 5;  // Cambia el tamaño de la cuadrícula aquí

// Límites de brillo para evitar negro total o blanco total
const minBrightness = 50;
const maxBrightness = 205;

// Generar cuatro colores aleatorios en las esquinas
const cornerColors = [
    generateRandomColor(),  // Esquina superior izquierda
    generateRandomColor(),  // Esquina superior derecha
    generateRandomColor(),  // Esquina inferior izquierda
    generateRandomColor()   // Esquina inferior derecha
];

// Crear la cuadrícula
function createGrid() {
    // Establecer el número de columnas en el grid según el tamaño definido
    grid.style.gridTemplateColumns = `repeat(${gridSize}, 60px)`;
    
    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        
        // Asignar color degradado basado en los colores de las esquinas
        cell.style.backgroundColor = getColorFromCorners(i);

        grid.appendChild(cell);
    }
}

// Generar un color aleatorio dentro de los límites de brillo
function generateRandomColor() {
    const red = Math.floor(Math.random() * (maxBrightness - minBrightness) + minBrightness);
    const green = Math.floor(Math.random() * (maxBrightness - minBrightness) + minBrightness);
    const blue = Math.floor(Math.random() * (maxBrightness - minBrightness) + minBrightness);
    return `rgb(${red}, ${green}, ${blue})`;
}

// Interpolar color entre las cuatro esquinas basado en la posición de la celda
function getColorFromCorners(index) {
    const x = index % gridSize;
    const y = Math.floor(index / gridSize);

    const topLeft = parseRgb(cornerColors[0]);
    const topRight = parseRgb(cornerColors[1]);
    const bottomLeft = parseRgb(cornerColors[2]);
    const bottomRight = parseRgb(cornerColors[3]);

    // Calcular el factor de interpolación
    const tx = x / (gridSize - 1);
    const ty = y / (gridSize - 1);

    // Interpolar entre las esquinas
    const red = interpolate(topLeft.r, topRight.r, bottomLeft.r, bottomRight.r, tx, ty);
    const green = interpolate(topLeft.g, topRight.g, bottomLeft.g, bottomRight.g, tx, ty);
    const blue = interpolate(topLeft.b, topRight.b, bottomLeft.b, bottomRight.b, tx, ty);

    return `rgb(${Math.min(Math.max(red, 0), 255)}, ${Math.min(Math.max(green, 0), 255)}, ${Math.min(Math.max(blue, 0), 255)})`;
}

// Interpolar entre los valores de las cuatro esquinas
function interpolate(topLeft, topRight, bottomLeft, bottomRight, tx, ty) {
    return Math.round(
        (1 - tx) * ((1 - ty) * topLeft + ty * bottomLeft) +
        tx * ((1 - ty) * topRight + ty * bottomRight)
    );
}

// Convertir cadena RGB a objeto
function parseRgb(rgbStr) {
    const [r, g, b] = rgbStr.match(/\d+/g).map(Number);
    return { r, g, b };
}

// Inicializar la cuadrícula
createGrid();
