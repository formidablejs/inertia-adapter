const { InertiaResponse } = require('../lib');

describe('src/InertiaResponse', () => {
    it('should return an instance of InertiaResponse.', () => {
        expect(new InertiaResponse('Welcome')).toBeInstanceOf(InertiaResponse);
        expect(new InertiaResponse('Welcome', { name: 'Luna' })).toBeInstanceOf(InertiaResponse);
    });

    it('should throw an error if component is not a valid string.', () => {
        expect(() => {
            new InertiaResponse(100)
        }).toThrow(TypeError);
    });

    it('should throw an error if props is not a valid object.', () => {
        expect(() => {
            new InertiaResponse('Welcome', 100)
        }).toThrow(TypeError);
    });

    it('should throw an error if component and props are not valid types.', () => {
        expect(() => {
            new InertiaResponse([], 100)
        }).toThrow(TypeError);
    });
});
