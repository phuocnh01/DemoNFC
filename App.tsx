/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import NfcManager, { Ndef, NfcTech, TagEvent } from 'react-native-nfc-manager';
import { PaperProvider } from 'react-native-paper';
import MainNavigator from './src/navigation/navigation';

// Init nfc
NfcManager.start();

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [isEnable, setIsEnable] = useState(false);
  const [message, setMessage] = useState<any>();
  const [isReading, setIsReading] = useState(false);

  async function readTag() {
    try {
      setIsReading(true)
      await NfcManager.requestTechnology([NfcTech.Ndef]);
      NfcManager.getTag().then((data: any) => {
        setIsReading(false)
        console.log(data)
        const msg = Ndef.text.decodePayload(new Uint8Array(data.ndefMessage[1].payload))
        setMessage(msg)
      });
    } catch (e) {
      setIsReading(false)
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
  }

  async function initNfc() {
    try {
      const supported = await NfcManager.isSupported();
      if (supported) {
        await NfcManager.start();
      }

      const getEnable = await NfcManager.isEnabled()
      setIsEnable(getEnable)

      const bgTag: TagEvent | null = await NfcManager.getBackgroundTag()
      if (bgTag) {
        const msg = Ndef.text.decodePayload(new Uint8Array(bgTag.ndefMessage[1].payload))
        setMessage(msg)
      }
    } catch (error) {

    }
  }

  useEffect(() => {
    initNfc()
  }, [])

  return (
    <PaperProvider>
      {/* <SafeAreaView>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        />
        <View style={{ display: 'flex' }}>
          <View
            style={{
              width: 'auto',
              height: '100%',
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            {isEnable
              ? <>
                <Text style={{ alignItems: 'center', alignSelf: 'center', color: 'black' }}>Demo Reading NFC message</Text>
                <View style={{ backgroundColor: '#aaa' }}>
                  {message && <Text>{message}</Text>}
                </View>

                <Button title={isReading ? 'Waiting for NFC ...' : 'Read from NFC'} disabled={isReading} onPress={() => { readTag() }} />
              </>
              : <Text>NFC is not enabled</Text>}
          </View>
        </View>
      </SafeAreaView> */}
      <MainNavigator />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
