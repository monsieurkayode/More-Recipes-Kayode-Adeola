import React, { Component } from 'react';
import { RecipePostModal } from './Index';

class EditPostModal extends Component {
  render() {
    return (
      <div id="modal-edit" className="modal">
        <RecipePostModal check="edit" />
        <div className="modal-footer">
          <a href="/" className="modal-action modal-close waves-effect waves-green btn-flat btn white-text red"><i className="fa fa-close"></i> Cancel</a>
          <a href="/" className="modal-action modal-close waves-effect waves-green btn-flat btn white-text blue"><i className="fa fa-paper-plane"></i> Post</a>
        </div>
    </div>
    );
  }
}

export default EditPostModal;