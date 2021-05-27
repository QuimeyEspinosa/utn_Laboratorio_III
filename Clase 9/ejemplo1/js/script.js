import { marcas } from "../marcas.js";
console.log(marcas);

let boton = null;

//Se programa todo lo que se va a hacer luego de cargar el documento
window.addEventListener("DOMContentLoaded", () => {
  boton = document.getElementById("btnLista");
  boton.addEventListener("click", handlerLoadList);
});

//funcion que va a recibir por referencia el eventListener
//siempre va a venir un objeto event por mas que no se especifique en la llamada en la función
function handlerLoadList(e) {
  renderizarLista(crearLista(marcas), document.getElementById("divLista"));
  const emisor = e.target;

  emisor.textContent = "Eliminar lista"; //cambio el nombre del boton
  emisor.removeEventListener("click", handlerLoadList); //quito el evento al boton
  emisor.addEventListener("click", handlerDeleteList); //le agrego el evento de eliminar lista al boton
}

//funcion que va a recibir por referencia el eventListener
function handlerDeleteList(e) {
  renderizarLista(null, document.getElementById("divLista"));

  const emisor = e.target;
  emisor.textContent = "Cargar lista";
  emisor.removeEventListener("click", handlerDeleteList);
  emisor.addEventListener("click", handlerLoadList);
}

//Genera una lista dinamica
function crearLista(items) {
  const lista = document.createElement("ul");

  items.forEach((element) => {
    const li = document.createElement("li");
    const contenido = document.createTextNode(element.marca);
    li.appendChild(contenido);
    lista.appendChild(li);
  });

  return lista;
}

//Vacía el contenedor e inserta la lista en el mismo
function renderizarLista(lista, contenedor) {
  vaciarContenedor(contenedor);

  //si existe lista...
  if (lista) {
    contenedor.appendChild(lista);
  }
}

//Vacia el contenedor pasado por parámetro
function vaciarContenedor(contenedor) {
  while (contenedor.hasChildNodes()) {
    contenedor.removeChild(contenedor.firstChild);
  }
}

/*
//stringify convierte el objeto a texto
const texto = JSON.stringify(marcas);
console.log(texto);

//parse hace lo contrario, recibe un json y lo convierte a objeto
const texto2 = JSON.parse(texto);
console.log(texto2);
*/
