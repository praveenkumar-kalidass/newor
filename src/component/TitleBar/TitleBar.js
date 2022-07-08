import React from 'react';
import PropTypes from 'prop-types';

import { Bar, BarContainer } from './TitleBar.style';

const TitleBar = ({ children, color, styleProps }) => (
  <BarContainer styleProps={styleProps}>
    <Bar color={color} />
    {children}
  </BarContainer>
);

TitleBar.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string.isRequired,
  styleProps: PropTypes.shape({}),
};

TitleBar.defaultProps = {
  styleProps: {},
};

export default TitleBar;
