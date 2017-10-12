import React from 'react';

const TextField = ({ field, value, type, onChange, className, icon, label }) => {
  return (
    <div className="row">
      <div className="input-field col s12">
        <i className="material-icons prefix">{icon}</i>
        <input
          onChange={onChange}
          value={value}
          name={field}
          type={type}
          className="validate"
          required />
        <label htmlFor={field} data-error="">{label}</label>
      </div>
    </div>
  )
}

TextField.defaultProps = {
  type: 'text',
}

export default TextField;