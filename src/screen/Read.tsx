import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";
import useNfcData from "../hooks/useData";
import useBackgroundTag from "../hooks/useBackgroundTag";
import { useNavigation } from "@react-navigation/native";

export default function Read({navigation}: any) {
    const { data, isReading, readDatafromNfc } = useNfcData()

    return <View>
        <Text>Read detail data in NFC</Text>
        <Button title={isReading ? 'READING .....' : 'READ'} onPress={() => { readDatafromNfc() }} disabled={isReading} />
        {data && <View>
            <Text>Detail</Text>
            <Text>{JSON.stringify(data)}</Text>
        </View>}
    </View>
}
