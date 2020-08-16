/**
 * Created by yish on 2020/08/12.
 */
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
})
