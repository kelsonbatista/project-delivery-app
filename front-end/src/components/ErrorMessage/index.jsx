import PropTypes from 'prop-types';

function ErrorMessage(props) {
  const { error, role, className, dataTestId } = props;
  return (
    <div>
      {error && (
        <div
          className={ className }
          role={ role }
          data-testid={ dataTestId }
        >
          {error}
        </div>
      )}
    </div>
  );
}

ErrorMessage.propTypes = {
  error: PropTypes.string,
  role: PropTypes.string,
  classname: PropTypes.string,
  datatestid: PropTypes.string,
}.isRequired;

export default ErrorMessage;
