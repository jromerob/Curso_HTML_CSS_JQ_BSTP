/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


(function(){
  var content = document.getElementById("localizacion");
  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(
      function(objPosition) {
        var lon = objPosition.coords.longitude;
  	   var lat = objPosition.coords.latitude;
        content.innerHTML = "<p>Usted se encuentra en <strong>Latitud:</strong> " + lat + "<strong> Longitud:</strong> " + lon + "</p>";
      }, 
      function(objPositionError){
        switch (objPositionError.code){
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
       {maximumAge: 75000,	timeout: 15000	});
	}
	else
	{
       content.innerHTML = "Su navegador no soporta la API de geolocalización.";
	}
})();
