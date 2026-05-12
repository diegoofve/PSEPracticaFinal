import { useState } from 'react';
import { Box, Typography, TextField, Button, CircularProgress, Alert, InputAdornment, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import BadgeIcon from '@mui/icons-material/Badge';
import PhoneIcon from '@mui/icons-material/Phone';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

import { useAuth } from '../../context/AuthContext';
import { api } from '../../lib/api.ts';
import Register from './Register.css';

export const RegisterClient = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    fechaNacimiento: '',
    dni: '',
    telefono: '',
    email: '',
    password: '',
    razon: '',
    cif: '',
    domicilio: '',
    nombreContacto: '',
    telefono: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof typeof formData | 'api', string>>>({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateUSER = () => {
    const newErrors: typeof errors = {};

    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio';
    if (!formData.apellidos.trim()) newErrors.apellidos = 'Los apellidos son obligatorios';

    if (!formData.fechaNacimiento) {
      newErrors.fechaNacimiento = 'La fecha es obligatoria';
    } else {
      const birthDate = new Date(formData.fechaNacimiento);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (age < 18) newErrors.fechaNacimiento = 'Debes ser mayor de edad para registrarte.';
    }

    const dniRegex = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i;
    if (!dniRegex.test(formData.dni)) newErrors.dni = 'DNI no válido.';

    const telefonoRegex = /^(\+34|0034|34)?[6789]\d{8}$/;
    if (!telefonoRegex.test(formData.telefono)) newErrors.telefono = 'Teléfono no válido.';

    if (!formData.email.includes('@')) newErrors.email = 'El email es inválido';
    if (formData.password.length < 8) newErrors.password = 'Mínimo 8 caracteres';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateEMPRESA = () => {
    const newErrors: typeof errors = {};
  if (!formData.razon.trim()) {
    newErrors.razon = 'La razón social es obligatoria';
  }
  const cifRegex = /^[ABCDEFGHJKLMNPQRSUVWabcdefghjklmnpqrsuvw][0-9]{8}$/;
  if (!cifRegex.test(formData.cif)) {
    newErrors.cif = 'CIF no válido.';
  }
  if (!formData.domicilio.trim()) {
    newErrors.domicilio = 'El domicilio es obligatorio';
  }
  if (!formData.nombreContacto.trim()) {
    newErrors.nombreContacto = 'El nombre de contacto es obligatorio';
  }
  const telefonoRegex = /^(\+34|0034|34)?[6789]\d{8}$/;
  if (!telefonoRegex.test(formData.telefono)) {
    newErrors.telefono = 'Teléfono no válido.';
  }
  if (!formData.email.includes('@')) {
    newErrors.email = 'El email es inválido';
  }
  if (formData.password.length < 8) {
    newErrors.password = 'Mínimo 8 caracteres';
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

  const handleSubmitClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateUSER()) return;

    setLoading(true);
    setErrors({});

    try {
      const response = await api.post('/', formData); //cual era la api para el cliente?? xd
      login(response.data.token);
      navigate('/FestivalesList');
    } catch (error: any) {
      setErrors({ api: error.response?.data?.message || 'Error al registrar la cuenta del cliente' });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitEmpresa = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEMPRESA()) return;

    setLoading(true);
    setErrors({});

    try {
      const response = await api.post('/', formData); //cual era la api para la empresa???
      login(response.data.token);
      navigate('/FestivalesList');
    } catch (error: any) {
      setErrors({ api: error.response?.data?.message || 'Error al registrar la cuenta del festival' });
    } finally {
      setLoading(false);
    }

  return (
    );
};