import React from 'react';

import { render, fireEvent, act } from 'test/util';
import AddDeposit from './AddDeposit';

const mockNavigation = {
  navigate: jest.fn(),
};
jest.mock('@react-navigation/native', () => {
  const reactNavigation = jest.requireActual('@react-navigation/native');
  return {
    ...reactNavigation,
    useNavigation: () => mockNavigation,
  };
});
const mockToast = { show: jest.fn() };
jest.mock('native-base', () => {
  const nativeBase = jest.requireActual('native-base');
  return {
    ...nativeBase,
    useToast: () => mockToast,
  };
});
const mockUseAsset = {
  addDeposit: jest.fn(),
};
jest.mock('api/useAsset', () => () => mockUseAsset);
const mockUseUser = {
  asset: { id: 'test_asset_id' },
};
jest.mock('provider/User/useUser', () => () => mockUseUser);

describe('AddDeposit', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', () => {
    const container = render(<AddDeposit />);

    expect(container).toMatchSnapshot();
  });

  it('should successfully add deposit', async () => {
    mockUseAsset.addDeposit.mockResolvedValueOnce({ data: { value: 12345.00 } });

    const { getByTestId } = render(<AddDeposit />);

    fireEvent(getByTestId('deposit-input-type'), 'onValueChange', 'FIXED_DEPOSIT');
    fireEvent.changeText(getByTestId('deposit-input-initial'), '12345.00');
    fireEvent.changeText(getByTestId('deposit-input-value'), '12345.00');
    fireEvent.changeText(getByTestId('deposit-input-depository-name'), 'Test');

    await act(async () => {
      await fireEvent.press(getByTestId('deposit-submit'));
    });

    expect(mockNavigation.navigate).toHaveBeenCalledWith('ASSET');
    expect(mockToast.show).toHaveBeenCalledTimes(1);
  });

  it('should show error toast when add deposit failed', async () => {
    mockUseAsset.addDeposit.mockRejectedValueOnce();

    const { getByTestId } = render(<AddDeposit />);

    fireEvent(getByTestId('deposit-input-type'), 'onValueChange', 'FIXED_DEPOSIT');
    fireEvent.changeText(getByTestId('deposit-input-initial'), '12345.00');
    fireEvent(getByTestId('deposit-input-same-as-initial'), 'onChange');
    fireEvent.changeText(getByTestId('deposit-input-depository-name'), 'Test');

    await act(async () => {
      await fireEvent.press(getByTestId('deposit-submit'));
    });

    expect(mockToast.show).toHaveBeenCalledTimes(1);
  });
});
