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
})
