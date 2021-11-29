const { Application } = require('@formidablejs/framework');
const { resolve } = require('path');

let app = new Application(resolve('./'))

const { ConfigRepository } = require('@formidablejs/framework');
const { ExceptionHandler } = require('@formidablejs/framework');
const { Kernel: HttpKernel } = require('@formidablejs/framework');
const { Language } = require('@formidablejs/framework');
const { Config } = require('./config');
const { Handler } = require('./exceptions/Handler');
const { Kernel } = require('./http/Kernel');

app
	.bind(HttpKernel, Kernel)
	.bind(ConfigRepository, Config)
	.bind(Language, Language)
	.bind(ExceptionHandler, Handler)

module.exports = app.prepare();
