var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var path = require('path');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var mongoose = require('mongoose');
var connect = process.env.MONGODB_URI;
const express = require('express');
const models = require('./models/models');
const Document = models.Document;
const User = models.User;
const bodyParser = require('body-parser');

var REQUIRED_ENV = "SECRET MONGODB_URI".split(" ");

REQUIRED_ENV.forEach(function(el) {
  if (!process.env[el]){
    console.error("Missing required env var " + el);
    process.exit(1);
  }
});

mongoose.connect(connect);

var routes = require('./routes/routes');
var auth = require('./routes/auth');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// import mongoose from 'mongoose';
// import Promise from 'promise';
// mongoose.Promise = Promise;



// -----------------------------------------------------------------------------
// ---------------------------------Socket IO-----------------------------------
// -----------------------------------------------------------------------------
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function(req, res){
  res.send('Hello World');
});

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('joinRoom', (docId) => {
    // join room with name '{docId}'
    socket.join(docId);
    var socketIds = Object.keys(io.sockets.sockets);
    console.log('docId in server', docId);
    console.log('this socket id', socket.id);


    // TODO: log this all after emitting 'success' back to socket. log the rooms in socket ust to see if its some async stuff going on
    var firstUser = socketIds[0];
    var secondUser = socketIds[1];
    console.log('fuser', firstUser);
    console.log('the list of rooms for socket 1', socket.rooms);
    if(secondUser){
        console.log('the list of rooms for socket 2', secondUser.rooms);
    }
  });
});

/*
Socket is created every time there is a new user
When a user opens a document, they enter (or create) a room
s

*/





// -----------------------------------------------------------------------------
// ------------------------Passport Initial Set Up------------------------------
// -----------------------------------------------------------------------------

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Passport
app.use(session({
  secret: process.env.SECRET,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));


app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  models.User.findById(id, done);
});

// passport strategy
passport.use(new LocalStrategy(function(username, password, done) {
  // Find the user with the given username
  models.User.findOne({ username: username }, function (err, user) {
    // if there's an error, finish trying to authenticate (auth failed)
    if (err) {
      console.error('Error fetching user in LocalStrategy', err);
      return done(err);
    }
    // if no user present, auth failed
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    // if passwords do not match, auth failed
    if (user.password !== password) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    // auth has has succeeded
    return done(null, user);
  });
}
));

// -----------------------------------------------------------------------------
// --------------------------Login/Register Routes------------------------------
// -----------------------------------------------------------------------------

app.use('/', auth(passport));
app.use('/', routes);

// -----------------------------------------------------------------------------
// --------------------------DocumentPortal Routes------------------------------
// -----------------------------------------------------------------------------
app.post('/create', function(req, res) {
  // const user = new User({
  //   username: 'arip',
  //   password: 'mr.poopybutthole',
  //   documents: []
  // });
  //
  // user.save();

  const doc = new Document({
    title: req.body.docName,
    userOwnedId: req.body.userId,
    collaborators: [req.body.userId],
  });
  // save the new doc to the db
  doc.save(function(err, docSaved) {
    return docSaved._id;
  })
  // add the saved doc (id and name) to user who made it
  .then((newDocId) => {
    User.findById(req.body.userId, function(err, usr) {
      usr.documents.push({docName: req.body.docName, docId: newDocId._id, isShared: false});
      usr.save();
      return res.send({docName: req.body.docName, docId: newDocId._id, isShared: false});
    })
    .catch((err) => {
      console.log('Error finding user', err);
    });
  })
  .catch((err) => {
    console.log('Error creating new document', err);
  });
});

app.post('/addShared', function(req, res) {
  // req.body has userId, docId
  // TODO: update documents. Find by docId, add userId as collaborator.
  Document.findById(req.body.docId, function(err, doc){
    doc.collaborators.push(req.body.userId);
    doc.save();
    User.findById(req.body.userId, function(err, usr){
      usr.documents.push({docName: doc.title, docId: req.body.docId, isShared: true});
      usr.save();
      return res.send({docName: doc.title, docId: req.body.docId, isShared: true});
    });
  });
});

app.post('/delete/:docId', function(req, res) {
  Document.findById(req.body.docId, function(err, doc) {
    if (doc) {
      doc.collaborators.forEach(function(usrId) {
        User.findById(usrId, function(err, usr) {
          for (var i = 0; i < usr.documents.length; i++) {
            if (usr.documents[i].docId === req.body.docId) {
              usr.documents.splice(i, 1);
            }
          }
          usr.save();
        });
      });
      doc.remove();
    }

    return res.send("removed!");
  });
});

app.get('/open/:docId', function(req, res) {
  Document.findById(req.params.docId, function(err, doc){
    if(!doc){
      console.log('could not find doc');
      return null;
    } else {
      return res.send({title: doc.title, editorState: doc.editorState});
    }
  });
});

app.get('/render/:userId', function(req, res) {
  //use mongo to get all the current documents.
  User.findById(req.params.userId, function(err, usr) {
    return res.send(usr.documents);
  });
});

// -----------------------------------------------------------------------------
// -----------------------------EditorView Routes-------------------------------
// -----------------------------------------------------------------------------

app.post('/save', function(req, res) {
  var documentId = req.body.docId;
  Document.findById(documentId, function(err, doc){
    if(err){
      console.log(err);
    } else {
      doc.editorState = req.body.editorState;
      doc.save(function(err){
        if(err){
          console.log(err);
        }
      });
    }
  });
});

// -----------------------------------------------------------------------------
// -------------------------------Error Handlers--------------------------------
// -----------------------------------------------------------------------------

// error handlers
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send("Error:", err.message);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

var port = process.env.PORT || 3005;
http.listen(port, function() {
  console.log('Express started. Listening on port %s', port);
});
