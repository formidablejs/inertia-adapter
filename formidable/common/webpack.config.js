const path = require('path');

module.exports = {
    resolve: {
        alias: {
            '@': path.resolve('resources/js'),
            '@forms': path.resolve('app/Types/Forms'),
        },
    },
};
