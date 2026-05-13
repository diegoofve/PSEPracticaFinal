import { Router } from 'express';
import passport from 'passport';
import { FestivalController } from '../controllers/festival.controller';
import { authorize } from './auth';
import { AuthController } from '../controllers/auth.controller';

const routerPrivado = Router();

routerPrivado.post('/festivales', passport.authenticate('jwt', { session: false }), authorize(["EMPRESA"]), 
FestivalController.crearFestival)

routerPrivado.put('/register/cliente', passport.authenticate('jwt', { session: false }), authorize(["CLIENTE"]),
AuthController.updateCliente)
routerPrivado.delete('/register/cliente', passport.authenticate('jwt', { session: false }), authorize(["CLIENTE"]),
AuthController.deleteCliente)

routerPrivado.put('/register/empresa', passport.authenticate('jwt', { session: false }), authorize(["EMPRESA"]), 
AuthController.updateEmpresa)
routerPrivado.delete('/register/empresa', passport.authenticate('jwt', { session: false }), authorize(["EMPRESA"]), 
AuthController.deleteEmpresa)

export default routerPrivado;