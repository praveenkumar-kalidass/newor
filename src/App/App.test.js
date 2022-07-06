import React from 'react';
import { render } from '@testing-library/react-native';

import App from './App';

describe('App', () => {
  it('should be defined', () => {
    const container = render(<App />);

    expect(container).toBeDefined();
  });
});
