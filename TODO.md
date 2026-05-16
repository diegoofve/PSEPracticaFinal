Cosas a hacer:

# EN GRANDE PORQUE TIENE QUE SER LO PRIMERO A ARREGLAR MAÑANA POR LA MAÑANA

ARREGLAR LO DE LOS ABONOS EN AÑADIR FESTIVALES tendria que estar arreglado de ayer y de hecho todo funciona pero hay que cambiar un par de cosas para hacerlo y no me da tiempo ahora asi que luego lo arreglo cuando haga los pagos 

ahora mismo se muestran todos los festivales tanto para clientes como empresas. ver si en alguno de los dos casos seria mejor ocultar los cancelados (seguramente no por devoluciones y tal pero yo q se, typescript me derrite las neuronas)

## BACK

registrar las rutas y dtos nuevos en swagger


## FRONT

comprobación festivales antes de 3 dias para poder modificarlo

panel de admin (falta poder banear clientes y empresas) -> esta
corregir registrado en invalid date admin -> esta (me lo he cargado)
corregir asignar campos al formulario de editar perfiles -> esta
corregir payload de las peticiones de update de perfiles -> esto que era????
al eliminar el usuario/empresa eliminar el jwt -> esta
minor: borrar datos del formulario al crear el festivalk
añadir ver festivales a las empresas
al poner la fecha de caducidad al pagar la barra no se pone sola (1229 en vez de 12/29)
el error de pago sale detras de la pantalla de pago
id de transaccion asterisco en el qr del pago
no se muestran los beneficios de la empresa en el dashboard
paginas blancas????

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
- [X$$] Visualizar informacion de ventas propia
- [ ] Integracion de API musical en el detalle de los festivales, pudiendo obtener infromacion de cada artista **(opcional)**
- [x] Multiples tipos de abono por festival **(opcional)**

## VENTA DE ENTRADAS
- [X] Consulta de festivales disponibles
- [X] Flujo de pago con la pasarela externa
- [X] Generacion de abonos con QR
- [X] Historico de abonos comprados
- [ ] Solicitud de devoluciones para abonos candelados **(opcional)**
- [ ] Funcionalidad de pulsera monedero desde el historico, recarga y consulta de saldo **(opcional)**