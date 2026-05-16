import pino from 'pino';
import path from 'path';

//cambiar la ruta antes de entregar, no tiene sentido a nivel de despliegue fisico dejarlo fuera de /servidor
const LOG_DIR = path.join(__dirname, '../../logs'); 

export const logger = pino({
    transport: {
        targets: [
            {
                target: 'pino-pretty',
                level: process.env.LOG_LEVEL || 'info',
                options: { colorize: true, translateTime: 'SYS: HH:MM:ss' }
            },
            {
                target: 'pino-roll',
                level: process.env.LOG_LEVEL || 'info',
                options: {
                    file: path.join(LOG_DIR, 'app.log'),
                    frequency: 'daily',
                    dateFormat: 'yyyy-MM-dd',
                    mkdir: true,
                    size: '50m'
                }
            }
        ]
    }
});

export const requestLogger = pino({
    transport: {
        targets: [
            {
                target: 'pino-pretty',
                level: 'info',
                options: { colorize: true, translateTime: 'SYS: HH:MM:ss' }
            },
            {
                target: 'pino-roll',
                level: 'info',
                options: {
                    file: path.join(LOG_DIR, 'requests.log'),
                    frequency: 'daily',
                    dateFormat: 'yyyy-MM-dd',
                    mkdir: true,
                    size: '50m'
                }
            }
        ]
    }
})