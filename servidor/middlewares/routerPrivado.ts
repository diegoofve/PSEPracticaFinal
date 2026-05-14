import { Router } from 'express';
import passport from 'passport';
import { FestivalController } from '../controllers/festival.controller';
import { authorize } from './auth';
import { AuthController } from '../controllers/auth.controller';

import { tempEndpoint } from '../lib/util';

const routerPrivado = Router();

//Festivales
routerPrivado.get('/festivales', passport.authenticate('jwt', { session: false }), authorize(["CLIENTE"]), 
tempEndpoint) //devolver la info de todos los festivales
routerPrivado.post('/festivales', passport.authenticate('jwt', { session: false }), authorize(["EMPRESA"]), 
FestivalController.crearFestival)
routerPrivado.put('/festivales', passport.authenticate('jwt', { session: false }), authorize(["EMPRESA"]), 
tempEndpoint) //editar un festival
routerPrivado.post('/festivales/nuevoAbono', passport.authenticate('jwt', { session: false }), authorize(["EMPRESA"]), 
tempEndpoint) //crear nuevos abonos
routerPrivado.delete('/festivales', passport.authenticate('jwt', { session: false }), authorize(["EMPRESA"]), 
tempEndpoint)

//Admin
routerPrivado.put('/admin', passport.authenticate('jwt', { session: false }), authorize(["ADMIN"]), 
tempEndpoint) //verificar empresa o banear empresa o usuario
routerPrivado.get('/empresas', passport.authenticate('jwt', { session: false }), authorize(["ADMIN"]), 
tempEndpoint)
routerPrivado.get('/clientes', passport.authenticate('jwt', { session: false }), authorize(["ADMIN"]), 
tempEndpoint)

//Perfil de cliente
routerPrivado.get('/cliente', passport.authenticate('jwt', { session: false }), authorize(["CLIENTE"]),
tempEndpoint) //devolver la info de un cliente
routerPrivado.put('/cliente', passport.authenticate('jwt', { session: false }), authorize(["CLIENTE"]),
AuthController.updateCliente)
routerPrivado.delete('/cliente', passport.authenticate('jwt', { session: false }), authorize(["CLIENTE"]),
AuthController.deleteCliente)


//Perfil de empresa
routerPrivado.get('/empresa', passport.authenticate('jwt', { session: false }), authorize(["EMPRESA"]),
tempEndpoint)// devolver info de una empresa
routerPrivado.put('/empresa', passport.authenticate('jwt', { session: false }), authorize(["EMPRESA"]), 
AuthController.updateEmpresa)
routerPrivado.delete('/empresa', passport.authenticate('jwt', { session: false }), authorize(["EMPRESA"]), 
AuthController.deleteEmpresa)

//Pagos
routerPrivado.post('/payment', passport.authenticate('jwt', { session: false }), authorize(["CLIENTE"]), 
tempEndpoint)//hacer un pago
routerPrivado.get('/cliente/abonos', passport.authenticate('jwt', { session: false }), authorize(["CLIENTE"]), 
tempEndpoint) //ver los abonos comprados por un cliente
routerPrivado.get('/empresa/ventas', passport.authenticate('jwt', { session: false }), authorize(["EMPRESA"]), 
tempEndpoint)

export default routerPrivado;