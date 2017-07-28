// Add Passport-related auth routes here.
var express = require('express');
var router = express.Router();
var models = require('../models/models');

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
    console.log('hiiiiiiiiiiiiiiii');
    // var newId = JSON.stringify(req.user._id)
<<<<<<< HEAD
    return res.send({userId: req.user._id});
=======
    res.json(req.user._id);
>>>>>>> b97e89f8a9a65927a95a2d5b5e64950e806f053a
  });

  return router;
};
