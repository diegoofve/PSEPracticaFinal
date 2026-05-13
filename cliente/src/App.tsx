import MusicNoteIcon from '@mui/icons-material/MusicNote';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import './App.css'
import { useNavigate } from 'react-router-dom';
export default App;

function App() {
  const navigate = useNavigate();

  return(
    <div className="app-root">

    <div className="app-glow g1" />
    <div className="app-glow g2" />
    <div className="app-glow g3" />
    <div className="app-scanlines" />

    <nav className="app-nav">
      <div className="app-nav-logo">
        <div className="app-logo-mark">
          <MusicNoteIcon sx={{ color: '#fff', fontSize: 20 }} />
        </div>
        <span className="app-logo-text">Festival Pass</span>
      </div>
      <div className="app-nav-actions">
        <button className="app-btn-ghost" onClick={() => navigate('/login')}>
          <LoginIcon sx={{ fontSize: 16 }} />
          Iniciar sesión
        </button>
        <button className="app-btn-primary" onClick={() => navigate('/register')}>
          <PersonAddIcon sx={{ fontSize: 16 }} />
          Crear cuenta
        </button>
      </div>
    </nav>

    <main className="app-hero">

      <div className="app-hero-badge">
        <span className="app-dot pulse" />
        Tu mejor plataforma para gestionar tus festivales
      </div>

      <h1 className="app-hero-title">
        Tu mejor aliado<br />
        <span className="app-hero-highlight">para administrar tu diversión</span>
      </h1>

      <p className="app-hero-subtitle">
        Descubre, compra y gestiona tus entradas para los festivales más
        increíbles del año. Todo en un solo lugar.
      </p>

      <div className="app-hero-cta">
        <button className="app-cta-primary" onClick={() => navigate('/register')}>
          <PersonAddIcon sx={{ fontSize: 18 }} />
          Crear cuenta
        </button>
        <button className="app-cta-ghost" onClick={() => navigate('/login')}>
          <LoginIcon sx={{ fontSize: 18 }} />
          Ya tengo cuenta
        </button>
      </div>

      <div className="app-features">
        {[
          { icon: <ConfirmationNumberIcon sx={{ fontSize: 24 }} />, title: 'Entradas digitales',  desc: 'Accede con tu móvil, sin colas ni papel.' },
          { icon: <HeadphonesIcon        sx={{ fontSize: 24 }} />, title: 'Lineup en directo',   desc: 'Horarios y escenarios actualizados al momento.' },
          { icon: <EmojiEventsIcon       sx={{ fontSize: 24 }} />, title: 'Experiencia única',     desc: 'Experiencia inolvidable en cada festival.' },
        ].map(({ icon, title, desc }) => (
          <div className="app-feature-card" key={title}>
            <div className="app-feature-icon">{icon}</div>
            <h3 className="app-feature-title">{title}</h3>
            <p className="app-feature-desc">{desc}</p>
          </div>
        ))}
      </div>

    </main>

    <footer className="app-footer">
      <div className="app-footer-dots">
        <div className="fest-dot d1" />
        <div className="fest-dot d2" />
        <div className="fest-dot d3" />
      </div>
      <span className="app-footer-text">© 2026 Fest.io.</span>
    </footer>

  </div>
);
};