# Classes in TypeScript
- How TS works with JS implementation of classes and inheritance
- Access modifiers
- Classes 'get' and 'set'
- Abstract classes
- Static keyword

## Making a simple class
- Class declarations must be at the top of the file as they are not hoisted.

```
class Vehicle {
    // Class fields/variables for holding object state
    wheels: number;
    power: number;
    speed: number = 0;

    // constructor for instantiating an object from a class template
    constructor(wheels: number, power: number) {
        this.wheels = wheels;
        this.power = power;
    }

    // accelerate method that takes time as a number and modifies the state of speed
    accelerate(time: number): void {
        this.speed = this.speed + (0.5 * this.power * time)
    }
}

// instantiating a new Vehicle with the 'new' keyword
const myVehicle: Vehicle = new Vehicle(4, 256);
myVehicle.accelerate(20);
console.log(`My vehicles speed is: ${myVehicle.speed});
```

## Inheritance
- Classes can inherit fields, constructors and methods from parent classes using inheritance with the 'extends' keyword


```
class Car extends Vehicle {
    gps: boolean;

    constructor(wheels, power, gps: boolean = true) {
        // call super to call the parent constructor
        super(wheels, power);
        this.gps = gps;
    }
}
```

## Access Modifiers
Access modifiers change the level of access a certain class, field, constructor or method has.

- public
    - Content can be accessed from anywhere using the 'public' keyword, active by default
    - public properties are inherited
- private
    - Content can only be accessed through publicly exposed interfaces if marked with the 'private' keyword
    - private properties are not inherited
- protected
    - The same as private, except the properties can be inherited
    - If a constructor is protected, the class cannot be instantiated but its child classes can if not protected
- readonly
    - 'readonly' properties are set via the constructor and cannot be set again
- static
    - The 'static' keyword makes a property visible on its class rather than an instance

## Parameter Properties
Parameter properties allow a class to be given properties with a shorthand notation using the constructor. The constructor parameters are given an access modifier to indicate them as a class property.

```
class Car {

    // As the properties are declared in the constructor parameters, they don't need manuaslly setting
    constructor(readonly wheels: number, readonly power: number) {}
}
```

## get & set
Encapsulation is used to hide the implementation of a class.

JS has provided 'get' and 'set' functionality for functions since ES5.
    - get and set function names cannot have the same name as the property they are related to
        - unless they are marked with 'private' and an underscore prefixing the var name OR if the var name is prefixed with a hash symbol.

```
class Car {
    #speed: number = 0; // new way
    private _maxSpeed: number = 150; // old way

    constructor(readonly wheels: number, readonly power: number) {}

    get speed(): number {
        return this.#speed();
    }

    set speed(newSpeed: number): void {
        if (newSpeed && newSpeed > -30 && newSpeed <= 150) {
            this.#speed = newSpeed;
        }
    }

    get maxSpeed() { return this._maxSpeed; }
}
```

## Abstract classes
- Part of JS since ES2015
- Created with the 'abstract' keyword
- Cannot be instantiated
- Can define fields and methods
- Methods may or may not provide an implementation
- Can be extended and inherited from
    - missing implementations need providing

```
abstract class Shape {
    
    constructor(readonly name: string, readonly sides: number, public area: number = null) {}

    abstract get calcArea(): number;

    public printShapeInfo(): void {
        console.log(`I am a ${this.name} with ${this.sides} sides and an area of ${this.calcArea}`);
    }
}

class Circle extends Shape {

    constructor(readonly radius:number) {
        super("circle", 1);
    }

    get calcArea(): number {
        this.area = Math.PI * Math.pow(this.radius, 2);
        return this.area;
    }
}
```

## Structural Typing
TS is structurally typed - this means if the types of all members are compatible, then the types are compatible.

- Duck-typing
    - Two objects are considered to be of the same type if they share the same set of properties and methods
        - except for 'private' and 'protected' members
    - "If it walks like a duck and quacks like a duck, it probably is a duck"

```
// Duck-typing applies to class declarations and instantiations
class STVehicle {
    constructor(public wheels: number, public power: number) {}
}

class STCar extends STVehicle {
    constructor(wheels: number, power: number) {
        super (wheels, power);
    }
}

class STTaxi {
    public wheels;
    public power;

    constructor(wheels: number, power: number) {
        this.wheels = wheels;
        this.power = power;
    }
}

class Rikshaw {
    constructor(private wheels: number, private power: string) {}
}

let mySTVehicle: STVehicle = new STVehicle(4, 15);

// The STVehicle can be a STVehicle, STCar or STTaxi but not a Rikshaw
myStVehicle = new STCar(4, 15);
myStVehicle = new STTaxi(4, 10);
myStVehicle = new Rikshar(3, "Moves like a bag o' bones"); // IDE error
```