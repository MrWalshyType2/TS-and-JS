import { Vehicle } from "./Vehicle";

export class Car extends Vehicle {
    gps: boolean;

    constructor(wheels, power, gps: boolean = true) {
        // call super to call the parent constructor
        super(wheels, power);
        this.gps = gps;
    }
}