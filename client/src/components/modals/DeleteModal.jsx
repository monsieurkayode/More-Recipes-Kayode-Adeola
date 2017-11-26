import React from 'react';

const DeleteModal = (props => {
  return(
    <div id="modal-delete" className="modal">
      <div className="modal-content">
        <h5><i className="fa fa-warning"></i> Are you sure you want to delete this recipe post</h5>
        <p>This action cannot be undone</p>
      </div>
      <div className="modal-footer">
        <a href="/" className="modal-action modal-close waves-effect waves-green btn-flat btn white-text blue">Cancel</a>
        <a href="/" className="modal-action waves-effect waves-green btn-flat btn white-text red">Delete</a>
      </div>
    </div>
  )
})

export default DeleteModal;