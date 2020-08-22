import './iterable-iterator';

declare global {
    interface Array<T> {
        sequenceEqual(other: T[]): boolean;
        sum(this: number[]): number;
        avg(this: number[]): number;
        prod(this: number[]): number;
    }

    interface ArrayConstructor {
        range(num: number): number[];
        range(start: number, end: number): number[];
        range(start: number, end: number, step: number): number[];
    }
}

Array.prototype.sequenceEqual = function(other: any[]) {
    return this.values().sequenceEqual(other.values());
}


Array.prototype.sum = function () {
    return this.reduce((p, c) => p + c);
}

Array.prototype.avg = function () {
    return this.sum() / this.length;
}
Array.prototype.prod = function () {
    return this.reduce((p, c) => p * c);
}

Array.range = function (start: number, end?: number, step?: number) {
    if (end === undefined) {
        return Array<number>(start).fill(0).map((_, i) => i);
    } else if (step === undefined) {
        return Array<number>(end - start).fill(0).map((_, i) => i + start);
    } else {
        return Array<number>(Math.floor((end - start) / step)).fill(0).map((_, i) => start + i * step);
    }
}
