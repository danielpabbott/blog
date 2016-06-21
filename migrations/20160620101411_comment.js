
exports.up = function(knex, Promise) {
  return knex.schema.createTable('comment', function(table) {
    table.increments()
    table.text('content')
    table.integer('post_id').references('post.id')
    table.integer('person_id').references('person.id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comment')
};
