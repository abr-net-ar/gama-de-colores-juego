# Juego de Matriz de Colores

## Descripción

El Juego de Matriz de Colores es un juego basado en la web que desafía a los jugadores a organizar una cuadrícula de celdas coloreadas. La cuadrícula es una matriz de 8x8, donde cada celda muestra un color generado basado en un gradiente.

### Visión General del Juego

- **Objetivo**: El objetivo del juego es ordenar las celdas según sus colores. Los colores se generan según un esquema de gradiente basado en las cuatro esquinas de la cuadrícula.
- **Jugabilidad**: Al comenzar el juego, la cuadrícula se presenta con celdas coloreadas según un esquema de gradiente. Los jugadores deben reorganizar las celdas para coincidir con una configuración deseada.
- **Colores de las Celdas**: Los colores de las celdas se interpolan entre cuatro colores aleatorios en las esquinas y el brillo se ajusta para evitar celdas completamente negras o blancas.

### Características

- **Cuadrícula de 8x8**: El juego utiliza una matriz de 8x8 para mostrar las celdas.
- **Colores Gradientes**: Los colores en la cuadrícula transicionan suavemente basados en el gradiente definido por los colores en las cuatro esquinas.
- **Restricciones de Brillo**: Las celdas evitan ser completamente negras o blancas mediante un ajuste en el brillo.
