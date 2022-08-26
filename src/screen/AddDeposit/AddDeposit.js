import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import {
  ScrollView, VStack, Text, Checkbox, HStack, Slider, useToast,
} from 'native-base';

import withBackground from 'helper/withBackground';
import { Background5 } from 'component/Background';
import AppDatePicker from 'component/AppDatePicker';
import AppButton from 'component/AppButton';
import ToastAlert from 'component/ToastAlert';
import CONSTANT from 'constant';
import ROUTE from 'constant/route';
import useTranslation from 'translation/useTranslation';
import Translation from 'translation/Translation';
import useTheme from 'theme/useTheme';
import { unformatCurrency, formatCurrency } from 'helper/util';
import useUser from 'provider/User/useUser';
import useAsset from 'api/useAsset';
import useError from 'hook/useError';
import { InputField, SelectField } from './AddDeposit.style';

const { DEPOSIT_TYPE, APP_LITERAL } = CONSTANT;

const AddDeposit = () => {
  const [type, setType] = useState('');
  const [startedAt, setStartedAt] = useState(new Date());
  const [maturityAt, setMaturityAt] = useState(new Date());
  const [initial, setInitial] = useState('0.00');
  const [value, setValue] = useState('0.00');
  const [interestRate, setInterestRate] = useState(2.50);
  const [isSameAsInitial, setIsSameAsInitial] = useState(false);
  const [depositoryName, setDepositoryName] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const navigation = useNavigation();
  const { translate } = useTranslation();
  const theme = useTheme();
  const headerHeight = useHeaderHeight();
  const { asset } = useUser();
  const { addDeposit } = useAsset();
  const { toast: toastError } = useError();
  const toast = useToast();

  const isScheduled = useMemo(() => [
    DEPOSIT_TYPE.FIXED_DEPOSIT,
    DEPOSIT_TYPE.RECURRING_DEPOSIT,
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

  useEffect(() => {
    if (type) {
      setStartedAt(new Date());
      setMaturityAt(new Date());
      setInitial('0.00');
      setValue('0.00');
      setInterestRate(2.50);
      setIsSameAsInitial(false);
      setDepositoryName('');
    }
  }, [type]);

  const isSubmitEnabled = useMemo(() => {
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

  const doAddDeposit = useCallback(async () => {
    try {
      setIsSubmit(true);
      const request = {
        type,
        interestRate,
        initial: unformatCurrency(initial),
        value: unformatCurrency(value),
        depositoryName,
        startedAt,
        assetId: asset.id,
      };
      if (isScheduled || DEPOSIT_TYPE.PUBLIC_PROVIDENT_FUND) {
        request.maturityAt = maturityAt;
      }
      await addDeposit(request);
      setIsSubmit(false);
      navigation.navigate(ROUTE.ASSET);
      toast.show({
        render: () => (
          <ToastAlert
            status="success"
            message={translate('ASSET_ADDED_SUCCESSFULLY', {
              asset: translate(type),
            })}
          />
        ),
        placement: 'top',
      });
    } catch (error) {
      setIsSubmit(false);
      toastError(error);
    }
  }, [
    type, interestRate, initial, value, depositoryName, startedAt, maturityAt, asset,
  ]);

  return (
    <KeyboardAvoidingView flex={1} keyboardVerticalOffset={headerHeight + 20} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView>
        <VStack p={5}>
          <Translation tkey="SELECT_DEPOSIT_TYPE" as={Text} mb={2} />
          <SelectField
            selectedValue={type}
            onValueChange={setType}
            placeholder={translate('DEPOSIT_TYPE')}
            testID="deposit-input-type"
          >
            <For each="deposit" index="index" of={Object.values(DEPOSIT_TYPE)}>
              <SelectField.Item key={`deposit-${index}`} label={translate(deposit)} value={deposit} />
            </For>
          </SelectField>
          <If condition={type}>
            <Choose>
              <When condition={isScheduled || type === DEPOSIT_TYPE.PUBLIC_PROVIDENT_FUND}>
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
              value={startedAt}
              placeholder={translate('START_DATE')}
              onChange={setStartedAt}
            />
            <If condition={isScheduled || type === DEPOSIT_TYPE.PUBLIC_PROVIDENT_FUND}>
              <AppDatePicker
                value={maturityAt}
                placeholder={translate('MATURITY_DATE')}
                onChange={setMaturityAt}
              />
            </If>
            <Translation
              tkey="ENTER_DEPOSIT_DETAILS"
              tdata={{ depositType: translate(type) }}
              as={Text}
              mb={2}
              bg={theme.color.BACKGROUND_100}
            />
            <If condition={isScheduled}>
              <Translation
                tkey={type === DEPOSIT_TYPE.FIXED_DEPOSIT ? 'INITIAL_DEPOSIT' : 'MONTHLY_DEPOSIT'}
                as={Text}
                color={theme.color.BACKGROUND_50}
                mb={2}
              />
              <InputField
                placeholder={translate(type === DEPOSIT_TYPE.FIXED_DEPOSIT ? 'INITIAL_DEPOSIT' : 'MONTHLY_DEPOSIT')}
                value={initial}
                onChangeText={(text) => handleFieldChange('initial', text)}
                InputLeftElement={<Text pl={3}>{APP_LITERAL.RUPEE_SYMBOL}</Text>}
                keyboardType="numeric"
                testID="deposit-input-initial"
                contextMenuHidden
              />
              <If condition={type === DEPOSIT_TYPE.FIXED_DEPOSIT}>
                <Checkbox
                  mr={5}
                  colorScheme="info"
                  value={isSameAsInitial}
                  onChange={() => handleFieldChange('isSameAsInitial')}
                  testID="deposit-input-same-as-initial"
                >
                  {translate('SAME_INITIAL_AMOUNT')}
                </Checkbox>
              </If>
            </If>
            <Translation
              tkey="PRESENT_AMOUNT"
              as={Text}
              color={theme.color.BACKGROUND_50}
              mt={2}
              mb={2}
            />
            <InputField
              placeholder={translate('PRESENT_AMOUNT')}
              value={value}
              onChangeText={(text) => handleFieldChange('value', text)}
              InputLeftElement={<Text pl={3}>{APP_LITERAL.RUPEE_SYMBOL}</Text>}
              keyboardType="numeric"
              isDisabled={isSameAsInitial}
              testID="deposit-input-value"
              contextMenuHidden
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
                contextMenuHidden
              />
            </HStack>
            <InputField
              placeholder={translate('DEPOSITORY_NAME')}
              value={depositoryName}
              onChangeText={setDepositoryName}
              testID="deposit-input-depository-name"
            />
            <Translation
              tkey="SUBMIT"
              as={AppButton}
              variant="primary"
              isDisabled={!isSubmitEnabled}
              testID="deposit-submit"
              onPress={doAddDeposit}
              isLoading={isSubmit}
            />
          </If>
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default withBackground({ Component: AddDeposit, Background: Background5 });
