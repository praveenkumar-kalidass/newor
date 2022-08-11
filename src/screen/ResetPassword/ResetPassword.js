import React, {
  useState, useMemo, useCallback, useEffect,
} from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  Flex, FormControl, Text, useToast, Center, Image,
} from 'native-base';

import useTheme from 'theme/useTheme';
import TitleBar from 'component/TitleBar/TitleBar';
import ToastAlert from 'component/ToastAlert';
import AppButton from 'component/AppButton';
import AppModal from 'component/AppModal';
import CONSTANT from 'constant';
import ROUTE from 'constant/route';
import NEWOR_SUCCESS from 'asset/image/newor-success.png';
import Translation from 'translation/Translation';
import withBackground from 'helper/withBackground';
import { Background1 } from 'component/Background';
import useTranslation from 'translation/useTranslation';
import validator from 'helper/validator';
import useUser from 'api/useUser';
import {
  FIELDS,
  INITIAL_STATE,
  SCHEMA,
} from './ResetPassword.schema';
import { Container, Title, InputField } from './ResetPassword.style';

const ResetPassword = () => {
  const [fields, setFields] = useState(INITIAL_STATE);
  const [errorMessages, setErrorMessages] = useState(INITIAL_STATE);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigation = useNavigation();
  const { params } = useRoute();
  const toast = useToast();
  const { color } = useTheme();
  const { translate } = useTranslation();
  const { resetPassword } = useUser();

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

  const doResetPassword = useCallback(async () => {
    try {
      await resetPassword({
        token: params?.token,
        password: fields.password,
      });
      setIsSubmit(false);
      setIsSuccess(true);
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
  }, [fields, params]);

  useEffect(() => {
    if (isSubmit && !isFormError) {
      doResetPassword();
    } else {
      setIsSubmit(false);
    }
  }, [isSubmit, isFormError]);

  return (
    <KeyboardAvoidingView flex={1} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Flex flex={1} direction="row" p="5" justify="center">
        <Container>
          <TitleBar color={color.SECONDARY_100} styleProps={{ mb: 5 }}>
            <Translation tkey="RESET_PASSWORD" as={Title} />
          </TitleBar>
          <For each="field" index="index" of={FIELDS}>
            <FormControl key={`reset-password-field-${index}`} isInvalid={errorMessages[field.key]}>
              <InputField
                testID={`reset-password-input-${field.key}`}
                placeholder={translate(field.placeholder)}
                value={fields[field.key]}
                onChangeText={(value) => handleFieldChange(field.key, value)}
                onBlur={handleValidation}
                type={CONSTANT.AUTH_LITERAL.PASSWORD}
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
            testID="reset-password-submit"
            onPress={handleSubmit}
            isDisabled={isFormError}
            isLoading={isSubmit}
            variant="primary"
          />
        </Container>
      </Flex>
      <AppModal testID="reset-password-success-modal" visible={isSuccess}>
        <AppModal.Header showClose={false}>
          <Translation tkey="SUCCESS" as={Text} bold fontSize={20} />
        </AppModal.Header>
        <AppModal.Body>
          <Center>
            <Image alt={translate('RESET_PASSWORD_SUCCESS')} source={NEWOR_SUCCESS} size="2xl" />
            <Translation
              tkey="RESET_PASSWORD_SUCCESS"
              as={Text}
              fontSize="md"
            />
          </Center>
        </AppModal.Body>
        <AppModal.Footer>
          <Translation
            tkey="LOGIN"
            as={AppButton}
            variant="primary"
            flex={1}
            testID="reset-password-success-login"
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

export default withBackground({ Component: ResetPassword, Background: Background1 });
