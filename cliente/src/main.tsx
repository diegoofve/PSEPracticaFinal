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
//import {AdminPanel} from './routes/usuarios/AdminPanel'

import {ModificarPerfil} from './routes/usuarios/ModificarPerfilCliente.tsx'

//import {FestivalesList} from './routes/festivales/FestivalesList' //poder filtrar por lista festivales entero/festivales propios + dar de alta un festival + modificarlo y eliminarlo
import {ModificarFestival} from './routes/festivales/ModificarFestival'
//import { GestionAbonos } from './routes/festivales/GestionAbonos.tsx';

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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/modificar-perfil" element={<Layout><ModificarPerfil /></Layout>} />
          <Route path="/modificar-festival" element={<Layout><ModificarFestival /></Layout>} />
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)

/*

          <Route path="/FestivalesList" element={<Layout><FestivalesList /></Layout>} />
          <Route path="/modificar-festival" element={<Layout><ModificarFestival /></Layout>} />
          <Route path="/AdminPanel" element={<Layout><AdminPanel /></Layout>} />
          <Route path="/gestion-abonos" element={<Layout><GestionAbonos /></Layout>} />

*/