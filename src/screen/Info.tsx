import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import useNfcData from "../hooks/useData";


export default function Info({navigation}: any) {
    const { data } = useNfcData()

    return <View>
        <Text>Read detail data in NFC</Text>
        {data && <View>
            <Text>Detail</Text>
            <Text>{JSON.stringify(data)}</Text>
        </View>}
    </View>
}
