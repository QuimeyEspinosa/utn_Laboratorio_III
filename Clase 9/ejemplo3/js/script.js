//import { personas } from "../personas.js";
import Persona from "../personas.js";
//console.log(personas);

//Si existe una lista en el local storage, la asigno a personas, de lo contrario asigno un array vacio
const personas = JSON.parse(localStorage.getItem("lista")) || [];

//Se programa todo lo que se va a hacer luego de cargar el documento
window.addEventListener("DOMContentLoaded", () => {
  console.log(personas);
  document.forms[0].addEventListener("submit", handlerSubmit);

  //const boton = document.getElementById("btnTabla");
  //boton.addEventListener("click", handlerLoadList);
  document.addEventListener("click", handlerClick);
  //Cargo la lista automaticamente si es que existen elementos
  if (personas.length > 0) {
    handlerLoadList(personas);
  }
});

function limpiarFormulario(frm) {
  frm.reset();
  document.getElementById("btnEliminar").classList.add("oculto");
  document.getElementById("btnSubmit").value = "Alta persona";
  document.forms[0].id.value = "";
}

//Manejador que se ejecuta al presionar el botón de submit
function handlerSubmit(e) {
  e.preventDefault();
  const frm = e.target;

  //Codigo de modificar
  //Si es una cadena vacía, se valida como falso
  if (frm.id.value) {
    const personaModificada = new Persona(
      frm.id.value,
      frm.nombre.value,
      frm.email.value,
      frm.sexo.value
    );

    if (confirm("¿Seguro que desea realizar la modificación?")) {
      agregarSpinner();
      setTimeout(() => {
        modificarPersona(personaModificada);
        eliminarSpinner();
      }, 2000);
    }

    //Codigo para dar de alta
  } else {
    console.log("Dando de alta");

    console.log(frm.nombre.value);
    console.log(frm.email.value);
    console.log(frm.sexo.value);

    const nuevaPersona = new Persona(
      Date.now(),
      frm.nombre.value,
      frm.email.value,
      frm.sexo.value
    );

    agregarSpinner();
    setTimeout(() => {
      altaPersona(nuevaPersona);
      eliminarSpinner();
    }, 2000);
  }
  limpiarFormulario(e.target);
}

function agregarSpinner() {
  let spinner = document.createElement("img");
  spinner.setAttribute("src", "./assets/spinner.gif");
  spinner.setAttribute("alt", "imagen spinner");

  document.getElementById("spinner-container").appendChild(spinner);
}

function eliminarSpinner() {
  document.getElementById("spinner-container").innerHTML = "";
}

//Almaceno los datos en local storage y actualiza la lista/tabla
function almacenarDatos(data) {
  localStorage.setItem("lista", JSON.stringify(data));
  handlerLoadList();
}

//Doy de alta una persona
function altaPersona(p) {
  personas.push(p); //Cargo la nueva persona en el array

  almacenarDatos(personas); //guardo el array modificado en el local storage
}

//Modifico una persona
function modificarPersona(p) {
  let index = personas.findIndex((per) => {
    return per.id === parseInt(p.id);
  });

  personas.splice(index, 1, p);
  almacenarDatos(personas);
}

//funcion que va a recibir por referencia el eventListener
//siempre va a venir un objeto event por mas que no se especifique en la llamada en la función
function handlerLoadList(e) {
  renderizarTabla(crearTabla(personas), document.getElementById("divTabla"));
  //const emisor = e.target;
  //emisor.textContent = "Eliminar tabla"; //cambio el nombre del boton
  //emisor.removeEventListener("click", handlerLoadList); //quito el evento al boton
  //emisor.addEventListener("click", handlerDeleteList); //le agrego el evento de eliminar tabla al boton
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

//Manejador que se ejecuta al hacer click
function handlerClick(e) {
  //Se puede aplicar cualquier regla de CSS en el matches
  if (e.target.matches("td")) {
    let id = e.target.parentNode.dataset.id;
    console.log(id);
    cargarFormulario(id);
  } else if (e.target.matches("#btnEliminar")) {
    let id = parseInt(document.forms[0].id.value);

    if (confirm("¿Seguro que desea eliminar?")) {
      //personas = personas.filter((element) => element.id !== id); //filter no se puede usar ya que se personas se declaro como constante
      agregarSpinner();

      setTimeout(() => {
        let index = personas.findIndex((el) => el.id === id);
        personas.splice(index, 1);

        almacenarDatos(personas);
        eliminarSpinner();
      }, 2000);
    }
    limpiarFormulario(document.forms[0]);
  }
}

//Cargo el formulario con los datos del item a través de su id
function cargarFormulario(id) {
  //hay que pasar el mismo nombre que tiene la key para que funcione el desestructurado
  const { nombre, sexo, email } = personas.filter((persona) => persona.id === parseInt(id))[0];
  const frm = document.forms[0];

  frm.id.value = id;
  frm.nombre.value = nombre;
  frm.email.value = email;
  frm.sexo.value = sexo;

  document.getElementById("btnSubmit").value = "Modificar";
  document.getElementById("btnEliminar").classList.remove("oculto");
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
