import React from 'react';

import { render } from 'test/util';
import AssetType from './AssetType';

describe('AssetType', () => {
  it('should match snapshot', () => {
    const container = render(<AssetType />);

    expect(container).toMatchSnapshot();
  });
});
