import React from 'react';

import { render } from 'test/util';
import Menu from './Menu';

describe('Menu', () => {
  it('should match snapshot', () => {
    expect(render(<Menu />)).toMatchSnapshot();
  });
});
