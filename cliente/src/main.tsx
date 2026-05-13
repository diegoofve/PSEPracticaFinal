import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import App from './App.tsx'

import './index.css'
import { AuthProvider } from './context/AuthContext'
import {Layout} from './routes/aux/Layout'
import {Navbar} from './routes/aux/Navbar'

import {Login} from './routes/usuarios/Login'
import {Register} from './routes/usuarios/Register'
//import {AdminPanel} from './routes/usuarios/AdminPanel'

//import {ModificarPerfil} from './routes/usuarios/ModificarPerfil'

//import {FestivalesList} from './routes/festivales/FestivalesList' //poder filtrar por lista festivales entero/festivales propios + dar de alta un festival + modificarlo y eliminarlo
//import {ModificarFestival} from './routes/festivales/ModificarFestival'

//import {HistorialAbonos} from './routes/festivales/HistorialAbonos'

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
          <Route path="/" element={<Layout><App /></Layout>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)

/*
<Route path="/modificar-perfil" element={<Layout><ModificarPerfil /></Layout>} />
          <Route path="/FestivalesList" element={<Layout><FestivalesList /></Layout>} />
          <Route path="/modificar-festival" element={<Layout><ModificarFestival /></Layout>} />
          <Route path="/historial-abonos" element={<Layout><HistorialAbonos /></Layout>} />
          <Route path="/AdminPanel" element={<Layout><AdminPanel /></Layout>} />
          */