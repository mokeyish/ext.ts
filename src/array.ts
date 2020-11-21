import './iterable-iterator';

declare global {

    // noinspection JSUnusedGlobalSymbols
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

        ops<U, V>(x: U[] | U, callback: (a: T, b: U) => V): V[];

        last(): T | undefined;
        last(predicate: (value: T, index: number, obj: T[]) => boolean): T | undefined;
        count(): number;
        count(predicate: (value: T, index: number, obj: T[]) => boolean): number;

        sum(this: number[]): number;

        avg(this: number[]): number;

        max(this: number[]): number;

        min(this: number[]): number;

        argmax(this: number[]): number;

        prod(this: number[]): number;

        comsum(this: number[]): number[];

        add(this: number[], x: number[] | number): number[];
        sub(this: number[], x: number[] | number): number[];
        mul(this: number[], x: number[] | number): number[];
        div(this: number[], x: number[] | number): number[];
    }

    // noinspection JSUnusedGlobalSymbols
    interface ReadonlyArray<T> {
        sequenceEqual(other: T[]): boolean;

        last(): T | undefined;

        sum(this: ReadonlyArray<number>): number;

        avg(this: ReadonlyArray<number>): number;

        max(this: ReadonlyArray<number>): number;

        min(this: ReadonlyArray<number>): number;

        argmax(this: ReadonlyArray<number>): number;

        prod(this: ReadonlyArray<number>): number;

        comsum(this: number[]): number[];
    }

    interface Float64Array {
        sequenceEqual(other: Float64Array): boolean;

        last(): number | undefined;

        sum(): number;

        avg(): number;

        max(): number;

        min(): number;

        argmax(): number;

        prod(): number;

        comsum(this: number[]): number[];

        add(this: number[], x: number[] | number): number[];
        sub(this: number[], x: number[] | number): number[];
        mul(this: number[], x: number[] | number): number[];
        div(this: number[], x: number[] | number): number[];
    }

    interface Float32Array {
        sequenceEqual(other: Float64Array): boolean;

        last(): number | undefined;

        sum(): number;

        avg(): number;

        max(): number;

        min(): number;

        argmax(): number;

        prod(): number;

        comsum(this: number[]): number[];

        add(this: number[], x: number[] | number): number[];
        sub(this: number[], x: number[] | number): number[];
        mul(this: number[], x: number[] | number): number[];
        div(this: number[], x: number[] | number): number[];
    }

    interface Int32Array {
        sequenceEqual(other: Float64Array): boolean;

        last(): number | undefined;

        sum(): number;

        avg(): number;

        max(): number;

        min(): number;

        argmax(): number;

        prod(): number;

        comsum(this: number[]): number[];

        add(this: number[], x: number[] | number): number[];
        sub(this: number[], x: number[] | number): number[];
        mul(this: number[], x: number[] | number): number[];
        div(this: number[], x: number[] | number): number[];
    }

    // noinspection JSUnusedGlobalSymbols
    interface Uint32Array {
        sequenceEqual(other: Float64Array): boolean;

        last(): number | undefined;

        sum(): number;

        avg(): number;

        max(): number;

        min(): number;

        argmax(): number;

        prod(): number;

        comsum(this: number[]): number[];

        add(this: number[], x: number[] | number): number[];
        sub(this: number[], x: number[] | number): number[];
        mul(this: number[], x: number[] | number): number[];
        div(this: number[], x: number[] | number): number[];
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

Array.prototype.ops = function<T, U, V>(x: U[] | U, callback: (a: T, b: U) => V): V[] {
    if (x instanceof Array) {
        if (x.length < this.length) {
            throw new Error(`The length of 'x' should be ${this.length}`);
        }
        return this.map((v, i) => callback(v, x[i]));
    } else if (typeof x === 'number') {
        return this.map((v) => callback(v, x));
    } else {
        throw new Error('Invalid argument');
    }
}

Array.prototype.add = function (x: number[] | number) {
    return this.ops(x, (a, b) => a + b);
}

Array.prototype.sub = function (x: number[] | number) {
    return this.ops(x, (a, b) => a - b);
}

Array.prototype.mul = function (x: number[] | number) {
    return this.ops(x, (a, b) => a * b);
}

Array.prototype.div = function (x: number[] | number) {
    return this.ops(x, (a, b) => a / b);
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

Array.prototype.comsum = function () {
    let sum = 0;
    return this.map((v) => {
        return sum += v;
    });
}

Array.prototype.last = function (predicate?: (value: unknown, index: number, obj: unknown[]) => boolean) {
    if (this.length > 0) {
        if (predicate !== undefined) {
            for (let i = this.length - 1; i >= 0; i--) {
                const v = this[i];
                if (predicate(v, i, this)) {
                    return v;
                }
            }
        } else {

            return this[this.length - 1];
        }
    }
    return undefined;
}

Array.prototype.count = function (predicate?: (value: unknown, index: number, obj: unknown[]) => boolean) {
    if (this.length > 0) {
        if (predicate !== undefined) {
            let count = 0;
            for (let i = this.length - 1; i >= 0; i--) {
                const v = this[i];
                if (predicate(v, i, this)) {
                    count++;
                }
            }
            return count;
        }
    }
    return this.length;
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
    comsum: Array.prototype.comsum,
    last: Array.prototype.last
}

Object.assign(Float64Array.prototype, methods);
Object.assign(Float32Array.prototype, methods);
Object.assign(Int32Array.prototype, methods);
Object.assign(Uint32Array.prototype, methods);
