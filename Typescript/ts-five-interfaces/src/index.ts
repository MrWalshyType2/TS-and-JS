// Creating a function type
interface Log {
    (error: string): void;
}

// Creating a function of type 'Log' that obeys the contract
const logError: Log = function(x: string): void {
    console.log(x);
}

logError("An error");