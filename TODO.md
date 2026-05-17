Cosas a hacer:
## BACK

ACABADO!! (??)
revisar bien la documentacion del swagger

## FRONT
al cerrar el qr tras una compra se recarga la pagina
cuadrar bien las fotos en las cards de festivales en cliente
mensajes de error
el qr de compra no coincide con el qr de historico abonos


toast en gestionAbonos y modificarFestival y AdminPanel y los de mas abajo
refactorizar el css en todo

## GENERAL
- [x] Registro de usuarios ruta api
- [x] Front registro de usuarios
- [x] Inicio de sesion
- [x] Front inicio de sesion
- [x] Eliminacion de cuenta propia  
  Al borrar cuentas de usuario, settear el correo (y cualquier otro campo unique) a null
- [x] Modificacion de perfil de usuario **(opcional)**
- [X] Integracion de loggin 
- [X] y especificacion OpenAPI **(opcional)**

## ADMINISTRACION
- [X] Consulta de gestoras, verificaciones y bloqueo
- [X] Las organizadoras no verificadas no pueden operar en la plataforma **(opcional)**

## GESTION DE FESTIVALES
- [x] Alta de festivales
- [x] Front de alta de festis
- [x] Listado de festivales propios
- [x] Front edicion de festivales si quedan mas de 3 dias
- [x] Cancelacion de festis
- [x] Front cancelación festis
- [X] Visualizar informacion de ventas propia
- [ ] Integracion de API musical en el detalle de los festivales, pudiendo obtener infromacion de cada artista **(opcional)**
- [x] Multiples tipos de abono por festival **(opcional)**

## VENTA DE ENTRADAS
- [X] Consulta de festivales disponibles
- [X] Flujo de pago con la pasarela externa
- [X] Generacion de abonos con QR
- [X] Historico de abonos comprados
- [ ] Solicitud de devoluciones para abonos candelados **(opcional)**
- [ ] Funcionalidad de pulsera monedero desde el historico, recarga y consulta de saldo **(opcional)**