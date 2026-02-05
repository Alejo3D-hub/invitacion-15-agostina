import "./styles.css";
import { useRef, useState } from "react";

const GALLERY_ENABLED = false;

function App() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // estados del sobre
  const [opened, setOpened] = useState(false);
  const [closing, setClosing] = useState(false);
  // estado del playlist
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);
  const [menuEspecial, setMenuEspecial] = useState("");
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isGiftsOpen, setIsGiftsOpen] = useState(false);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const openEnvelope = () => {
    setClosing(true);

    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }

    setTimeout(() => {
      setOpened(true);
    }, 600); // coincide con el fade-out del CSS
  };
  const galleryImages = ["/gallery/1.jpg", "/gallery/2.jpg", "/gallery/3.jpg"];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copiado al portapapeles 💖");
  };

  const [showDressCode, setShowDressCode] = useState(false);

  return (
    <div>
      {/* AUDIO */}
      <audio ref={audioRef} loop preload="auto">
        <source src="/musica.mp3" type="audio/mpeg" />
      </audio>

      {/* SOBRE */}
      {!opened && (
        <div
          className={`envelope-screen ${closing ? "fade-out" : ""}`}
          onClick={openEnvelope}
        >
          <img src="/sobre.png" alt="Abrir invitación" className="envelope" />
          <div className="envelope-text">TOCÁ PARA ABRIR LA INVITACIÓN</div>
        </div>
      )}

      {/* INVITACIÓN */}
      {opened && (
        <>
          {/* 👉 NAV  */}
          <nav className="custom-nav">
            <div className="nav-container">
              <div className="nav-left">
                <span className="nav-logo">Agostina · 15</span>
              </div>

              <div className="nav-right">
                <input type="checkbox" id="nav-toggle" />
                <label htmlFor="nav-toggle" className="nav-hamburger">
                  <span></span>
                  <span></span>
                  <span></span>
                </label>

                <ul className="nav-menu">
                  <li>
                    <a href="#inicio">Inicio</a>
                  </li>
                  <li>
                    <a href="#confirmar">Confirmar</a>
                  </li>
                  <li>
                    <a href="#ubicacion">Ubicación</a>
                  </li>
                  <li className="nav-item">
                    <button
                      type="button"
                      className="nav-link playlist-btn"
                      onClick={() => setIsPlaylistOpen(true)}
                    >
                      Playlist
                    </button>
                  </li>
                  {GALLERY_ENABLED ? (
                    <li>
                      <button
                        type="button"
                        className="nav-link"
                        onClick={() => setIsGalleryOpen(true)}
                      >
                        Galería
                      </button>
                    </li>
                  ) : (
                    <li className="disabled">Galería</li>
                  )}
                  <li className="nav-item">
                    <button
                      type="button"
                      className="nav-link"
                      onClick={() => setIsGiftsOpen(true)}
                    >
                      Regalos
                    </button>
                  </li>
                  <li>
                    <button
                      className="nav-link"
                      onClick={() => setShowDressCode(true)}
                    >
                      Vestimenta
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          {/* BOTÓN MÚSICA */}
          <button className="music-btn" onClick={toggleMusic}>
            {isPlaying ? "⏸ Pausar música" : "▶ Reproducir música"}
          </button>

          {/* HERO / PORTADA */}
          <section id="inicio" className="hero">
            <img
              src="/titulo.png"
              alt="Los 15 de Agostina"
              className="hero-title"
            />

            <img
              src="/FRASE.png"
              alt="frase de invitación"
              className="hero-subtitle"
            />

            {/* <a href="#confirmar" className="btn btn-primary mt-3">
              Confirmar Asistencia
            </a> */}
          </section>

          {/* CONFIRMAR ASISTENCIA */}
          <section id="confirmar" className="container my-5">
            <h2 className="text-center mb-4">Confirmar Asistencia</h2>

            <form
              action="https://formspree.io/f/xqagvrwn"
              method="POST"
              className="form-wrapper mx-auto"
            >
              <div className="mb-3">
                <label className="form-label text-center w-100">
                  Nombre y Apellido
                </label>
                <input
                  type="text"
                  name="nombre"
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-center w-100">
                  Cantidad de personas
                </label>
                <input
                  type="number"
                  name="personas"
                  className="form-control"
                  min="1"
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="menuEspecial">
                  ¿Necesitás un menú especial?
                </label>

                <select
                  id="menuEspecial"
                  name="menuEspecial"
                  value={menuEspecial}
                  onChange={(e) => setMenuEspecial(e.target.value)}
                >
                  <option value="">No necesito menú especial</option>
                  <option value="celiaco">Menú celíaco</option>
                  <option value="diabetico">Menú vegetariano</option>
                  <option value="otros">Otros</option>
                </select>

                {menuEspecial === "otros" && (
                  <input type="text" placeholder="Indicá el menú especial" />
                )}
              </div>

              <button type="submit" className="btn btn-warning w-100">
                <strong>Enviar Confirmación</strong>
              </button>
            </form>
          </section>

          {/* MAPA */}
          <section id="ubicacion" className="container my-5 text-center">
            <h2 className="mb-4">Ubicación del Salón</h2>

            <h3 className="location-name">📍 Complejo Recreativo IPS</h3>

            <p className="location-address">
              Ruta Nacional 12 N3308, Candelaria, Misiones
            </p>

            <a
              href="https://www.google.com/maps?q=Complejo+Recreativo+IPS+Candelaria+Misiones"
              target="_blank"
              rel="noopener noreferrer"
              className="maps-link"
            >
              Abrir en Google Maps
            </a>

            <div className="map-wrapper mx-auto">
              <div className="ratio ratio-16x9">
                <iframe
                  src="https://www.google.com/maps?q=Complejo%20Recreativo%20IPS%20Candelaria%20Misiones&output=embed"
                  loading="lazy"
                  allowFullScreen
                  title="Ubicación Complejo Recreativo IPS"
                ></iframe>
              </div>
              <p className="mb-3 mt-3">
                <strong>
                  Te esperamos para compartir una noche inolvidable 💖
                </strong>
              </p>
            </div>
          </section>
        </>
      )}
      {/* MODAL PLAYLIST */}
      {isPlaylistOpen && (
        <div className="playlist-modal-overlay">
          <div className="playlist-modal">
            <button
              className="playlist-modal-close"
              onClick={() => setIsPlaylistOpen(false)}
            >
              ✕
            </button>

            <h2>Playlist del Evento 🎶</h2>

            <form
              action="https://formspree.io/f/xgozaogk"
              method="POST"
              className="playlist-form"
            >
              <label>
                Canción
                <input type="text" name="cancion" required />
              </label>

              <label>
                Artista
                <input type="text" name="artista" required />
              </label>

              <button type="submit">Enviar canción 🎵</button>
            </form>
          </div>
        </div>
      )}
      {/* MODAL REGALOS */}
      {isGiftsOpen && (
        <div className="gifts-modal-overlay">
          <div className="gifts-modal">
            <button
              className="gifts-close"
              onClick={() => setIsGiftsOpen(false)}
            >
              ×
            </button>

            <h2 className="gifts-title">Regalos 🎁</h2>

            <p className="gifts-text">
              Si deseás hacer un regalo, podés colaborar de la siguiente manera
              💖
            </p>

            <div className="gifts-data">
              <div>
                <span>Alias</span>
                <strong>AGOSTINA-XV</strong>
                <button
                  type="button"
                  className="copy-btn"
                  onClick={() => copyToClipboard("agostina-xv")}
                >
                  Copiar alias
                </button>
              </div>

              <div>
                <span>CVU</span>
                <strong>0000003100077849384967</strong>
                <button
                  type="button"
                  className="copy-btn"
                  onClick={() => copyToClipboard("0000003100077849384967")}
                >
                  Copiar CVU
                </button>
              </div>
            </div>

            <p className="gifts-note">
              ¡Gracias por ser parte de este momento tan especial!
            </p>
          </div>
        </div>
      )}

      {/* MODAL GALERÍA */}
      {isGalleryOpen && (
        <div className="gallery-modal-overlay">
          <div className="gallery-modal">
            <button
              className="gallery-close"
              onClick={() => setIsGalleryOpen(false)}
            >
              ×
            </button>

            <h2 className="gallery-title">Galería del evento</h2>

            <p className="gallery-subtitle">
              Algunos de los momentos más especiales 💛
            </p>

            {/* ACÁ VA A IR EL CARRUSEL MÁS ADELANTE */}
            {/* GRID DE IMÁGENES (provisorio) */}
            <div className="gallery-grid">
              {galleryImages.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Foto del evento ${index + 1}`}
                  className="gallery-image"
                  onClick={() => setSelectedImage(src)}
                />
              ))}
            </div>

            <a
              href="#"
              className="gallery-link disabled"
              onClick={(e) => e.preventDefault()}
            >
              ✨ Ver todas las fotos del evento
            </a>
          </div>
        </div>
      )}
      {selectedImage && (
        <div
          className="image-viewer-overlay"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Imagen ampliada"
            className="image-viewer"
          />
        </div>
      )}
      {/* MODAL Vestimenta */}
      {showDressCode && (
        <div className="gallery-modal-overlay">
          <div className="gallery-modal">
            <button
              className="gallery-close"
              onClick={() => setShowDressCode(false)}
            >
              ×
            </button>

            <h3 className="gallery-title">Vestimenta:</h3>

            <p className="gallery-subtitle">
              <strong>Formal/Elegante</strong>
            </p>

            <p style={{ fontSize: "0.85rem", color: "#666" }}>
              Te esperamos para celebrar una noche especial ✨
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
