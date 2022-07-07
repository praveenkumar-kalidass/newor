import React from 'react';
import { render } from '../../test/util';

import Login from './Login';

describe('Login', () => {
  it('should match snapshot', () => {
    const container = render(<Login />);

    expect(container).toMatchSnapshot();
  });
});
