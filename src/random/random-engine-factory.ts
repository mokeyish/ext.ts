import { Engine, MersenneTwister19937 } from 'random-js';
import * as seedrandom from 'seedrandom';
import { UINT32_SIZE } from './constants';


export class RandomEngineFactory {
    public static createSeed(seed?: string | number): number {
        if (seed === undefined || seed === null) {
            seed = Math.random();
        }
        if (typeof seed === 'string') {
            seed = seedrandom.alea(seed).double();
        }
        return seed;
    }
    public static create(seed?: string | number, type: 'mt19937' | 'default' | 'native' = 'default'): Engine {
        seed = this.createSeed(seed);
        switch (type) {
            case 'mt19937':
                return MersenneTwister19937.seed(seed);
            case 'native':
                return nativeMath;
            case 'default':
            default:
                return new SeedRandomPrngWrapper(seedrandom.alea(seed.toString()));
        }
    }
}

class SeedRandomPrngWrapper implements Engine {
    constructor(private readonly rng: seedrandom.prng) {
    }
    next(): number {
        return (this.rng()  * UINT32_SIZE) | 0;
    }
}

/**
 * An int32-producing Engine that uses `Math.random()`
 */
const nativeMath: Engine = {
    next(): number {
        return (Math.random() * UINT32_SIZE) | 0;
    }
};
