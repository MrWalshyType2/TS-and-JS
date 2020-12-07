class PublicCar {
    public wheels: number;
    public power: number;
    public engineOn: boolean = false;

    public constructor(wheels, power) {
        this.wheels = wheels;
        this.power = power;
    }

    public engineOnToggle(): boolean {
        this.engineOn = !this.engineOn;

        return this.engineOn ? true : false;
    }
}