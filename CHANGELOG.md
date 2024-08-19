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

## [2024-08-19] - Retrabajo del Script
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


