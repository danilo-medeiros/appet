import { AsyncStorage } from "react-native";

const storeData = async function(key, value) {
  await AsyncStorage.setItem(key, value);
};

export default storeData;
