import React, { useState, useEffect } from "react";
import store from "../store";
import NfcManager, { Ndef, NfcTech, TagEvent } from "react-native-nfc-manager";

export default function useBackgroundTag() {
    const [isBgTag, setIsBgTag] = useState(false)
    const [bgTagData, setBgTagData] = useState<any>()

    async function initNfc() {
        try {
            const bgTag: TagEvent | null = await NfcManager.getBackgroundTag()
            if (bgTag) {
                setBgTagData(bgTag)
                setIsBgTag(true)
                store.storeData('nfcData', bgTag)
            }
        } catch (error) { }
        finally {
            NfcManager.cancelTechnologyRequest();
        }
    }

    useEffect(() => {
        initNfc()
    }, [])

    return { bgTagData, isBgTag }
}