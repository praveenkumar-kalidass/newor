import React from 'react';
import PropTypes from 'prop-types';

import useTranslation from './useTranslation';

const Translation = (props) => {
  const { tkey, as: Component, ...other } = props;
  const { translate } = useTranslation();

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Component {...other}>
      {translate(tkey)}
    </Component>
  );
};

Translation.propTypes = {
  tkey: PropTypes.string.isRequired,
  as: PropTypes.elementType.isRequired,
};

export default Translation;
