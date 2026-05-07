import express from 'express';
import cors from 'cors';
import {Request, Response} from 'express';
import passport from 'passport';
import { JWTStrategy } from '';//ruta del auth con el prisma (deberíamos ponerlo en lib/auth.ts);
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import rutaspublicas from './middlewares/rutaspublicas.ts';//da error porque no hay nada dentro
import rutasprivadas from './middlewares/rutasprivadas.ts';

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(cors());

//aquí tedríamos que poner el swagger y todo eso


passport.use('jwt', JWTStrategy);
app.use(passport.initialize());

//aquí deberíamos poner las rutas protegidas y las no protegidas
app.use(rutaspublicas);
app.use(rutasprivadas);
app.listen(PORT, () => {
    console.log(`Servidor corriendo en  puerto ${PORT}`);
})