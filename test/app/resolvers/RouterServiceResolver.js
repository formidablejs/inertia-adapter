const { Route } = require('@formidablejs/framework');
const { ServiceResolver } = require('@formidablejs/framework');

module.exports.RouterServiceResolver = class extends ServiceResolver {
	boot() {
		Route.group({ middleware: 'session' }, () => {
			require('../routes/web');
        });
    }
}
