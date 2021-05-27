import { personas } from "../personas.js";
//console.log(personas);

let boton = null;

//Se programa todo lo que se va a hacer luego de cargar el documento
window.addEventListener("DOMContentLoaded", () => {
  boton = document.getElementById("btnTabla");
  boton.addEventListener("click", handlerLoadList);

  document.addEventListener("click", handlerClick);
});

//funcion que va a recibir por referencia el eventListener
//siempre va a venir un objeto event por mas que no se especifique en la llamada en la función
function handlerLoadList(e) {
  renderizarTabla(crearTabla(personas), document.getElementById("divTabla"));
  const emisor = e.target;

  emisor.textContent = "Eliminar tabla"; //cambio el nombre del boton
  emisor.removeEventListener("click", handlerLoadList); //quito el evento al boton
  emisor.addEventListener("click", handlerDeleteList); //le agrego el evento de eliminar tabla al boton
}

//funcion que va a recibir por referencia el eventListener
function handlerDeleteList(e) {
  renderizarTabla(null, document.getElementById("divTabla"));

  const emisor = e.target;
  emisor.textContent = "Cargar tabla";
  emisor.removeEventListener("click", handlerDeleteList);
  emisor.addEventListener("click", handlerLoadList);
}

//Vacía el contenedor e inserta la tabla en el mismo
function renderizarTabla(tabla, contenedor) {
  vaciarContenedor(contenedor);

  //si existe tabla...
  if (tabla) {
    contenedor.appendChild(tabla);
  }
}

//Vacia el contenedor pasado por parámetro
function vaciarContenedor(contenedor) {
  while (contenedor.hasChildNodes()) {
    contenedor.removeChild(contenedor.firstChild);
  }
}

//Genera una tabla dinamicamente
function crearTabla(items) {
  const table = document.createElement("table");

  table.appendChild(crearThead(items[0]));
  table.appendChild(crearTbody(items));

  //aca podria aplicarse un estilo a la tabla(no es una buena practica)
  /*table.setAttribute("style", "border: 1px solid black");
  table.style.setProperty("border", "1px solid black");
  table.style.border = "1px solid black";
  */

  return table;
}

//Creo el encabezado de la tabla dinamicamente
function crearThead(item) {
  const thead = document.createElement("thead");
  const tr = document.createElement("tr");

  //cambio el estilo al tr
  tr.style.backgroundColor = "#00aeff";

  for (const key in item) {
    if (key !== "id") {
      const th = document.createElement("th");
      th.textContent = key;
      tr.appendChild(th);
    }
  }
  thead.appendChild(tr);
  return thead;
}

//Creo el cuerpo de la tabla dinamicamente
function crearTbody(items) {
  const tbody = document.createElement("tbody");

  items.forEach((element) => {
    const tr = document.createElement("tr");

    for (const key in element) {
      if (key === "id") {
        tr.setAttribute("data-id", element[key]); //standard a partir de ecmascript 6
      } else {
        const td = document.createElement("td");
        //td.addEventListener("click", handlerClickTD);
        td.textContent = element[key];
        tr.appendChild(td);
      }
    }

    tbody.appendChild(tr);
  });

  return tbody;
}

function handlerClick(e) {
  //Se puede aplicar cualquier regla de CSS
  if (!e.target.matches("td")) return;

  let id = e.target.parentNode.dataset.id;

  console.log(id);
}

/*
function handlerClickTD(e) {
  console.log(e.target.parentNode.firstElementChild.textContent);
}
*/

//Fase de captura.
//Fase de burbuja.
//Dependiendo como pongamos el 3er parametro en el addEventListener(param1, param2, param3), es la fase en la que nos vamos a encontrar.
//al ponerlo en true, atrapamos al primer TD en la fase de CAPTURA.
//Por default los elementos capturan los eventos en la fase de burbuja.
