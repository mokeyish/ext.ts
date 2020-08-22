
import { RandomBase } from '../interface';
import { RandomEngineFactory } from '../random-engine-factory';
import { Engine } from 'random-js';
import { RandomEngineWrapper } from './random-engine-wrapper';

export interface RandNormalDataTypes {
    float32: Float32Array;
    int32: Int32Array;
}


export type NormalDistribution = MPGaussDistribution;

// https://en.wikipedia.org/wiki/Marsaglia_polar_method

export class MPGaussDistribution implements RandomBase {
    private mean: number;
    private stdDev: number;
    private nextVal: number;
    private dtype?: keyof RandNormalDataTypes;
    private truncated?: boolean;
    private upper?: number;
    private lower?: number;
    private random: Engine;

    constructor(
        meanVal: number, stdDeviation: number, dtype?: keyof RandNormalDataTypes,
        truncated?: boolean, seed?: number | string, randomEngine?: Engine) {
        this.mean = meanVal;
        this.stdDev = stdDeviation;
        this.dtype = dtype;
        this.nextVal = NaN;
        this.truncated = truncated;
        if (this.truncated) {
            this.upper = this.mean + this.stdDev * 2;
            this.lower = this.mean - this.stdDev * 2;
        }
        this.random = new RandomEngineWrapper(randomEngine ?? RandomEngineFactory.create(seed));
    }

    /** Returns next sample from a Gaussian distribution. */
    public next(): number {
        if (!isNaN(this.nextVal)) {
            const value = this.nextVal;
            this.nextVal = NaN;
            return value;
        }

        let resultX!: number, resultY!: number;
        let isValid = false;
        while (!isValid) {
            let v1: number, v2: number, s: number;
            do {
                v1 = 2 * this.random.next() - 1;
                v2 = 2 * this.random.next() - 1;
                s = v1 * v1 + v2 * v2;
            } while (s >= 1 || s === 0);

            const mul = Math.sqrt(-2.0 * Math.log(s) / s);
            resultX = this.mean + this.stdDev * v1 * mul;
            resultY = this.mean + this.stdDev * v2 * mul;

            if (!this.truncated || this.isValidTruncated(resultX)) {
                isValid = true;
            }
        }

        if (!this.truncated || this.isValidTruncated(resultY)) {
            this.nextVal = this.convertValue(resultY);
        }
        return this.convertValue(resultX);
    }

    /** Handles proper rounding for non-floating-point numbers. */
    private convertValue(value: number): number {
        if (this.dtype == null || this.dtype === 'float32') {
            return value;
        }
        return Math.round(value);
    }

    /** Returns true if less than 2-standard-deviations from the mean. */
    private isValidTruncated(value: number): boolean {
        if (this.upper === undefined || this.lower === undefined) {
            return false;
        }
        return value <= this.upper && value >= this.lower;
    }
}

