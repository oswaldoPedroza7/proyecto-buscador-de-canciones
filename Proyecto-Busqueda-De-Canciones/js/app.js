import Api from "./api.js";
import * as UI from './interfaz-grafica.js';  // selecciona todas la exportaciones con el alias UI

UI.formularioBuscar.addEventListener('submit', buscarCancion);

function buscarCancion(event){     // prevenir que se refresque el navegador
    event.preventDefault();
    const artista = document.querySelector('#artista').value;
    const cancion = document.querySelector('#cancion').value;

    // validacion de los campos del formulario
    if(artista === '' || cancion === ''){ // en caso de que el usuario no esciba nada en la casilla
        console.log('Error.. ambos campos son requeridos');
        UI.divMensaje.textContent= 'Errorr.. campos requeridos!!';
        UI.divMensaje.classList.add('error');
        setTimeout(()=>{  // para quitar el mensaje cada 3 segundos
            UI.divMensaje.textContent= '';
            UI.divMensaje.classList.remove('error')
        },3000)
        return; // termina la ejecucion 
    }
    const busqueda = new Api(artista, cancion); // instancia de api
    const resultadoApi = busqueda.consultarApi(); // resultado para guardar el resultado de la instancia
    const informacion = busqueda.mostrarInformacion();

    // Renderizado 
    renderizado(resultadoApi, informacion) // resultadapi es la letra de la cancion -- informacion nombre de la cancion y el artista
}

const renderizado = async (resultado, info) => {
    //resultado.then(r=>console.log(r)) // con promesas
    const resultadoLetra = await resultado;
    console.log(resultadoLetra);
    if (resultadoLetra.lyrics) {
        const {lyrics} = resultadoLetra;
        console.log(lyrics); 
        UI.divResultado.textContent = lyrics;
        UI.headingResultado.textContent = info;
    }else {
        // si no existe la cancion o no escribio bien los campos
        UI.divMensaje.textContent = 'la cancion no existe, prueba con otra busqueda';
        UI.divMensaje.classList.add('error');

        setTimeout(() => {
            UI.divMensaje.textContent = '';
            UI.divMensaje.classList.remove('error')
        }, 3000)

    }
} 
