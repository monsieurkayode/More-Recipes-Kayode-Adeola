import React from 'react';
import PropTypes from 'proptypes';
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

const FileUpload = ({
  input: { onChange, onBlur, value: omitValue, ...inputProps },
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

FileUpload.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired
  }).isRequired,
  meta: PropTypes.shape({}).isRequired
};

export default FileUpload;
