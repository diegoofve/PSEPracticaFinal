import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

const routerPublico = Router();

routerPublico.post('/login', AuthController.login);

routerPublico.post('/register/cliente', AuthController.registerCliente);
routerPublico.post('/register/empresa', AuthController.registerEmpresa);

export default routerPublico;