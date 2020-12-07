/*
   ARRAYS
*/
console.log("ARRAYS");
let list1: Array<number> = [1, 2, 3];

list1.push(4);
console.log(list1);
list1.pop();
list1.unshift(0);
console.log(list1);

// list1.push("five"); // ide error

/*
   TUPLES
*/
console.log("TUPLES");
let tuple: [string, number, number, (number | string)?];

// add vals to tuple
tuple = ["John", 6, 9];

// Reassign with allowed types
tuple = ["John", 6, 9, "Smith"];
console.log(tuple);

let tuple2: [string, number?];

// push values to a tuple
tuple2 = ["Fred"];
tuple2.push(25);
console.log(tuple2);

// Update a value with bracket notation
tuple2[0] = "Bob";
console.log(tuple2);

// DESTRUCTURING
console.log("DESTRUCTURING TUPLES")

let tuple3: [number, string, boolean] = [7, "hello", true];

let [a, b, c] = tuple3;

// can use the spread operator to get a shorter tuple
let [d, ...ij] = tuple3;
let [k, l, m, ...n] = tuple3;

console.log(d);
console.log(ij); // ij = tuple of [string, boolean]
console.log(n); // n = [] empty tuple

// elements can also be ignored
let [o] = tuple3;
let [, p] = tuple3;
console.log(p);

/*
   Any and Unknown
*/
console.log("The any type")
let person: any[] = ["Fred", "Smith", 34]

let personTuple: [string, string, number, any?];
personTuple = ["Bobbo", "Hobbity", 21];
personTuple.push(["Array", "For", "The", "any"]);

console.log(person);
console.log(personTuple);

console.log("The unknown type");
let unknownValue: unknown;

unknownValue = true;
console.log(unknownValue);
unknownValue = "hello";
console.log(unknownValue);

function stringify(data: unknown): string {
    if (typeof data === `number`) return data.toString();
    else if (data instanceof Date) return data.toDateString();
    else return String(data);
}

console.log(stringify(34234));
console.log(stringify(new Date(Date.UTC(2020, 4, 4))));

/*
   Function arguments and return types
*/
console.log("Function arguments and return types");

function createGreeting(name: string = `You`, favNum: number | string, optional?: { phrase1: string, phrase2?: string }): string {
    let initialPhrase = `Hello, ${name}, your favourite number is ${favNum}`;

    optional?.phrase1 ? initialPhrase += `${optional.phrase1}` : null;
    optional?.phrase2 ? initialPhrase += `${optional.phrase2}` : null;

    return initialPhrase;
}

const afCreateGreeting: (name: string, favNum: number | string, optional?: { phrase1: string, phrase2?: string }) => string =
    (name: string = `You`, favNum: number | string, optional?: { phrase1: string, phrase2?: string }) => {
        let initialPhrase = `Hello, ${name}, your favourite number is ${favNum}`;

        optional?.phrase1 ? initialPhrase += `${optional.phrase1}` : null;
        optional?.phrase2 ? initialPhrase += `${optional.phrase2}` : null;

        return initialPhrase;
    };

console.log(createGreeting("John", 42));
console.log(afCreateGreeting(undefined, 30));

const afWithVoidReturnFunc: () => void = (): void => {
    console.log("no return value");

    return console.log(`Returning a func`);
}

afWithVoidReturnFunc();

const afThrowError = (): never => {
    throw new Error("ERROR HAHAHAHAH");
};

/*
   Enums
*/
console.log("ENUMS");

enum Color {Red=10, Green, Blue};
let c1: Color = Color.Red; // 10
let c2: string = Color[11]; // Green

console.log(`c1 = {${c1} = ${Color[c1]}}, c2 = {${Color.Green} = ${c2}}`);

// The index can be shifted using '1-bit shift notation', i.e. shifting 1 bit x places
// 1 << x
enum Options {
    None,
    satNav = 1 << 0,        // 000001 - satNav          - Index 1
    tintedWindows = 1 << 1, // 000010 - tintedWindows   - Index 2
    leatherSeats = 1 << 2,  // 000100 - leatherSeats    - Index 4
    cruiseControl = 1 << 3, // 001000
    heatedSeats = 1 << 4,   // 010000
    DAB = 1 << 5            // 100000
}

// Using the 'bitwise OR' operation to set the options a car has
let car1 = {
    brand: "Nissan",
    options: Options.satNav | Options.leatherSeats // satNav | leatherSeats = 000101 = 5
}

// Using 'bitwise AND' to see if the car has a specified option
if (Options.satNav & car1.options) {
    console.log(`CAR 1: ${car1.brand}, has a SatNav.`);
}
Options.leatherSeats & car1.options ? console.log(`CAR 1: ${car1.brand}, has leather seats.`) : "";
