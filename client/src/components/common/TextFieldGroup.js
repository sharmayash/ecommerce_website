import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const TextFieldGroup = ({
  name,
  placeholder,
  type,
  value,
  error,
  onChange,
  disabled
}) => {
  return (
    <div className="input-field col s12">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={classnames({
          validate: error
        })}
        placeholder={placeholder}
        disabled={disabled}
      />
      {error && <span className="helper-text red-text">{error}</span>}
    </div>
  );
};

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
};

TextFieldGroup.defaultProps = {
  type: "text"
};

export default TextFieldGroup;
