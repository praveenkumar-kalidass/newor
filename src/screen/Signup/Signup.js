import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  Center, Flex, FormControl, Image, useToast, AlertDialog,
} from 'native-base';

import TitleBar from 'component/TitleBar/TitleBar';
import ToastAlert from 'component/ToastAlert';
import AppButton from 'component/AppButton';
import CONSTANT from 'constant';
import ROUTE from 'constant/route';
import NEWOR from 'asset/image/newor.png';
import NEWOR_SUCCESS from 'asset/image/newor-success.png';
import validator from 'helper/validator';
import { signup } from 'api/user';
import useTheme from 'theme/useTheme';
import withBackground from 'helper/withBackground';
import { Background2 } from 'component/Background';
import useTranslation from 'translation/useTranslation';
import Translation from 'translation/Translation';
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

  useEffect(() => {
    if (isSubmit && !isFormError) {
      doSignup();
    } else {
      setIsSubmit(false);
    }
  }, [navigation, isSubmit, isFormError]);

  return (
    <Flex flex={1}>
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
      <AlertDialog testID="signup-success-modal" avoidKeyboard size="xl" isOpen={isSuccess} onClose={() => setIsSuccess(false)}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <Translation tkey="SIGNUP_SUCCESS" as={AlertDialog.Header} />
          <AlertDialog.Body>
            <Center>
              <Image alt={translate('SIGNUP_SUCCESS')} source={NEWOR_SUCCESS} size="2xl" />
              <Translation
                tkey="PLEASE_VERIFY_EMAIL"
                as={LoginLink}
              />
            </Center>
          </AlertDialog.Body>
          <AlertDialog.Footer>
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
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Flex>
  );
};

export default withBackground({ Component: Signup, Background: Background2 });
