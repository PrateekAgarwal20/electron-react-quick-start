const express = require('express');
const app = express();
const models = require('./models/models');
const Document = models.Document;
const User = models.User;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// import mongoose from 'mongoose';
// import Promise from 'promise';
// mongoose.Promise = Promise;
// Example route
app.get('/', function (req, res) {
  res.send('Hello World!');
});

// -----------------------------------------------------------------------------
// ------------------------Login/Registration Routes----------------------------
// -----------------------------------------------------------------------------
app.post('/login', function(req, res){
  // TODO: req will have username and pass. Check in Mongo,
  // successRedirect: '/documents' IDEA: set state.userId to this user's id (maybe username too?)
  // failureRedirect: '/login'
});

app.post('/register', function(req, res){
  // TODO: req will have username and pass. Save new user in mongo
  // redirect to login
});

// -----------------------------------------------------------------------------
// --------------------------DocumentPortal Routes------------------------------
// -----------------------------------------------------------------------------
app.post('/create', function(req, res) {
  // Create new document
  // const user = new User({
  //   username: 'spike',
  //   password: '1',
  //   documents: []
  // });
  //
  // user.save();

  const doc = new Document({
    title: req.body.docName,
    userOwnedId: req.body.userId,
    collaborators: [req.body.userId]
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
  console.log('req.body', req.body);
  Document.findById(req.body.docId, function(err, doc){
    doc.collaborators.push(req.body.userId);
    User.findById(req.body.userId, function(err, usr){
      usr.documents.push({docName: doc.title, docId: req.body.docId, isShared: true});
      return res.send({docName: doc.title, docId: req.body.docId, isShared: true});
    });
  });
});

app.post('/delete', function(req, res) {

});

app.get('/open/:docId', function(req, res) {

});

// -----------------------------------------------------------------------------
// -----------------------------EditorView Routes-------------------------------
// -----------------------------------------------------------------------------

app.post('save changes', function(req, res) {
  var documentId = req.body.documentId; //i don't know what it is called
  Document.findById(documentId, function(err, doc){
    if(err){
      console.log(err);
    } else {
      doc.content = req.body.text; //i don't know how it works with react
      doc.save(function(err){
        if(err){
          console.log(err);
        } else {
          console.log("Document save!!!");
        }
      });
    }
  });
});

app.listen(3005, function () {
  console.log('Backend server for Electron App running on port 3005!');
});
