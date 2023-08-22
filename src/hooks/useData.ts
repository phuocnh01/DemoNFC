import React, {useState, useEffect} from "react";
import store from "../store";
import NfcManager, { Ndef, NfcTech } from "react-native-nfc-manager";

export default function useNfcData() {
    const [data, setData] = useState<any>()
    const [isReading, setIsReading] = useState(false)
    
    async function readDatafromNfc () {
        try {
            setIsReading(true)
            await NfcManager.requestTechnology([NfcTech.Ndef]);
            NfcManager.getTag().then((result) => {
                setIsReading(false)
                store.storeData('nfcData', result);
                setData(result);
                console.log(result)
            })
        } catch (error) {

        } finally {
            NfcManager.cancelTechnologyRequest();
        }
    }

    async function getDataFromLocalStorage () {
        try {
            const result = await store.getData('nfcData')
            setData(result)
        } catch (error) { }
    }

    useEffect(()=> {
        getDataFromLocalStorage()
    }, [])

    return {data, isReading, readDatafromNfc}
}