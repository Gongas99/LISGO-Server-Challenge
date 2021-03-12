
exports.seed = function (knex) {
  return knex('task').insert([
    { id: 1, description: 'task1', state: false },
    { id: 2, description: 'task2', state: true },
    { id: 3, description: 'task3', state: false }
  ]);
};
