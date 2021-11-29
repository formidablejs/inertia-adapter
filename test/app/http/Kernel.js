const { Authenticate } = require('@formidablejs/framework');
const { HasCsrfToken } = require('@formidablejs/framework');
const { HasEncryptionKey } = require('@formidablejs/framework');
const { Kernel: HttpKernel } = require('@formidablejs/framework');
const { ValidateSignature } = require('@formidablejs/framework');

module.exports.Kernel = class extends HttpKernel {
	get middleware() {
		return [
			HasEncryptionKey,
		];
    }

	get middlewareGroups() {
		return {
			jwt: [

			],

			session: [
				HasCsrfToken,
			],
		};
    }

	get routeMiddleware() {
		return {
			'auth': Authenticate,
			'signed': ValidateSignature,
		};
    }
}
