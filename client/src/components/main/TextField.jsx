import React from 'react';
import PropTypes from 'proptypes';

const TextField = ({
  field, value, type, onChange, icon, label, error
}) => (
  <div className="row">
    <div className="input-field col s12">
      <i className="material-icons prefix">{icon}</i>
      <input
        onChange={onChange}
        value={value}
        name={field}
        type={type}
      />
      <label htmlFor={field}>{label}</label>
      {error ? <span className="red-text right">{error}</span> : null}
    </div>
  </div>
);

TextField.defaultProps = {
  type: 'text',
  error: null
};

TextField.propTypes = {
  field: PropTypes.node.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string
};

export default TextField;
