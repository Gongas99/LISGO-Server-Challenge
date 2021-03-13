
exports.up = function (knex) {
    return knex.schema.table('task', table => {
        table.integer('userId');
        table.foreign('userId')
            .references('user.id');
    })
};

exports.down = function (knex) {
    return knex.schema.table('task', table => {
        table.dropForeign('userId');
        table.dropColumn('userId');
    })
};
