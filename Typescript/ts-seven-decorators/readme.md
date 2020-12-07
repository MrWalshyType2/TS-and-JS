# Simple Decorators & Decorator Factories
A decorator allows existing classes and class members to be annotated and modified:
- Essentially wrapping one piece of code with another (decorating it)
- The same as 'functional composition' or 'higher-order functions'
- Uses '@expression' syntax where the expression evals to a function which takes information about the decorated declaration

```
//@myDecorator

function myDecorator(target: any) {
    // do something with target
}
```

Decorator factories are able to provide decorators with parameters:

```
function DecoratorFactory(name: string) {
    return function(target: Function) {
        console.log(`${name} decorator was called`);
    }
}

@DecoratorFactory("factory")
class DecoratedClass {}
```

# Class Decorators
A class decorator can be used to observe, modify or replace a class definition.

```
function merge(toMerge: Object) {
    return function (target: any) {
        for (let prop in toMerge) {
            (target as any).prototype[prop] = (toMerge as any)[prop];
        }
    }
}

let user = {}
    name: 'John Smith',
    age: 22,
    instructor: true
}

@merge(user)
class Person {
    constructor() {}
}

let myUser = new Person();
console.log((myUser as any).name); // cast to 'any' to use the property names
```

# Method Decorators
// The decorator is called above the method and takes three arguments.

```
function readOnly(target: any, methodName: string, descriptor: PropertyDescriptor) {
    descriptor.writable = false; // cannot be changed by other code
    descriptor.enumerable = false;
}

class ReadOnlyClassMethods {
    
    @readOnly
    sayHello() {
        console.log("Hello");
    }
}
```

# Property Decorators
For decorating properties, takes two arguments.

```
function addToPropertyAndLog(target: Object, property: string) {
    let value = (target as any)[property];

    const get = () => {
        console.log(`Getter returns: ${property}: ${value}`);
        return value;
    }

    const set = (oldValue: any) => {
        const newValue: string = `Decorated value of: ${oldValue};
        console.log(`setter will return: ${property}: ${newValue});
        value = newValue;
    }

    Object.defineProperty(target, property, {
        get,
        set,
        enumerable: true,
        configurable: true
    });
}

class User {

    @addToPropertyAndLog
    public username: string;

    constructor(username: string = ``) {
        this.username = username;
    }
}
```

# Accessor Decorators
Used to decorate get and set methods in a class. Work on the property descriptor and can be used to observe, modify or replace an accessor definition.

- Can be useful for hiding properties from iterators

```
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
```