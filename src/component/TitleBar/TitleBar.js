import React from 'react';
import PropTypes from 'prop-types';

import { Bar, BarContainer } from './TitleBar.style';

const TitleBar = ({ children, color }) => (
  <BarContainer>
    <Bar color={color} />
    {children}
  </BarContainer>
);

TitleBar.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string.isRequired,
};

export default TitleBar;
