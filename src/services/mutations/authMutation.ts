import { useNavigation } from "@react-navigation/native";
import { endpoints } from "@src/constant/endpoints";
import { useAuthStore } from "@src/state/commonState";
import { CreateAccountData, LoginDTO, VerifyDTO } from "@src/types/api";
import { useMutation } from "@tanstack/react-query";
import { Alert } from "react-native";
import { postResource } from "..";

export const createUser = (payload: CreateAccountData) => {
  return postResource({ pathUrl: endpoints.register, payload });
};

export const verifyEmail = (payload: VerifyDTO) => {
  return postResource({ pathUrl: endpoints.verifyEmail, payload });
};

export const login = (payload: LoginDTO) => {
  return postResource({ pathUrl: endpoints.login, payload });
};

export const useCreateUser = () => {
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
  const setToken = useAuthStore((state) => state.setToken);
  const navigation = useNavigation() as any;

  return useMutation({
    mutationFn: (payload: CreateAccountData) => createUser(payload),
    onSuccess: (data) => {
      setIsAuthenticated(false);
      setToken(data.token);
      navigation.navigate("VerifyEmail");
      Alert.alert("Success", "Account created successfully");
    },
    onError: (error: any) => {
      Alert.alert("Error", error.response.data.message);
    },
  });
};

export const useVerifyEmail = () => {
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);

  return useMutation({
    mutationFn: (payload: VerifyDTO) => verifyEmail(payload),
    onSuccess: (data) => {
      setIsAuthenticated(true);
      Alert.alert("Success", data.message);
    },
    onError: (error: any) => {
      Alert.alert("Error", error.response.data.message);
    },
  });
};

export const useLogin = () => {
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
  const setToken = useAuthStore((state) => state.setToken);
  const navigation = useNavigation() as any;

  return useMutation({
    mutationFn: (payload: LoginDTO) => login(payload),
    onSuccess: (data) => {
      setIsAuthenticated(true);
      setToken(data.data.token);
      Alert.alert("Success", data.message);
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "An error occurred";
      console.log("Error", errorMessage);
      Alert.alert("Error", error);
    },
  });
};
