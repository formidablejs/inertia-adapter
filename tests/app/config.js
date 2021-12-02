const { ConfigRepository } = require('@formidablejs/framework');
const { ms } = require('@formidablejs/framework/lib/Support/Helpers');

module.exports.Config = class extends ConfigRepository {
    get registered() {
        return {
            app: {
                name: 'Test',
                env: 'testing',
                debug: true,
                url: 'http://localhost:3000',
                locale: 'en',
                key: 'base64:VVF3bzFhamhPbG11aUR4cEZraUFjejJzZUJVZTRjS046NzhhNmVjYTY0NjdiNGViZg==',
                cipher: 'AES-256-CBC',
                resolvers: [
                    require('@formidablejs/framework').CookieServiceResolver,
                    require('@formidablejs/framework').SessionMemoryStoreServiceResolver,
                    require('@formidablejs/framework').SessionFileStoreServiceResolver,
                    require('@formidablejs/framework').SessionServiceResolver,
                    require('@formidablejs/framework').HashServiceResolver,
                    require('./resolvers/RouterServiceResolver').RouterServiceResolver,
                    require('../../lib').InertiaServiceResolver,
                ]
            },
            session: {
                driver: 'memory',
                cookie: 'formidable_session',
                encrypt: true,
                lifetime: ms('2 hours'),
                path: '/',
                secure: false,
                http_only: false,
                same_site: 'lax',
            }
        };
    }
}
