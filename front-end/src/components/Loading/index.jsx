import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const loadingStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100vw',
  height: '100vh',
};

function Loading() {
  return (
    <div style={ loadingStyle }>
      <Spinner variant="dark" size="lg" animation="border" role="status" />
    </div>
  );
}

export default Loading;
