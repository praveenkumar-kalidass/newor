import React, { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Platform, Modal } from 'react-native';
import { Button, HStack } from 'native-base';
import DatePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import moment from 'moment';

import { InputField, ModalOverlay, ModalContainer } from './AppDatePicker.style';

const AppDatePicker = ({
  value,
  onChange,
  placeholder,
}) => {
  const [field, setField] = useState('');
  const [changeDate, setChangeDate] = useState(value);
  const [showPicker, setShowPicker] = useState(false);
  const inputRef = useRef();

  const handleDateChange = useCallback((event, date) => {
    if (Platform.OS === 'android') {
      setField(moment(date).format('DD-MM-YYYY'));
      inputRef.current.blur();
      onChange(date);
      return;
    }
    setChangeDate(date);
  }, []);

  const hideDatePicker = useCallback((change) => {
    setShowPicker(false);
    if (change) {
      setField(moment(changeDate).format('DD-MM-YYYY'));
      onChange(changeDate);
    }
  }, [changeDate, inputRef]);

  const showDatePicker = useCallback(() => {
    if (Platform.OS === 'android') {
      DateTimePickerAndroid.open({
        value,
        onChange: handleDateChange,
      });
      return;
    }
    inputRef.current.blur();
    setShowPicker(true);
  }, []);

  return (
    <>
      <InputField
        testID="datepicker-input"
        ref={inputRef}
        value={field}
        onFocus={showDatePicker}
        showSoftInputOnFocus={false}
        placeholder={placeholder}
      />
      <If condition={showPicker}>
        <Modal
          transparent
          visible={showPicker}
        >
          <ModalOverlay>
            <ModalContainer>
              <DatePicker
                testID="datepicker"
                value={value}
                onChange={handleDateChange}
                display="inline"
              />
              <HStack justifyContent="flex-end">
                <Button
                  testID="datepicker-cancel"
                  onPress={() => hideDatePicker(false)}
                  _text={{ color: '#027aff' }}
                  _pressed={{ bg: '#027aff:alpha.10' }}
                  variant="ghost"
                >
                  Cancel
                </Button>
                <Button
                  testID="datepicker-ok"
                  onPress={() => hideDatePicker(true)}
                  _text={{ color: '#027aff' }}
                  _pressed={{ bg: '#027aff:alpha.10' }}
                  variant="ghost"
                >
                  OK
                </Button>
              </HStack>
            </ModalContainer>
          </ModalOverlay>
        </Modal>
      </If>
    </>
  );
};

AppDatePicker.propTypes = {
  value: PropTypes.instanceOf(Date).isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

AppDatePicker.defaultProps = {
  placeholder: '',
};

export default AppDatePicker;
