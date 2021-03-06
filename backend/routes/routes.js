var express = require('express');
var router = express.Router();
var models = require('../models/models');
var User = models.User;

//////////////////////////////// PUBLIC ROUTES ////////////////////////////////
// Users who are not logged in can see these routes

router.get('/', function(req, res, next) {
  res.render('home');
});

///////////////////////////// END OF PUBLIC ROUTES /////////////////////////////

// TODO: I commented this out because it automatically reroutes to login for testing
// router.use(function(req, res, next){
//   if (!req.user) {
//     res.redirect('/login');
//   } else {
//     return next();
//   }
// });

//////////////////////////////// PRIVATE ROUTES ////////////////////////////////
// Only logged in users can see these routes


///////////////////////////// END OF PRIVATE ROUTES /////////////////////////////

module.exports = router;
