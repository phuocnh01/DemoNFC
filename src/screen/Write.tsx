import React, { useState } from "react";
import { View, Button } from "react-native";
import { Text, TextInput } from "react-native-paper";
import NfcManager, { Ndef, NfcTech } from "react-native-nfc-manager";

export default function Write() {
    const [isWriting, setIsWriting] = useState(false)
    const [url, setUrl] = useState('')

    async function WriteToNfc() {
        try {
            setIsWriting(true)
            await NfcManager.requestTechnology([NfcTech.Ndef]);
            const bytes = Ndef.encodeMessage([Ndef.uriRecord(url)]);

            if (bytes) {
                await NfcManager.ndefHandler
                    .writeNdefMessage(bytes);
            }
        } catch (error) {

        } finally {
            NfcManager.cancelTechnologyRequest()
            setIsWriting(false)
        }

    }

    return <View>
        <Text>Write URL to NFC</Text>
        <TextInput placeholder="Enter your URL" onChangeText={(text) => { setUrl(text) }} editable={!isWriting} />
        <Button title={isWriting ? 'Writing.....' : 'Write'} disabled={isWriting} onPress={() => { WriteToNfc() }} />
    </View>
}
