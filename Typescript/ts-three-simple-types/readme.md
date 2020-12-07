# TypeScript Types
TypeScript applies types to variables.

Some to be aware of are:
    - Array
    - Tuple
    - Enum
    - Any
    - Void
    - Never
    - Object
    - Unknown (introduced in TS v3.0)

## Primitive Types
The JS primitive types are available for use in TS.

- boolean
- number
- string
- object

## Reference Types
The JS reference types are available for use in TS.

- null
- undefined
- symbol

## Declaring a variable
```
const varName: type = value;

let varName: type;
```

## Arrays
Arrays must be typed with all elements conforming to the type it is defined as:

```
let numList1: Array<number> = [1, 2, 3];

let numList2: number[] = [4, 5, 6];
```

The standard list methods apply:
- list.push()
- list.pop()
- list.unshift()
- list.shift()

## Tuples
Tuples allow arrays of mixed types, the type and order must be defined on declaration.

- Use '|' to allow different defined types.
- Use '?' to allow optional element population.

All elements following an optional element must be optional too. Elements can be accessed using bracket notation.

```
let tuple: [string, number, number, (number | string)?];

// add vals to tuple
tuple = ["John", 6, 9];

// Reassign with allowed types
tuple = ["John", 6, 9, "Smith"];

let tuple2: [string, number];

// push values to a tuple
tuple2.push("Fred", 25);
```

### Tuple Destructuring
Tuples can be destructured into other variables.

```
let tuple3: [number, string, boolean] = [7, "hello", true];

let [a, b, c] = tuple3;

// can use the spread operator to get a shorter tuple
let [a, ...ij] = tuple;
let [k, l, m, ...n] = tuple;

// elements can also be ignored
let [o] = tuple;
let [, p] = tuple;
```

## any type
- Allows the bypassing of type safety
- Any data type can be stored in the 'any' data type
- The any type can also be specified in a tuple

```
let person: any[] = ["Fred", "Smith", 34]

let personTuple: [string, string, number, any?];

personTuple.push(["Array", "For", "The", "any"]);
```

## unknown type
- Type safe counterpart of any
- Any value is assignable with the type unknown
- unknown isn't assignable to anything but itself and any without type assertion or control flow based narrowing.

```
let unknownValue: unknown;

unknownValue = true;
unknownValue = "hello";

function stringify(data: unknown): string {
    // using control flow based narrowing
    if (typeof data === `number`) return data.toString();
    else if (data instanceof Date) return data.toDateString();
    else return String(data);
}

console.log(stringify(34234));
console.log(stringify(new Date(Date.UTC(2020, 4, 4))));
```

## null and undefined
TS supports the null and undefined types.

- null is a value that is set to initialised variables
- undefined is set to declared but not initialised variables.

If the '--strictNullChecks' flag is passed to the 'tsc' command, the two rules above apply.

## Function arguments and return types
The types of a function can be defined as:
- primitive
- reference
- custom type
- interchangeable types
- optional types

```
function createGreeting(name: string = `You`, favNum: number | string, optional?: { phrase1: string, phrase2?: string }): string {
    let initialPhrase = `Hello, ${name}, your favourite number is ${favNum}`;

    optional?.phrase1 ? initialPhrase += `${optional.phrase1}` : null;
    optional?.phrase2 ? initialPhrase += `${optional.phrase2}` : null;

    return initialPhrase;
}
```

Arrow functions can be declared as a type on a variable to specify its args and return type.

```
const afCreateGreeting: (name: string, favNum: number | string, optional?: { phrase1: string, phrase2?: string }) => string =
    (name: string = `You`, favNum: number | string, optional?: { phrase1: string, phrase2?: string }) => {
        let initialPhrase = `Hello, ${name}, your favourite number is ${favNum}`;

        optional?.phrase1 ? initialPhrase += `${optional.phrase1}` : null;
        optional?.phrase2 ? initialPhrase += `${optional.phrase2}` : null;

        return initialPhrase;
    };
```

Void is used to specify a function that has no return type

```
function noReturn(): void {
    console.log("Meh");
}
```

A function can return a void function.

```
const afWithVoidReturnFunc: () => void = (): void => {
    console.log("no return value");

    return console.log(`Returning a func`);
}
```

A function can be given the 'never' type to indicate it never returns control to the caller.

- Good for halting program execution incase of an error

```
function throwError(): never {
    throw new Error(`throwing error`);
}

const afThrowError = () =>
```

## Enums
Enums are used to give friendly names to numeric values.

- auto numbered from 0
- can start from any number
- can be numbered manually throughout
- can go from numeric value to the name

```
enum Color {Red=10, Green, Blue};
let c1: Color = Color.Red; // 10
let c2: string = Color[11]; // Green
```

### Bitwise OR '|'
Bitwise OR will return 1 if either or both operands to some corresponding bits are 1, else 0 is returned.

```
0010 0110 | 0100 0011 = ?

0010 0110
0100 0011
=========
0110 0111
```

### Bitwise AND '&'
Bitwise AND will return 1 if both operands to some corresponding bits are 1, else 0 is returned.

```
0011 & 1001 = ?

0011
1001
====
0001
```

## Type Assertion
If an entity is more specific than its current type, the compiler sometimes needs overriding. TS provides two syntaxes for this:

```
// Angle-bracket syntax
let thing: any = `Thing T. Thing`;
let nameLength: number = (<string>thing).length;

// as-syntax
let nameLength2: number = (thing as string).length;
```