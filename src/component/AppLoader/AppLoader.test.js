import React from 'react';

import { render } from 'test/util';
import AppLoader from './AppLoader';

describe('AppLoader', () => {
  it('should match snapshot', () => {
    expect(render(<AppLoader />)).toMatchSnapshot();
  });
});
