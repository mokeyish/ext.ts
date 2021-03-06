import { Random, RandomEngineFactory } from '../dist';



describe('random', () => {
    it('x', () => {
        // tslint:disable-next-line:no-unused-expression
        const n = RandomEngineFactory.create('123', 'mt19937');
        const random = new Random(n);
        for (let i = 0; i < 1000; i++) {
            const v = random.real();
            expect(v).toBeLessThanOrEqual(1);
            expect(v).toBeGreaterThanOrEqual(0);
        }
    })

    it('uniform 1', () => {
        // tslint:disable-next-line:no-unused-expression
        const n = RandomEngineFactory.create('123');
        const random = new Random(n);
        const data =  random.uniform(0, 1, 10, 'float32');
        for (const v of data) {
            expect(v).toBeLessThanOrEqual(1);
            expect(v).toBeGreaterThanOrEqual(0);
        }
    })

    it('uniform 2', () => {
        // tslint:disable-next-line:no-unused-expression
        const n = RandomEngineFactory.create('123', 'mt19937');
        const random = new Random(n);
        const data =  random.uniform(0, 1, 10, 'float32');
        for (const v of data) {
            expect(v).toBeLessThanOrEqual(1);
            expect(v).toBeGreaterThanOrEqual(0);
        }
    })

    it('uniform 3', () => {
        // tslint:disable-next-line:no-unused-expression
        const n = RandomEngineFactory.create('123', 'native');
        const random = new Random(n);
        const data =  random.uniform(0, 1, 10, 'float32');
        for (const v of data) {
            expect(v).toBeLessThanOrEqual(1);
            expect(v).toBeGreaterThanOrEqual(0);
        }
    })

    it('random choice 3', () => {
        const n = RandomEngineFactory.create('123', 'mt19937');
        const random = new Random(n);
        const a = ['a', 'b', 'c'];
        const p = [.2, .1, .7];
        const l = Array.range(100000).map(() => random.choice(a, p));
        const pr = l.count((v) => v === 'c') / l.length;
        const err = Math.abs(0.7 - pr);
        expect(err).toBeLessThan(0.05);
    })
})
