const toallasDisponibles = [
  'toalla1.jpg',
  'toalla2.jpg',
  'toalla3.jpg',
  'toalla4.jpg',
  'toalla5.jpg'
];

// Funcion que carga del json las canciones y las muestra en el html
async function cargarCanciones() {
  const response = await fetch('resources/canciones.json');
  const canciones = await response.json();
  const contenedor = document.getElementById('contenedor-canciones');

  canciones.forEach(({ pais, titulo, id, portada }) => {
    const card = document.createElement('div');
    card.className = 'card-wrapper';

    const toalla = toallasDisponibles[Math.floor(Math.random() * toallasDisponibles.length)];

    card.innerHTML = `
      <div class="toalla-fondo" style="background-image: url('resources/toallas/${toalla}')">
        <div class="overlay"></div>
      </div>
      <div class="show-button-card" id="btn-${id}">
        <button onclick="showCard('${id}')">▶ ${pais}</button>
      </div>
      <div class="song-card" id="${id}">
        <img src="${portada}" alt="Portada">
        <h2>${titulo}</h2>
        <p>por ${pais}</p>
        <audio controls>
          <source src="resources/canciones/${id}.mp3" type="audio/mpeg">
        </audio>
        <button class="lyrics-button" onclick="showLyrics('${id}', \`${titulo}\`)">🎤 Ver letra</button>
      </div>
    `;

    contenedor.appendChild(card);
  });
}

// Funcion que muestra la cancion al hacer click en el boton
function showCard(id) {
  document.getElementById('btn-' + id).style.display = 'none';
  const songCard = document.getElementById(id);
  songCard.style.display = 'flex';
  
  // Animacion de entrada
  songCard.classList.remove('fade-in');
  void songCard.offsetWidth; // fuerza reflow
  songCard.classList.add('fade-in');

  // Aplica la superposición oscura
  const overlay = songCard.parentElement.querySelector('.toalla-fondo .overlay');
  overlay.classList.add('oscurecer');

  const audio = songCard.querySelector('audio');
  if (audio) {
    audio.volume = 0.2;
    // Descomentar si quiero que se reproduzca automaticamente
    //audio.play();
  }
}

// Funcion que muestra la letra de la cancion al hacer click en el boton
function showLyrics(id, titulo) {
  fetch(`resources/letras/${id}.txt`)
    .then(response => response.text())
    .then(text => {
      document.getElementById('lyrics-title').textContent = `${titulo}`;
      document.getElementById('lyrics-body').innerHTML = text.replace(/\n/g, "<br>");

      // 🔒 Bloquear scroll del body
      document.body.style.overflow = 'hidden';

      const modal = document.getElementById('lyrics-modal');
      modal.classList.remove('fade-out');
      modal.style.display = 'flex';

      // Reinicia animación
      void modal.offsetWidth;
      modal.classList.add('fade-in');
    })
    .catch(err => {
      const modal = document.getElementById('lyrics-modal');
      document.getElementById('lyrics-body').textContent = 'Letra no disponible.';
      modal.classList.remove('fade-out');
      modal.style.display = 'flex';
      void modal.offsetWidth;
      modal.classList.add('fade-in');
    });
}

// Funcion que cierra el modal de la letra
function closeLyrics() {
  const modal = document.getElementById('lyrics-modal');
  modal.classList.remove('fade-in');
  modal.classList.add('fade-out');

  // ✅ Restaurar scroll del body
  document.body.style.overflow = '';

  // Esperar a que termine la animación antes de ocultar
  modal.addEventListener('animationend', function onEnd() {
    modal.style.display = 'none';
    modal.removeEventListener('animationend', onEnd);
  });
}

// Cerrar el modal al hacer click fuera de él
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeLyrics();
});

// Cargar las canciones cuando se carga la página
window.onload = cargarCanciones;
