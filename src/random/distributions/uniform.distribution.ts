import { RandomBase } from '../interface';
import { RandNormalDataTypes } from './gauss.distribution';
import { RandomEngineFactory } from '../random-engine-factory';
import { Engine } from 'random-js';
import { RandomEngineWrapper } from './random-engine-wrapper';


export class UniformDistribution implements RandomBase {
    private min: number;
    private range: number;
    private random: Engine;
    private dtype?: keyof RandNormalDataTypes;
    constructor(
        min = 0, max = 1, dtype?: keyof RandNormalDataTypes,
        seed?: string | number, randomEngine?: Engine) {
        this.min = min;
        this.range = max - min;
        this.dtype = dtype;
        if (!this.canReturnFloat() && this.range <= 1) {
            throw new Error(
                `The difference between ${min} - ${max} <= 1 and dtype is not float`);
        }
        this.random = new RandomEngineWrapper(randomEngine ?? RandomEngineFactory.create(seed));
    }

    /** Handles proper rounding for non floating point numbers. */
    private canReturnFloat = () =>
        (this.dtype == null || this.dtype === 'float32');

    private convertValue(value: number): number {
        if (this.canReturnFloat()) {
            return value;
        }
        return Math.round(value);
    }

    next() {
        return this.convertValue(this.min + this.range * this.random.next());
    }
}
