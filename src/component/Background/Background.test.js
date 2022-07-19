import React from 'react';

import { render } from '../../test/util';
import Background1 from './Background1';
import Background2 from './Background2';

describe('Background1', () => {
  it('should match snapshot', () => {
    const container = render(<Background1 height={100} width={100} />);

    expect(container).toMatchSnapshot();
  });
});

describe('Background2', () => {
  it('should match snapshot', () => {
    const container = render(<Background2 />);

    expect(container).toMatchSnapshot();
  });
});
