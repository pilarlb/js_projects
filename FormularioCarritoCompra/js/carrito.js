var nombreart;
var precioart;
var unidades;
var butCarrito;
//variables errores
var errornombre;
var errorprecio;
var nuevoart;
var arttotal;
var preciototal;
var listaCarrito;
//forma de pago
var formapago;
var campostarjeta;
var titular;
var numtarjeta;
var cvv;
var camposefectivo;
var impefectivo;
var butImprimir;
var condiciones;
var butRestablecer;


//Clase articulo para crear objetos, con metodo preciototal
class Articulo{

    constructor(nombre, precio, ud){
        this.nombre = nombre;
        this.precio = precio;
        this.ud = ud;
    }

    getNombre(){
        return this.nombre;
    }
    getPrecio(){
        return this.precio;
    }
    getUd(){
        return this.ud;
    }
// para calcular el precio total del Articulo
    calcularPrecioTotal(){
       return this.precio*this.ud;
    }
}

function iniciarVar(){
    nombreart = document.formulario.nombreart;
    precioart = document.formulario.precioart;
    unidades = document.formulario.unidades;
    butCarrito = document.formulario.butCarrito;
    errornombre = document.getElementById("errornombre");
    errorprecio = document.getElementById("errorprecio");
    arttotal = document.formulario.arttotal;
    preciototal = document.formulario.preciototal;
    //inicializo array
    listaCarrito = new Array();
    formapago =document.formulario.formapago;
    campostarjeta = document.getElementById("campostarjeta");
    titular = document.formulario.titular;
    numtarjeta = document.formulario.numtarjeta;
    cvv = document.formulario.cvv;
    camposefectivo = document.getElementById("camposefectivo");
    impefectivo = document.formulario.impefectivo;
    //ocultar campos del formulario
    ocultarTipoPago();
    butImprimir = document.formulario.butImprimir;
    condiciones = document.formulario.condiciones;
    butRestablecer = document.formulario.butRestablecer;
}

function iniciarEv(){
    //Se nombran funciones sin el () porque se activarían
    butCarrito.addEventListener("click",cajasVacias);
    //evento change para select de formulario
    formapago.addEventListener("change",tiposPago);
    condiciones.addEventListener("click",habilitarImprimir);
    butImprimir.addEventListener("click",alertImprimir);
    butRestablecer.addEventListener("click",resetRestablecer); 
}
function cajasVacias(){
    
    //Salen mensajes de error de los span contiguos a los campos
    if( (nombreart.value == "")&&(precioart.value == "")){
        errornombre.textContent = "falta articulo";
        nombreart.focus(); //foco en el primer campo
        errorprecio.textContent = "falta precio";

    }else if(nombreart.value == ""){
        errornombre.textContent = "falta articulo";
        //borramos advertencia si la hay
        errorprecio.textContent = "";
        nombreart.focus(); //foco en el campo del nombre

    }else if(precioart.value == ""){
        errorprecio.textContent = "falta precio";
        //borramos advertencia si la hay
        errornombre.textContent = "";
        precioart.focus(); //foco en el campo del precio
    }else{
        //funcion para ver si el precio es un numero
        validarPrecio();
    }
}

function validarPrecio(){
    if(isNaN(precioart.value)){
        //borramos advertencia si la hay
        errornombre.textContent = "";
        errorprecio.textContent ="tipo de dato incorrecto";
        precioart.focus(); //foco en el campo del precio
    }else{
        //borramos advertencia si la hay
        errornombre.textContent = "";
        errorprecio.textContent ="";
        //funcion que añade al array el objeto
        nuevoArticulo();
        //funcion para poner campos en blanco
        resetCajas();
    }
}


function nuevoArticulo(){
    //pasamos de String a numero con decimales precioart
    precioart.value = parseFloat(precioart.value);
    //pasamos de String a numero entero unidades
    unidades.value = parseInt(unidades.value);
    //instanciamos objeto articulo en la var nuevoart
    nuevoart = new Articulo(nombreart.value,precioart.value,unidades.value);
    
    articuloAlArray();          
}

function articuloAlArray(){
    //añadimos al array el articulo
    listaCarrito.push(nuevoart);
    
    //cuando en el array hay más de un artículo
    if(listaCarrito.length>1){
        //imprimo el primer elemento del array para luego añadir el resto
        arttotal.value = listaCarrito[0].getNombre();
        preciototal.value = listaCarrito[0].calcularPrecioTotal();
        //el for empieza en el elemento 1 del array
        for(var i=1; i<listaCarrito.length; i++){

            arttotal.value += ", "+ listaCarrito[i].getNombre();
           //para poder hacer suma numérica, parseo preciototal.value
            preciototal.value = parseFloat(preciototal.value)+listaCarrito[i].calcularPrecioTotal();
        }
     //cuando en el array solo hay un articulo   
    }else{
        //la posicion 0 del array que es la unica ocupada
        arttotal.value = listaCarrito[0].getNombre();
        preciototal.value = listaCarrito[0].calcularPrecioTotal();
    }
}

function resetCajas(){
    //vaciamos campos nombrart, precioart y defautl en unidades
    nombreart.value="";
    precioart.value="";
    unidades.value="1";
    nombreart.focus(); //foco en el primer campo
  
}

function tiposPago(){
    //importante poner == y no solo uno
    if(formapago.value =="tarjeta"){
        //mostrar campos del valor tarjeta
        campostarjeta.style.display = "block";
        camposefectivo.style.display = "none";
    }else if(formapago.value =="efectivo"){
        //mostrar campos del valor efectivo
        camposefectivo.style.display = "block";
        campostarjeta.style.display = "none";
        //value con el importe total del carrito
        impefectivo.value = preciototal.value;
    }else{
        //si se selecciona cualquier otra opcion
       ocultarTipoPago();
    }
}

function habilitarImprimir(){
   //si hay un check en las condiciones, habilito imprimir
    if(condiciones.checked == true){
        butImprimir.disabled = false;
    }else{
        //quitamos imprimir
        butImprimir.disabled = true;
    }
}

function alertImprimir(){
    //si no se ha seleccionado una forma de pago
    if(formapago.value == "default"){
        alert("Seleccione una forma de pago");
    }else{

        alert("Los artículos de mi carrito son: "+ arttotal.value+"\n"
        +"y el precio total es: "+ preciototal.value + "€\n"
        +"Forma de pago: "+formapago.value
        );
        
    }  
}

function resetRestablecer(){
    //resetea los tres primeros campos y pone el foco
    resetCajas();

    arttotal.value = "";
    preciototal.value = "0";
    if(formapago.value == "tarjeta"){
        titular.value = "";
        numtarjeta.value = "";
        cvv.value = "";
    }else{
        //si la forma de pago es en efectivo
        impefectivo.value ="";
    }
    //ocultamos campos de tipo de pago
    ocultarTipoPago();
    //el select de formapago lo pongo en default
    formapago.value = "default";
    //quito el check de la casilla
    condiciones.checked = false;
    //llamo a funcion para deshabilitar boton imprimir
    habilitarImprimir();
    //inicializo variable del array
    listaCarrito = new Array();
}
function ocultarTipoPago(){
    campostarjeta.style.display = "none";
    camposefectivo.style.display = "none";
}

//al cargarse el html, se inician las funciones;
window.onload = function(){
    iniciarVar();
    iniciarEv();   
}