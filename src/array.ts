import './iterable-iterator';

declare global {
    interface Array<T> {
        sequenceEqual(other: T[]): boolean;
    }

    interface ArrayNumber extends Array<number> {
        seq(): boolean;
    }
}

Array.prototype.sequenceEqual = function(other: any[]) {
    return this.values().sequenceEqual(other.values());
}




// Array.prototype.sum = function () {
//     return this.reduce((p, c) => p + c);
// }




