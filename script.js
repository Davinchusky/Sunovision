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
      document.getElementById('lyrics-body').innerHTML = 
                  text.replace(/\n/g, "<br>")
                      .replace(/\[Clapping\]/gi, '<span class="etiqueta-intro-outro">[Clapping]</span>')
                      .replace(/\[Intro\]/gi, '<span class="etiqueta-intro-outro">[Intro]</span>')
                      .replace(/\[Intro Spoken\]/gi, '<span class="etiqueta-intro-outro">[Intro Spoken]</span>')
                      .replace(/\[Intro Instrumental\]/gi, '<span class="etiqueta-intro-outro">[Intro Instrumental]</span>')
                      .replace(/\[Outro\]/gi, '<span class="etiqueta-intro-outro">[Outro]</span>')
                      .replace(/\[Coro\]/gi, '<span class="etiqueta-coro">[Coro]</span>')
                      .replace(/\[Chorus\]/gi, '<span class="etiqueta-coro">[Chorus]</span>')
                      .replace(/\[Final Chorus\]/gi, '<span class="etiqueta-coro">[Final Chorus]</span>')
                      .replace(/\[Pre-Chorus\]/gi, '<span class="etiqueta-coro">[Pre-Chorus]</span>')
                      .replace(/\[Post-Chorus\]/gi, '<span class="etiqueta-coro">[Post-Chorus]</span>')
                      .replace(/\[Pre-Estribillo\]/gi, '<span class="etiqueta-coro">[Pre-Estribillo]</span>')
                      .replace(/\[Estribillo\]/gi, '<span class="etiqueta-coro">[Estribillo]</span>')
                      .replace(/\[Estribillo 1\]/gi, '<span class="etiqueta-coro">[Estribillo 1]</span>')
                      .replace(/\[Estribillo 2\]/gi, '<span class="etiqueta-coro">[Estribillo 2]</span>')
                      .replace(/\[Estribillo Final\]/gi, '<span class="etiqueta-coro">[Estribillo Final]</span>')
                      .replace(/\[Verso\]/gi, '<span class="etiqueta-verso">[Verso]</span>')
                      .replace(/\[Verso 1\]/gi, '<span class="etiqueta-verso">[Verso 1]</span>')
                      .replace(/\[Verso 2\]/gi, '<span class="etiqueta-verso">[Verso 2]</span>')
                      .replace(/\[Verso 3\]/gi, '<span class="etiqueta-verso">[Verso 3]</span>')
                      .replace(/\[Verso 4\]/gi, '<span class="etiqueta-verso">[Verso 4]</span>')
                      .replace(/\[Verso 5\]/gi, '<span class="etiqueta-verso">[Verso 5]</span>')
                      .replace(/\[Verso 6\]/gi, '<span class="etiqueta-verso">[Verso 6]</span>')
                      .replace(/\[Puente\]/gi, '<span class="etiqueta-verso">[Puente]</span>')
                      .replace(/\[Bridge\]/gi, '<span class="etiqueta-verso">[Bridge]</span>')
                      .replace(/\[Pre-Bridge\]/gi, '<span class="etiqueta-verso">[Pre-Bridge]</span>')
                      .replace(/\[Verse\]/gi, '<span class="etiqueta-verso">[Verse]</span>')
                      .replace(/\[Verse 1\]/gi, '<span class="etiqueta-verso">[Verse 1]</span>')
                      .replace(/\[Verse 2\]/gi, '<span class="etiqueta-verso">[Verse 2]</span>')
                      .replace(/\[Verse 3\]/gi, '<span class="etiqueta-verso">[Verse 3]</span>')
                      .replace(/\[Verse 4\]/gi, '<span class="etiqueta-verso">[Verse 4]</span>')
                      .replace(/\[Verse 5\]/gi, '<span class="etiqueta-verso">[Verse 5]</span>')
                      .replace(/\[Verse 6\]/gi, '<span class="etiqueta-verso">[Verse 6]</span>')
                      .replace(/\[Verse 7\]/gi, '<span class="etiqueta-verso">[Verse 7]</span>')
                      .replace(/\[Guitar Solo – Spanish Guitar\]/gi, '<span class="etiqueta-otros">[Guitar Solo – Spanish Guitar]</span>')
                      .replace(/\[Instrumental\]/gi, '<span class="etiqueta-verso">[Instrumental]</span>');

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
