const { Route } = require('@formidablejs/framework');
const { Inertia } = require('../../../lib');
const { App } = require('../views/app');

Route.get('/', () => {
    return Inertia.render('Welcome').setRootView(App);
});
