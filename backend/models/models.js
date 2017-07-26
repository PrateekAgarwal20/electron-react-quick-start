const mongoose = require('mongoose');
// TODO: figure out who has the mongo
// var connect = process.env.MONGODB_URI || require('./connect');
mongoose.connect(process.env.MONGODB_URI);

//import {EditorState} from 'draft-js';

const userSchema = mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  documents: {
    type: Array
  },
  //documents is array of objects with (docId, docName, isShared (whether it is a shared doc or not))
});


const documentSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  editorState: {
    //TODO: figure out the editorstate type
    type: Object
  },
  userOwnedId: {
    type: String,
    required: true
  },
  collaborators: {
    type: Array,
    required: true
  }
});

var User = mongoose.model('User', userSchema);
var Document = mongoose.model('Document', documentSchema);

module.exports = {
  User: User,
  Document: Document
};
