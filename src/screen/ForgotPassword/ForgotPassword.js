import React, {
  useState, useEffect, useMemo, useCallback,
} from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import {
  Flex, FormControl, useToast,
} from 'native-base';
import { useNavigation } from '@react-navigation/native';

import TitleBar from 'component/TitleBar/TitleBar';
import ToastAlert from 'component/ToastAlert';
import AppButton from 'component/AppButton';
import withBackground from 'helper/withBackground';
import { Background2 } from 'component/Background';
import validator from 'helper/validator';
import ROUTE from 'constant/route';
import useTheme from 'theme/useTheme';
import useTranslation from 'translation/useTranslation';
import Translation from 'translation/Translation';
import {
  INITIAL_STATE,
  FIELDS,
  SCHEMA,
} from './ForgotPassword.schema';
import {
  FormContainer,
  InputField,
  Title,
  LoginLink,
} from './ForgotPassword.style';

const ForgotPassword = () => {
  const [fields, setFields] = useState(INITIAL_STATE);
  const [errorMessages, setErrorMessages] = useState(INITIAL_STATE);
  const [isSubmit, setIsSubmit] = useState(false);
  const navigation = useNavigation();
  const toast = useToast();
  const theme = useTheme();
  const { translate } = useTranslation();

  const handleFieldChange = (label, value) => {
    setFields({
      ...fields,
      [label]: value,
    });
  };

  const handleValidation = () => {
    setErrorMessages(validator(SCHEMA, fields, INITIAL_STATE));
  };

  const handleSubmit = () => {
    setErrorMessages(validator(SCHEMA, fields, INITIAL_STATE, true));
    setIsSubmit(true);
  };

  const submitForgotPassword = useCallback(async () => {
    try {
      // await signup(fields);
      setIsSubmit(false);
    } catch (error) {
      setIsSubmit(false);
      let errorMessage = translate('ERROR.NEWOR_INTERNAL_SERVER_ERROR');
      const errorCode = error?.response?.data?.code;
      if (errorCode) {
        errorMessage = translate(`ERROR.${errorCode}`);
      }
      toast.show({
        render: () => <ToastAlert status="error" message={errorMessage} />,
        placement: 'top',
      });
    }
  }, [fields]);

  const isFormError = useMemo(
    () => Object.keys(errorMessages).some(
      (field) => !fields[field] || Boolean(errorMessages[field]),
    ),
    [errorMessages],
  );

  useEffect(() => {
    if (isSubmit && !isFormError) {
      submitForgotPassword();
    } else {
      setIsSubmit(false);
    }
  }, [isSubmit, isFormError]);

  return (
    <KeyboardAvoidingView flex={1} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Flex flex={1} />
      <Flex flex={4} direction="row" p="5" justifyContent="center">
        <FormContainer>
          <TitleBar color={theme.color.SECONDARY_100} styleProps={{ mb: 5 }}>
            <Translation tkey="FORGOT_PASSWORD" as={Title} />
          </TitleBar>
          <Translation mb={5} tkey="ENTER_EMAIL_WITH_NEWOR" as={LoginLink} />
          <For each="field" index="index" of={FIELDS}>
            <FormControl key={`forgot-password-field-${index}`} isInvalid={errorMessages[field.key]}>
              <InputField
                testID={`forgot-password-input-${field.key}`}
                placeholder={translate(field.placeholder)}
                value={fields[field.key]}
                onChangeText={(value) => handleFieldChange(field.key, value)}
                onBlur={() => handleValidation()}
                isInvalid={errorMessages[field.key]}
              />
              <FormControl.ErrorMessage>
                {errorMessages[field.key]}
              </FormControl.ErrorMessage>
            </FormControl>
          </For>
          <Translation
            tkey="SUBMIT"
            as={AppButton}
            variant="primary"
            mb={5}
            testID="forgot-password-submit"
            onPress={handleSubmit}
            isDisabled={isFormError}
            isLoading={isSubmit}
          />
          <Flex direction="row" justifyContent="center">
            <Translation tkey="REMEMBER_CREDENTIALS" as={LoginLink} />
            &nbsp;
            <Translation
              tkey="LOGIN"
              as={LoginLink}
              link
              onPress={() => navigation.navigate(ROUTE.LOGIN)}
            />
          </Flex>
        </FormContainer>
      </Flex>
      <Flex flex={1} />
    </KeyboardAvoidingView>
  );
};

export default withBackground({ Component: ForgotPassword, Background: Background2 });
