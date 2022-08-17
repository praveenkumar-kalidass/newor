import { useToast } from 'native-base';
import React from 'react';

import useTranslation from 'translation/useTranslation';
import ToastAlert from 'component/ToastAlert';

const useError = () => {
  const { show } = useToast();
  const { translate } = useTranslation();

  const toast = (error) => {
    let errorMessage = translate('ERROR_CODE.NEWOR_INTERNAL_SERVER_ERROR');
    const errorCode = error?.response?.data?.code;
    if (errorCode) {
      errorMessage = translate(`ERROR_CODE.${errorCode}`);
    }
    show({
      render: () => <ToastAlert status="error" message={errorMessage} />,
      placement: 'top',
    });
  };

  return { toast };
};

export default useError;
