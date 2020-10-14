var express = require('express');
var router = express.Router();

var userCtrl = require('../controllers/user.controller');

router.post('/signin', function (req, res, next) {
  return userCtrl.signIn(req, res, next)
})

router.post('/register', function (req, res, next) {
  return userCtrl.register(req, res, next)
})

router.post('/updateUser', function (req, res, next) {
  return userCtrl.updateUser(req, res, next)
})

module.exports = router;