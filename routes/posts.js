var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var Users = require('../db/api').Users;
var Posts = require('../db/api').Posts;

router.get('/add-post', function(req, res, next) {
  Users.getAll().then(function(data) {
    res.render('add-post', {author: data});
  })
});

router.get('/posts', function(req, res, next) {
  Posts.getAll().then(function(data) {
    res.render('posts', {koala: data})
  })
})

router.get('/posts/add', function (req, res) {
  db.Posts.getOne(req.params.id).then(function (data) {
    res.render('details', {post: data[1], users: data[0], comments: data[2]})
  })
})

router.post('/posts', function(req, res, next) {
  knex('post').insert(req.body).then(function(){
    res.redirect('posts');
  }).catch(function(err){
    console.log(err);
  })
});

router.get('/:id/post-edit', function(req, res, next) {
  knex('post').select().where({id: req.params.id}).first().then(function(data) {
    res.render('post-edit', {post: data})
  })
})

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


router.get('/:id/post-delete', function(req, res, next) {
  knex('post').where({id: req.params.id}).del().then(function() {
  res.redirect('/posts')
  })
});

module.exports = router;
