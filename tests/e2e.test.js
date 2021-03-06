const { Application } = require('./app');
const request = require('supertest');

describe('e2e', () => {
    let app;

    beforeAll(async () => {
        await Application.then((formidable) => {
			(app = formidable.fastify()).ready();
		});
    });

    afterAll(async () => await app.close());

	it('GET: /', async () => {
		const res = await request(app.server).get('/');

        expect(res.text).toContain('data-page=');
        expect(res.text).toContain('version');
        expect(res.text).toContain('component');
        expect(res.text).toContain('props');
        expect(res.text).toContain('url');
	});
})
