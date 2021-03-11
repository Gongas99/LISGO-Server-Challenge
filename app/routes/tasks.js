'use strict';

module.exports = {
    method: 'GET',
    path: '/tasks',
    handler: (request, h) => {

        return 'Hello tasks!';
    }
}