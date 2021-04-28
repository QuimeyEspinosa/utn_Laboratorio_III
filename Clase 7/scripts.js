import { Mascota } from "./mascota.js";
import { Animal } from "./animal.js";

const a = new Animal("Vaca", 5);
const b = new Mascota("Bobby", 3, "Perro", true);

console.log(a);
console.log(b);

console.log(a.presentarse());
console.log(b.presentarse());
