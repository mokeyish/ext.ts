/**
 * Created by yish on 2020/08/11.
 */
import '../dist';

describe('Math', () => {
    it('randomInt', () => {
        for (let i = 0; i < 1000; i++) {
            const a = Math.randint(4, 11);
            expect(a).toBeGreaterThanOrEqual(4);
            expect(a).toBeLessThan(11);
        }
    })
})
