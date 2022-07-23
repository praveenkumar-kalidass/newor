import React from 'react';
import { View } from 'react-native';

import { Background1 } from 'component/Background';
import withBackground from './withBackground';

describe('withBackground', () => {
  const mockComponent = () => <View />;

  it('should wrap with specific pattern, when pattern is specified', () => {
    const container = withBackground({
      Component: mockComponent,
      Background: Background1,
    });

    expect(container).toMatchSnapshot();
  });
});
