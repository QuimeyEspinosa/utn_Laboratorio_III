const arrayRaro = new Array();

const arrayStandard = [
  10,
  false,
  "Maggie",
  ["a", "b", "c", "d"],
  [[1], [2, 3]],
];

console.log(arrayStandard[3]);

const arrayObjetos = [
  { nombre: "Maggie", edad: 5 },
  { nombre: "Luna", edad: 10 },
  { nombre: "Cami", edad: 8 },
];

console.log(arrayObjetos[0].nombre);

const colores = ["rojo", "verde", "azul"];
console.log(colores);
console.log(colores.length);

colores.push("celeste");
console.log(colores);

colores.pop();
console.log(colores);

const incluyeVerde = colores.includes("negro");

const arrayRelleno = Array(5).fill([1, 2, 3]);
console.log(arrayRelleno);

const navegacion = ["home", "about", "contact", "login"];

navegacion.forEach(function (elemento, index, arrayOriginal) {
  console.log(`<li id=${index}>${elemento}</li>`);
});


//Spread operator (operador de propagación) ES6
const superiores = [...["hombros"], "brazos", "torso"];
const inferiores = ["caderas", "piernas", "rodillas"];
const cuerpo = ["caderas", ...superiores, ...inferiores, "pies"];

//console.log(cuerpo);
//console.log([arrayObjetos, {nombre: "Cami", edad: 8}]);