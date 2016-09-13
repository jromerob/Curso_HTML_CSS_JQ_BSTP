/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var map; //mapa de google

(function () {
    var content = document.getElementById("localizacion");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
                function (objPosition) {
                    var lon = objPosition.coords.longitude;
                    var lat = objPosition.coords.latitude;
                    content.innerHTML = "<p>Usted se encuentra en <strong>Latitud:</strong><span id='lat'> " + lat + "</span><strong> Longitud:</strong><span id='lon'> " + lon + "</span></p>";
                    guardarLocalizacion(objPosition);
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
})();


/* funciones para drag & Drop */

(function initMap() {
    map = new google.maps.Map(document.getElementById('mapa'), {
        center: {lat: 36.964, lng: -122.015},
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    map.setTilt(45);
})();

function initDrag(ev) {
    var coordenadas = {lat: parseFloat(document.getElementById("lat").innerHTML), lng: parseFloat(document.getElementById("lon").innerHTML)};
    var JSONCoordenadas = JSON.stringify(coordenadas);
    ev.dataTransfer.setData("coordenadas", JSONCoordenadas);
}


function permitirDrop(ev) {
    ev.preventDefault();
}

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

    // comprobamos el objeto Storage apra saber si el navegador soporta almacenamiento local 
    if (typeof (Storage) !== "undefined") {
        txtPosicion = [objPosition.coords.latitude, objPosition.coords.longitude, objPosition.timestamp]
        //setItem convierte el valor a cadena por lo que no sería necesario toString()
        localStorage.setItem("ultimaPosicion", txtPosicion.toString());
    }
}

function cargarUltimaLocalizacion() {

    var ultimaPosicion = localStorage.getItem("ultimaPosicion");
    if (ultimaPosicion!=null){
        arrayUltimaPosicion = ultimaPosicion.split(",");
        document.getElementById("ultimaLocalizacion").innerHTML = "<p>Ubicacion registrada el " + arrayUltimaPosicion[2] + " <br><strong>Latitud:</strong><span id='lat'> " + arrayUltimaPosicion[0] + "</span><strong> Longitud:</strong><span id='lon'> " + arrayUltimaPosicion[1] + "</span></p>";
    }

}



