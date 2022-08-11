import React, {
  useState, useEffect, useMemo, useCallback,
} from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import {
  Flex, FormControl, useToast, Center, Image, Divider,
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import TitleBar from 'component/TitleBar/TitleBar';
import ToastAlert from 'component/ToastAlert';
import AppButton from 'component/AppButton';
import withBackground from 'helper/withBackground';
import { Background1 } from 'component/Background';
import NEWOR from 'asset/image/newor.png';
import CONSTANT from 'constant';
import validator from 'helper/validator';
import ROUTE from 'constant/route';
import useUserApi from 'api/useUser';
import useUser from 'provider/User/useUser';
import useTheme from 'theme/useTheme';
import useTranslation from 'translation/useTranslation';
import Translation from 'translation/Translation';
import usePreventBack from 'hook/usePreventBack';
import {
  INITIAL_STATE,
  FIELDS,
  SCHEMA,
} from './Login.schema';
import {
  FormContainer,
  InputField,
  Title,
  SignupLink,
} from './Login.style';

const Login = () => {
  const [fields, setFields] = useState(INITIAL_STATE);
  const [errorMessages, setErrorMessages] = useState(INITIAL_STATE);
  const [isSubmit, setIsSubmit] = useState(false);
  const navigation = useNavigation();
  const toast = useToast();
  const theme = useTheme();
  const { translate } = useTranslation();
  const { login } = useUserApi();
  const { setUser, isAuthorized } = useUser();
  usePreventBack();

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
      const { data } = await login(fields);
      setIsSubmit(false);
      setUser(data.user);
      await AsyncStorage.setItem(CONSTANT.STORAGE_KEY.TOKEN, JSON.stringify({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      }));
      navigation.navigate(ROUTE.DASHBOARD_TAB);
    } catch (error) {
      setIsSubmit(false);
      let errorMessage = translate('ERROR_CODE.NEWOR_INTERNAL_SERVER_ERROR');
      const errorCode = error?.response?.data?.code;
      if (errorCode) {
        errorMessage = translate(`ERROR_CODE.${errorCode}`);
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
      doLogin();
    } else {
      setIsSubmit(false);
    }
  }, [navigation, isSubmit, isFormError]);

  return isAuthorized === false && (
    <KeyboardAvoidingView flex={1} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Flex flex={1} />
      <Flex flex={4} direction="row" p="5" justifyContent="center">
        <FormContainer>
          <TitleBar color={theme.color.SECONDARY_100} styleProps={{ mb: 5 }}>
            <Title>{CONSTANT.APP_NAME}</Title>
          </TitleBar>
          <Center><Image alt={CONSTANT.APP_NAME} source={NEWOR} size="xl" /></Center>
          <For each="field" index="index" of={FIELDS}>
            <FormControl key={`login-field-${index}`} isInvalid={errorMessages[field.key]}>
              <InputField
                testID={`login-input-${field.key}`}
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
            tkey="LOGIN"
            as={AppButton}
            variant="primary"
            mb={5}
            testID="login-submit"
            onPress={handleSubmit}
            isDisabled={isFormError}
            isLoading={isSubmit}
          />
          <Flex direction="row">
            <Translation
              tkey="FORGOT_PASSWORD"
              as={SignupLink}
              link
              onPress={() => navigation.navigate(ROUTE.FORGOT_PASSWORD)}
            />
          </Flex>
          <Divider mt={5} mb={4} />
          <Flex direction="row" justifyContent="center">
            <Translation tkey="NEW_TO_NEWOR" as={SignupLink} />
            &nbsp;
            <Translation
              tkey="SIGNUP"
              as={SignupLink}
              link
              onPress={() => navigation.navigate(ROUTE.SIGNUP)}
            />
          </Flex>
        </FormContainer>
      </Flex>
      <Flex flex={1} />
    </KeyboardAvoidingView>
  );
};

export default withBackground({ Component: Login, Background: Background1 });
