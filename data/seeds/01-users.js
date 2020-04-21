
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'user1', password: 'pw', department: 'Finance'},
        {id: 2, username: 'user2', password: 'pass', department: 'Finance'},
        {id: 3, username: 'jdoe', password: 'pass', department: 'Marketing'},
        {id: 4, username: 'maryk', password: 'pw', department: 'Marketing'},
        {id: 5, username: 'badgalriri', password: 'fenty', department: 'Engineering'},
        {id: 6, username: 'larrydavid', password: 'ld', department: 'Engineering'},
      ]);
    });
};
