const { Kernel } = require('@formidablejs/framework');
const app = require('./app');

const Application = app.initiate(app.make(Kernel), true);

module.exports.Application = Application
