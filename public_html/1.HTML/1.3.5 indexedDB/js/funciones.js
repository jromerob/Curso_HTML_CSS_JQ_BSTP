/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var map; //mapa de google
var DBOpenRequest;
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
var connActive;


/**
 *  
 *                  CONEXION A LA BASE DE DATOS   
 * Se deben realizar las operaciones sobre la base de datos una vez se haya abierto, en el callback onsuccess
 *  
 * @returns {undefined}
 */

(function initDB() {
    if (typeof (indexedDB) !== "undefined") {
        DBOpenRequest = indexedDB.open("geolocalizacionesDB", 1);
        /* definimos la funcion para la creacion de las tablas la primera vex que usamos la bbdd */
        DBOpenRequest.onupgradeneeded = function (e) {
            connActive = DBOpenRequest.result;
            //Ya tenemos en la variable active la conexión abierta. Lo siguiente es crear un almacén de objetos:
            var opciones = {keyPath: 'id', autoIncrement: true};
            var storeUbicaciones = connActive.createObjectStore("ubicaciones", opciones);
            storeUbicaciones.createIndex("timestamp", "timestamp", {unique: false});
        };
        DBOpenRequest.onsuccess = function (e) {
            connActive = DBOpenRequest.result;
            console.log('Base de datos cargada correctamente');
            obtenerUbicacionActual();
            dbLeerUbicaciones();
        };

        DBOpenRequest.onerror = function (e) {
            console.log('Error al cargar la Base de datos');
            Alert('Error al cargar la Base de datos');
        };


    }

})();

function obtenerUbicacionActual() {
    var content = document.getElementById("localizacion");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
                function (objPosition) {
                    var lon = objPosition.coords.longitude;
                    var lat = objPosition.coords.latitude;
                    content.innerHTML = "<p>Usted se encuentra en <strong>Latitud:</strong><span id='lat'> " + lat + "</span><strong> Longitud:</strong><span id='lon'> " + lon + "</span></p>";
                    guardarLocalizacion(objPosition);
                    dbGuardarLocalizacion(objPosition);
                },
                function (objPositionError) {
                    switch (objPositionError.code) {
                        case objPositionError.PERMISSION_DENIED:
                            content.innerHTML = "No se ha permitido el acceso a la posición del usuario.";
                            break;
                        case objPositionError.POSITION_UNAVAILABLE:
                            content.innerHTML = "No se ha podido acceder a la información de su posición.";
                            break;
                        case objPositionError.TIMEOUT:
                            content.innerHTML = "El servicio ha tardado demasiado tiempo en responder.";
                            break;
                        default:
                            content.innerHTML = "Error desconocido.";
                    }
                },
                {maximumAge: 75000, timeout: 15000});
        cargarUltimaLocalizacion();

    }
    else
    {
        content.innerHTML = "Su navegador no soporta la API de geolocalización.";
    }
}
;


/* funciones para drag & Drop */
/**
 * Inicializacion del mapa de google
 * 
 * @returns {undefined}
 */
(function initMap() {
    map = new google.maps.Map(document.getElementById('mapa'), {
        center: {lat: 36.964, lng: -122.015},
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    map.setTilt(45);
})();

/**
 * Inicialización del elemento a arrastrar, definimos los datos que arrastraremos
 * @param {type} ev
 * @returns {undefined}
 */

function initDrag(ev) {
    var coordenadas = {lat: parseFloat(document.getElementById("lat").innerHTML), lng: parseFloat(document.getElementById("lon").innerHTML)};
    var JSONCoordenadas = JSON.stringify(coordenadas);
    ev.dataTransfer.setData("coordenadas", JSONCoordenadas);
}

/**
 * inicializacion del elemento donde soltar.
 * @param {type} ev
 * @returns {undefined}
 */
function permitirDrop(ev) {
    ev.preventDefault();
}

/*
 *  definición del evento soltar
 * @param {type} ev
 * @returns {undefined}
 * 
 */
function drop(ev) {

    var coordenadas = JSON.parse(ev.dataTransfer.getData("coordenadas"));
    var latLng = new google.maps.LatLng(coordenadas.lat, coordenadas.lng);

    var marker = new google.maps.Marker({
        position: latLng,
        map: map,
        title: 'Hello World!'
    });
    marker.setMap(map);
    map.setCenter(latLng);
    map.setZoom(10);
}


/* funciones local storage */

/**
 * Llamamos a la funcion cada vez que obtenemos una ubicacion 
 * @param {type} objPosition
 * @returns {undefined}
 */
function guardarLocalizacion(objPosition) {
    // comprobamos que el navegador soporta almacenamiento local 
    // el objeto posciion lo soporta JSON.stringify
    if (typeof (Storage) !== "undefined") {

        txtPosicion = [objPosition.coords.latitude, objPosition.coords.longitude, objPosition.timestamp]
        //setItem convierte el valor a cadena por lo que no sería necesario toString()
        localStorage.setItem("ultimaPosicion", txtPosicion.toString());
    }
}

/**
 * lectura de la última ubicacion del almacenamiento local
 * @returns {undefined}
 */
function cargarUltimaLocalizacion() {

    var ultimaPosicion = localStorage.getItem("ultimaPosicion");
    arrayUltimaPosicion = ultimaPosicion.split(",");
    document.getElementById("ultimaLocalizacion").innerHTML = "<p>Ubicacion registrada " + arrayUltimaPosicion[2] + " <strong>Latitud:</strong><span id='lat'> " + arrayUltimaPosicion[0] + "</span><strong> Longitud:</strong><span id='lon'> " + arrayUltimaPosicion[1] + "</span></p>";

}


/* Funciones indexedDB */

/*
 * guardamos la posición en la base de datos, previamente esta debe haber sido abierta
 * @param {type} objPosition
 * @returns {undefined}
 */
function dbGuardarLocalizacion(objPosition) {

    //var conexion = DBOpenRequest.result;
    var transaccionUbicaciones = connActive.transaction(["ubicaciones"], "readwrite");
    var storeUbicaciones = transaccionUbicaciones.objectStore("ubicaciones");
    var requestGuardar = storeUbicaciones.put({
        lat: objPosition.coords.latitude,
        lng: objPosition.coords.longitude,
        timestamp: objPosition.timestamp
    });
    transaccionUbicaciones.oncomplete = function (e) {
        console.log('Objeto agregado correctamente');
    };

    requestGuardar.onerror = function (e) {
        alert(requestGuardar.error.name + '\n\n' + requestGuardar.error.message);
    };

}

function dbLeerUbicaciones() {
    // var conexion = DBOpenRequest.result;
    var transaccionUbicaciones = connActive.transaction(["ubicaciones"], "readonly");
    var storeUbicaciones = transaccionUbicaciones.objectStore("ubicaciones");

    ubicaciones = [];
    storeUbicaciones.openCursor().onsuccess = function (e) {
        var cursor = e.target.result;
        if (cursor === null) {
            return;
        }
        ubicaciones.push(cursor.value);
        cursor.continue();
    };

    //data.oncomplete = cargarUbicaciones (ubicaciones);
    transaccionUbicaciones.oncomplete = function () {
        var contenedorUbicaciones = document.getElementById("listaUbicaciones");
        contenedorUbicaciones.innerHTML = "";
        if (ubicaciones.length > 0) {
            ubicaciones.forEach(
                    function (item, index) {
                        var linea = document.createElement("p");
                        //establecemos un id para poder acceder al elemento por el id de la base de datos
                        linea.id = "ubicacion_" + item.id;
                        linea.innerHTML = "<button onclick=dbBorrarUbicacion(" + item.id + ") >" + item.id + "</button>  (" + item.lat + "," + item.lng + ") <button onclick='dbMostrarUbicacion(" + item.timestamp + ")'>Ver</button><button onclick='dbTocarUbicacion(" + item.id + ")'>T</button>";
                        contenedorUbicaciones.appendChild(linea);
                    }
            );
        }
    }

}

function displayUbicaciones(ubicaciones) {


    var contenedorUbicaciones = document.getElementById("listaUbicaciones");
    var linea = document.createElement("p");
    ubicaciones.forEach(
            function (item, index) {
                linea.innerHTML = "Latitud: " + item.lat;
                contenedorUbicaciones.appendChild(linea);
            }
    );
}

function dbEliminarUbicaciones() {


    var transaccionUbicaciones = connActive.transaction(["ubicaciones"], "readwrite");
    var ubicacionesStore = transaccionUbicaciones.objectStore("ubicaciones");
    //abrimos un cursos del alamcen recorremos y borramos
    /*ubicacionesStore.openCursor().onsuccess = function (e) {
     var cursor = e.target.result;
     if (cursor === null) {
     return;
     }
     cursor.delete();
     cursor.continue();
     };*/
    var request = ubicacionesStore.clear();

    request.onsuccess = function () {
        var contenedorUbicaciones = document.getElementById("listaUbicaciones");
        contenedorUbicaciones.innerHTML = "<h4> ¡ Datos eliminados !</h4>";
    };


}

function dbBorrarUbicacion(idRegistro, nodo) {


    var transaccionUbicaciones = connActive.transaction(["ubicaciones"], "readwrite");
    var ubicacionesStore = transaccionUbicaciones.objectStore("ubicaciones");

    // Eliminamos el registro por su ID
    var ubicacionesStoreRequest = ubicacionesStore.delete(idRegistro);

    ubicacionesStoreRequest.onsuccess = function (event) {
        // Tras el borrado correcto, liminamos el nodo por su atributo id
        var nodo = document.getElementById("ubicacion_" + idRegistro);
        nodo.parentNode.removeChild(nodo);
    };

}
/**
 * Búsqueda por índice.
 * Para buscar un registro por su timestamp, tenemos que usar el indice creado en la definicion de la tabla llamad timestamp.
 * En ete caso devolverá el primer registro encontrado. Si el indice tiene clave no única, debemos usar un cursor para recuperar todas
 * 
 * @param {type} criterioTimestamp
 * @returns {undefined}
 */
function dbMostrarUbicacion(criterioTimestamp) {

//abrimos la transaccion en el modo por defecto, solo lectura para buscar
    var transaccionUbicaciones = connActive.transaction(["ubicaciones"]);
    var ubicacionesStore = transaccionUbicaciones.objectStore("ubicaciones");

    var indiceUbicacionesTimestamp = ubicacionesStore.index("timestamp");
    indiceUbicacionesTimestamp.get(criterioTimestamp).onsuccess = function (evento) {
        resultado = evento.target.result;
        alert("Ubicacion seleccionada: " + resultado.id + "\n Latitud: " + resultado.lat + "\n Longitud: " + resultado.lng + "\n Time Stamp: " + resultado.timestamp);
    };

}

function dbTocarUbicacion(idUbicacion) {

    //abrimos la transaccion en el modo por defecto, solo lectura para buscar
    var transaccionUbicaciones = connActive.transaction(["ubicaciones"], "readwrite");
    var ubicacionesStore = transaccionUbicaciones.objectStore("ubicaciones");
    var ubicacionesStoreRequest = ubicacionesStore.get(idUbicacion);
    
    ubicacionesStoreRequest.onerror = function (event) {
        // Handle errors!
    };
    
    ubicacionesStoreRequest.onsuccess = function (event) {
        // Get the old value that we want to update
        var resultado = ubicacionesStoreRequest.result;

        // update the value(s) in the object that you want to change
        resultado.timestamp = Date.now() ;

        // Put this updated object back into the database.
        var requestUpdate = ubicacionesStore.put(resultado);
        requestUpdate.onerror = function (event) {
            // Do something with the error
        };
        requestUpdate.onsuccess = function (event) {
            alert("timestamp Actualizado");
        };
    };

}


