import React from 'react';

import { render } from 'test/util';
import AddLoan from './AddLoan';

describe('AddLoan', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', () => {
    const container = render(<AddLoan />);

    expect(container).toMatchSnapshot();
  });
});
