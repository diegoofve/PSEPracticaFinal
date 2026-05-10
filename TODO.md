Cosas a hacer:

Revisar que el schema de prisma este bien

ver si tiene sentido separar la ruta de /register en 2 para mejor claridad y documentacion (de momento chill q funciona bien)

revisar los regex de el auth.dto.ts porque no me fio de claude y ver si quiza no seria mejor hacer las validaciones con funciones aparte o algo para devolver errores mejor

errorHandler (ver todos los TODO:err para ver donde hay que sustituir errores)

buySchema en payment.dto para mandar los datos a la api de pagos desde el front

## GENERAL
- [ ] Registro de usuarios
- [ ] Inicio de sesion
- [ ] Eliminacion de cuenta propia  
  Al borrar cuentas de usuario, settear el correo (y cualquier otro campo unique) a null
- [ ] Modificacion de perfil de usuario **(opcional)**
- [ ] Integracion de loggin y especificacion OpenAPI **(opcional)**

## ADMINISTRACION
- [ ] Consulta de gestoras, verificaciones y bloqueo
- [ ] Las organizadoras no verificadas no pueden operar en la plataforma **(opcional)**

## GESTION DE FESTIVALES
- [ ] Alta de festivales
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