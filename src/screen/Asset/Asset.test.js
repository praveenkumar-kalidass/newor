import React from 'react';

import { render } from 'test/util';
import Asset from './Asset';

jest.mock('provider/User/useUser', () => () => ({
  asset: {
    id: 'test_asset_id',
    value: 12345.12,
    label: '₹12,345.12',
  },
}));

describe('Asset', () => {
  it('should match snapshot', () => {
    const container = render(<Asset />);

    expect(container).toMatchSnapshot();
  });
});
