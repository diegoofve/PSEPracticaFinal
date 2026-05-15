Cosas a hacer:

  ahora mismo se muestran todos los festivales tanto para clientes como empresas. ver si en alguno de los dos casos seria mejor ocultar los cancelados (seguramente no por devoluciones y tal pero yo q se, typescript me derrite las neuronas)

## BACK

registrar las rutas y dtos nuevos en swagger

verificar todas las validaciones de los dtos en zod y ver si deberiamos tipar los dtos de response

verificar el logger (concretamente, cambiar los mensajes para hacerlos mas especificos, como el objeto del nuevo cliente al registrar en vez de solo mandar un mensaje)

## FRONT

comprobación festivales antes de 3 dias para poder modificarlo

panel de admin

## GENERAL
- [x] Registro de usuarios ruta api
- [x] Front registro de usuarios
- [x] Inicio de sesion
- [x] Front inicio de sesion
- [x] Eliminacion de cuenta propia  
  Al borrar cuentas de usuario, settear el correo (y cualquier otro campo unique) a null
- [x] Modificacion de perfil de usuario **(opcional)**
- [X] Integracion de loggin 
- [ ] y especificacion OpenAPI **(opcional)**

## ADMINISTRACION
- [x] Consulta de gestoras, verificaciones y bloqueo
- [ ] Las organizadoras no verificadas no pueden operar en la plataforma **(opcional)**

## GESTION DE FESTIVALES
- [x] Alta de festivales
- [x] Front de alta de festis
- [x] Listado de festivales propios
- [x] Front edicion de festivales si quedan mas de 3 dias
- [x] Cancelacion de festis
- [x] Front cancelación festis
- [ ] Visualizar informacion de ventas propia
- [ ] Integracion de API musical en el detalle de los festivales, pudiendo obtener infromacion de cada artista **(opcional)**
- [x] Multiples tipos de abono por festival **(opcional)**

## VENTA DE ENTRADAS
- [x] Consulta de festivales disponibles
- [ ] Flujo de pago con la pasarela externa
- [x] Generacion de abonos con QR
- [ ] Historico de abonos comprados
- [ ] Solicitud de devoluciones para abonos candelados **(opcional)**
- [ ] Funcionalidad de pulsera monedero desde el historico, recarga y consulta de saldo **(opcional)**