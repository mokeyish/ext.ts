import '../dist';

describe('Array', () => {
    it('sequenceEqual1', () => {
        const v1 = ['a1', 'b2', 'c3'];
        const v2 = ['a1', 'b3', 'c3'];
        expect(v1.sequenceEqual(v2)).toEqual(false);
    })
    it('sequenceEqual2', () => {
        const v1 = ['a1', 'b2', 'c3'];
        const v2 = ['a1', 'b2', 'c3'];
        expect(v1.sequenceEqual(v2)).toEqual(true);
    })

    it('sum', () => {
        const v1 = [1, 2, 5];
        expect(v1.sum()).toEqual(8);
    })

    it('comsum', () => {
        const v1 = [1, 2, 5];
        expect(v1.comsum()).toEqual([1, 3, 8]);
    })

    it('last1', () => {
        const v1 = [1, 2, 5];
        expect(v1.last()).toEqual(5);
    })

    it('last2', () => {
        const v1: unknown[] = [];
        expect(v1.last()).toEqual(undefined);
    })

    it('last3', () => {
        const v1 = [1, 2, 5];
        expect(v1.last(v => v === 2)).toEqual(2);
    })

    it('count', () => {
        const v1 = [1, 2, 5];
        expect(v1.count()).toEqual(3);
    })

    it('count1', () => {
        const v1 = [1, 2, 5, 1];
        expect(v1.count(v => v === 1)).toEqual(2);
    })

    it('range start', () => {
        const v1 = Array.range(5)
        expect(v1).toEqual([0, 1, 2, 3, 4]);
    })
    it('range start end', () => {
        const v1 = Array.range(2, 6)
        expect(v1).toEqual([2, 3, 4, 5]);
    })
    it('range start end step', () => {
        const v1 = Array.range(2, 6, 2)
        expect(v1).toEqual([2, 4]);
    })

    it('linspace', () => {
        const v1 = Array.linspace(0, 4, 8);
        expect(v1).toEqual([
            0., 0.5714285714285714, 1.1428571428571428, 1.7142857142857142, 2.2857142857142856, 2.8571428571428568,
            3.4285714285714284, 4.
        ]);
    })

    it('array add', () => {
        const a = [1, 2, 3];
        const b = [2, 4, 8];
        expect(a.add(b)).toEqual([3, 6, 11]);
    })
    it('array add1', () => {
        const a = [1, 2, 3];
        const b = 6;
        expect(a.add(b)).toEqual([7, 8, 9]);
    })

    it('array sub', () => {
        const a = [1, 2, 3];
        const b = [2, 4, 8];
        expect(a.sub(b)).toEqual([-1, -2, -5]);
    })
    it('array sub1', () => {
        const a = [1, 2, 3];
        const b = 6;
        expect(a.sub(b)).toEqual([-5, -4, -3]);
    })

    it('array mul', () => {
        const a = [1, 2, 3];
        const b = [2, 4, 8];
        expect(a.mul(b)).toEqual([2, 8, 24]);
    })
    it('array mul1', () => {
        const a = [1, 2, 3];
        const b = 6;
        expect(a.mul(b)).toEqual([6, 12, 18]);
    })

    it('array div', () => {
        const a = [12, 2, 24];
        const b = [2, 2, 8];
        expect(a.div(b)).toEqual([6, 1, 3]);
    })
    it('array div1', () => {
        const a = [1, 2, 3];
        const b = 2;
        expect(a.div(b)).toEqual([0.5, 1, 1.5]);
    })
})
