import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  Center, Flex, FormControl, Image, useToast,
} from 'native-base';

import TitleBar from '../../component/TitleBar/TitleBar';
import CONSTANT from '../../constant';
import TRANSLATION from '../../translation/en.json';
import ROUTE from '../../constant/route';
import NEWOR from '../../asset/image/newor-transparent.png';
import validator from '../../helper/validator';
import { signup } from '../../api/user';
import useTheme from '../../theme/useTheme';
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
        render: () => <ToastBox>{TRANSLATION.SIGNUP_SUCCESS}</ToastBox>,
        placement: 'bottom',
        onCloseComplete: () => navigation.navigate(ROUTE.LOGIN),
      });
      setIsSubmit(false);
    } catch (error) {
      setIsSubmit(false);
      let errorMessage = TRANSLATION.ERROR.NEWOR_INTERNAL_SERVER_ERROR;
      const errorCode = error?.response?.data?.code;
      if (errorCode) {
        errorMessage = TRANSLATION.ERROR[errorCode];
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
            <Title>{TRANSLATION.WELCOME_TO_NEWOR}</Title>
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
          <SubmitButton testID="signup-submit" onPress={handleSubmit} isDisabled={isFormError}>
            {TRANSLATION.SIGNUP}
          </SubmitButton>
          <Flex direction="row" justifyContent="center">
            <LoginLink>
              {TRANSLATION.ALREADY_HAVE_ACCOUNT}
              &nbsp;
            </LoginLink>
            <LoginLink
              link
              onPress={() => navigation.navigate(ROUTE.LOGIN)}
            >
              {TRANSLATION.LOGIN}
            </LoginLink>
          </Flex>
        </FormContainer>
      </Flex>
      <Flex flex={1} />
    </Flex>
  );
};

export default Signup;
