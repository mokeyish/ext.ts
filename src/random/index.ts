import { RandomEngineFactory } from './random-engine-factory';
import {
    Engine,
    uint32,
    uint53,
    date,
    hex,
    string,
    uuid4,
    dice,
    die,
    sample,
    shuffle,
    pick,
    bool,
    real,
    realZeroToOneExclusive,
    realZeroToOneInclusive,
    integer,
    int53Full,
    int53,
    uint53Full,
    int32
} from 'random-js';
import { GammaDistribution, MPGaussDistribution, RandNormalDataTypes, UniformDistribution } from './distributions';

export * from './distributions';
export * from './random-engine-factory';

export class Random implements Random {
    private readonly engine: Engine;
    constructor(seed?: string | number);
    constructor(engine?: Engine);
    constructor(unknown?: string | number | Engine) {
        let engine: Engine;
        if (unknown === undefined) {
            engine = RandomEngineFactory.create();
        } else if (typeof unknown === 'number' || typeof unknown === 'string') {
            engine = RandomEngineFactory.create(unknown);
        } else {
            engine = unknown;
        }
        this.engine = engine;
    }

    /**
     * Draw samples from a uniform distribution.
     * @param [min=0] float optional Lower boundary of the output interval.
     *         All values generated will be greater than or equal to low.  The default value is 0.
     * @param [max=1]
     * @param [size=1] float of floats Upper boundary of the output interval.
     *         All values generated will be less than or equal to high.  The default value is 1.0.
     * @param [dtype='float32']
     */
    uniform(min = 0, max = 1, size: number = 1, dtype: keyof RandNormalDataTypes = 'float32'): number[] {
        if (dtype !== 'float32' && dtype !== 'int32') {
            throw new Error(`Unsupported data type ${dtype}`);
        }
        const res = [];
        const random = new UniformDistribution(min, max, dtype, undefined, this.engine);
        for (let i = 0; i < size; i++) {
            res[i] = random.next();
        }
        return res;
    }

    /**
     * Draw random samples from a normal (Gaussian) distribution.
     * @param mean
     * @param stdDev
     * @param size
     * @param dtype
     */
    normal(mean = 0, stdDev = 1, size: number, dtype: keyof RandNormalDataTypes = 'float32'): number[] {
        if (dtype !== 'float32' && dtype !== 'int32') {
            throw new Error(`Unsupported data type ${dtype}`);
        }
        const randGauss =
            new MPGaussDistribution(mean, stdDev, dtype, false /* truncated */, undefined, this.engine);
        const res = [];
        for (let i = 0; i < size; i++) {
            res[i] = randGauss.next();
        }
        return res;
    }

    /**
     * Draw samples from a Gamma distribution.
     * @param alpha
     * @param beta
     * @param size
     * @param dtype
     */
    gamma(alpha: number, beta = 1, size: number, dtype: keyof RandNormalDataTypes = 'float32'): number[] {
        if (beta == null) {
            beta = 1;
        }
        if (dtype == null) {
            dtype = 'float32';
        }
        if (dtype !== 'float32' && dtype !== 'int32') {
            throw new Error(`Unsupported data type ${dtype}`);
        }
        const rgamma = new GammaDistribution(alpha, beta, dtype, undefined, this.engine);
        const res = [];
        for (let i = 0; i < size; i++) {
            res[i] = rgamma.nextValue();
        }
        return res;
    }


    /**
     * Returns a value within [-0x80000000, 0x7fffffff]
     */
    public int32(): number {
        return int32(this.engine);
    }

    /**
     * Returns a value within [0, 0xffffffff]
     */
    public uint32(): number {
        return uint32(this.engine);
    }

    /**
     * Returns a value within [0, 0x1fffffffffffff]
     */
    public uint53(): number {
        return uint53(this.engine);
    }

    /**
     * Returns a value within [0, 0x20000000000000]
     */
    public uint53Full(): number {
        return uint53Full(this.engine);
    }

    /**
     * Returns a value within [-0x20000000000000, 0x1fffffffffffff]
     */
    public int53(): number {
        return int53(this.engine);
    }

    /**
     * Returns a value within [-0x20000000000000, 0x20000000000000]
     */
    public int53Full(): number {
        return int53Full(this.engine);
    }

    /**
     * Returns a value within [min, max]
     * @param min The minimum integer value, inclusive. No less than -0x20000000000000.
     * @param max The maximum integer value, inclusive. No greater than 0x20000000000000.
     */
    public integer(min: number, max: number): number {
        return integer(min, max)(this.engine);
    }

    /**
     * Returns a floating-point value within [0.0, 1.0]
     */
    public realZeroToOneInclusive(): number {
        return realZeroToOneInclusive(this.engine);
    }

    /**
     * Returns a floating-point value within [0.0, 1.0)
     */
    public realZeroToOneExclusive(): number {
        return realZeroToOneExclusive(this.engine);
    }

    /**
     * Returns a floating-point value within [min, max) or [min, max]
     * @param min The minimum floating-point value, inclusive.
     * @param max The maximum floating-point value.
     * @param inclusive If true, `max` will be inclusive.
     */
    public real(min: number = 0, max: number = 1, inclusive: boolean = true): number {
        return real(min, max, inclusive)(this.engine);
    }

    /**
     * Returns a boolean with 50% probability of being true or false
     */
    public bool(): boolean;
    /**
     * Returns a boolean with the provided `percentage` of being true
     * @param percentage A number within [0, 1] of how often the result should be `true`
     */
    public bool(percentage: number): boolean;
    /**
     * Returns a boolean with a probability of `numerator`/`denominator` of being true
     * @param numerator The numerator of the probability
     * @param denominator The denominator of the probability
     */
    public bool(numerator: number, denominator: number): boolean;
    public bool(numerator?: number, denominator?: number): boolean {
        return bool(numerator!, denominator!)(this.engine);
    }

    /**
     * Return a random value within the provided `source` within the sliced
     * bounds of `begin` and `end`.
     * @param source an array of items to pick from
     * @param begin the beginning slice index (defaults to `0`)
     * @param end the ending slice index (defaults to `source.length`)
     */
    public pick<T>(source: ArrayLike<T>, begin?: number, end?: number): T {
        return pick(this.engine, source, begin, end);
    }

    /**
     * Shuffles an array in-place
     * @param array The array to shuffle
     */
    public shuffle<T>(array: T[]): T[] {
        return shuffle(this.engine, array);
    }

    /**
     * From the population array, returns an array with sampleSize elements that
     * are randomly chosen without repeats.
     * @param population An array that has items to choose a sample from
     * @param sampleSize The size of the result array
     */
    public sample<T>(population: ArrayLike<T>, sampleSize: number): T[] {
        return sample(this.engine, population, sampleSize);
    }

    /**
     * Returns a value within [1, sideCount]
     * @param sideCount The number of sides of the die
     */
    public die(sideCount: number): number {
        return die(sideCount)(this.engine);
    }

    /**
     * Returns an array of length `dieCount` of values within [1, sideCount]
     * @param sideCount The number of sides of each die
     * @param dieCount The number of dice
     */
    public dice(sideCount: number, dieCount: number): number[] {
        return dice(sideCount, dieCount)(this.engine);
    }

    /**
     * Returns a Universally Unique Identifier Version 4.
     *
     * See http://en.wikipedia.org/wiki/Universally_unique_identifier
     */
    public uuid4(): string {
        return uuid4(this.engine);
    }

    /**
     * Returns a random string using numbers, uppercase and lowercase letters,
     * `_`, and `-` of length `length`.
     * @param length Length of the result string
     */
    public string(length: number): string;
    /**
     * Returns a random string using the provided string pool as the possible
     * characters to choose from of length `length`.
     * @param length Length of the result string
     */
    public string(length: number, pool: string): string;
    public string(length: number, pool?: string): string {
        return string(pool!)(this.engine, length);
    }

    /**
     * Returns a random string comprised of numbers or the characters `abcdef`
     * (or `ABCDEF`) of length `length`.
     * @param length Length of the result string
     * @param uppercase Whether the string should use `ABCDEF` instead of `abcdef`
     */
    public hex(length: number, uppercase?: boolean): string {
        return hex(uppercase)(this.engine, length);
    }

    /**
     * Returns a random `Date` within the inclusive range of [`start`, `end`].
     * @param start The minimum `Date`
     * @param end The maximum `Date`
     */
    public date(start: Date, end: Date): Date {
        return date(start, end)(this.engine);
    }
}

