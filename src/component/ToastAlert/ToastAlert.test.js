import React from 'react';

import { render } from 'test/util';
import ToastAlert from './ToastAlert';

describe('AppButton', () => {
  it('should render success alert', () => {
    expect(render(<ToastAlert status="success" message="Test" />)).toMatchSnapshot();
  });

  it('should render error alert', () => {
    expect(render(<ToastAlert status="error" message="Test" />)).toMatchSnapshot();
  });
});
