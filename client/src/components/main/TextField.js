import React from 'react';

const TextField = ({ field, value, type, onChange, className, icon, label, error }) => {
  return (
    <div className="row">
      <div className="input-field col s12">
        <i className="material-icons prefix">{icon}</i>
        <input
          onChange={onChange}
          value={value}
          name={field}
          type={type} />
        <label htmlFor={field}>{label}</label>
        {error ? <span className="red-text right">{error}</span> : null}
      </div>
    </div>
  )
}

TextField.defaultProps = {
  type: 'text',
}

export default TextField;