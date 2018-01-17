import React from 'react';

const DeleteModal = props => {
  return(
    <div id="modal-delete" className="modal">
      <div className="modal-content">
        <h5><i className="fa fa-warning"></i> {props.dialog}</h5>
        <p>This action cannot be undone!</p>
      </div>
      <div className="modal-footer">
        <button className="modal-action modal-close edit chip">
          Cancel
        </button>
        <button
          onClick={props.handleAction.bind(null, props.id)}
          className="modal-action modal-close delete chip">
          <i className="fa fa-trash"></i> 
          { props.selected === 'favorites' ? ' Remove' : ' Delete'}
        </button>
      </div>
    </div>
  )
}

export default DeleteModal;