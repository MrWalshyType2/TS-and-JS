export class Vehicle {
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