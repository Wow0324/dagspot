/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  LogBox,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';


import { SafeAreaProvider } from 'react-native-safe-area-context';
import DismissKeyboard from './src/components/DismissKeyboard';
import RouteProvider from './src/navigations';


LogBox.ignoreAllLogs();

const App = () => {
  
  return (
      <DismissKeyboard>
        <SafeAreaProvider>
          <RouteProvider></RouteProvider>
        </SafeAreaProvider>
      </DismissKeyboard>
  );
}

export default App;
