import React from 'react';
import PropTypes from 'prop-types';

import useTranslation from './useTranslation';

const Translation = (props) => {
  const {
    tkey,
    tdata,
    as: Component,
    ...other
  } = props;
  const { translate } = useTranslation();

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Component {...other}>
      {translate(tkey, tdata)}
    </Component>
  );
};

Translation.propTypes = {
  tkey: PropTypes.string.isRequired,
  tdata: PropTypes.shape({}),
  as: PropTypes.elementType.isRequired,
};

Translation.defaultProps = {
  tdata: {},
};

export default Translation;
