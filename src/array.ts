import './iterable-iterator';

declare global {

    interface ArrayConstructor {
        range(num: number): number[];

        range(start: number, end: number): number[];

        range(start: number, end: number, step: number): number[];

        /**
         * Return evenly spaced numbers over a specified interval.
         * @param start
         * @param stop
         * @param [num=50]
         */
        linspace(start: number, stop: number, num?: number): number[];
    }

    interface Array<T> {
        sequenceEqual(other: T[]): boolean;

        sum(this: number[]): number;

        avg(this: number[]): number;

        max(this: number[]): number;

        min(this: number[]): number;

        argmax(this: number[]): number;

        prod(this: number[]): number;
    }

    interface ReadonlyArray<T> {
        sequenceEqual(other: T[]): boolean;

        sum(this: ReadonlyArray<number>): number;

        avg(this: ReadonlyArray<number>): number;

        max(this: ReadonlyArray<number>): number;

        min(this: ReadonlyArray<number>): number;

        argmax(this: ReadonlyArray<number>): number;

        prod(this: ReadonlyArray<number>): number;
    }

    interface Float64Array {
        sequenceEqual(other: Float64Array): boolean;

        sum(): number;

        avg(): number;

        max(): number;

        min(): number;

        argmax(): number;

        prod(): number;
    }

    interface Float32Array {
        sequenceEqual(other: Float64Array): boolean;

        sum(): number;

        avg(): number;

        max(): number;

        min(): number;

        argmax(): number;

        prod(): number;
    }

    interface Int32Array {
        sequenceEqual(other: Float64Array): boolean;

        sum(): number;

        avg(): number;

        max(): number;

        min(): number;

        argmax(): number;

        prod(): number;
    }

    interface Uint32Array {
        sequenceEqual(other: Float64Array): boolean;

        sum(): number;

        avg(): number;

        max(): number;

        min(): number;

        argmax(): number;

        prod(): number;
    }
}

Array.prototype.sequenceEqual = function (other: any[]) {
    return this.values().sequenceEqual(other.values());
}

Array.prototype.sum = function () {
    return this.reduce((p, c) => p + c);
}
Array.prototype.avg = function () {
    return this.sum() / this.length;
}
Array.prototype.max = function () {
    return this.reduce((p, c) => Math.max(p, c));
}
Array.prototype.min = function () {
    return this.reduce((p, c) => Math.min(p, c));
}
Array.prototype.argmax = function () {
    let arg = 0;
    let val = this[0];
    this.forEach((v, i) => {
        if (v > val) {
            arg = i;
            val = v;
        }
    })
    return arg;
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

Array.linspace = function (start: number, stop: number, num: number = 50): number[] {
    const interval = (stop - start) / (num - 1);
    const ret = Array(num);
    for (let i = 0; i < num; i++) {
        ret[i] = start + interval * i;
    }
    return ret;
}

const methods = {
    sequenceEqual: Array.prototype.sequenceEqual,
    sum: Array.prototype.sum,
    avg: Array.prototype.avg,
    max: Array.prototype.max,
    min: Array.prototype.min,
    argmax: Array.prototype.argmax,
    prod: Array.prototype.prod,
}

Object.assign(Float64Array.prototype, methods);
Object.assign(Float32Array.prototype, methods);
Object.assign(Int32Array.prototype, methods);
Object.assign(Uint32Array.prototype, methods);
