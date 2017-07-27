// Add Passport-related auth routes here.
var express = require('express');
var router = express.Router();
var models = require('../models/models');
var axios = require('axios')

module.exports = function(passport) {

  router.post('/signup', function(req, res) {
    // validation step
    console.log(req.body.username);
    if (req.body.password!==req.body.passwordRepeat) {
      return res.send("Passwords don't match."
      );
    }
    var u = new models.User({
      username: req.body.username,
      password: req.body.password
    });
    u.save(function(err, user) {
      if (err) {
        console.log(err);
        res.status(500).redirect('/register');
        return;
      }
      console.log(user);
      res.send("registered");
    });
  });

  // POST Login page
  router.post('/login', passport.authenticate('local'),function(req, res){
    // successFlash: 'Welcome!',
    // failureFlash: 'Invalid username or password.',
    console.log(req.user._id);
    // var newId = JSON.stringify(req.user._id)
    res.json(req.user._id)
  });

  return router;
};
