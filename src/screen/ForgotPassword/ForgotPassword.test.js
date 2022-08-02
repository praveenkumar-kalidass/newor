import React from 'react';

import { render } from 'test/util';
import ForgotPassword from './ForgotPassword';

describe('ForgotPassword', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', async () => {
    const container = await render(<ForgotPassword />);

    expect(container).toMatchSnapshot();
  });
});
