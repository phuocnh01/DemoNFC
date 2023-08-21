import AsyncStorage from "@react-native-async-storage/async-storage";

const storeData = async (value: any) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem('my-key', jsonValue);
    } catch (e) {
        // saving error
    }
};

const getData = async (key: string) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value
    }
};

const getAllkey = async () => {
    try {
        return AsyncStorage.getAllKeys();
    } catch (e) {

    }
}

export default {storeData, getData, getAllkey}
