import { Router } from 'express';
import passport, { authorize } from 'passport';
import { FestivalController } from '../controllers/festival.controller';

const routerPrivado = Router();

routerPrivado.post('/festivales', passport.authenticate('jwt', { session: false }), authorize(["EMPRESA", "ADMIN"]), 
FestivalController.crearFestival)

export default routerPrivado;