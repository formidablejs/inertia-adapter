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

	it('GET: /', () => {
		return request(app.server)
			.get('/')
			.expect(200);
	});
})
