# Sunovision Chat

> Aplicación web para visualizar letras de canciones por países, con botones para mostrar la letra correspondiente.

---

## Descripción

Sunovision Chat es una aplicación ligera que permite mostrar letras de canciones clasificadas por países. Cada país tiene su archivo de texto con las letras almacenadas en la carpeta `resources/letras/`. A través de botones en la interfaz, el usuario puede seleccionar un país y ver la letra de la canción correspondiente.

La aplicación está pensada para uso local o desplegada en un servidor que sirva los archivos estáticos. Está desarrollada con HTML, CSS y JavaScript puro, sin dependencias externas.

---

## Características

- Botones para seleccionar países y mostrar la letra de su canción.
- Soporte para múltiples países con archivos de letras en formato `.txt`.
- Interfaz simple y fácil de usar.
- Código modular y fácilmente ampliable para agregar más países o funcionalidades.

---

## Estructura del Proyecto


- `index.html`: Archivo principal de la aplicación.
- `script.js`: Código JavaScript que gestiona la lógica de mostrar letras.
- `styles.css`: Estilos de la aplicación.
- `resources/`: Carpeta donde se guardan todos los archivos de recursos (Imágenes, canciones, letras etc...).

---

## Cómo usar

1. Clona este repositorio o descarga los archivos.

2. Asegúrate de tener la estructura de carpetas con los archivos de letras en `resources/letras/`.

3. Abre el archivo `index.html` en un navegador web.

4. Pulsa el botón del país deseado para cargar y visualizar la letra de la canción.

---

## Ejemplo de uso en HTML

```html
<button class="lyrics-button" onclick="showLyrics('reino_unido', 'World\'s Museum')">🎤 Ver letra Reino Unido</button>
