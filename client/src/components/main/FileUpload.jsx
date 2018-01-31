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
  <div id="upload-btn">
    <label htmlFor="image">
      <input
        type="file"
        id="image"
        onChange={handleChange(onChange)}
        onBlur={handleChange(onBlur)}
        placeholder="Upload Image"
        {...inputProps}
        {...props}
      />
      <span
        className="btn"
      >
        Upload Image
      </span>
    </label>
  </div>
);
