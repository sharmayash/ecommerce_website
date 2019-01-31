import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const SelectListComponent = ({ name, value, error, onChange, options }) => {
  const selectOptions = options.map(option => (
    <option key={option.value} value={option.value}>{option.label}</option>
  ));

  return (
    <div className="input-field col s12">
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={classnames({
          validate: error
        })}
      >
        {selectOptions}
      </select>
      <label>Select Account Type * (reload if this's not visible)</label>
      {error && <span className="helper-text red-text">{error}</span>}
    </div>
  );
};

SelectListComponent.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
};

export default SelectListComponent;