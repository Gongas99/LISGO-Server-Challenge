
exports.seed = function (knex) {
  return knex('task').insert([
    { description: 'task1', state: false, userId: 1 },
    { description: 'task2', state: true, userId: 2 },
    { description: 'task3', state: false, userId: 2 }
  ]);
};
