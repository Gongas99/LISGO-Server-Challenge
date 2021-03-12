
exports.seed = function(knex) {
  return knex('user').insert([
    { id: 1, name: 'John', surname: "Doe", password: "123456" },
    { id: 2, name: 'Donald', surname: "Trump", password: "123456" },
    { id: 3, name: 'Goncalo', surname: "Patrocinio", password: "123456" }
  ]);
};
