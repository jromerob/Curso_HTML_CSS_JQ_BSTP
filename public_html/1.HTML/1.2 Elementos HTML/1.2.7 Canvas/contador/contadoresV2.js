/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



function Bucket(idDivDestino, consumido) {

    var porcentaje = 0; //porcentaje de relleno
    var alturaCubo = 120; // altura del cubo en px
    var anchoCuboSuperior = 120; // ancho del cubo en px en la boca
    var anchoCuboInferior = 100; // ancho del cubo en px en el pie
    var alturaAsa = 60; // altura del asa en px
    var margenLinea = 0; //margen del relleno en el interior del cubo
    var margenCubo = 1; // margen en el interior del canvas
    var divBucket = document.getElementById(idDivDestino);
    var canvasBucket;
    var context;


    // inicializamos el cubo
    init();


    /**
     * rellena el cubo
     * @param {type} newPorcentaje
     * @returns {undefined}
     */
    this.percentFill = function (newPorcentaje) {
        porcentaje = newPorcentaje;

        if (porcentaje > 0)
            fillBucket(porcentaje);
        this.setText1(porcentaje + "%");
        this.setText2("disponible");
    };

    this.percentConsumed = function (newPorcentaje) {

        porcentaje = 100 - newPorcentaje;

        fillBucket(porcentaje);
        this.setText1(porcentaje + "%");
        this.setText2("disponible");
    };



    this.setText1 = function (texto) {
        context.font = "30px Arial";
        context.fillStyle = '#000000';
        context.textAlign = "center";
        context.fillText(texto, canvasBucket.width / 2, (canvasBucket.height + alturaAsa) / 2);
    };

    this.setText2 = function (texto) {
        context.font = "15px Arial";
        context.fillStyle = '#000000';
        context.textAlign = "center";
        context.fillText(texto, canvasBucket.width / 2, ((canvasBucket.height + alturaAsa) / 2) + 18);
    };


    function init() {
        if (divBucket === null) {
            alert("Div para el cubo no encontrado");
            return false;
        }
        // creamos el canvas en el div destino insertando el HTML
        //divBucket.innerHTML = "<canvas id='canvas_bucket' width='200' height='300' ></canvas>";
        divBucket.innerHTML = "<canvas id='canvas_" + idDivDestino + "' width='" + (anchoCuboSuperior + margenCubo) + "' height='" + (alturaCubo + alturaAsa + margenCubo) + "' ></canvas>";
        divBucket.className = "bucket";

        try {
            // obtenemos el contexto
            canvasBucket = document.getElementById("canvas_" + idDivDestino);
            context = canvasBucket.getContext("2d");
            context.lineCap = "round";
        } catch (err) {
            divBucket.innerHTML = err.message;
            return false;
        }

        paintBucket();


    };


    function fillBucket(porcentaje) {

        var PorcBajada = 100 - porcentaje;
        var bajada = parseInt(alturaCubo * (PorcBajada / 100));

        //dibujamos el relleno
        // calculamos lo que avanza en x la linea del cubo en el punto de la bajada

        var desplazamientoX = parseInt((bajada * (anchoCuboSuperior - anchoCuboInferior)) / alturaCubo);

        if (porcentaje > 0) {
            context.beginPath();
            //context.moveTo(desplazamientoX+margenLinea+margenCubo, alturaAsa + bajada+margenLinea);
            context.moveTo(desplazamientoX + 1 + margenCubo + margenLinea, alturaAsa + bajada + margenLinea + margenCubo);
            context.lineTo(anchoCuboSuperior - desplazamientoX - margenLinea - margenCubo, alturaAsa + bajada + margenLinea + margenCubo);
            context.lineTo(anchoCuboInferior - margenLinea, alturaAsa + alturaCubo - margenLinea);
            context.lineTo(anchoCuboSuperior - anchoCuboInferior + margenCubo + margenLinea, alturaAsa + alturaCubo - margenLinea);
            context.closePath();
            context.fillStyle = '#5dabfc';
            context.fill();
        }
    }

    function paintBucket() {

        //dibujamos el cubo
        context.beginPath();
        // dibujamos el trapecio que formará el cubo
        // el punto 0,0 del canvas es la esquina superior izquierda
        context.moveTo(0 + margenCubo, alturaAsa);
        context.lineTo(anchoCuboSuperior, alturaAsa);
        context.lineTo(anchoCuboInferior + margenCubo, alturaAsa + alturaCubo);
        context.lineTo(anchoCuboSuperior - anchoCuboInferior, alturaAsa + alturaCubo);

        context.closePath();
        context.lineWidth = 2;
        context.stroke();
        //context.fill();

        //arco
        context.beginPath();
        context.arc((anchoCuboSuperior / 2) + (margenCubo / 2), alturaAsa + (margenCubo / 2), ((anchoCuboSuperior / 2) - margenCubo / 2), 1 * Math.PI, 2 * Math.PI);
        context.stroke();

    }



}

