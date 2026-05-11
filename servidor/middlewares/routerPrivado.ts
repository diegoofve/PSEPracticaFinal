import { Router } from 'express';
import passport from 'passport';
import { FestivalController } from '../controllers/festival.controller';
import { authorize } from './auth';

const routerPrivado = Router();

routerPrivado.post('/festivales', passport.authenticate('jwt', { session: false }), authorize(["EMPRESA", "ADMIN"]), 
FestivalController.crearFestival)

export default routerPrivado;