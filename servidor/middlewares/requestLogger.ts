import pinoHttp from 'pino-http'
import { requestLogger } from '../lib/logger';

export const requestLoggerMiddleware = pinoHttp({logger: requestLogger});