
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
    console.log('action :', action);
    let newState = [...state];
    newState.push({docId: action.docId, docName: action.docName, isShared: action.isShared});
    console.log('newState is', newState);
    return newState;
  }

  case 'DELETE_DOC': {
    let newState = [...state];
    for (var i = 0; i < newState.length; i++) {
      if (newState[i].docId === action.docId) {
        newState.splice(i, 1);
      }
    }
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
