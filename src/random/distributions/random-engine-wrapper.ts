import { Engine, realZeroToOneInclusive } from 'random-js';

export class RandomEngineWrapper implements Engine {
    constructor(private readonly engine: Engine) {
    }

    next(): number {
        return realZeroToOneInclusive(this.engine);
    }
}
