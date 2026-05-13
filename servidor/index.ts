import express from 'express';
import cors from 'cors';
import passport from 'passport';
import { JWTStrategy } from './lib/auth.ts';//ruta del auth con el prisma (deberíamos ponerlo en lib/auth.ts);
import swaggerUi from 'swagger-ui-express';
import { generateSwaggerSpec } from './middlewares/swaggerConfig.ts';
import routerPublico from './middlewares/routerPublico.ts';
import routerPrivado from './middlewares/routerPrivado.ts';
import { errorHandler } from './middlewares/errorHandler.ts';

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => { //de momento dejar por debug. loguea todas las peticiones. cambiar a middleware de loggeo eventualmente
    console.log(`${req.method} ${req.path}`)
    next()
})

app.use('/api', swaggerUi.serve, swaggerUi.setup(generateSwaggerSpec()));

passport.use('jwt', JWTStrategy);
app.use(passport.initialize());

//aquí deberíamos poner las rutas protegidas y las no protegidas
app.use(routerPublico);
app.use(routerPrivado);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})