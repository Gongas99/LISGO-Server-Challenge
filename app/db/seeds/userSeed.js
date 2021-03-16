
exports.seed = function(knex) {
  return knex('user').insert([
    { name: 'John', surname: "Doe", password: "123456", roleId: 1 },
    { name: 'Donald', surname: "Trump", password: "123456", roleId: 2 },
    { name: 'Goncalo', surname: "Patrocinio", password: "123456", roleId: 1 }
  ]);
};
