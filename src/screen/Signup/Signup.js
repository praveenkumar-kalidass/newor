import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  Center, Flex, FormControl, Image, useToast,
} from 'native-base';

import TitleBar from 'component/TitleBar/TitleBar';
import CONSTANT from 'constant';
import ROUTE from 'constant/route';
import NEWOR from 'asset/image/newor-transparent.png';
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
  SubmitButton,
  Title,
  ToastBox,
  LoginLink,
} from './Signup.style';

const Signup = () => {
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

  const isFormError = useMemo(
    () => Object.keys(errorMessages).some(
      (field) => !fields[field] || Boolean(errorMessages[field]),
    ),
    [errorMessages],
  );

  const doSignup = useCallback(async () => {
    try {
      await signup(fields);
      toast.show({
        render: () => <Translation tkey="SIGNUP_SUCCESS" as={ToastBox} />,
        placement: 'bottom',
        onCloseComplete: () => navigation.navigate(ROUTE.LOGIN),
      });
      setIsSubmit(false);
    } catch (error) {
      setIsSubmit(false);
      let errorMessage = translate('ERROR.NEWOR_INTERNAL_SERVER_ERROR');
      const errorCode = error?.response?.data?.code;
      if (errorCode) {
        errorMessage = translate(`ERROR.${errorCode}`);
      }
      toast.show({
        render: () => <ToastBox isError>{errorMessage}</ToastBox>,
        placement: 'bottom',
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
                placeholder={field.placeholder}
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
            as={SubmitButton}
            testID="signup-submit"
            onPress={handleSubmit}
            isDisabled={isFormError}
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
    </Flex>
  );
};

export default withBackground({ Component: Signup, Background: Background2 });
