import 'react-native-gesture-handler';
import 'text-encoding-polyfill';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';

import ThemeProvider from 'theme';
import TranslationProvider from 'translation';
import Navigation from 'navigation';

const App = () => (
  <SafeAreaView style={{ flex: 1 }}>
    <NavigationContainer>
      <NativeBaseProvider>
        <ThemeProvider>
          <TranslationProvider>
            <Navigation />
          </TranslationProvider>
        </ThemeProvider>
      </NativeBaseProvider>
    </NavigationContainer>
  </SafeAreaView>
);

export default App;