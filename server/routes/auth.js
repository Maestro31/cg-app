const express = require('express');
const router = express.Router();
const passportFacebook = require('../auth/facebook');

router.get('/login', function(req, res, next) {
  res.render('Please Sign in with:');
});

router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

router.get('/facebook', passportFacebook.authenticate('facebook'));

router.get(
  '/facebook/callback',
  passportFacebook.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  }
);

module.exports = router;
