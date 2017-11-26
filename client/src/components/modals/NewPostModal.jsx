import React from 'react';
import { RecipePostModal } from './Index.jsx';

const NewPostModal = (props => {
  return(
    <div id="modal-newpost" className="modal">
      <RecipePostModal />
      <div className="modal-footer">
        <a href="/" className="modal-action modal-close waves-effect waves-green btn-flat btn white-text red"><i className="fa fa-close"></i> Cancel</a>
        <a href="/" className="modal-action modal-close waves-effect waves-green btn-flat btn white-text blue"><i className="fa fa-paper-plane"></i> Post</a>
      </div>
    </div>
  )
});

export default NewPostModal;