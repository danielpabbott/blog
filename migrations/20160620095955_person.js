
exports.up = function(knex, Promise) {
  return knex.schema.createTable('person', function(table) {
    table.increments()
    table.string('first_name')
    table.string('last_name')
    table.string('username')
    table.integer('age')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('person')
};
