Cosas a hacer:

# EN GRANDE PORQUE TIENE QUE SER LO PRIMERO A ARREGLAR MAÑANA POR LA MAÑANA

ARREGLAR LO DE LOS ABONOS EN AÑADIR FESTIVALES tendria que estar arreglado de ayer y de hecho todo funciona pero hay que cambiar un par de cosas para hacerlo y no me da tiempo ahora asi que luego lo arreglo cuando haga los pagos 

ahora mismo se muestran todos los festivales tanto para clientes como empresas. ver si en alguno de los dos casos seria mejor ocultar los cancelados (seguramente no por devoluciones y tal pero yo q se, typescript me derrite las neuronas)

## BACK

registrar las rutas y dtos nuevos en swagger

las empresas no verificadas pueden operar?? hay que revisarlo en back, en front NO pueden

si una empresa se da de baja se cancelan sus festivales? y si es baneada??

cositas que he hecho refactorizando y que es posible (probable) que hayan roto cositas del front
- todas las validaciones de absolutamente todo (porfa porfa porfa porfa no rompas nada juro haberlo hecho muy bien) (no parece que haya roto nada pero hay que hacer una prueba intensiva)
- he quitado la fecha de creacion de los dto de devolucion de clientes y empresas
comprobación festivales antes de 3 dias para poder modificarlo

## FRONT


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