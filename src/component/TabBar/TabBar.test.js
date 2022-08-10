import React from 'react';

import { render } from 'test/util';
import TabBar from './TabBar';

describe('AppModal', () => {
  it('should match snapshot', () => {
    const container = render(
      <TabBar />,
    );

    expect(container).toMatchSnapshot();
  });
});
