import React, {
  useState, useEffect, useMemo, useCallback,
} from 'react';
import {
  Flex, Image, Center, FormControl, useToast,
} from 'native-base';
import { useNavigation } from '@react-navigation/native';

import TitleBar from '../../component/TitleBar/TitleBar';
import Background from '../../component/Background/Background';
import CONSTANT from '../../constant';
import validator from '../../helper/validator';
import TRANSLATION from '../../translation/en.json';
import NEWOR from '../../asset/newor.png';
import { login } from '../../api/user';
import useTheme from '../../theme/useTheme';
import {
  INITIAL_STATE,
  FIELDS,
  SCHEMA,
} from './Login.schema';
import {
  FormContainer,
  InputField,
  SubmitButton,
  Title,
  ToastBox,
} from './Login.style';

const Login = () => {
  const [background, setBackground] = useState({});
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

  const doLogin = useCallback(async () => {
    try {
      await login(fields);
      setIsSubmit(false);
    } catch (error) {
      setIsSubmit(false);
      let errorMessage = TRANSLATION.ERROR.NEWOR_INTERNAL_SERVER_ERROR;
      const errorCode = error?.response?.data?.code;
      if (errorCode) {
        errorMessage = TRANSLATION.ERROR[errorCode];
      }
      toast.show({
        render: () => <ToastBox>{errorMessage}</ToastBox>,
        placement: 'bottom',
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
      doLogin();
    } else {
      setIsSubmit(false);
    }
  }, [navigation, isSubmit, isFormError]);

  return (
    <Flex flex={1}>
      <Flex
        flex={1.5}
        onLayout={(event) => {
          const { width, height } = event.nativeEvent.layout;
          setBackground({ width, height });
        }}
        justifyContent="center"
        testID="login-logo-container"
      >
        <If condition={background.height && background.width}>
          <Background height={background.height} width={background.width} />
          <Center>
            <Image testID="login-logo" alt={CONSTANT.APP_NAME} size={background.width * 0.8} source={NEWOR} />
          </Center>
        </If>
      </Flex>
      <Flex flex={1}>
        <FormContainer>
          <TitleBar color={theme.color.SECONDARY_100} styleProps={{ mb: 5 }}>
            <Title>{CONSTANT.APP_NAME}</Title>
          </TitleBar>
          <For each="field" index="index" of={FIELDS}>
            <FormControl key={`login-field-${index}`} isInvalid={errorMessages[field.key]}>
              <InputField
                testID={`login-input-${field.key}`}
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
          <SubmitButton testID="login-submit" onPress={handleSubmit} isDisabled={isFormError}>
            {TRANSLATION.LOGIN}
          </SubmitButton>
        </FormContainer>
      </Flex>
    </Flex>
  );
};

export default Login;
