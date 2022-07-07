import React from 'react';

import { render } from '../../test/util';
import Background from './Background';

describe('Background', () => {
  it('should match snapshot', () => {
    const container = render(<Background />);

    expect(container).toMatchSnapshot();
  });
});
