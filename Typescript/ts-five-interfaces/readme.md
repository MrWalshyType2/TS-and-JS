# TypeScript Interfaces
- How to create and use
- Apply inheritance
- Excess property checks

An interface is like a contract, when implemented its rules must be followed.
- It is like an abstract class, but with only abstract methods and properties.

```
interface Car {
    speed: number;
    power: number;
}
```

Interfaces are duck-typed, the compiler will check if the required members are present.

```
interface Car { speed: number }

function parkCar(car: Car) {
    car.speed = 0;
    console.log(`Car is parked`);
}

parkCar({ speed: 50 });
```

## Function types
An interface can be used as a function type, to indicate a functions contract:

```
// Creating a function type of Log
interface Log {
    (error: string): void;
}

// Creating a function of type 'Log' that obeys the contract
const logError: Log = function(x: string): void {
    console.log(x);
}
```

## Optional Properties
Properties of an interface can be made optional with the ? symbol.

```
interface Vehicle {
    speed: number;
    fluxCapacitor?: boolean;

    accelerate?(time: number): number;

    timeTravel?(fluxCapacitory: boolean): string;
}

const myCar: Vehicle = {
    speed: 0,
    timeTravel: (fluxCapacitor: boolean) => fluxCapacitor ? `Time travel possible` : `Time travel not possible`;
}
```

## Excess Property Checks
- An interface is a contract that must be adhered to
- Can lead to silent errors - TS treates object literals with caution and does excess property checks

```
interface Vehicle {
    speed: number;
    fluxCapacitor?: boolean;

    accelerate?(time: number): number;

    timeTravel?(fluxCapacitory: boolean): string;
}

let car: Vehicle = {
    speed: 0,
    windows: "tinted" // produces an error
}
```

## Indexable Types
Interface types can be made indexable, so they can hold a list of values.

```
// Indexable type
//  - Each index will return a string
interface GarageArray1 {
    [index: number]: string;
}

let garage1: GarageArray1 = [
    "Ford",
    "Nissan",
    "Renault"
];
console.log(garage1[1]); // Nissan

// Each index is a string that returns a number
interface GarageArray2 {
    [index: string]: number;
}

// {} is used as an associative array
let garage2: GarageArray2 = {
    "Ford": 1,
    "Nissan": 2,
    "Renault": 3
};
console.log(garage2["Nissan"]); // 2

// readonly associative array
interface GarageArray3 {
    readonly [index: string]: number;
}

let garage3: GarageArray3 = {
    "Ford": 1,
    "Nissan": 2,
    "Renault": 3
};
```

## Interfaces and Classes
Classes can 'implements' an interface.

```
interface Vehicle {
    speed: number;
    fluxCapacitor?: boolean;

    accelerate(time: number): number;
}

class Car implements Vehicle {
    public speed: number = 0;

    constructor(public fluxCapacitory?: boolean) {}

    public accelerate(time: number): number {
        return this.speed += 0.5 * 100 * time;
    }
}
```

## Extandable interfaces
Interfaces can extend interfaces in the same way a class extends another class.
- A class can implement multiple interfaces

```
interface Vehicle {
    speed: number;
    fluxCapacitor?: boolean;

    accelerate?(time: number): number;
}

interface hasWheels extends Vehicle {
    wheels: number;
}

interface hasPassengers {
    passengers: number;
}

// A Bus must have 'wheels' from 'hasWheels' and 'speed' from 'Vehicle' as 'hasWheels' extends it.
class Bus implements hasWheels, hasPassengers {
    constructor(public speed: number = 0, public wheels: number = 6, public passengers: number = 0, public fluxCapacitor?: boolean) {}
}
```