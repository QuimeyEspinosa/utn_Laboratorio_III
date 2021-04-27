// Funciones

function sumar(a, b)
{
    return a + b;
}

const a = 40;
const b = 50;

const resultado = sumar(a, b);
console.log(resultado);



function restar(primerNumero = 220, segundoNumero = 120)
{
    return primerNumero - segundoNumero;
}

const resultado2 = restar();
console.log(resultado2);

//Template strings
function saludar(nombre, edad)
{
    console.log('Hola soy ' + nombre + ' y tengo ' + edad + ' años.');

    //'' "" ``
    console.log(`Hola soy ${nombre} y tengo ${edad} años.`);
}

saludar('Yago', 22);


//Funciones declaradas
funcionDeclarada();

function funcionDeclarada()
{
    console.log('Esta es una función declarada, se puede invocar en cualquier parte de nuestro código.');
}
funcionDeclarada();


//Funciones expresadas
const funcionExpresada = function()
{
    console.log('Esta es una función expresada, es decir, una función se le ha asignado como valor a una variable.');
}
funcionExpresada();


//Ordenamiento de código.
/**
 * Módulos
 * Declaración de variables
 * Declaraciones de las funciones
 * Todo el código ejecutable
 */


//Funciones autoejecutables
(
    function(){
        console.log('Me autoejecuto');
    }
)();