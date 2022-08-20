import React from 'react';

import { render } from 'test/util';
import AddDeposit from './AddDeposit';

describe('AddDeposit', () => {
  it('should match snapshot', () => {
    const container = render(<AddDeposit />);

    expect(container).toMatchSnapshot();
  });
});
