export function onChangeAction(newEditorState) {
  return {
    type: 'CHANGED',
    newEditorState
  };
}

// -----------------------------------------------------------------------------
// ------------------------------EditorView Actions-----------------------------
// -----------------------------------------------------------------------------

export function onBoldClick(e) {
  e.preventDefault();
  return {
    type: 'BOLD'
  };
}

export function onItalicClick(e) {
  e.preventDefault();
  return {
    type: 'ITALIC'
  };
}

export function onStrikeClick(e) {
  e.preventDefault();
  return {
    type: 'STRIKETHROUGH'
  };
}

export function onUnderlineClick(e) {
  e.preventDefault();
  return {
    type: 'UNDERLINE'
  };
}

export function onCodeClick(e) {
  e.preventDefault();
  return {
    type: 'CODE'
  };
}

// -----------------------------------------------------------------------------
// ---------------------------DocumentPortal Actions----------------------------
// -----------------------------------------------------------------------------

export function renderDocs(userId) {

}

export function newDoc(docName, docId, isShared) {
  return {
    type: 'NEW_DOC',
    docName,
    isShared,
    docId,
  };
}

export function addSharedDoc(docName, docId, isShared) {
  return {
    type: 'ADD_SHARED_DOC',
    docName,
    isShared,
    docId,
  };
}

export function openDoc(userId, docId) {
  return {
    type: 'OPEN_DOC',
    docId,
    userId
  };
}

export function deleteDoc(userId, docId) {
  return {
    type: 'DELETE_DOC',
    docId,
    userId
  };
}
