const grid = document.querySelector('.grid');
const gridSizeInput = document.getElementById('gridSize');
const redrawButton = document.getElementById('redrawButton');
const fixedPercentageDropdown = document.getElementById('fixedPercentage');
const colorAmountDropdown = document.getElementById('colorAmount');


// Variables globales
const minBrightness = 50;
const maxBrightness = 235;
const minColorDistance = 30; // Valor ajustable según tus necesidades
let shuffleCount = calculateShuffleCount(gridSizeInput.value, parseInt(fixedPercentageDropdown.value, 10));
// Matriz 3D en memoria
let matrix;
let gridSizeOrig = 0
let score = 0
let initial = true

// Event listener para el botón de redibujar
redrawBtn.addEventListener('click', () => {
    score = 0
    initial = true
    const gridSize = parseInt(gridSizeInput.value, 10);
    gridSizeOrig = gridSize
    shuffleCount = calculateShuffleCount(gridSizeInput.value, parseInt(fixedPercentageDropdown.value, 10));
    initializeMatrix(gridSize);
    shuffleMatrix(gridSize);
    refreshDisplay(gridSize);
});

// Calcular el número de celdas fijas como un porcentaje del total de celdas disponibles
function calculateShuffleCount(gridSize, percentage) {
    // Total de celdas disponibles para desordenar (excluyendo las 4 esquinas)
    const totalCells = gridSize * gridSize - 4;
    
    // Calcular el número de celdas a desordenar basado en el porcentaje
    const numCellsToShuffle = Math.floor((percentage / 100) * totalCells);
    // Asegurarse de que el número de celdas a desordenar sea un número par
    return numCellsToShuffle - (numCellsToShuffle % 2);
}

// Inicializar la matriz 3D
function initializeMatrix(gridSize) {
    // Crear la matriz 3D [gridSize][gridSize][3]
    matrix = new Array(gridSize).fill(null).map(() => 
        new Array(gridSize).fill(null).map(() => new Array(3))
    );

    // Generar colores ordenados (Capa 0)
    generateOrderedColors(gridSize);

    // Marcar celdas fijas (Capa 1)
    markFixedCells(gridSize);

    // Copiar colores a la capa 2 (desordenada)
    copyColorsToLayerTwo(gridSize);
}

// Generar colores ordenados (Capa 0)
function generateOrderedColors(gridSize) {
    let cornerColors = [];
    colorQuant = parseInt(colorAmountDropdown.value, 10)
    selectedColor = selectRandomColor(colorQuant)
    // Generar las esquinas con restricciones de brillo y distancia
    do {
        cornerColors = [
            generateRandomColor(selectedColor),  // Esquina superior izquierda
            generateRandomColor(selectedColor),  // Esquina superior derecha
            generateRandomColor(selectedColor),  // Esquina inferior izquierda
            generateRandomColor(selectedColor)   // Esquina inferior derecha
        ];
    } while (!isColorSetValid(cornerColors));

    // Generar los colores para el resto de la cuadrícula
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            matrix[y][x][0] = getColorFromCorners(x, y, gridSize, cornerColors);
        }
    }
}

// Seleccionar random color
function selectRandomColor(colorQuant) {
    let colorArray = [0, 0, 0]; // Inicializar el array con ceros

    // Generar índices aleatorios para colocar 1s en el array
    while (colorQuant > 0) {
        const randomIndex = Math.floor(Math.random() * 3);
        if (colorArray[randomIndex] === 0) { // Evitar sobrescribir un 1 existente
            colorArray[randomIndex] = 1;
            colorQuant--;
        }
    }

    return colorArray;
}

// Verificar si el conjunto de colores de las esquinas es válido
function isColorSetValid(cornerColors) {
    // Verificar que la distancia mínima entre las esquinas sea adecuada
    for (let i = 0; i < cornerColors.length; i++) {
        for (let j = i + 1; j < cornerColors.length; j++) {
            if (calculateColorDistance(cornerColors[i], cornerColors[j]) < minColorDistance) {
                return false;
            }
        }
    }

    return true;
}

// Calcular la distancia euclidiana entre dos colores RGB
function calculateColorDistance(color1, color2) {
    const c1 = parseRgb(color1);
    const c2 = parseRgb(color2);

    return Math.sqrt(
        Math.pow(c1.r - c2.r, 2) +
        Math.pow(c1.g - c2.g, 2) +
        Math.pow(c1.b - c2.b, 2)
    );
}

// Marcar celdas fijas (Capa 1)
function markFixedCells(gridSize) {
    // Inicializar la capa 1 con ceros
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            matrix[y][x][1] = 0;
        }
    }

    // Marcar las esquinas
    markCellAsFixed(0, 0);  // Esquina superior izquierda
    markCellAsFixed(0, gridSize - 1);  // Esquina superior derecha
    markCellAsFixed(gridSize - 1, 0);  // Esquina inferior izquierda
    markCellAsFixed(gridSize - 1, gridSize - 1);  // Esquina inferior derecha

    // Marcar celdas aleatorias según shuffleCount
    let markedCells = 4;  // Ya tenemos las 4 esquinas
    while (markedCells < shuffleCount + 4) {
        const randomX = Math.floor(Math.random() * gridSize);
        const randomY = Math.floor(Math.random() * gridSize);

        if (matrix[randomY][randomX][1] === 0) {  // Solo marcar si no está marcada
            markCellAsFixed(randomY, randomX);
            markedCells++;
        }
    }
}

// Marcar una celda como fija en la capa 1
function markCellAsFixed(y, x) {
    matrix[y][x][1] = 1;
}

// Copiar colores a la capa 2 (desordenada)
function copyColorsToLayerTwo(gridSize) {
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            matrix[y][x][2] = matrix[y][x][0];  // Copiar colores desde la capa 0
        }
    }
}

// Desordenar la matriz (Capa 2)
function shuffleMatrix(gridSize) {
    const movableCells = [];

    // Recopilar todas las celdas modificables (donde layer 1 es 0)
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            if (matrix[y][x][1] === 0) {  // No es una celda fija
                movableCells.push({ y, x });
            }
        }
    }

    // Desordenar pares de celdas
    for (let i = 0; i < shuffleCount; i += 2) {
        const idx1 = Math.floor(Math.random() * movableCells.length);
        const idx2 = Math.floor(Math.random() * movableCells.length);

        // Intercambiar colores en la capa 2 entre las dos celdas
        const temp = matrix[movableCells[idx1].y][movableCells[idx1].x][2];
        matrix[movableCells[idx1].y][movableCells[idx1].x][2] = matrix[movableCells[idx2].y][movableCells[idx2].x][2];
        matrix[movableCells[idx2].y][movableCells[idx2].x][2] = temp;
    }
}

function isMatrixSolved() {
    const gridSize = parseInt(gridSizeInput.value, 10);
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            if (matrix[y][x][2] !== matrix[y][x][0]) {
                return false;
            }
        }
    }
    return true;
}

function refreshDisplay(gridSizeT) {
    if (!initial) {
        score++;
        console.log(score)
    }
    // Limpiar el grid existente
    grid.innerHTML = '';
    grid.style.gridTemplateColumns = `repeat(${gridSizeT}, 1fr)`;

    // Dibujar cada celda según la capa 2
    for (let y = 0; y < gridSizeT; y++) {
        for (let x = 0; x < gridSizeT; x++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.style.backgroundColor = matrix[y][x][2];
            cell.dataset.y = y; // Añadir coordenada y
            cell.dataset.x = x; // Añadir coordenada x

            // Si es una celda fija, añadir una "X"
            if (matrix[y][x][1] === 1) {
                markAsFixed(cell);
            } else {
                // Asegurarse de que celdas movibles estén vacías
                cell.textContent = '';
            }

            // Añadir el event listener para el click
            cell.addEventListener('click', toggleBorder);

            grid.appendChild(cell);
            if (!initial && isMatrixSolved()) {
                alert(`¡Felicidades! Has resuelto el juego en ${score} movimientos.`);
            }
            initial = false
        }
    }
}

function toggleBorder(event) {
    const cell = event.currentTarget;
    
    // Verifica si la celda contiene una "X" en el texto
    if (cell.textContent.includes('X')) {
        return;
    }
    const selectedCell = document.querySelector('.cell.selected');
    // Alternar clase de borde
    if (selectedCell === null) {
        cell.classList.add('selected');
    }
    else if (cell === document.querySelector('.cell.selected')) {
        cell.classList.remove('selected');
    }
    else {
        // Obtén las coordenadas de las celdas seleccionadas
        const selectedCoords = selectedCell.dataset;
        const currentCoords = cell.dataset;
        // Intercambia los colores en la capa 2 de la matriz
        const tempColor = matrix[selectedCoords.y][selectedCoords.x][2];
        matrix[selectedCoords.y][selectedCoords.x][2] = matrix[currentCoords.y][currentCoords.x][2];
        matrix[currentCoords.y][currentCoords.x][2] = tempColor;
        // Refresca la visualización del display
        refreshDisplay(gridSizeOrig);
        // Quitar el borde de todas las celdas
        const allCells = document.querySelectorAll('.cell');
        allCells.forEach(c => c.classList.remove('selected'));
    }
}


// Marcar una celda como fija con una "X"
function markAsFixed(cell) {
    cell.textContent = 'X';
    cell.style.fontWeight = 'bold';
    cell.style.fontSize = '16px'; // Ajustar tamaño del texto
    cell.style.color = 'black';  // Color de la "X"
    cell.style.display = 'flex';
    cell.style.justifyContent = 'center';
    cell.style.alignItems = 'center';
}

function generateRandomColor(colorArray) {
    const red = colorArray[0] === 1 
        ? Math.floor(Math.random() * (maxBrightness - minBrightness) + minBrightness) 
        : 0;

    const green = colorArray[1] === 1 
        ? Math.floor(Math.random() * (maxBrightness - minBrightness) + minBrightness) 
        : 0;

    const blue = colorArray[2] === 1 
        ? Math.floor(Math.random() * (maxBrightness - minBrightness) + minBrightness) 
        : 0;

    return `rgb(${red}, ${green}, ${blue})`;
}

// Interpolar color entre las cuatro esquinas basado en la posición de la celda
function getColorFromCorners(x, y, gridSize, cornerColors) {
    const topLeft = parseRgb(cornerColors[0]);
    const topRight = parseRgb(cornerColors[1]);
    const bottomLeft = parseRgb(cornerColors[2]);
    const bottomRight = parseRgb(cornerColors[3]);

    const tx = x / (gridSize - 1);
    const ty = y / (gridSize - 1);

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

// Inicializar la cuadrícula con el tamaño predeterminado
initializeMatrix(parseInt(gridSizeInput.value, 10));
refreshDisplay(parseInt(gridSizeInput.value, 10));
