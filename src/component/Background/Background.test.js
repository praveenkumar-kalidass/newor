import React from 'react';

import { render } from 'test/util';
import Background1 from './Background1';
import Background2 from './Background2';
import Background3 from './Background3';
import Background4 from './Background4';

describe('Background1', () => {
  it('should match snapshot', () => {
    const container = render(<Background1 />);

    expect(container).toMatchSnapshot();
  });
});

describe('Background2', () => {
  it('should match snapshot', () => {
    const container = render(<Background2 />);

    expect(container).toMatchSnapshot();
  });
});

describe('Backgroun3', () => {
  it('should match snapshot', () => {
    const container = render(<Background3 />);

    expect(container).toMatchSnapshot();
  });
});

describe('Backgroun4', () => {
  it('should match snapshot', () => {
    const container = render(<Background4 />);

    expect(container).toMatchSnapshot();
  });
});
