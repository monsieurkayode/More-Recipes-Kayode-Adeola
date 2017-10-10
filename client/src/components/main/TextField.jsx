import React from 'react';

const TextField = ({ field, value, type, onChange, className }) => {
  return (
    <input
      onChange={onChange}
      value={value}
      name={field}
      type={type}
      className={className}
      required />
  )
}

TextField.defaultProps = {
  type: 'text',
  className: 'validate'
}

export default TextField;