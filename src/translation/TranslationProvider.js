import React, { useEffect, useState } from 'react';
import LocalizedStrings from 'react-localization';
import PropTypes from 'prop-types';

import CONSTANT from 'constant';
import TranslationContext from './TranslationContext';
import en from './language/en.json';
import ta from './language/ta.json';

const TranslationProvider = ({ children }) => {
  const [translations] = useState({ en, ta });
  const [language, setLanguage] = useState(CONSTANT.LANGUAGE.ENGLISH);
  const [translation, setTranslation] = useState(new LocalizedStrings({ en }));

  useEffect(() => {
    setTranslation(new LocalizedStrings({
      [language]: translations[language],
    }));
  }, [language]);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <TranslationContext.Provider value={{ translation, setLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
};

TranslationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TranslationProvider;
