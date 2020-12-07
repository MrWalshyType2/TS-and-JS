class PrivateCar {
    private wheels: number;
    private power: number;
    private engineOn: boolean = false;

    public constructor(wheels, power) {
        this.wheels = wheels;
        this.power = power;
    }

    public engineOnToggle(): boolean {
        this.engineOn = !this.engineOn;

        return this.engineOn ? true : false;
    }
}