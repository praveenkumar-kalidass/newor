import React from 'react';

import { render } from 'test/util';
import Liability from './Liability';

jest.mock('provider/User/useUser', () => () => ({
  user: {},
  liability: {
    id: 'test_liability_id',
    value: 12345.12,
    label: '₹12,345.12',
  },
}));

describe('Liability', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', () => {
    const container = render(<Liability />);

    expect(container).toMatchSnapshot();
  });
});
