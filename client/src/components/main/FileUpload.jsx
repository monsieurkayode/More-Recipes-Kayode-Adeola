import React from 'react';
/**
 * Hanldes file selection for upload
 *
 * @function handleChange
 *
 * @param {function} handler
 *
 * @returns {object} selected file
 */
const handleChange = handler => ({ target: { files } }) =>
  handler(files.length ? { file: files[0], name: files[0].name } : {});

export default ({
  // eslint-disable-next-line
  input: { onChange, onBlur, value: omitValue, ...inputProps },
  // eslint-disable-next-line
  meta: omitMeta,
  ...props
}) => (
  <input
    type="file"
    onChange={handleChange(onChange)}
    onBlur={handleChange(onBlur)}
    {...inputProps}
    {...props}
  />
);
