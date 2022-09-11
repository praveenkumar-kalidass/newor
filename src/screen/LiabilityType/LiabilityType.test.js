import React from 'react';

import { render } from 'test/util';
import LiabilityType from './LiabilityType';

describe('LiabilityType', () => {
  it('should match snapshot', () => {
    const container = render(<LiabilityType />);

    expect(container).toMatchSnapshot();
  });
});
