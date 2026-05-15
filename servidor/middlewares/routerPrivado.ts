import { Router } from 'express';
import passport from 'passport';
import { FestivalController } from '../controllers/festival.controller';
import { authorize } from './auth';
import { tempEndpoint } from '../lib/util';
import { ClienteController } from '../controllers/cliente.controller';
import { EmpresaController } from '../controllers/empresa.controller';
import { AdminController } from '../controllers/admin.controller';

const routerPrivado = Router();

//Festivales
routerPrivado.get('/festivales', passport.authenticate('jwt', { session: false }), authorize(["CLIENTE"]), 
FestivalController.getFestivales) //devolver la info de todos los festivales
routerPrivado.get('/festivales/empresa', passport.authenticate('jwt', { session: false }), authorize(["EMPRESA"]), 
FestivalController.getFestivalesEmpresa) //devolver la info de todos los festivales
routerPrivado.post('/festivales', passport.authenticate('jwt', { session: false }), authorize(["EMPRESA"]), 
FestivalController.crearFestival)
routerPrivado.put('/festivales/:id', passport.authenticate('jwt', { session: false }), authorize(["EMPRESA"]), 
FestivalController.updateFestival) //editar un festival
routerPrivado.post('/festivales/:id/nuevoAbono', passport.authenticate('jwt', { session: false }), authorize(["EMPRESA"]), 
FestivalController.crearAbono) //crear nuevos abonos
routerPrivado.delete('/festivales:id', passport.authenticate('jwt', { session: false }), authorize(["EMPRESA"]), 
FestivalController.bajaFestival)

//Perfil de cliente
routerPrivado.get('/cliente/:id', passport.authenticate('jwt', { session: false }), authorize(["CLIENTE"]),
ClienteController.getCliente) //devolver la info de un cliente
routerPrivado.put('/cliente', passport.authenticate('jwt', { session: false }), authorize(["CLIENTE"]),
ClienteController.updateCliente)
routerPrivado.delete('/cliente', passport.authenticate('jwt', { session: false }), authorize(["CLIENTE"]),
ClienteController.bajaCliente)


//Perfil de empresa
routerPrivado.get('/empresa/:id', passport.authenticate('jwt', { session: false }), authorize(["EMPRESA"]),
EmpresaController.getEmpresa)// devolver info de una empresa
routerPrivado.put('/empresa', passport.authenticate('jwt', { session: false }), authorize(["EMPRESA"]), 
EmpresaController.updateEmpresa)
routerPrivado.delete('/empresa', passport.authenticate('jwt', { session: false }), authorize(["EMPRESA"]), 
EmpresaController.bajaEmpresa)

//Pagos
routerPrivado.post('/payment', passport.authenticate('jwt', { session: false }), authorize(["CLIENTE"]), 
tempEndpoint)//hacer un pago
routerPrivado.get('/cliente/:id/abonos', passport.authenticate('jwt', { session: false }), authorize(["CLIENTE"]), 
ClienteController.getAbonosCliente) //ver los abonos comprados por un cliente
routerPrivado.get('/empresa/:id/ventas', passport.authenticate('jwt', { session: false }), authorize(["EMPRESA"]), 
EmpresaController.getVentasEmpresa)

//Admin
routerPrivado.put('/admin/empresa/:id/banear', passport.authenticate('jwt', { session: false }), authorize(["ADMIN"]), 
AdminController.banearEmpresa)
routerPrivado.put('/admin/cliente/:id/banear', passport.authenticate('jwt', { session: false }), authorize(["ADMIN"]), 
AdminController.banearCliente)
routerPrivado.put('/admin/empresa/:id/estado', //passport.authenticate('jwt', { session: false }), authorize(["ADMIN"]), 
AdminController.cambiarEstadoEmpresa)

routerPrivado.get('/empresas', passport.authenticate('jwt', { session: false }), authorize(["ADMIN"]), 
EmpresaController.getEmpresas)
routerPrivado.get('/clientes', passport.authenticate('jwt', { session: false }), authorize(["ADMIN"]), 
ClienteController.getClientes)

export default routerPrivado;