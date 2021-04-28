import { Animal } from "./animal.js";

export function Mascota(nombre, edad, tipo, vacunada = false) {
  Animal.call(this, tipo, edad);
  let _nombre = nombre;
  this.vacunada = vacunada;

  this.setNombre = function (value) {
    _nombre = value;
  };

  this.getNombre = function () {
    return _nombre;
  };

  Mascota.prototype.informarHambre = function () {
    console.log(`${this.getNombre()} tiene hambre`);
  };

  Mascota.prototype.presentarse = function () {
    let mensaje = Animal.prototype.presentarse.call(this);
    return `${mensaje} y me llamo ${this.getNombre()}`;
  };
}

Object.setPrototypeOf(Mascota.prototype, Animal.prototype);
