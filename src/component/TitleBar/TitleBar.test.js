import React from 'react';
import { Text } from 'react-native';
import { render } from '../../test/util';

import TitleBar from './TitleBar';

describe('TitleBar', () => {
  it('should match snapshot', () => {
    const container = render(
      <TitleBar color="white">
        <Text>Test</Text>
      </TitleBar>,
    );

    expect(container).toMatchSnapshot();
  });
});
