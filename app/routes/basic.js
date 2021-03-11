'use strict';

module.exports = {
    method: 'GET',
    path: '/basic',
    handler: (request, h) => {

        return 'Hello world!';
    }
}