CrearPokemon_(1); 
/*Configuraciones*/
const esDificil = confirm(" Modo Facil: 151 Pókemon \n Modo Dificil: 651 Pókemon \n¿Jugar en modo dificil?");
(esDificil) ? MAX_POKEMON = 650 : MAX_POKEMON = 151; 


var pokemonActual;
var puntajeTotal = 0;
var intentosRestantes = 10;
var button1 = "BULBASAUR";
var button2 = "CHARMANDER";
var button3 = "SQUIRTLE";
var button4 = "LGANTE";

/////////////////////////////

function numeroRandom(){
    /*
        Describe un numero random del 1 al *MAX_POKEMON* + 1.
        TIPO: Numero.
    */
    return (Math.round(Math.random()*MAX_POKEMON)+1)
}

async function CrearPokemon_(idPokemon){
    /*
        Crear un Pokemon con el id dado.
        idPokemon es el numero de pokedex nacional del bicho en cuestion.
    */

    //Traer los datos del servidor y convertirlos en objeto.

    const promise = await fetch("https://pokeapi.co/api/v2/pokemon/"+idPokemon);
    const json = await promise.json();
    
    
    
    //Usar los datos del servidor para crear nuestro propio objeto.
    const pokemon = {
        name: json.name.toUpperCase(),
        id: json.id,
        type1: json.types[0].type.name,
        type2: (json.types.lenght == 2) ? (json.types[1].type.name) : "none",
        img: json.sprites.other["official-artwork"].front_default
    }
    
    pokemonActual = pokemon;
    
    AsingarNombresRandomABotones();
    LimpiarElemento_("pokemon-div");
    PonerPokemon_EnPantalla(pokemon);
}


function LimpiarElemento_(idElementoALimpiar){
    /*
        Borrar todos los "hijos" de un elemento.
        Modifica el DOM.
    */ 
    elementoALimpiar = document.getElementById(idElementoALimpiar);
    while(elementoALimpiar.firstChild)
    {
        elementoALimpiar.removeChild(elementoALimpiar.firstChild)
    }
}


function PonerPokemon_EnPantalla(pokemonACrear){
    /*
        Crear un Pokemon en el div cuyo id="container-pokemon" borrando el pokemon que antes estaba alli.
        Modifica el DOM.
        - El contenedor padre donde estara el fragmento deberia de estar vacio.
    */
        //Crear el fragmento que contendra el contendor del pokemon
        const fragmentoDelPokemon = document.createDocumentFragment();

        //Contendor padre que tendra al fragmento del pokemon como hijo
        const contenedorPadreDelFragmento = document.getElementById("pokemon-div");
    
        //Crear contenedor del pokemon
        const contenedorPokemon = document.createElement("DIV");
        contenedorPokemon.setAttribute("id","pokemon-container");
        //Animaciones del contenedor del pokemon
        contenedorPokemon.classList.add("animate__animated");
        contenedorPokemon.classList.add("animate__fadeIn");
        
        //Crear nombre del pokemon
        const nombrePokemon = document.createElement("H2");
        nombrePokemon.innerHTML = pokemonACrear.name.toUpperCase();
    
        //Crear ID del Pokemon
        const idPokemon = document.createElement("H3");
        idPokemon.innerHTML="#"+pokemonACrear.id;
        //idPokemon = AñadircerosA_(idPokemon)
    
        //Crear Imagen del pokemon    
        const imgPokemon = document.createElement("IMG");
        imgPokemon.src = pokemonACrear.img;

      
        //Añadimos los elementos creados al Contendor pokemon
        contenedorPokemon.appendChild(imgPokemon);
        //contenedorPokemon.appendChild(nombrePokemon);
        contenedorPokemon.appendChild(idPokemon);

        //Poner el pokemon creado en el DOM
        fragmentoDelPokemon.appendChild(contenedorPokemon);
        contenedorPadreDelFragmento.appendChild(fragmentoDelPokemon);

        /*TBF: En vez de borrarlo de la existencia seria mejor cambiar las propiedades de los elementos*/
}

function CambiarPokemon()
{
    /*
        Cambiar el Pokemon en pantalla por otro random.
        Modifica el DOM
        Se pierde un intento.
    */
    if(intentosRestantes == 2)
    {
        DeshabilitarElBotonConId_("ButtonNewPokemon");
    }
   CrearPokemon_(numeroRandom())
   intentosRestantes -=1
   ActualizarIntentosRestantes()
}

// Funciones de los botones de seleccion de nombre.
async function AsingarNombresRandomABotones(){
    /*
        Asignar el nombre de un pokemon random a todos los botones de seleccion de nombre.
        Modifica el DOM
    */
    const datosDelServidor = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=4&offset=${numeroRandom()}`);
    const json = await datosDelServidor.json();

    let nombresAPonerEnBotones = {
        nombreBoton1 : json.results[0].name.toUpperCase(),
        nombreBoton2 : json.results[1].name.toUpperCase(),
        nombreBoton3 : json.results[2].name.toUpperCase(),
        nombreBoton4 : json.results[3].name.toUpperCase(),

    }
    AsignarNombre_ABotonConId_(nombresAPonerEnBotones.nombreBoton1, "opcion1");
    AsignarNombre_ABotonConId_(nombresAPonerEnBotones.nombreBoton2, "opcion2");
    AsignarNombre_ABotonConId_(nombresAPonerEnBotones.nombreBoton3, "opcion3");
    AsignarNombre_ABotonConId_(nombresAPonerEnBotones.nombreBoton4, "opcion4");
    button1 = nombresAPonerEnBotones.nombreBoton1;
    button2 = nombresAPonerEnBotones.nombreBoton2;
    button3 = nombresAPonerEnBotones.nombreBoton3;
    button4 = nombresAPonerEnBotones.nombreBoton4;
    AsingarNombre_ABotonRandom(pokemonActual.name);


}

function AsingarNombre_ABotonRandom(nombrePokemon){
    /*
        Poner el nombre del pokemon dado como una posible opcion en alguno de los botones de seleccion de nombre.
        Tambien modifica la variable que contiene el nombre del pokemon en cuestion.
        Modifica el DOM.
    */
   const numeroRandom = Math.round(Math.random()*3)+1; //Numero del 1 al 4
   switch(numeroRandom){
    case 1: button1 = nombrePokemon; AsignarNombre_ABotonConId_(nombrePokemon, "opcion1");
    break;
    case 2: button2 = nombrePokemon; AsignarNombre_ABotonConId_(nombrePokemon, "opcion2");
    break;
    case 3: button3 = nombrePokemon; AsignarNombre_ABotonConId_(nombrePokemon, "opcion3");
    break;
    case 4: button4 = nombrePokemon; AsignarNombre_ABotonConId_(nombrePokemon, "opcion4");
    break;
   }
   //console.log(`Boton ${numeroRandom} modificado.`)
}

function AsignarNombre_ABotonConId_(nombrePokemon, idBoton)
{
    /*
        Poner el nombre del pokemon dado en el boton que tenga el id dado
        Modifica el DOM.
    */
   document.getElementById(idBoton).textContent = nombrePokemon;
}

function DeshabilitarElBotonConId_(idBoton){
    /*
        Deshabilitar el boton con el ID dado.
        Modifica el DOM
    */
    document.getElementById(idBoton).disabled = true;
}

function HabilitarElBotonConId_(idBoton){
    /*
        Deshabilitar el boton con el ID dado.
        Modifica el DOM
    */
    document.getElementById(idBoton).disabled = false;
}

//Funciones de Puntaje y Seleccion de opcion
function ElegirOpcion_(buttonName){
    /*
        Si los nombres dados son igules, el jugador gana, sino, pierde.
        Al terminar, se crea otro pokemon para ir a la siguiente ronda.
        Modifica el DOM
    */
   if(buttonName == pokemonActual.name)
   {
    alert(`¡Ganaste! \nEl nombre del pokémon es ${pokemonActual.name}`);
    puntajeTotal += 1;
    ActualizarPuntaje()
   }
   else
   {
    alert(`¡Perdiste! \nEl nombre del pokémon era ${pokemonActual.name}`);
   }
   intentosRestantes -=1
   ActualizarIntentosRestantes()

   if(intentosRestantes == 1)
   {
    DeshabilitarElBotonConId_("ButtonNewPokemon");
   }

   if(intentosRestantes > 0)
    {CrearPokemon_(numeroRandom());}
   else
    {FinalizarJuego()}

   
}

function ActualizarPuntaje(){
    /*
        Actualizar el puntaje total. Se Modifica el H2 que muestra el puntaje en pantalla.
        Modifica el DOM.
    */
   document.getElementById("puntaje").textContent = `Puntaje: ${puntajeTotal}`;

}

function ActualizarIntentosRestantes(){
    /*
        Actualizar los intentos restantes. Se Modifica el H2 que muestra los intentos restantes en pantalla.
        Modifica el DOM.
    */
   document.getElementById("intentos-restantes").textContent = `Intentos restantes: ${intentosRestantes}`;

}

//Empezar y Finalizar juego.
function FinalizarJuego(){
    /*
        Mostrar en pantalla los resultados de la partida.
        Al terminar de verlos. se reinician los valores.
    */ 
    alert(`¡Juego Terminado! \nPuntaje final: ${puntajeTotal}/10`)
    EmpezarJuego()
}

function EmpezarJuego(){
    /*
        Empezar el juego.
        Se reestablecen los intentos a 10 y la puntuacion a 0.
    */
   intentosRestantes = 10;
   puntajeTotal = 0;
   ActualizarIntentosRestantes()
   ActualizarPuntaje()
   HabilitarElBotonConId_("ButtonNewPokemon");
   CrearPokemon_(numeroRandom()) 
}

/*Añadir Listeners*/
document.getElementById("ButtonNewPokemon").onclick = function(){CambiarPokemon();};

/*Inicio del Juego*/
EmpezarJuego()
