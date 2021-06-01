import Anuncio from "../anuncio.js";

//Si existe una lista en el local storage, la cargo, de lo contrario asigno un array vacio
const items = JSON.parse(localStorage.getItem("lista")) || [];
const frmPrincipal = document.getElementById("frmPrincipal");

simularTiempoCarga();

window.addEventListener("DOMContentLoaded", () => {
  botoneraInicial();

  document.addEventListener("click", handlerClick);

  if (items.length > 0) {
    handlerLoadList(items);
  }
});

//Funcion que se ejecuta al hacer click
function handlerClick(e) {
  if (e.target.matches("td")) {
    cargarItemFormulario(e.target.parentNode.dataset.id);
  }

  if (e.target.matches("#btnAgregar")) {
    altaItem();
  }

  if (e.target.matches("#btnModificar")) {
    modificarItem();
  }

  if (e.target.matches("#btnEliminar")) {
    eliminarItem();
  }

  if (e.target.matches("#btnCancelar")) {
    limpiarFormulario(frmPrincipal);
  }
}

function cargarItemFormulario(id) {
  const {
    titulo,
    transaccion,
    descripcion,
    precio,
    num_wc,
    num_estacionamiento,
    num_dormitorio,
  } = items.filter((element) => element.id === parseInt(id))[0];

  frmPrincipal.id.value = id;
  frmPrincipal.txtTitulo.value = titulo;
  frmPrincipal.transaccion.value = transaccion;
  frmPrincipal.txtDescripcion.value = descripcion;
  frmPrincipal.txtPrecio.value = precio;
  frmPrincipal.txtBanios.value = num_wc;
  frmPrincipal.txtAutos.value = num_estacionamiento;
  frmPrincipal.txtDormitorios.value = num_dormitorio;

  botoneraABM();
}

function altaItem() {
  let error = 0;

  let _titulo = frmPrincipal.txtTitulo.value;
  let _transaccion = frmPrincipal.transaccion.value;
  let _descripcion = frmPrincipal.txtDescripcion.value;
  let _precio = frmPrincipal.txtPrecio.value;
  let _cantBanios = frmPrincipal.txtBanios.value;
  let _cantAutos = frmPrincipal.txtAutos.value;
  let _cantDormitorios = frmPrincipal.txtAutos.value;

  _precio = parseFloat(_precio) || null;
  _cantBanios = parseInt(_cantBanios) || null;
  _cantAutos = parseInt(_cantAutos) || null;
  _cantDormitorios = parseInt(_cantDormitorios) || null;

  if (_titulo == null || _titulo == "") {
    error = 1;
  }
  if (_transaccion == null || _transaccion == "") {
    error = 1;
  }
  if (_descripcion == null || _descripcion == "") {
    error = 1;
  }
  if (_precio == null || _precio == "") {
    error = 1;
  }
  if (_cantBanios == null || _cantBanios == "") {
    error = 1;
  }
  if (_cantAutos == null || _cantAutos == "") {
    error = 1;
  }
  if (_cantDormitorios == null || _cantDormitorios == "") {
    error = 1;
  }

  if (error === 1) {
    alert("Uno o más datos están incompletos o son inválidos");
    return false;
  }

  simularTiempoCarga();

  const nuevoItem = new Anuncio(
    obtenerNuevoId(),
    _titulo,
    _transaccion,
    _descripcion,
    _precio,
    _cantBanios,
    _cantAutos,
    _cantDormitorios
  );

  items.push(nuevoItem);
  almacenarDatos(items);
  limpiarFormulario(frmPrincipal);
}

function modificarItem() {
  let error = 0;

  let _titulo = frmPrincipal.txtTitulo.value;
  let _transaccion = frmPrincipal.transaccion.value;
  let _descripcion = frmPrincipal.txtDescripcion.value;
  let _precio = frmPrincipal.txtPrecio.value;
  let _cantBanios = frmPrincipal.txtBanios.value;
  let _cantAutos = frmPrincipal.txtAutos.value;
  let _cantDormitorios = frmPrincipal.txtAutos.value;

  _precio = parseFloat(_precio) || null;
  _cantBanios = parseInt(_cantBanios) || null;
  _cantAutos = parseInt(_cantAutos) || null;
  _cantDormitorios = parseInt(_cantDormitorios) || null;

  if (_titulo == null || _titulo == "") {
    error = 1;
  }
  if (_transaccion == null || _transaccion == "") {
    error = 1;
  }
  if (_descripcion == null || _descripcion == "") {
    error = 1;
  }
  if (_precio == null || _precio == "") {
    error = 1;
  }
  if (_cantBanios == null || _cantBanios == "") {
    error = 1;
  }
  if (_cantAutos == null || _cantAutos == "") {
    error = 1;
  }
  if (_cantDormitorios == null || _cantDormitorios == "") {
    error = 1;
  }

  if (error === 1) {
    alert("Uno o más datos están incompletos o son inválidos");
    return false;
  }

  simularTiempoCarga();

  const itemModificado = new Anuncio(
    parseInt(frmPrincipal.id.value),
    _titulo,
    _transaccion,
    _descripcion,
    _precio,
    _cantBanios,
    _cantAutos,
    _cantDormitorios
  );

  if (confirm("¿Seguro que desea realizar la modificación?")) {
    let index = items.findIndex((i) => {
      return i.id === parseInt(frmPrincipal.id.value);
    });

    items.splice(index, 1, itemModificado);
    almacenarDatos(items);
    limpiarFormulario(frmPrincipal);
  }
}

function eliminarItem() {
  if (confirm("¿Seguro que desea eliminar? Esta acción no se puede deshacer")) {
    simularTiempoCarga();

    let index = items.findIndex((i) => {
      return i.id === parseInt(frmPrincipal.id.value);
    });
    items.splice(index, 1);
    almacenarDatos(items);
    limpiarFormulario(frmPrincipal);
  }
}

function obtenerNuevoId() {
  let id = 1;

  if (items.length != 0) {
    const lastItem = items[items.length - 1];
    id = parseInt(lastItem.id + 1);
  }

  return id;
}

//Cargo datos en localStorage
function almacenarDatos(data) {
  localStorage.setItem("lista", JSON.stringify(data));
  handlerLoadList(items);
}

//Cargo una lista donde haga falta
function handlerLoadList(e) {
  renderizarTabla(crearTabla(e), document.getElementById("dynamicTable"));
}

//Cargar una tabla en un contenedor
function renderizarTabla(table, contenedor) {
  vaciarContenedor(contenedor);

  if (table) {
    contenedor.appendChild(table);
  }
}

//Creo una tabla dinamicamente
function crearTabla(items) {
  const table = document.createElement("table");

  table.appendChild(crearThead(items[0]));
  table.appendChild(crearTbody(items));

  return table;
}

//Creo el encabezado de la tabla dinamicamente
function crearThead(item) {
  const thead = document.createElement("thead");
  const tr = document.createElement("tr");

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

//Vaciar un contenedor
function vaciarContenedor(contenedor) {
  while (contenedor.hasChildNodes()) {
    contenedor.removeChild(contenedor.firstChild);
  }
}

function botoneraInicial() {
  document.getElementById("btnModificar").classList.add("hidden");
  document.getElementById("btnEliminar").classList.add("hidden");
  document.getElementById("btnAgregar").classList.remove("hidden");
}

function botoneraABM() {
  document.getElementById("btnModificar").classList.remove("hidden");
  document.getElementById("btnEliminar").classList.remove("hidden");
  document.getElementById("btnAgregar").classList.add("hidden");
}

function limpiarFormulario(frm) {
  frm.reset();
  botoneraInicial();
}

//Simula la carga de información durante 1seg
function simularTiempoCarga() {
  let spinner = document.createElement("img");
  spinner.setAttribute("src", "./assets/spinner.gif");
  spinner.setAttribute("alt", "spinnerImage");

  document.getElementById("spinner-container").appendChild(spinner);
  document.getElementById("form-container").classList.add("hidden");

  setTimeout(() => {
    document.getElementById("spinner-container").removeChild(spinner);
    document.getElementById("form-container").classList.remove("hidden");
  }, 1000);
}
