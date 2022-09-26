import React from 'react';
import PropTypes from 'prop-types';

import CONSTANT from 'constant';
import { CardContainer, CardBackground } from './Card.style';

const Card = ({ children }) => (
  <CardContainer>
    {children}
    <CardBackground>
      {CONSTANT.APP_LITERAL.RUPEE_SYMBOL}
    </CardBackground>
  </CardContainer>
);

Card.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Card;
