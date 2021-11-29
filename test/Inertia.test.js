const { Inertia, InertiaResponse, InertiaRedirect } = require('../lib');

describe('src/Inertia', () => {
    it('should return an instance of InertiaResponse.', () => {
        expect(Inertia.render('Welcome')).toBeInstanceOf(InertiaResponse);
        expect(Inertia.render('Welcome', { name: 'Luna' })).toBeInstanceOf(InertiaResponse);
    });

    it('should return an instance of InertiaRedirect.', () => {
        expect(Inertia.redirect('/hello')).toBeInstanceOf(InertiaRedirect);
        expect(Inertia.redirect()).toBeInstanceOf(InertiaRedirect);
        expect(Inertia.back()).toBeInstanceOf(InertiaRedirect);
        expect(Inertia.share({ message: 'Success' })).toBeInstanceOf(InertiaRedirect);
    });

    it('should throw an error if the first param (component) passed to render is not a string.', () => {
        expect(() => {
            Inertia.render(100);
        }).toThrow(TypeError);
    });

    it('should throw an error if the second param (props) passed to render is not an object.', () => {
        expect(() => {
            Inertia.render('Welcome', 100)
        }).toThrow(TypeError);
    });

    it('should throw an error if the first param (url) passed to redirect is not a string.', () => {
        expect(() => {
            Inertia.redirect(100);
        }).toThrow(TypeError);
    });

    it('should throw an error if the first param (props) passed to share is not an object.', () => {
        expect(() => {
            Inertia.share(100);
        }).toThrow(TypeError);
    });
});
