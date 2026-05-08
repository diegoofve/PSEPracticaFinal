import express from 'express';
import cors from 'cors';
import {Request, Response} from 'express';
import passport from 'passport';
import { JWTStrategy } from './lib/auth.ts';//ruta del auth con el prisma (deberíamos ponerlo en lib/auth.ts);
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './middlewares/swaggerConfig.ts';
import routerPublico from './middlewares/rutaspublicas.ts';//da error porque no hay nada dentro
import routerPrivado from './middlewares/rutasprivadas.ts';

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

passport.use('jwt', JWTStrategy);
app.use(passport.initialize());

//aquí deberíamos poner las rutas protegidas y las no protegidas
app.use(routerPublico);
app.use(routerPrivado);
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})