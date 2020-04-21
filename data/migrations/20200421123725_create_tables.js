
exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {
    //id, primary key
    tbl.increments();
    //username, string, required, unique
    tbl.string('username', 128).notNullable().unique();
    //password, string, required
    tbl.string('password', 128).notNullable();
    //department, string, required
    tbl.string('department', 128).notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users')
};
