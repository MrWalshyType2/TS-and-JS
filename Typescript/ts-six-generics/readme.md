# TypeScript Generics
Generics with:
- Functions
- Interfaces
- Classes
- Constraints

Generics allow the creation of strongly typed components that work over a variety of data types.

## Generic Functions
Using the 'type variable' identified by angle brackets allows the creation of a generic function that can accept and capture any type.
- The type variable is usually denoted as a 'T'.

```
function logVehicle<T>(vehicle: T): T {
    console.log(vehicle);
    return vehicle;
}

let loggedVehicle = logVehicle<Car>(myCar); // specified type
let loggedVehicle = logVehicle(myCar); // inferred type
```

### Type Param Constraints
The type of a function parameter can be constrained to a specific type hierarchy.

```
// K should be a key of type T
//  - Key K should exist in object of T
function getValueOfKey<T, K extends keyof T>(someObject: T, keyOfSomeObject: K) {
    return someObject[keyOfSomeObject];
}
```

## Generic Classes
A generic class can accept and capture any type.
    - Once a type is captured, the class must use types of the specified type

```
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

// A Garage without a specified type can store any of the vehicles, including the Plane
// A Garage with a type of 'Car' cannot include a plane, but can include a Bus as it implements a common interface.
```

## Generic Interfaces
Generic interfaces are often used to describe objects that may be generic.

```
interface VehiclePrinter<T extends Vehicle> {
    print(arg: T): void;
}

abstract class Vehicle {
    constructor(public make: string, public model: string, public roadWheels: number) {}
}

class Car extends Vehicle {
    constructor(public make: string, public model: string, public roadWheels: number, public doors: number) {
        super(make, model, roadWheels);
    }
}

class Bus extends Vehicle {
    constructor(public make: string, public model: string, public roadWheels: number, public doors: number) {
        super(make, model, roadWheels);
    }
}

class Plane {
    constructor(public make: string, public model: string, public seats: number, public decks: number) {}
}

class Garage<T extends Vehicle> implements VehiclePrinter<T> {
    vehicles: T[] = [];

    park(vehicle: T) {
        this.vehicles.push(vehicle);
    }

    print(vehicle: T) {
        console.log(`Make: ${vehicle.make}, Model: ${vehicle.model}`);
    }
}
```