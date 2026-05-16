import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import App from './App.tsx'

import './index.css'
import { AuthProvider } from './context/AuthContext'
import {Layout} from './routes/aux1/Layout'

import {Login} from './routes/usuarios/Login'
import {Register} from './routes/usuarios/Register'
import {AdminPanel} from './routes/usuarios/AdminPanel'

import {ModificarPerfilCliente} from './routes/usuarios/ModificarPerfilCliente.tsx'

import {FestivalesList} from './routes/festivales/FestivalesList' //poder filtrar por lista festivales entero/festivales propios + dar de alta un festival + modificarlo y eliminarlo
import {ModificarFestival} from './routes/festivales/ModificarFestival'
import { GestionAbonos } from './routes/festivales/GestionAbonos.tsx';
import {DatosEmpresa} from './routes/usuarios/DatosEmpresa.tsx'

const theme = createTheme({ //esto lo ha generado el completar del visual, toca cambiarlo y hacer estéticamente más bonito
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Layout><Login /></Layout>} />
          <Route path="/register" element={<Layout><Register /></Layout>} />
          <Route path="/modificar-perfil-cliente" element={<Layout><ModificarPerfilCliente /></Layout>} />
          <Route path="/modificar-festival/:id?" element={<Layout><ModificarFestival /></Layout>} />
          <Route path="/festivales-list" element={<Layout><FestivalesList /></Layout>} />
          <Route path="/admin-panel" element={<Layout><AdminPanel /></Layout>} />
          <Route path="/gestion-abonos" element={<Layout><GestionAbonos /></Layout>} />
          <Route path="/datos-empresa" element={<Layout><DatosEmpresa /></Layout>} />
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)
