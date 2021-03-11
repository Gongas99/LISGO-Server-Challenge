
exports.up = function(knex) {
  return knex.schema.createTable('task', (table) => {
      table.increments();
      table.string('name').notNullable()
  })
};

exports.down = function(knex) {
  
};
