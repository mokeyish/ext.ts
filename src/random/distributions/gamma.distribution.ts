
import { MPGaussDistribution } from './gauss.distribution';
import { RandomEngineFactory } from '../random-engine-factory';
import { Engine } from 'random-js';
import { RandomEngineWrapper } from './random-engine-wrapper';

export interface RandGammaDataTypes {
    float32: Float32Array;
    int32: Int32Array;
}

export interface RandomGamma {
    nextValue(): number;
}


// Marsaglia, George, and Wai Wan Tsang. 2000. "A Simple Method for Generating
// Gamma Variables."
export class GammaDistribution implements RandomGamma {
    private alpha: number;
    private beta: number;
    private d: number;
    private c: number;
    private dtype?: keyof RandGammaDataTypes;
    private randu: Engine;
    private randn: MPGaussDistribution;

    constructor(
        alpha: number, beta: number, dtype: keyof RandGammaDataTypes,
        seed?: number | string , randomEngine?: Engine) {
        this.alpha = alpha;
        this.beta = 1 / beta;  // convert rate to scale parameter
        this.dtype = dtype;

        this.randu = new RandomEngineWrapper(randomEngine ?? RandomEngineFactory.create(seed));
        this.randn = new MPGaussDistribution(0, 1, dtype, false, this.randu.next());

        if (alpha < 1) {
            this.d = alpha + (2 / 3);
        } else {
            this.d = alpha - (1 / 3);
        }
        this.c = 1 / Math.sqrt(9 * this.d);
    }

    /** Returns next sample from a gamma distribution. */
    public nextValue(): number {
        let x2: number, v0: number, v1: number, x: number, u: number, v: number;
        while (true) {
            do {
                x = this.randn.next();
                v = 1 + (this.c * x);
            } while (v <= 0);
            v *= v * v;
            x2 = x * x;
            v0 = 1 - (0.331 * x2 * x2);
            v1 = (0.5 * x2) + (this.d * (1 - v + Math.log(v)));
            u = this.randu.next();
            if (u < v0 || Math.log(u) < v1) {
                break;
            }
        }
        v = (1 / this.beta) * this.d * v;
        if (this.alpha < 1) {
            v *= Math.pow(this.randu.next(), 1 / this.alpha);
        }
        return this.convertValue(v);
    }
    /** Handles proper rounding for non-floating-point numbers. */
    private convertValue(value: number): number {
        if (this.dtype === 'float32') {
            return value;
        }
        return Math.round(value);
    }
}
