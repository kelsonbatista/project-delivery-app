import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

function Input(props, ref) {
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
    classNameError,
    roleError,
    dataTestIdError,
    ...rest
  } = props;

  return (
    <div>
      <div className={ classNameDiv }>
        <label className={ classNameLabel } htmlFor={ name }>{label}</label>
        <input
          data-testid={ dataTestId }
          { ...rest }
          ref={ ref }
          id={ name }
          name={ name }
          type={ type }
          placeholder={ placeholder }
          className={ `${classNameField} ${error && 'form__error'}` }
        />
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

Input.propTypes = {
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

const CustomInput = forwardRef(Input);
export default CustomInput;
