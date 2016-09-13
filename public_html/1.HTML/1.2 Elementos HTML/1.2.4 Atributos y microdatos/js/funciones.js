/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var libros=document.getElementsByClassName("libro");
// getElementsByClassName devuelve una lista de nodos
// lo convertimos a array para usar forEach
var librosArray = [].slice.call(libros);

librosArray.forEach(function(element){
    element.addEventListener('click',function(){ 
         alert("DATOS DEL LIBRO\nTítulo : " + this.dataset.titulo +"\n"+
                 "ISBN: "+this.dataset.isbn);
        });
});
   
  




