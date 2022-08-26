import PropTypes from 'prop-types';

function Button(props) {
  const { title, type, classname, datatestid } = props;
  return (
    <button
      type={ type ? 'button' : 'submit' }
      className={ classname }
      data-testid={ datatestid }
    >
      { title }
    </button>
  );
}

Button.propTypes = {
  title: PropTypes.string,
  type: PropTypes.bool,
  classname: PropTypes.string,
  datatestid: PropTypes.string,
}.isRequired;

export default Button;
