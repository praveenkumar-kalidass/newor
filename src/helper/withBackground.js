/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

const withBackground = ({
  Component,
  Background,
}) => (props) => (
  <>
    <Background />
    <Component {...props} />
  </>
);

export default withBackground;
