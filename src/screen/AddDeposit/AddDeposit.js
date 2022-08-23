import React, { useEffect, useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import {
  ScrollView, VStack, Text, Checkbox, HStack, Slider,
} from 'native-base';

import withBackground from 'helper/withBackground';
import { Background5 } from 'component/Background';
import AppDatePicker from 'component/AppDatePicker';
import AppButton from 'component/AppButton';
import CONSTANT from 'constant';
import useTranslation from 'translation/useTranslation';
import Translation from 'translation/Translation';
import useTheme from 'theme/useTheme';
import { unformatCurrency, formatCurrency } from 'helper/util';
import { InputField, SelectField } from './AddDeposit.style';

const { DEPOSIT_TYPE, APP_LITERAL } = CONSTANT;

const AddDeposit = () => {
  const [type, setType] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [maturityDate, setMaturityDate] = useState(new Date());
  const [initial, setInitial] = useState('0.00');
  const [value, setValue] = useState('0.00');
  const [interestRate, setInterestRate] = useState(2.50);
  const [isSameAsInitial, setIsSameAsInitial] = useState(false);
  const [depositoryName, setDepositoryName] = useState('');
  const { translate } = useTranslation();
  const theme = useTheme();
  const headerHeight = useHeaderHeight();

  const isScheduled = useMemo(() => [
    DEPOSIT_TYPE.FIXED_DEPOSIT,
    DEPOSIT_TYPE.RECURRING_DEPOSIT,
    DEPOSIT_TYPE.PUBLIC_PROVIDENT_FUND,
  ].includes(type), [type]);

  const handleFieldChange = (field, text) => {
    if (['initial', 'value'].includes(field)) {
      const formattedText = formatCurrency(unformatCurrency(text)).replace(APP_LITERAL.RUPEE_SYMBOL, '');
      if (field === 'initial') {
        setInitial(formattedText);
        if (isSameAsInitial) {
          setValue(formattedText);
        }
        return;
      }
      if (field === 'value') {
        setValue(formattedText);
      }
      return;
    }
    if (field === 'isSameAsInitial') {
      setIsSameAsInitial((isSame) => !isSame);
    }
  };

  useEffect(() => {
    if (isSameAsInitial) {
      setValue(initial);
      return;
    }
    setValue('0.00');
  }, [isSameAsInitial]);

  const isSubmit = useMemo(() => {
    const toBeValidated = [
      unformatCurrency(value),
      interestRate,
      depositoryName,
    ];
    if (isScheduled) {
      toBeValidated.unshift(unformatCurrency(initial));
    }
    return toBeValidated.every((field) => Boolean(field));
  }, [isScheduled, initial, value, interestRate, depositoryName]);

  return (
    <KeyboardAvoidingView flex={1} keyboardVerticalOffset={headerHeight + 20} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView>
        <VStack p={5}>
          <Translation tkey="SELECT_DEPOSIT_TYPE" as={Text} mb={2} />
          <SelectField
            selectedValue={type}
            onValueChange={setType}
            placeholder={translate('DEPOSIT_TYPE')}
          >
            <For each="deposit" index="index" of={Object.values(DEPOSIT_TYPE)}>
              <SelectField.Item key={`deposit-${index}`} label={translate(deposit)} value={deposit} />
            </For>
          </SelectField>
          <If condition={type}>
            <Choose>
              <When condition={isScheduled}>
                <Translation
                  tkey="SELECT_START_AND_MATURITY_DATE"
                  tdata={{ depositType: translate(type) }}
                  as={Text}
                  mb={2}
                  bg={theme.color.BACKGROUND_100}
                />
              </When>
              <Otherwise>
                <Translation tkey="SELECT_START_DATE" tdata={{ depositType: translate(type) }} as={Text} mb={2} />
              </Otherwise>
            </Choose>
            <AppDatePicker
              value={startDate}
              placeholder={translate('START_DATE')}
              onChange={setStartDate}
            />
            <If condition={isScheduled}>
              <AppDatePicker
                value={maturityDate}
                placeholder={translate('MATURITY_DATE')}
                onChange={setMaturityDate}
              />
            </If>
            <Translation
              tkey="ENTER_DEPOSIT_DETAILS"
              tdata={{ depositType: translate(type) }}
              as={Text}
              mb={2}
              bg={theme.color.BACKGROUND_100}
            />
            <Translation
              tkey="INITIAL_DEPOSIT"
              as={Text}
              color={theme.color.BACKGROUND_50}
            />
            <If condition={isScheduled}>
              <InputField
                placeholder={translate('INITIAL_DEPOSIT')}
                value={initial}
                onChangeText={(text) => handleFieldChange('initial', text)}
                InputLeftElement={<Text pl={3}>{APP_LITERAL.RUPEE_SYMBOL}</Text>}
                keyboardType="numeric"
              />
              <Checkbox mr={5} colorScheme="info" value={isSameAsInitial} onChange={() => handleFieldChange('isSameAsInitial')}>
                {translate('SAME_INITIAL_AMOUNT')}
              </Checkbox>
            </If>
            <Translation
              tkey="PRESENT_AMOUNT"
              as={Text}
              color={theme.color.BACKGROUND_50}
              mt={2}
            />
            <InputField
              placeholder={translate('PRESENT_AMOUNT')}
              value={value}
              onChangeText={(text) => handleFieldChange('value', text)}
              InputLeftElement={<Text pl={3}>{APP_LITERAL.RUPEE_SYMBOL}</Text>}
              keyboardType="numeric"
              isDisabled={isSameAsInitial}
            />
            <HStack space={5} alignItems="center">
              <VStack flex={1}>
                <Translation tkey="INTEREST_RATE" as={Text} color={theme.color.BACKGROUND_50} />
                <Slider
                  flex={1}
                  value={interestRate}
                  minValue={0}
                  maxValue={25}
                  step={0.01}
                  onChange={setInterestRate}
                  colorScheme="red"
                >
                  <Slider.Track bg={`${theme.color.PRIMARY_100}:alpha.20`}>
                    <Slider.FilledTrack bg={theme.color.PRIMARY_100} />
                  </Slider.Track>
                  <Slider.Thumb bg={theme.color.PRIMARY_100} />
                </Slider>
              </VStack>
              <InputField
                flex={0.4}
                value={String(interestRate)}
                onChangeText={(text) => setInterestRate(parseFloat(text))}
                InputRightElement={<Text pr={3}>%</Text>}
                mt={3}
                keyboardType="numeric"
              />
            </HStack>
            <InputField
              placeholder={translate('DEPOSITORY_NAME')}
              value={depositoryName}
              onChangeText={setDepositoryName}
            />
            <Translation tkey="SUBMIT" as={AppButton} variant="primary" isDisabled={!isSubmit} />
          </If>
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default withBackground({ Component: AddDeposit, Background: Background5 });
