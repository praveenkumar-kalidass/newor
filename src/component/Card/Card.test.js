import React from 'react';
import { Text } from 'native-base';

import { render } from 'test/util';
import Card from './Card';

describe('Card', () => {
  it('should match snapshot', () => {
    expect(render(<Card><Text>Test</Text></Card>)).toMatchSnapshot();
  });
});
