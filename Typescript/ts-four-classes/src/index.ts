import { Vehicle } from "./Vehicle";
import { Car } from "./Car";

console.log("class example")

// instantiating a new Vehicle with the 'new' keyword
const myVehicle: Vehicle = new Vehicle(4, 256);
myVehicle.accelerate(10);
console.log(`My vehicles speed is: ${myVehicle.speed}`);