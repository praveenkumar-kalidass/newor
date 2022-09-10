import React from 'react';

import {
  render, waitFor, act, fireEvent,
} from 'test/util';
import Liability from './Liability';

jest.mock('provider/User/useUser', () => () => ({
  user: {},
  liability: {
    id: 'test_liability_id',
    value: 12345.12,
    label: '₹12,345.12',
  },
}));
const mockUseLiability = {
  getLiability: jest.fn(),
};
jest.mock('api/useLiability', () => () => mockUseLiability);

describe('Liability', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', () => {
    mockUseLiability.getLiability.mockResolvedValueOnce({
      id: 'test_liability_id',
      value: 12345.12,
      list: [{
        type: 'LOAN',
        value: 12345.12,
        depositoryName: 'Test',
      }],
    });

    const container = render(<Liability />);

    expect(container).toMatchSnapshot();
  });

  it('should show error image when get liability fails', async () => {
    mockUseLiability.getLiability.mockRejectedValueOnce();

    const { queryByTestId, getByTestId } = await render(<Liability />);

    await waitFor(() => getByTestId('liability-failed-image'));

    expect(queryByTestId('liability-failed-image')).not.toBeNull();

    await act(async () => {
      await fireEvent.press(getByTestId('liability-reload'));
    });

    expect(mockUseLiability.getLiability).toHaveBeenCalledTimes(2);
  });
});
