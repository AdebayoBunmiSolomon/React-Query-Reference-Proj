import AsyncStorage from "@react-native-async-storage/async-storage";

export const getAuthToken = async (): Promise<string | undefined> => {
  try {
    const authDataSerialized = await AsyncStorage.getItem("@AuthData");
    const authData = authDataSerialized ? JSON.parse(authDataSerialized): null;

    return authData?.data.token;
  } catch (error) {
    console.error("Error retrieving user token:", error);
    return undefined;
  }
};

export const getVerifyToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem("Verify_Token"); 
    return null || token;
  } catch (error) {
    return null;
  }
};

