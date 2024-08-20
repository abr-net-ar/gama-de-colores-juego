# Changelog

Todos los cambios importantes a este proyecto serán documentados en este archivo.

## [2024-08-16]
### Añadido
- Implementación inicial del juego de matriz de colores.
- Creación de una cuadrícula de 8x8 con colores generados basados en un gradiente entre cuatro colores en las esquinas.
- Ajuste del brillo para evitar colores completamente negros o blancos.

## [Próximas versiones]
- [ ] Añadir funcionalidad de juego interactivo.
- [ ] Mejorar la interfaz de usuario y la experiencia de juego.
- [ ] Implementar sistema de puntuación y seguimiento de movimientos.

## [2024-08-19a] - Retrabajo del Script
- **Intentos Previos**: Inicialmente, se intentó desarrollar un script que generaba una cuadrícula con colores degradados y permitía el reordenamiento de celdas.
- **Retrabajo y Cambios**:
  - **Enfoque Original**: Generación de una matriz de colores degradados y mezcla simple de celdas.
  - **Nuevo Enfoque**: Implementación de una matriz tridimensional en memoria con:
    - **Capa 0**: Matriz con tonos RGB ordenados.
    - **Capa 1**: Marcar celdas no modificables (esquinas y un porcentaje de celdas aleatorias).
    - **Capa 2**: Matriz desordenada y visualización en pantalla.
  - **Cambios Adicionales**:
    - Implementación de una función para calcular celdas fijas como porcentaje de las celdas disponibles.
    - Adición de una variable de depuración para mostrar valores RGB en las celdas.
    - Actualización del diseño CSS para adaptarse a diferentes tamaños de pantalla y cambios dinámicos en la cuadrícula.
    - Añadido control de tamaño de cuadrícula y redibujado de la interfaz a través de un dropdown y un botón de actualización.

## [2024-08-19b]
### Added
- Implementación de la lógica principal para la generación y visualización de la cuadrícula de colores.
- Parámetros ajustables para el tamaño de la cuadrícula (`gridSize`) y el porcentaje de celdas fijas (`fixedPercentage`).
- Funcionalidad para inicializar una matriz 3D que almacena los colores ordenados, las celdas fijas y los colores desordenados.
- Generación de colores aleatorios con un rango de brillo específico (`minBrightness` y `maxBrightness`).
- Interpolación de colores entre las cuatro esquinas de la cuadrícula.
- Desordenamiento de la capa visualizable manteniendo ciertas celdas fijas.
- Visualización de celdas fijas con una "X".

### Changed
- Modificación en la lógica de desordenamiento para asegurar que el número de celdas a desordenar sea un número par.
- Ajustes en la visualización para asegurar que el texto "X" en las celdas fijas sea legible y centrado.

### Fixed
- Correcciones en la función de generación de colores aleatorios para mantener los valores de brillo dentro del rango especificado.

### TODO
- Mejorar la distribución inicial de los colores.
- Ajustar la cantidad de colores a usar en la cuadrícula.
- Asegurar un brillo y una "distancia" entre colores adecuados en la generación inicial.
- Implementar más opciones de interpolación de colores para una mayor flexibilidad.

## [2024-08-24] - Mejora en la Generación de Colores
### Añadido
- **Generación Mejorada de Colores**:
  - Implementación de una lógica para garantizar que las esquinas de la matriz tengan un brillo y distancia mínimos establecidos.
  - Se asegura que una de las esquinas tenga un brillo alto o bajo, pero no todas.
  - Se verifica que la distancia entre los colores de las esquinas cumpla con un mínimo establecido, utilizando la distancia euclidiana para la medición.

### Próximos Pasos
- **Dificultad Dinámica**: Hacer la generación de colores y la dificultad del juego dinámicas mediante parámetros ajustables.
- **Sistema de Puntuación**: Implementar un contador y un cálculo de puntos similar al golf, donde se establezca un "par" de movimientos mínimos y se cuenten los movimientos adicionales en positivo.
- **Niveles de Juego**: Implementar niveles, donde la dificultad aumente a medida que el jugador avance en el juego.
