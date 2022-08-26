import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

function Select(props, ref) {
  const {
    label,
    name,
    type,
    dataTestId,
    classNameDiv,
    classNameField,
    classNameLabel,
    error,
    placeholder,
    options,
    classNameError,
    roleError,
    dataTestIdError,
    ...rest
  } = props;

  return (
    <div>
      <div className={ classNameDiv }>
        <label className={ classNameLabel } htmlFor={ name }>{label}</label>
        <select
          { ...rest }
          ref={ ref }
          id={ name }
          name={ name }
          type={ type }
          placeholder={ placeholder }
          className={ `${classNameField} ${error && 'form__error'}` }
          data-testid={ dataTestId }
        >
          <option value="">Selecione</option>
          {options.map((option) => (
            <option key={ option.id } value={ option.id }>{option.name}</option>
          ))}
        </select>
      </div>
      <div>
        {error && (
          <div
            className={ classNameError }
            role={ roleError }
            data-testid={ dataTestIdError }
          >
            {error.message}
          </div>
        )}
      </div>
    </div>
  );
}

Select.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  dataTestId: PropTypes.string,
  className: PropTypes.string,
  classNameLabel: PropTypes.string,
  placeholder: PropTypes.string,
  ref: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
}.isRequired;

const CustomSelect = forwardRef(Select);
export default CustomSelect;
