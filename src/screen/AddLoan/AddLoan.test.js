import React from 'react';

import { render, fireEvent, act } from 'test/util';
import AddLoan from './AddLoan';

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
const mockUseLiability = {
  addLoan: jest.fn(),
};
jest.mock('api/useLiability', () => () => mockUseLiability);
const mockUseUser = {
  user: {},
  liability: { id: 'test_liability_id' },
};
jest.mock('provider/User/useUser', () => () => mockUseUser);

describe('AddLoan', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', () => {
    const container = render(<AddLoan />);

    expect(container).toMatchSnapshot();
  });

  it('should successfully add loan', async () => {
    mockUseLiability.addLoan.mockResolvedValueOnce({ data: { value: 12345.00 } });

    const { getByTestId } = render(<AddLoan />);

    fireEvent(getByTestId('loan-input-type'), 'onValueChange', 'HOME');
    fireEvent.changeText(getByTestId('loan-input-principal'), '12345.00');
    fireEvent.changeText(getByTestId('loan-input-lender-name'), 'Test');

    expect(getByTestId('loan-input-value').props.value).toStrictEqual('12,513.00');

    await act(async () => {
      await fireEvent.press(getByTestId('loan-submit'));
    });

    expect(mockNavigation.navigate).toHaveBeenCalledWith('LIABILITY');
    expect(mockToast.show).toHaveBeenCalledTimes(1);
  });

  it('should show error toast when add deposit failed', async () => {
    mockUseLiability.addLoan.mockRejectedValueOnce();

    const { getByTestId } = render(<AddLoan />);

    fireEvent(getByTestId('loan-input-type'), 'onValueChange', 'HOME');
    fireEvent.changeText(getByTestId('loan-input-principal'), '12345.00');
    fireEvent.changeText(getByTestId('loan-input-lender-name'), 'Test');

    await act(async () => {
      await fireEvent.press(getByTestId('loan-submit'));
    });

    expect(mockToast.show).toHaveBeenCalledTimes(1);
  });
});
