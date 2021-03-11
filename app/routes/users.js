'use strict';

module.exports = {
    method: 'GET',
    path: '/users',
    handler: (request, h) => {

        return 'Hello users!';
    }
}