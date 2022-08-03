import { Text } from 'native-base';
import React from 'react';

import { render } from 'test/util';
import AppModal from './index';

describe('AppModal', () => {
  it('should match snapshot', () => {
    const container = render(
      <AppModal visible>
        <AppModal.Header showClose>
          <Text>Header</Text>
        </AppModal.Header>
        <AppModal.Body>
          <Text>Body</Text>
        </AppModal.Body>
        <AppModal.Footer>
          <Text>Footer</Text>
        </AppModal.Footer>
      </AppModal>,
    );

    expect(container).toMatchSnapshot();
  });
});
