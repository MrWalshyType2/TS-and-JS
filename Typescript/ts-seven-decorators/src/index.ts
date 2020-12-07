console.log("DECORATORS");
function DecoratorFactory(name: string) {
    return function(target: Function) {
        console.log(`${name} decorator was called`);
    }
}

@DecoratorFactory("factory")
class DecoratedClass {}




console.log("CLASS DECORATORS");

// merge is a decorator factory
function merge(toMerge: Object) {
    return function (target: any) {
        for (let prop in toMerge) {
            (target as any).prototype[prop] = (toMerge as any)[prop];
        }
    }
}

let user = {
    name: 'John Smith',
    age: 22,
    instructor: true
};

@merge(user)
class Person {
    constructor() {}
}

let myUser = new Person();
console.log((myUser as any).name); // cast to 'any' to use the property names



console.log("METHOD DECORATORS");

function readOnly(target: any, methodName: string, descriptor: PropertyDescriptor) {
    descriptor.writable = false; // cannot be changed by other code
    descriptor.enumerable = false;
    console.log(target);
    console.log(methodName);
    console.log(descriptor);
}

class ReadOnlyClassMethods {
    
    @readOnly
    sayHello() {
        console.log("Hello");
    }
}

let thing = new ReadOnlyClassMethods();

thing.sayHello();
// thing.sayHello = false; // Error as it should be a function
//thing.sayHello = () => false; // Silent fail as not strict
thing.sayHello(); // still outputs "hello"




console.log("PROPERTY DECORATORS");

function addToPropertyAndLog(target: Object, property: string) {
    let value = (target as any)[property];

    const get = () => {
        console.log(`Getter returns: ${property}: ${value}`);
        return value;
    }

    const set = (oldValue: any) => {
        const newValue: string = `Decorated value of: ${oldValue}`;
        console.log(`setter will return: ${property}: ${newValue}`);
        value = newValue;
    }

    // Adding to the object prototype
    //  - adding a getter and setter for the new property
    Object.defineProperty(target, property, {
        get,
        set,
        enumerable: true, // allows mutation
        configurable: true // allows mutation
    });
}

class User {

    @addToPropertyAndLog
    public username: string;

    constructor(username: string = ``) {
        this.username = username;
    }
}

const theUser = new User();
(theUser as any).username = "John Smith";
console.log((theUser as any).username);





console.log("ACCESSOR DECORATORS");

function enumerable(iterateOn: boolean) {
    return function(target: Object, property: string, descriptor: PropertyDescriptor) {
        console.log(`decorator setting enumerable for access = ${property}`);
        descriptor.enumerable = iterateOn;
    }
}

class Users {
    #password: string = ``;
    #username: string = ``;

    constructor(username: string) {
        this.#username = username;
    }

    @enumerable(false)
    get password() {
        return `Password: ${this.#password}`;
    }

    @enumerable(true)
    get username() {
        return `Username: ${this.#username}`;
    }

    set password(newPassword) {
        this.#password = newPassword;
    }
}

const newUser = new Users(`Fred Smith`);

newUser.password = `password1`;
console.log(newUser.password);

for (const prop in newUser) {
    // Will only show 'username' and not and password as password is not enumerable
    console.log(`prop value = ${(newUser as any)[prop]}`);
}