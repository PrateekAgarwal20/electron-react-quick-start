
const documentListReducer = (state = [], action) => {
  switch (action.type) {

    //TODO: call this when first logging in (think about re-rendering)
  // case 'RENDER_DOCUMENTS': {
  //   User.findById(action.userId)
  //       .then((userObj) => {
  //         return {docsOwned: userObj.documentsOwned, docsShared: userObj.documentsShared};
  //       });
  //       break;
  // }
    //TODO: check the flow for this. Should be called after clicking new doc btn
  case 'NEW_DOC': {
    // Create new document
    let newState = [...state];
    newState.push({docId: action.docId, docName: action.docName, isShared: action.isShared});
    console.log('newState is', newState);
    return newState;
  }
    //TODO: add a shared doc to user and doc
  case 'ADD_SHARED_DOC': {
    // update the doc
    // Document.findById(action.docId)
    //         .then((err, doc) => {
    //           doc.collaborators = doc.collaborators.push({userId: action.userId});
    //           doc.save();
    //           return doc;
    //         })
    //         .then((doc) => {
    //           // update the user
    //           User.findById(action.userId)
    //               .then((err, usr) => {
    //                 usr.documentsShared = usr.documentsShared.push({docName: doc.title, docId: doc._id});
    //                 usr.save();
    //                 return {docsOwned: usr.documentsOwned, docsShared: usr.documentsShared};
    //               });
    //         })
    //         .catch((err) => {
    //           console.log('Error creating new document', err);
    //         });
    console.log('action :', action);
    let newState = [...state];
    newState.push({docId: action.docId, docName: action.docName, isShared: action.isShared});
    console.log('newState is', newState);
    return newState;
  }

  case 'DELETE_DOC': {
    let newState = [...state];
    //TODO: need to go throuhg newState and delete specific doc.


    return newState;
  }

  case 'RENDER_DOCS': {
    return action.documentList;
  }

  default: {
    return state;
  }
  }
};

export default documentListReducer;
