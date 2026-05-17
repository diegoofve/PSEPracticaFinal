// 1. Array con tus clientes (He dejado 3 como muestra, pega aquí tus 30 o más)
const data = [
  {
    "nombre": "Alejandro",
    "apellidos": "Sanz Peña",
    "fechaNacimiento": "1988-03-12",
    "dni": "01234567L",
    "telefono": "+34600123456",
    "email": "alejandro.sanz@email.com",
    "password": "MiPasswordSecreta1"
  },
  {
    "nombre": "Lucía",
    "apellidos": "Gómez Garrido",
    "fechaNacimiento": "1995-07-24",
    "dni": "98765432M",
    "telefono": "611223344",
    "email": "lucia.gomez@email.com",
    "password": "ContraseñaSegura2"
  },
  {
    "nombre": "Mateo",
    "apellidos": "Fernández Vila",
    "fechaNacimiento": "2003-11-02",
    "dni": "45678912W",
    "telefono": "+34722334455",
    "email": "mateo.fernandez@email.com",
    "password": "ClaveSecreta345"
  },
  {
    "nombre": "Alba",
    "apellidos": "Martín Ruiz",
    "fechaNacimiento": "1991-01-30",
    "dni": "23456789D",
    "telefono": "633445566",
    "email": "alba.martin@email.com",
    "password": "PasswordAlba1991"
  },
  {
    "nombre": "Javier",
    "apellidos": "López Castro",
    "fechaNacimiento": "1985-05-18",
    "dni": "34567890E",
    "telefono": "+34644556677",
    "email": "javier.lopez@email.com",
    "password": "JavierLopez1985!"
  },
  {
    "nombre": "Sofía",
    "apellidos": "Jiménez Ortiz",
    "fechaNacimiento": "1999-09-09",
    "dni": "56789012T",
    "telefono": "655667788",
    "email": "sofia.jimenez@email.com",
    "password": "SofiaJimenez99*"
  },
  {
    "nombre": "David",
    "apellidos": "Moreno Vega",
    "fechaNacimiento": "1978-12-25",
    "dni": "67890123C",
    "telefono": "+34666778899",
    "email": "david.moreno@email.com",
    "password": "DavidMoreno789!"
  },
  {
    "nombre": "Emma",
    "apellidos": "Romero Navarro",
    "fechaNacimiento": "2006-04-14",
    "dni": "78901234K",
    "telefono": "677889900",
    "email": "emma.romero@email.com",
    "password": "EmmaPassword2006"
  },
  {
    "nombre": "Daniel",
    "apellidos": "Torres Molina",
    "fechaNacimiento": "1992-02-20",
    "dni": "89012345E",
    "telefono": "+34688990011",
    "email": "daniel.torres@email.com",
    "password": "Danitorres1992!"
  },
  {
    "nombre": "Paula",
    "apellidos": "Gil Serrano",
    "fechaNacimiento": "1997-10-05",
    "dni": "90123456S",
    "telefono": "699001122",
    "email": "paula.gil@email.com",
    "password": "PaulaGilSerrano97"
  },
  {
    "nombre": "Marcos",
    "apellidos": "Ramírez Benítez",
    "fechaNacimiento": "1980-06-30",
    "dni": "11223344Z",
    "telefono": "+34711223344",
    "email": "marcos.ramirez@email.com",
    "password": "MarcosRamirez1980"
  },
  {
    "nombre": "Carla",
    "apellidos": "Vargas Delgado",
    "fechaNacimiento": "2004-08-12",
    "dni": "22334455X",
    "telefono": "622334455",
    "email": "carla.vargas@email.com",
    "password": "CarlaVargas2004!"
  },
  {
    "nombre": "Adrián",
    "apellidos": "Morales Muñoz",
    "fechaNacimiento": "1994-11-15",
    "dni": "33445566Q",
    "telefono": "+34612345678",
    "email": "adrian.morales@email.com",
    "password": "AdrianMorales94!"
  },
  {
    "nombre": "Sara",
    "apellidos": "Flores Ibáñez",
    "fechaNacimiento": "2001-03-22",
    "dni": "44556677V",
    "telefono": "678123456",
    "email": "sara.flores@email.com",
    "password": "SaraFlores2001*"
  },
  {
    "nombre": "Hugo",
    "apellidos": "Suárez Soler",
    "fechaNacimiento": "1989-12-01",
    "dni": "55667788H",
    "telefono": "+34699112233",
    "email": "hugo.suarez@email.com",
    "password": "HugoSuarez1989!"
  },
  {
    "nombre": "Valeria",
    "apellidos": "Méndez Prieto",
    "fechaNacimiento": "1996-05-29",
    "dni": "66778899J",
    "telefono": "654987321",
    "email": "valeria.mendez@email.com",
    "password": "ValeriaMendez96*"
  },
  {
    "nombre": "Iván",
    "apellidos": "Blanco Ortega",
    "fechaNacimiento": "1983-02-14",
    "dni": "77889900P",
    "telefono": "+34632145789",
    "email": "ivan.blanco@email.com",
    "password": "IvanBlanco1983!"
  },
  {
    "nombre": "Claudia",
    "apellidos": "Reyes Nuñez",
    "fechaNacimiento": "2007-01-10",
    "dni": "88990011R",
    "telefono": "744556611",
    "email": "claudia.reyes@email.com",
    "password": "ClaudiaReyes2007"
  },
  {
    "nombre": "Pablo",
    "apellidos": "Márquez Lozano",
    "fechaNacimiento": "1990-08-08",
    "dni": "99001122A",
    "telefono": "+34600998877",
    "email": "pablo.marquez@email.com",
    "password": "PabloMarquez1990"
  },
  {
    "nombre": "Martina",
    "apellidos": "Santos Cruz",
    "fechaNacimiento": "2000-06-17",
    "dni": "00112233B",
    "telefono": "688224466",
    "email": "martina.santos@email.com",
    "password": "MartinaSantos2000"
  },
  {
    "nombre": "Mario",
    "apellidos": "Ortega Montero",
    "fechaNacimiento": "1993-04-05",
    "dni": "12345678Z",
    "telefono": "+34611554433",
    "email": "mario.ortega@email.com",
    "password": "MarioOrtega1993!"
  },
  {
    "nombre": "Elena",
    "apellidos": "Pastor Solís",
    "fechaNacimiento": "1998-11-12",
    "dni": "23456781C",
    "telefono": "622665544",
    "email": "elena.pastor@email.com",
    "password": "ElenaPastor1998*"
  },
  {
    "nombre": "Ruben",
    "apellidos": "Gallardo Rivas",
    "fechaNacimiento": "1987-09-21",
    "dni": "34567812K",
    "telefono": "+34633776655",
    "email": "ruben.gallardo@email.com",
    "password": "RubenGallardo87!"
  },
  {
    "nombre": "Natalia",
    "apellidos": "Benítez Peña",
    "fechaNacimiento": "2002-02-28",
    "dni": "45678123D",
    "telefono": "644887766",
    "email": "natalia.benitez@email.com",
    "password": "NataliaBenitez02"
  },
  {
    "nombre": "Carlos",
    "apellidos": "Crespo Vidal",
    "fechaNacimiento": "1982-07-19",
    "dni": "56781234S",
    "telefono": "+34655998877",
    "email": "carlos.crespo@email.com",
    "password": "CarlosCrespo1982"
  },
  {
    "nombre": "Ainhoa",
    "apellidos": "Moya Guerrero",
    "fechaNacimiento": "2005-08-04",
    "dni": "67812345Q",
    "telefono": "666001122",
    "email": "ainhoa.moya@email.com",
    "password": "AinhoaMoya2005*"
  },
  {
    "nombre": "Sergio",
    "apellidos": "Campos Rios",
    "fechaNacimiento": "1990-12-10",
    "dni": "78123456V",
    "telefono": "+34677112233",
    "email": "sergio.campos@email.com",
    "password": "SergioCampos1990"
  },
  {
    "nombre": "Irene",
    "apellidos": "Velasco Saez",
    "fechaNacimiento": "1996-01-15",
    "dni": "81234567H",
    "telefono": "688223344",
    "email": "irene.velasco@email.com",
    "password": "IreneVelasco1996!"
  },
  {
    "nombre": "Raul",
    "apellidos": "Bravo Arenas",
    "fechaNacimiento": "1984-05-30",
    "dni": "91234567X",
    "telefono": "+34699334455",
    "email": "raul.bravo@email.com",
    "password": "RaulBravo1984#"
  },
  {
    "nombre": "Marta",
    "apellidos": "Cano Delgado",
    "fechaNacimiento": "2001-10-25",
    "dni": "02345678N",
    "telefono": "600445566",
    "email": "marta.cano@email.com",
    "password": "MartaCano2001!"
  }
]

const baseUrl = pm.environment.get("baseUrl") || "http://localhost:3000";
const endpoint = `${baseUrl}/register/cliente`;

// Inicializamos la variable global de resultados vacía al arrancar
pm.globals.set("respuestas_registro_clientes", JSON.stringify([]));

console.log(`🚀 Iniciando registro secuencial de ${data.length} clientes...`);

// Función recursiva para enviar las peticiones una detrás de otra
function enviarPeticionCliente(indice) {
    // Si ya procesamos todos los elementos, terminamos
    if (indice >= data.length) {
        console.log("🏁 ¡Proceso finalizado por completo! Revisa la variable global 'respuestas_registro_clientes'.");
        return;
    }

    const cliente = data[indice];

    const configuracionRequest = {
        url: endpoint,
        method: 'POST',
        header: { 'Content-Type': 'application/json' },
        body: { mode: 'raw', raw: JSON.stringify(cliente) }
    };

    pm.sendRequest(configuracionRequest, (error, response) => {
        let respuestaJson;
        try {
            respuestaJson = response.json();
        } catch (e) {
            respuestaJson = { textoRaw: response.text() };
        }

        // Estructuramos el reporte de este cliente
        let resultado = {
            posicionArray: indice + 1,
            email: cliente.email,
            statusHttp: response.code,
            valido: response.code >= 200 && response.code < 300,
            respuestaServidor: respuestaJson
        };

        if (error) {
            resultado.errorPostman = error;
            console.error(`❌ [${indice + 1}/${data.length}] Error de red con ${cliente.email}`);
        } else if (!resultado.valido) {
            console.warn(`⚠️ [${indice + 1}/${data.length}] Petición RECHAZADA por el servidor para ${cliente.email} (Status: ${response.code})`);
        } else {
            console.log(`✅ [${indice + 1}/${data.length}] Registrado con éxito: ${cliente.email}`);
        }

        // Recuperar lo que llevamos acumulado, añadir el nuevo resultado y salvar inmediatamente
        let historialActual = JSON.parse(pm.globals.get("respuestas_registro_clientes"));
        historialActual.push(resultado);
        pm.globals.set("respuestas_registro_clientes", JSON.stringify(historialActual));

        // Dar un pequeño respiro de 100ms al servidor antes de mandar el siguiente cliente
        setTimeout(() => {
            enviarPeticionCliente(indice + 1);
        }, 100);
    });
}

// Lanzar la primera petición
enviarPeticionCliente(0);