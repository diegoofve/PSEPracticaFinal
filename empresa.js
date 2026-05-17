// 1. Array con tus clientes (He dejado 3 como muestra, pega aquí tus 30 o más)
const data = [
  {
    "razon": "Live Nation España S.A.U.",
    "cif": "A58963214",
    "domicilio": "Paseo de la Castellana 200, 28046 Madrid",
    "nombreContacto": "Roberto Martínez Vega",
    "telefono": "+34915551234",
    "email": "contacto@email.es",
    "password": "PasswordSegura123!"
  },
  {
    "razon": "Primavera Sound S.L.",
    "cif": "B62478951",
    "domicilio": "Carrer de Taratona 140, 08018 Barcelona",
    "nombreContacto": "Marta Gual Fonts",
    "telefono": "600112233",
    "email": "booking@email.com",
    "password": "MartaGestion2026*"
  },
  {
    "razon": "Idisat Eventos del Sur S.L.",
    "cif": "B41852963",
    "domicilio": "Avenida San Francisco Javier 9, 41018 Sevilla",
    "nombreContacto": "Antonio Tejera Palacios",
    "telefono": "+34954001122",
    "email": "info@email.es",
    "password": "SevillaFest2026#"
  },
  {
    "razon": "The Music Republic S.L.",
    "cif": "B98563214",
    "domicilio": "Gran Vía de les Corts Catalanes 585, 08007 Barcelona",
    "nombreContacto": "Carlos Prieto Ruiz",
    "telefono": "677889900",
    "email": "operations@email.com",
    "password": "RepublicMusic88!"
  },
  {
    "razon": "Bring The Noise S.L.",
    "cif": "B74369852",
    "domicilio": "Calle Uría 32, 33003 Oviedo",
    "nombreContacto": "David Álvarez Lastra",
    "telefono": "+34655443322",
    "email": "david@email.es",
    "password": "ResurrectionFest26"
  },
  {
    "razon": "Last Tour Promo S.L.",
    "cif": "B95147368",
    "domicilio": "Plaza Euskadi 5, 48009 Bilbao",
    "nombreContacto": "Elena Bilbao Ugarte",
    "telefono": "944001122",
    "email": "promos@email.com",
    "password": "BilbaoBBKLive2026"
  },
  {
    "razon": "Advanced Music S.L.",
    "cif": "B60852147",
    "domicilio": "Calle Zamora 45, 08005 Barcelona",
    "nombreContacto": "Sergi Ventura Pou",
    "telefono": "+34622334455",
    "email": "tickets@email.es",
    "password": "SonarFestival2026!"
  },
  {
    "razon": "Sinsalaudio Producciones S.L.",
    "cif": "B36985214",
    "domicilio": "Rúa de Príncipe 12, 36202 Vigo",
    "nombreContacto": "Iria Castro Souto",
    "telefono": "611998877",
    "email": "iria@email.gal",
    "password": "GaliciaCalidade26"
  },
  {
    "razon": "Festival Internacional de Benicàssim S.A.",
    "cif": "A12457896",
    "domicilio": "Recinto de Festivales N-340 km 986, 12560 Benicàssim",
    "nombreContacto": "Juan José Morera",
    "telefono": "+34964303030",
    "email": "admin@email.com",
    "password": "FibBenicassim2026"
  },
  {
    "razon": "Produceme de Verdad S.L.",
    "cif": "B82541639",
    "domicilio": "Calle Alcalá 45, 28014 Madrid",
    "nombreContacto": "Sofía Legazpi Ramos",
    "telefono": "699332211",
    "email": "slegazpi@email.es",
    "password": "MadridEventos2026"
  }
]

const baseUrl = pm.environment.get("baseUrl") || "http://localhost:3000";
const endpoint = `${baseUrl}/register/empresa`;

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