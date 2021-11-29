const { InertiaRedirect } = require('../lib');

describe('src/InertiaRedirect', () => {
    it('should return an instance of InertiaRedirect.', () => {
        expect(new InertiaRedirect('/hello')).toBeInstanceOf(InertiaRedirect);
        expect(new InertiaRedirect()).toBeInstanceOf(InertiaRedirect);
        expect(new InertiaRedirect('/hello').with({ name: 'Donald' })).toBeInstanceOf(InertiaRedirect);
    });

    it('should throw an error if props is not a valid object.', () => {
        expect(() => {
            new InertiaRedirect('/hello').with(100)
        }).toThrow(TypeError);
    });
});
