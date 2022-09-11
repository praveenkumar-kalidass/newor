import React, { useEffect, useState, useMemo } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import {
  ScrollView, VStack, Text, HStack, Slider,
} from 'native-base';

import CONSTANT from 'constant';
import withBackground from 'helper/withBackground';
import useTranslation from 'translation/useTranslation';
import Translation from 'translation/Translation';
import { Background5 } from 'component/Background';
import useTheme from 'theme/useTheme';
import { unformatCurrency, formatCurrency } from 'helper/util';
import AppDatePicker from 'component/AppDatePicker';
import AppButton from 'component/AppButton';
import { InputField, SelectField } from './AddLoan.style';

const { LOAN_TYPE, APP_LITERAL } = CONSTANT;

const AddLoan = () => {
  const [type, setType] = useState('');
  const [principal, setPrincipal] = useState('0.00');
  const [value, setValue] = useState('0.00');
  const [interestRate, setInterestRate] = useState(2.50);
  const [startedAt, setStartedAt] = useState(new Date());
  const [tenure, setTenure] = useState(12);
  const [interestAmount, setInterestAmount] = useState('0.00');
  const [lenderName, setLenderName] = useState('');
  const headerHeight = useHeaderHeight();
  const { translate } = useTranslation();
  const theme = useTheme();

  const handleFieldChange = (field, text) => {
    if (['principal', 'value'].includes(field)) {
      const formattedText = formatCurrency(unformatCurrency(text)).replace(APP_LITERAL.RUPEE_SYMBOL, '');
      if (field === 'principal') {
        setPrincipal(formattedText);
        return;
      }
      setValue(formattedText);
    }
  };

  useEffect(() => {
    const principalValue = unformatCurrency(principal);
    if (principalValue && interestRate && tenure) {
      const interest = interestRate / 1200;
      const emi = (principalValue * interest * ((1 + interest) ** tenure))
        / (((1 + interest) ** tenure) - 1);
      const interestValue = formatCurrency(Math.round(emi * tenure));
      setInterestAmount(interestValue);
      setValue(interestValue.replace(APP_LITERAL.RUPEE_SYMBOL, ''));
    }
  }, [principal, interestRate, tenure]);

  const isSubmitEnabled = useMemo(() => {
    const toBeValidated = [
      unformatCurrency(principal),
      unformatCurrency(value),
      interestRate,
      lenderName,
    ];
    return toBeValidated.every((field) => Boolean(field));
  }, [principal, value, interestRate, lenderName]);

  return (
    <KeyboardAvoidingView flex={1} keyboardVerticalOffset={headerHeight + 20} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView>
        <VStack p={5}>
          <Translation tkey="SELECT_LOAN_TYPE" as={Text} mb={2} />
          <SelectField
            selectedValue={type}
            onValueChange={setType}
            placeholder={translate('LOAN_TYPE')}
            testID="loan-input-type"
          >
            <For each="loan" index="index" of={Object.values(LOAN_TYPE)}>
              <SelectField.Item key={`loan-${index}`} label={translate(`CONSTANT.LOAN_TYPE.${loan}`)} value={loan} />
            </For>
          </SelectField>
          <If condition={type}>
            <Translation
              tkey="ENTER_LOAN_DETAILS"
              tdata={{ loanType: translate(`CONSTANT.LOAN_TYPE.${type}`) }}
              as={Text}
              mb={2}
              bg={theme.color.BACKGROUND_100}
            />
            <Translation
              tkey="LOAN_AMOUNT"
              as={Text}
              color={theme.color.BACKGROUND_50}
              mb={2}
            />
            <InputField
              placeholder={translate('LOAN_AMOUNT')}
              value={principal}
              onChangeText={(text) => handleFieldChange('principal', text)}
              InputLeftElement={<Text pl={3}>{APP_LITERAL.RUPEE_SYMBOL}</Text>}
              keyboardType="numeric"
              testID="loan-input-principal"
              contextMenuHidden
            />
            <HStack space={5} alignItems="center">
              <VStack flex={1}>
                <Translation tkey="INTEREST_RATE" as={Text} color={theme.color.BACKGROUND_50} />
                <Slider
                  flex={1}
                  value={interestRate}
                  minValue={0}
                  maxValue={100}
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
                contextMenuHidden
              />
            </HStack>
            <Translation tkey="SELECT_START_DATE" tdata={{ depositType: translate(`CONSTANT.LOAN_TYPE.${type}`) }} as={Text} mb={2} />
            <AppDatePicker
              value={startedAt}
              placeholder={translate('START_DATE')}
              onChange={setStartedAt}
            />
            <HStack space={5} alignItems="center">
              <VStack flex={1}>
                <Translation tkey="TENURE_MONTHS" as={Text} color={theme.color.BACKGROUND_50} />
                <Slider
                  flex={1}
                  value={tenure}
                  minValue={0}
                  maxValue={720}
                  step={1}
                  onChange={setTenure}
                  colorScheme="red"
                >
                  <Slider.Track bg={`${theme.color.PRIMARY_100}:alpha.20`}>
                    <Slider.FilledTrack bg={theme.color.PRIMARY_100} />
                  </Slider.Track>
                  <Slider.Thumb bg={theme.color.PRIMARY_100} />
                </Slider>
              </VStack>
              <InputField
                flex={0.2}
                value={String(tenure)}
                onChangeText={(text) => setTenure(parseFloat(text))}
                mt={3}
                keyboardType="numeric"
                contextMenuHidden
              />
            </HStack>
            <If condition={unformatCurrency(principal)}>
              <Translation
                tkey="PAYABLE_AMOUNT"
                as={Text}
                color={theme.color.BACKGROUND_50}
                mb={2}
              />
              <InputField
                placeholder={translate('PAYABLE_AMOUNT')}
                value={value}
                onChangeText={(text) => handleFieldChange('value', text)}
                InputLeftElement={<Text pl={3}>{APP_LITERAL.RUPEE_SYMBOL}</Text>}
                keyboardType="numeric"
                testID="loan-input-value"
                contextMenuHidden
              />
              <Translation
                tkey="YOUR_INTEREST_AMOUNT"
                tdata={{ amount: interestAmount }}
                as={Text}
                mb={2}
              />
              <InputField
                placeholder={translate('LENDER_NAME')}
                value={lenderName}
                onChangeText={setLenderName}
                testID="loan-input-lender-name"
              />
              <Translation
                tkey="SUBMIT"
                as={AppButton}
                variant="primary"
                isDisabled={!isSubmitEnabled}
                testID="deposit-submit"
              />
            </If>
          </If>
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default withBackground({ Component: AddLoan, Background: Background5 });
