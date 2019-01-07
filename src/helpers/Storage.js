import { AsyncStorage } from "react-native";

const storeData = async function(key, value) {
  await AsyncStorage.setItem(key, value);
  return value;
};

const getData = async function(key) {
  return await AsyncStorage.getItem(key);
}

const removeData = async function(key) {
  await AsyncStorage.removeItem(key);
}

export { storeData, getData, removeData };
