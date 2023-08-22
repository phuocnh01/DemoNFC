/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
} from 'react-native';
import NfcManager, { TagEvent } from 'react-native-nfc-manager';
import { PaperProvider } from 'react-native-paper';
import MainNavigator from './src/navigation/navigation';
import useBackgroundTag from './src/hooks/useBackgroundTag';

// Init nfc
NfcManager.start();

function App(): JSX.Element {
  const { bgTagData, isBgTag } = useBackgroundTag();
    useEffect(() => {
        if (isBgTag){

        }
    }, [])

  return (
    <PaperProvider>
      <MainNavigator />
    </PaperProvider>
  );
}

export default App;
