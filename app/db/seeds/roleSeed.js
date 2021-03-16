
exports.seed = function (knex) {
  return knex('role').insert([
    { name: 'normal' },
    { name: 'admin' }
  ]);
};
