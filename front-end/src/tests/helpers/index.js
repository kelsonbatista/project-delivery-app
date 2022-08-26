import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createBrowserHistory } from 'history';

const renderWithRouter = (component) => {
  const history = createBrowserHistory();
  return ({
    ...render(
      <Router navigator={ history } location={ history.location }>
        { component }
      </Router>,
    ),
  });
};

export default renderWithRouter;
