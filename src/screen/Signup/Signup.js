import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  Center, Flex, FormControl, Image, Text,
} from 'native-base';

import TitleBar from 'component/TitleBar/TitleBar';
import AppButton from 'component/AppButton';
import AppModal from 'component/AppModal';
import CONSTANT from 'constant';
import ROUTE from 'constant/route';
import NEWOR from 'asset/image/newor.png';
import NEWOR_SUCCESS from 'asset/image/newor-success.png';
import validator from 'helper/validator';
import useUser from 'api/useUser';
import useTheme from 'theme/useTheme';
import withBackground from 'helper/withBackground';
import { Background2 } from 'component/Background';
import useTranslation from 'translation/useTranslation';
import Translation from 'translation/Translation';
import useError from 'hook/useError';
import {
  FIELDS,
  INITIAL_STATE,
  SCHEMA,
} from './Signup.schema';
import {
  FormContainer,
  InputField,
  Title,
  LoginLink,
} from './Signup.style';

const Signup = () => {
  const [fields, setFields] = useState(INITIAL_STATE);
  const [errorMessages, setErrorMessages] = useState(INITIAL_STATE);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigation = useNavigation();
  const { toast } = useError();
  const theme = useTheme();
  const { translate } = useTranslation();
  const { signup } = useUser();

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

  const isFormError = useMemo(
    () => Object.keys(errorMessages).some(
      (field) => !fields[field] || Boolean(errorMessages[field]),
    ),
    [errorMessages],
  );

  const doSignup = useCallback(async () => {
    try {
      await signup(fields);
      setIsSubmit(false);
      setIsSuccess(true);
    } catch (error) {
      setIsSubmit(false);
      toast(error);
    }
  }, [fields]);

  useEffect(() => {
    if (isSubmit && !isFormError) {
      doSignup();
    } else {
      setIsSubmit(false);
    }
  }, [navigation, isSubmit, isFormError]);

  return (
    <KeyboardAvoidingView flex={1} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Flex flex={1} />
      <Flex flex={4} direction="row" p="5" justifyContent="center">
        <FormContainer>
          <TitleBar color={theme.color.SECONDARY_100}>
            <Translation tkey="WELCOME_TO_NEWOR" as={Title} />
          </TitleBar>
          <Center><Image alt={CONSTANT.APP_NAME} source={NEWOR} size="xl" /></Center>
          <For each="field" index="index" of={FIELDS}>
            <FormControl key={`signup-field-${index}`} isInvalid={errorMessages[field.key]}>
              <InputField
                testID={`signup-input-${field.key}`}
                placeholder={translate(field.placeholder)}
                value={fields[field.key]}
                onChangeText={(value) => handleFieldChange(field.key, value)}
                onBlur={() => handleValidation()}
                type={
                  field.key === CONSTANT.AUTH_LITERAL.PASSWORD && CONSTANT.AUTH_LITERAL.PASSWORD
                }
                isInvalid={errorMessages[field.key]}
                InputLeftElement={
                  field.key === 'mobileNumber' && <Text pl={3}>+91</Text>
                }
              />
              <FormControl.ErrorMessage>
                {errorMessages[field.key]}
              </FormControl.ErrorMessage>
            </FormControl>
          </For>
          <Translation
            tkey="SIGNUP"
            as={AppButton}
            testID="signup-submit"
            onPress={handleSubmit}
            isDisabled={isFormError}
            isLoading={isSubmit}
            variant="primary"
            mb={5}
          />
          <Flex direction="row" justifyContent="center">
            <Translation
              tkey="ALREADY_HAVE_ACCOUNT"
              as={LoginLink}
            />
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
      <AppModal testID="signup-success-modal" visible={isSuccess}>
        <AppModal.Header showClose={false}>
          <Translation tkey="SIGNUP_SUCCESS" as={LoginLink} />
        </AppModal.Header>
        <AppModal.Body>
          <Center>
            <Image alt={translate('SIGNUP_SUCCESS')} source={NEWOR_SUCCESS} size="2xl" />
            <Translation
              tkey="PLEASE_VERIFY_EMAIL"
              as={LoginLink}
            />
          </Center>
        </AppModal.Body>
        <AppModal.Footer>
          <Translation
            tkey="LOGIN"
            as={AppButton}
            variant="primary"
            flex={1}
            testID="signup-success-login"
            onPress={() => {
              setIsSuccess(false);
              navigation.navigate(ROUTE.LOGIN);
            }}
          />
        </AppModal.Footer>
      </AppModal>
    </KeyboardAvoidingView>
  );
};

export default withBackground({ Component: Signup, Background: Background2 });
