var express = require('express');
var router = express.Router();
var db = require('../db/api');

router.post('/add-comment', function (req, res) {
  db.Comments.insert(req.body).then(function () {
    res.redirect('/posts/'+ req.body.post_id)
  })
})

module.exports = router;
