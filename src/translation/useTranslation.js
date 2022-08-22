import { useContext } from 'react';

import TranslationContext from './TranslationContext';

const useTranslation = () => {
  const { translation, setLanguage } = useContext(TranslationContext);

  const changeTranslation = (language) => {
    setLanguage(language);
  };

  const translate = (key, data) => {
    const result = key.split('.').reduce((final, value) => {
      if (final[value]) {
        return final[value];
      }
      return '';
    }, translation);

    return translation.formatString(result, data) || key;
  };

  return {
    translation,
    translate,
    changeTranslation,
  };
};

export default useTranslation;
