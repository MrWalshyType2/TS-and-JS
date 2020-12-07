console.log("GENERIC FUNCTIONS");

let numArray: number[] = [2, 4, 6, 7];
let stringArray: string[] = ["Car", "Bike", "Train", "Bus"];

function reverseNumberArrayAndLog(noArr: number[]) {
    let newNumberArray: number[] = noArr.reverse();
    console.log(newNumberArray);
}

function reverseStringArrayAndLog(stArr: string[]) {
    let newStringArray: string[] = stArr.reverse();
    console.log(newStringArray);
}

reverseNumberArrayAndLog(numArray);
reverseStringArrayAndLog(stringArray);

// The two functions above duplicate code
console.log("Generic reverse array function:");
function reverseArray<T>(arr: T[]) {
    let newArray: T[] = arr.reverse();
    console.log(newArray);
}

reverseArray(numArray);
reverseArray(stringArray);

// Type Constraints
console.log("Generic Function Parameter Type Constraints");

function getValueOfKey<T, K extends keyof T>(someObject: T, keyOfSomeObject: K) {
    return someObject[keyOfSomeObject];
}

const myObject = { key1: "Stringy", key2: 42, key3: true };

console.log(getValueOfKey(myObject, "key1"));
console.log(getValueOfKey(myObject, "key2"));


console.log("GENERIC CLASSES");

interface RoadVehicle {
    wheels: number;
    taxed: boolean;
    speed: number;
}

class Car implements RoadVehicle {
    wheels: number;
    taxed: boolean;
    speed: number;
}

class Bus implements RoadVehicle {
    passengers: number;
    wheels: number;
    taxed: boolean;
    speed: number;
}

class Plane {
    wheels: number;
    wings: number;
}

// Garage that can park any vehicle of type T
class Garage<T> {
    vehicles: T[] = [];

    park(vehicle: T) {
        this.vehicles.push(vehicle);
    }
}

let myGarage = new Garage<Car>();
myGarage.park(new Car());
myGarage.park(new Bus());
// myGarage.park(new Plane()); // IDE error

class RoadVehicleGarage<T extends RoadVehicle> extends Garage<T> {

}
let roadVehicleGarage = new RoadVehicleGarage<Bus>();
roadVehicleGarage.park(new Bus());
// roadVehicleGarage.park(new Car());

let roadVehicleGarage2 = new RoadVehicleGarage<Car>();
roadVehicleGarage2.park(new Bus());
roadVehicleGarage2.park(new Car());

let roadVehicleGarage3 = new RoadVehicleGarage<RoadVehicle>();
roadVehicleGarage3.park(new Bus());
roadVehicleGarage3.park(new Car());
// roadVehicleGarage3.park(new Plane()); // IDE error


console.log("GENERIC INTERFACES");
interface VehiclePrinter<T extends Vehicle> {
    print(arg: T): void;
}

abstract class Vehicle {
    constructor(public make: string, public model: string, public roadWheels: number) {}
}

class Car2 extends Vehicle {
    constructor(public make: string, public model: string, public roadWheels: number, public doors: number) {
        super(make, model, roadWheels);
    }
}

class Bus2 extends Vehicle {
    constructor(public make: string, public model: string, public roadWheels: number, public doors: number) {
        super(make, model, roadWheels);
    }
}

class Plane2 {
    constructor(public make: string, public model: string, public seats: number, public decks: number) {}
}

class Garage2<T extends Vehicle> implements VehiclePrinter<T> {
    vehicles: T[] = [];

    park(vehicle: T) {
        this.vehicles.push(vehicle);
    }

    print(vehicle: T) {
        console.log(`Make: ${vehicle.make}, Model: ${vehicle.model}`);
    }
}

const myCar = new Car2("Nissan", "Skyline", 4, 5);
const myBus = new Bus2("Volvo", "Traveller", 5, 8);
const myPlane = new Plane2("Airbus", "c128", 200, 1);
const maGarage = new Garage2();

maGarage.park(myCar);
maGarage.park(myBus);
// maGarage.park(myPlane); // not a RoadVehicle
maGarage.print(myCar);
maGarage.print(maGarage.vehicles[1]);