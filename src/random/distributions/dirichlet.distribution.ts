/**
 * Created by yish on 2020/11/08.
 */

import { Engine } from 'random-js';
import { GammaDistribution } from './gamma.distribution';


export class DirichletDistribution {
    private readonly random: Engine;
    private readonly alpha: number[];
    private readonly beta: number;
    constructor(alpha: number[], beta: number = 1.0, random: Engine) {
        this.random = random;
        this.alpha = alpha;
        this.beta = beta;
    }

    public sample(): number[] {
        const alpha = this.alpha;
        const len = alpha.length;
        const numArray = Array(len).fill(.0);
        let num = 0.0;
        for (let index = 0; index < len; ++index) {
            if (alpha[index] !== .0) {
                const gamma = new GammaDistribution(alpha[index], this.beta, 'float32', '', this.random);
                numArray[index] = gamma.nextValue();
            }
            num += numArray[index];
        }
        for (let index = 0; index < len; ++index) {
            numArray[index] /= num;
        }
        return numArray;
    }
}
