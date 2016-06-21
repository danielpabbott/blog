var express = require('express');
var router = express.Router();
var db = require('../db/api');

// two ways to redirect to the same post
router.post('/add-comment/:id', function (req, res) {
  db.Comments.insert(req.body).then(function () {
    res.redirect('/posts/'+ req.params.id)
  })
})

module.exports = router;
