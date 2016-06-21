var express = require('express');
var router = express.Router();
var pg = require('pg');
var knex = require('../db/knex');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'Shitty Blog'});
});

router.get('/add-person', function(req, res, next) {
  res.render('add-person');
});

router.get('/add-post', function(req, res, next) {
  knex('person').select().then(function(data) {
    res.render('add-post', {author: data});
  })
});

router.get('/bloggers', function(req, res, next) {
  knex('person').select().then(function(data) {
    res.render('bloggers', {person: data})
  })
});

router.get('/posts', function(req, res, next) {
  knex('post').select('*', 'post.id as post_id').join('person', 'post.person_id', 'person.id').then(function(data) {
    res.render('posts', {koala: data})
  })
})

router.post('/bloggers', function(req, res, next) {
  knex('person').insert(req.body).then(function(){
    res.redirect('bloggers');
  }).catch(function(err){
    console.log(err);
  })
});

router.post('/posts', function(req, res, next) {
  knex('post').insert(req.body).then(function(){
    res.redirect('posts');
  }).catch(function(err){
    console.log(err);
  })
});

router.get('/:id/blogger-edit', function(req, res, next) {
  knex('person').select().where({id: req.params.id}).first().then(function(data) {
    res.render('blogger-edit', {person: data})
  })
})

router.get('/:id/post-edit', function(req, res, next) {
  knex('post').select().where({id: req.params.id}).first().then(function(data) {
    res.render('post-edit', {post: data})
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

router.post('/:id/post-edit', function(req, res, next) {
  knex('post').where({id: req.params.id}).update({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  }).then(function(){
    res.redirect('/posts');
  }).catch(function(err){
    console.log(err);
  })
});

router.get('/:id/blogger-delete', function(req, res, next) {
  knex('person').where({id: req.params.id}).del().then(function() {
  res.redirect('/bloggers')
  })
});

router.get('/:id/post-delete', function(req, res, next) {
  knex('post').where({id: req.params.id}).del().then(function() {
  res.redirect('/posts')
  })
});

module.exports = router;
