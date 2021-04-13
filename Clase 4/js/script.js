window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btnSaludo").addEventListener("click", () => {
    //Arrow function
    console.log("hola");
  });
});

//DOMContentLoaded hace que se ejecute asincronicamente

/*
//GENERA UN SCOPE, this SE REFIERE A LA FUNCION
let sumar = function(a, b){
return a + b;
}      

//NO GENERA SCOPE, EN ESTE CASO this SE REFIERE AL GLOBAL
let sumar2 = (a, b) => a + b;
*/

/*
document.getElementById("btnSaludo").addEventListener("click", (a, b)=> {  //Arrow function
console.log("hola");
});
*/

/*
$btnSaludo.addEventListener("click", ()=> {  //Arrow function
console.log("hola");
});
*/

/*
$btnSaludo.addEventListener("click", function saludar() {  //Codigo de función en la llamada
console.log("hola");
});*/

/*
$btnSaludo.addEventListener("click", saludar());  //llamo a la función, conveniente cuando se va a usar la misma mas de una vez

function saludar() {
console.log("hola");
}

function saludar() {
console.log("hola");
}
*/
