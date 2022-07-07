import React from 'react';
import { act, render, fireEvent } from '../../test/util';

import Login from './Login';

describe('Login', () => {
  it('should match snapshot', async () => {
    const container = await render(<Login />);
    const { getByTestId } = container;
    await act(async () => {
      fireEvent(getByTestId('login-logo-container'), 'onLayout', {
        nativeEvent: {
          layout: {
            height: 300,
            width: 300,
          },
        },
      });
    });

    expect(container).toMatchSnapshot();
  });
});
