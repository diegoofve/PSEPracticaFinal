Cosas a hacer:

# EN GRANDE PORQUE TIENE QUE SER LO PRIMERO A ARREGLAR MAÑANA POR LA MAÑANA

ARREGLAR LO DE LOS ABONOS EN AÑADIR FESTIVALES

no es un bug como tal pero comprobar que funcione bien el login automatico del front
ENDPOINT PARA COGER DATOS DE PERFIL

## BACK

registrar las rutas y dtos nuevos en swagger

revisar los regex de el auth.dto.ts porque no me fio de claude y ver si quiza no seria mejor hacer las validaciones con funciones aparte o algo para devolver errores mejor

errorHandler (ver todos los TODO:err para ver donde hay que sustituir errores)

acabar todo el apartado de festivales (controller, service, dtos)

endpoint para ver mis datos (datos de usuario-empresa/usuario-cliente)

cositas de admin

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
- [ ] Integracion de loggin y especificacion OpenAPI **(opcional)**

## ADMINISTRACION
- [ ] Consulta de gestoras, verificaciones y bloqueo
- [ ] Las organizadoras no verificadas no pueden operar en la plataforma **(opcional)**

## GESTION DE FESTIVALES
- [x] Alta de festivales
- [x] Front de alta de festis
- [ ] Listado de festivales propios
- [x] Edicion de festivales si quedan mas de 3 dias
- [ ] Cancelacion de festis
- [x] Front cancelación festis
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