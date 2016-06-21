var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var db = require('../db/api');

router.get('/add-person', function(req, res, next) {
  res.render('add-person');
});


router.get('/bloggers', function(req, res, next) {
  db.Users.getAll().then(function(data) {
    res.render('bloggers', {person: data})
  })
});


router.post('/bloggers', function(req, res, next) {
  knex('person').insert(req.body).then(function(){
    res.redirect('bloggers');
  }).catch(function(err){
    console.log(err);
  })
});


router.get('/:id/blogger-edit', function(req, res, next) {
  knex('person').select().where({id: req.params.id}).first().then(function(data) {
    res.render('blogger-edit', {person: data})
  })
})

router.post('/:id/blogger-edit', function(req, res, next) {
  knex('person').where({id: req.params.id}).update({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    username: req.body.username,
    age: req.body.age
  }).then(function(){
    res.redirect('/bloggers');
  }).catch(function(err){
    console.log(err);
  })
});

router.get('/:id/blogger-delete', function(req, res, next) {
  knex('person').where({id: req.params.id}).del().then(function() {
  res.redirect('/bloggers')
  })
});

module.exports = router;
