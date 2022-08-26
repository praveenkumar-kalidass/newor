import React from 'react';

import { render } from 'test/util';
import Menu from './Menu';

jest.mock('provider/User/useUser', () => () => ({
  user: {
    firstName: 'Hello',
    lastName: 'World',
    email: 'hello_world@test.com',
    picture: '',
  },
}));

describe('Menu', () => {
  it('should match snapshot', () => {
    expect(render(<Menu />)).toMatchSnapshot();
  });
});
