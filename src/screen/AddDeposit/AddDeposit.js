import React, { useState } from 'react';
import {
  ScrollView, VStack,
} from 'native-base';

import withBackground from 'helper/withBackground';
import { Background5 } from 'component/Background';

const AddDeposit = () => {
  useState({});

  return (
    <ScrollView>
      <VStack p={5} />
    </ScrollView>
  );
};

export default withBackground({ Component: AddDeposit, Background: Background5 });
