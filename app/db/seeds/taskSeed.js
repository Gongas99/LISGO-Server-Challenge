
exports.seed = function (knex) {
  return knex('task').insert([
    { description: 'task1', state: false },
    { description: 'task2', state: true },
    { description: 'task3', state: false }
  ]);
};
