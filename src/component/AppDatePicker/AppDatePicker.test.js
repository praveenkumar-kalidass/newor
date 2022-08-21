import React from 'react';
import { Platform } from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

import { render, fireEvent, act } from 'test/util';
import AppDatePicker from './AppDatePicker';

jest.mock('@react-native-community/datetimepicker', () => {
  const { View } = jest.requireActual('react-native');
  return {
    __esModule: true,
    DateTimePickerAndroid: { open: jest.fn() },
    default: View,
  };
});

describe('AppDatePicker', () => {
  it('should show date picker for android', () => {
    const mockOnChange = jest.fn();
    Platform.OS = 'android';
    const container = render(
      <AppDatePicker
        value={new Date()}
        onChange={mockOnChange}
        placeholder="Test picker"
      />,
    );
    const { getByTestId } = container;

    fireEvent(getByTestId('datepicker-input'), 'onFocus');

    expect(DateTimePickerAndroid.open).toHaveBeenCalledTimes(1);

    act(() => {
      DateTimePickerAndroid.open.mock.calls[0][0].onChange({}, new Date());
    });

    expect(mockOnChange).toHaveBeenCalledWith(expect.any(Date));
  });

  it('should show date picker for ios', () => {
    const mockOnChange = jest.fn();
    Platform.OS = 'ios';
    const container = render(
      <AppDatePicker
        value={new Date()}
        onChange={mockOnChange}
        placeholder="Test picker"
      />,
    );
    const { getByTestId } = container;

    fireEvent(getByTestId('datepicker-input'), 'onFocus');

    fireEvent(getByTestId('datepicker'), 'onChange', {}, new Date());

    fireEvent.press(getByTestId('datepicker-ok'));

    expect(mockOnChange).toHaveBeenCalledWith(expect.any(Date));
  });
});
