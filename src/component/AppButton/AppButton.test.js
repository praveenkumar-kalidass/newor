import React from 'react';

import { render } from 'test/util';
import AppButton from './AppButton';

describe('AppButton', () => {
  it('should render primary button', () => {
    expect(render(<AppButton variant="primary" />)).toMatchSnapshot();
  });

  it('should render secondary button', () => {
    expect(render(<AppButton variant="secondary" />)).toMatchSnapshot();
  });
});
