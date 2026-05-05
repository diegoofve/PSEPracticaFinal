Cosas a hacer:

Cambiar en `package.json` el script de entrada de servidor(`npm run server`) esta apuntado a `/index.ts`. Cambiar según movamos/creemos el index.

**SCHEMA PRISMA**

## Paquetes de node
Ver que falta de cada cosa
Revisar si las dependencias de dev estan bien puestas tambien
### Cliente
- vite

### Servidor
- Express
- Nodemon
- Path
- CORS
- Typescript
- Prisma
- pg
- Dotenv
- passportjwt
- jsonwebtoken
- bcryptjs

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