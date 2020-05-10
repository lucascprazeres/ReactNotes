import React from 'react';
import PropTypes from 'prop-types';
import { FaPlus } from 'react-icons/fa';
import './Form.css';

export default function Form({
  handleSubmit, handleInputChange, inputValue, clearInput,
}) {
  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        onChange={handleInputChange}
        onFocus={clearInput}
        type="text"
        value={inputValue}
      />
      <button type="submit"><FaPlus /></button>
    </form>
  );
}

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  clearInput: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
};
