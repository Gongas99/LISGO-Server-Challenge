
exports.up = function (knex) {
  return knex.schema
    .createTable('task', (table) => {
      table.increments();
      table.string('description').notNullable();
      table.boolean('state').notNullable().defaultTo(false);
      table.timestamp('dateAdded').defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('task');
}
