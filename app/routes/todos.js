'use strict';

module.exports = {
    method: 'GET',
    path: '/todos',
    handler: (request, h) => {

        return 'Hello todos!';
    }
}