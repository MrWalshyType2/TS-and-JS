class StaticCar {
    readonly wheels: number;
    readonly power: number;
    protected engineOn: boolean = false;

    static timesInstantiated: number = 0;

    public constructor(wheels, power) {
        this.wheels = wheels;
        this.power = power;
    }

    public engineOnToggle(): boolean {
        this.engineChecks() ? this.engineOn = !this.engineOn : this.engineOn = false;

        return this.engineOn ? true : false;
    }

    protected engineChecks(): boolean {
        return Math.round(Math.random()) == 0 ? true : false;
    }

    protected incrementTimesInstantiated(): void {
        StaticCar.timesInstantiated++;
    }
}