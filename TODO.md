Cosas a hacer:

Revisar que el schema de prisma este bien, cuanto antes mejor porque ya he visto un par de cosas que no pusimos

registrar las rutas y dtos nuevos en swagger

revisar los regex de el auth.dto.ts porque no me fio de claude y ver si quiza no seria mejor hacer las validaciones con funciones aparte o algo para devolver errores mejor

errorHandler (ver todos los TODO:err para ver donde hay que sustituir errores)

buySchema en payment.dto para mandar los datos a la api de pagos desde el front

acabar todo el apartado de festivales (controller, service, dtos)

## GENERAL
- [x] Registro de usuarios ruta api
- [ ] Front registro de usuarios
- [x] Inicio de sesion
- [ ] Front inicio de sesion
- [x] Eliminacion de cuenta propia  
  Al borrar cuentas de usuario, settear el correo (y cualquier otro campo unique) a null
- [x] Modificacion de perfil de usuario **(opcional)**
- [ ] Integracion de loggin y especificacion OpenAPI **(opcional)**

## ADMINISTRACION
- [ ] Consulta de gestoras, verificaciones y bloqueo
- [ ] Las organizadoras no verificadas no pueden operar en la plataforma **(opcional)**

## GESTION DE FESTIVALES
- [x] Alta de festivales
- [ ] Front de alta de festis
- [ ] Listado de festivales propios
- [ ] Edicion de festivales si quedan mas de 3 dias
- [ ] Cancelacion de festis
- [ ] Visualizar informacion de ventas propia
- [ ] Integracion de API musical en el detalle de los festivales, pudiendo obtener infromacion de cada artista **(opcional)**
- [ ] Multiples tipos de abono por festival **(opcional)**

## VENTA DE ENTRADAS
- [ ] Consulta de festivales disponibles
- [ ] Flujo de pago con la pasarela externa
- [ ] Generacion de abonos con QR
- [ ] Historico de abonos comprados
- [ ] Solicitud de devoluciones para abonos candelados **(opcional)**
- [ ] Funcionalidad de pulsera monedero desde el historico, recarga y consulta de saldo **(opcional)**