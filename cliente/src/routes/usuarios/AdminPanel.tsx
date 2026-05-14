/*
todos los usuarios/festivales??? xd
aceptar festivales (usuarios empresa) -> verificarlo sino, no operan
*/

import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  Stack, 
  Chip, 
  Alert, 
  CircularProgress, 
  Container, 
  Divider, 
  Grid 
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import BusinessIcon from '@mui/icons-material/Business';
import GroupIcon from '@mui/icons-material/Group';
import BarChartIcon from '@mui/icons-material/BarChart';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { api } from '../../lib/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './AdminPanel.css';

export const AdminPanel = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [pendientes, setPendientes] = useState<any[]>([]);
    //const [stats, setStats] = useState<any>(null); no funciona pero es para las estadísticas asi q chilleamos 
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        if (!user || user.rol !== 'ADMIN') {
            if (user?.rol === 'EMPRESA') {
                navigate('/modificar-festival');
            } else if (user?.rol === 'CLIENTE') {
                navigate('/festivales-list');
            } else {
                navigate('/login');
            }
        }
    }, [user, navigate]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await api.get('/');//endpoint para empresas pendientes?
            setPendientes(res.data);
            // const resStats = await api.get('/'); endpoint para sacar las estadísticas de los usuarios, que aún no esta
            // setStats(resStats.data);
        } catch (e) {
            console.error("Error cargando empresas pendientes:", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAction = async (id: number, action: 'verificar' | 'anular') => {
        try {
            const nuevoEstado = action === 'verificar' ? 'VERIFICADO' : 'ANULADO';
            await api.put(`/`, { estado: nuevoEstado });//endpoint para verificar la empresa
            
            setMessage({ 
                type: 'success', 
                text: `Perfil de empresa ${action === 'verificar' ? 'verificado' : 'rechazado'} correctamente.` 
            });
            
            setPendientes(prev => prev.filter(emp => emp.id !== id));
        } catch (e) {
            setMessage({ type: 'error', text: "Error al procesar la acción en el servidor." });
        }
    };

    return (
        <Box className="fest-admin-root" sx={{ py: 8, minHeight: '100vh' }}>
            <div className="fest-bg-glow glow-blue" />
            <div className="fest-bg-glow glow-purple" />

            <Container maxWidth="md" sx={{ position: 'relative', zIndex: 10 }}>
                <Box className="fest-admin-header" sx={{ mb: 6, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Box className="fest-icon-container" sx={{ mb: 2 }}>
                        <PersonSearchIcon sx={{ color: 'white', fontSize: 40 }} />
                    </Box>
                    <Typography variant="h3" sx={{ color: 'white', fontWeight: 'bold', fontFamily: 'Bebas Neue', letterSpacing: 2 }}>
                        Validación de Empresas
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                        Revisa y aprueba el acceso de nuevas empresas a la plataforma
                    </Typography>
                </Box>

                {/* parte de estadística del usuario que aun no esta terminado
                <Grid container spacing={3} sx={{ mb: 6 }}>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <Paper className="fest-admin-card" sx={{ p: 3, textAlign: 'center', borderBottom: '4px solid #00C2FF' }}>
                            <GroupIcon sx={{ color: '#00C2FF', fontSize: 40, mb: 1 }} />
                            <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>{stats?.totalClientes || 0}</Typography>
                            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>Clientes totales:</Typography>
                        </Paper>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <Paper className="fest-admin-card" sx={{ p: 3, textAlign: 'center', borderBottom: '4px solid #A020F0' }}>
                            <BusinessIcon sx={{ color: '#A020F0', fontSize: 40, mb: 1 }} />
                            <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>{stats?.totalEmpresas || 0}</Typography>
                            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>Empresas totales:</Typography>
                        </Paper>
                    </Grid>
                    //aquí habíamos pensado poner un total de todas las ventas de todos los festivales en la plataforma
                </Grid>
                <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)', mb: 6 }} />
                */}

                <Typography variant="h5" sx={{ color: 'white', mb: 3, fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
                    <BusinessIcon /> Solicitudes de registro
                </Typography>

                {message && (
                    <Alert severity={message.type} onClose={() => setMessage(null)} sx={{ mb: 4, borderRadius: 2 }}>
                        {message.text}
                    </Alert>
                )}

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
                        <CircularProgress color="secondary" />
                    </Box>
                ) : pendientes.length === 0 ? (
                    <Paper className="fest-admin-card" sx={{ p: 6, textAlign: 'center' }}>
                        <Typography sx={{ color: 'rgba(255,255,255,0.5)' }}>
                            No hay usuarios empresas para verificar.
                        </Typography>
                    </Paper>
                ) : (
                    <Stack spacing={3}>
                        {pendientes.map((empresa) => (
                            <Paper key={empresa.id} className="fest-admin-card" sx={{ p: 3 }}>
                                <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                                    <Grid size={{ xs: 12, md: 7 }}>
                                        <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold' }}>
                                            {empresa.nombre_empresa || empresa.nombre}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#00C2FF', mb: 1 }}>
                                            📧 {empresa.email}
                                        </Typography>
                                        <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)', my: 1.5 }} />
                                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                            CIF: {empresa.cif || "No proporcionado"}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', mt: 1 }}>
                                            Registrado el: {new Date(empresa.createdAt).toLocaleDateString()}
                                        </Typography>
                                    </Grid>

                                    <Grid size={{ xs: 12, md: 5 }}>
                                        <Stack spacing={2}>
                                            <Button 
                                                variant="contained" 
                                                fullWidth
                                                sx={{ 
                                                    background: 'linear-gradient(90deg, #00C2FF, #A020F0)',
                                                    fontWeight: 'bold',
                                                    textTransform: 'none'
                                                }}
                                                startIcon={<CheckCircleIcon />}
                                                onClick={() => handleAction(empresa.id, 'verificar')}
                                            >
                                                Verificar empresa
                                            </Button>
                                            <Button 
                                                variant="outlined" 
                                                fullWidth
                                                color="error"
                                                sx={{ textTransform: 'none', borderWidth: 2 }}
                                                startIcon={<CancelIcon />}
                                                onClick={() => handleAction(empresa.id, 'anular')}
                                            >
                                                Rechazar registro
                                            </Button>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Paper>
                        ))}
                    </Stack>
                )}
            </Container>
        </Box>
    );
};