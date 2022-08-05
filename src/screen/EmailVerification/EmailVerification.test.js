import React from 'react';

import { render, waitFor } from 'test/util';
import EmailVerification from './EmailVerification';

jest.mock('@react-navigation/native', () => {
  const reactNavigation = jest.requireActual('@react-navigation/native');
  return {
    ...reactNavigation,
    useRoute: () => ({ params: 'testtoken123' }),
  };
});
const mockUseUser = {
  verify: jest.fn(),
};
jest.mock('api/useUser', () => () => mockUseUser);

describe('EmailVerification', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match success snapshot', async () => {
    mockUseUser.verify.mockResolvedValueOnce();

    const container = await render(<EmailVerification />);
    const { queryByTestId } = container;
    await waitFor(() => queryByTestId('email-verification'));

    expect(container).toMatchSnapshot();
  });

  it('should match error snapshot', async () => {
    mockUseUser.verify.mockRejectedValueOnce();

    const container = render(<EmailVerification />);
    const { queryByTestId } = container;
    await waitFor(() => queryByTestId('email-verification'));

    expect(container).toMatchSnapshot();
  });
});
