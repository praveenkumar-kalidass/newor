import React from 'react';

import { render } from 'test/util';
import Dashboard from './Dashboard';

jest.mock('provider/User/useUser', () => () => ({
  user: {
    firstName: 'Hello',
    lastName: 'World',
    email: 'hello_world@test.com',
  },
  worth: {
    label: '12,345.12',
  },
}));

describe('Dashboard', () => {
  it('should match snapshot', () => {
    const container = render(<Dashboard />);

    expect(container).toMatchSnapshot();
  });
});
