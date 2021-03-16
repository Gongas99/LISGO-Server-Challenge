
exports.up = function(knex) {
    return knex.schema
    .table('user', table => {
        table.integer('roleId');
        table.foreign('roleId')
            .references('role.id');
    })
};

exports.down = function(knex) {
    return knex.schema.table('user', table => {
        table.dropForeign('roleId');
        table.dropColumn('roleId');
    })
};
