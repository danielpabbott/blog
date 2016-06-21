var knex = require('./knex');

module.exports = {
  Users: {
    getAll: function () {
      return knex('person').select();
    }
  },
  Posts: {
    getAll: function () {
      return knex('post').select('*', 'post.id as post_id').join('person', 'post.person_id', 'person.id');
    },
    getOne: function (id) {
      return Promise.all([
        knex('person').select(),
        knex('post').select().where({id: id}).first(),
        knex('comment').select().join('person', 'person_id', 'person.id').where({post_id: id})
      ]);
    }
  },
  Comments: {
    insert: function (body) {
      return knex('comment').insert(body);
    }
  }
}
