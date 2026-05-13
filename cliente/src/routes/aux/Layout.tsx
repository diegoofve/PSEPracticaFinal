import { Box, Typography } from '@mui/material';
import { Navbar } from './Navbar.tsx';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="layout-root">
      <div className="layout-glow lg1" />
      <div className="layout-glow lg2" />
      <div className="layout-glow lg3" />
      <div className="layout-scanlines" />

      <Navbar />

      <Box component="main" className="layout-main">
        {children}
      </Box>

      <footer className="layout-footer">
        <div className="layout-footer-inner">
          <div className="navbar-logo-mark" style={{ width: 28, height: 28, borderRadius: 7 }}>
            <span style={{ color: '#fff', fontSize: 14 }}>♪</span>
          </div>
          <div className="layout-footer-dots">
            <div className="fest-dot d1" />
            <div className="fest-dot d2" />
            <div className="fest-dot d3" />
          </div>
          <span className="layout-footer-text">
            © {new Date().getFullYear()} Fest.io. Todos los derechos reservados.
          </span>
        </div>
      </footer>

    </div>
  );
};