import React from 'react';
import PropTypes from 'proptypes';

/**
 * DeleteModal
 * @function DeleteModal
 *
 * @param {object} props
 *
 * @return {JSX} JSX
 */
const DeleteModal = props => (
  <div id="modal-delete" className="modal">
    <div className="modal-content">
      <h5><i className="fa fa-warning" /> {props.dialog}</h5>
      <p>This action cannot be undone!</p>
    </div>
    <div className="modal-footer">
      <button className="modal-action modal-close edit chip">
          Cancel
      </button>
      <button
        onClick={props.handleAction.bind(// eslint-disable-line
          null, props.id
        )}
        className="modal-action modal-close delete chip"
      >
        <i className="fa fa-trash" />
        { props.selected === 'favorites' ? ' Remove' : ' Delete'}
      </button>
    </div>
  </div>
);

DeleteModal.propTypes = {
  id: PropTypes.number.isRequired,
  handleAction: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired,
  dialog: PropTypes.string.isRequired
};

export default DeleteModal;
