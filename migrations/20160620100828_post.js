
exports.up = function(knex, Promise) {
  return knex.schema.createTable('post', function(table) {
    table.increments()
    table.string('title')
    table.text('content')
    table.integer('person_id').references('person.id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('post')
};
