import axios from 'axios';
export const api = axios.create({
    baseURL: ''//tendríamos que elegir base para la api (en la guiada estaba el puerto 3000)
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
});