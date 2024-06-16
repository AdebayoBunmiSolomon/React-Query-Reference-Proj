import React, { useState } from "react";
import { AppText } from "../shared/AppText";
import { dialPadProps } from "@src/types/types";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { Colors, RPH, RPW, Sizes } from "@src/theme";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useThemeContext } from "@src/theme/themeContext";
import { NavigationProp, useNavigation } from "@react-navigation/native";

const dialPad = [1, 2, 3, 4, 5, 6, 7, 8, 9, "finger-print", 0, "del"];
const pinLength = 5;

export const DialPad: React.FC<dialPadProps> = ({ onPress, padType }) => {
  const { theme } = useThemeContext();
  const [pinCode, setPinCode] = useState<any>([]);
  const navigation: NavigationProp<any> = useNavigation();
  return (
    <View>
      <View style={styles.pinCode}>
        {[...Array(pinLength).keys()].map((index) => {
          const isSelected = !!pinCode[index];
          return (
            <View
              key={index}
              style={[
                styles.selectedPinCode,
                {
                  backgroundColor:
                    theme === "light" && isSelected
                      ? Colors.primary
                      : theme === "light" && !isSelected
                      ? Colors.selectedPinCodeLight
                      : theme === "dark" && !isSelected
                      ? Colors.selectedPinCodeDark
                      : theme === "dark" && isSelected
                      ? Colors.primaryColor2
                      : "",
                },
              ]}
            />
          );
        })}
      </View>
      <FlatList
        data={dialPad}
        scrollEnabled={false}
        numColumns={3}
        keyExtractor={(_, index) => index.toString()}
        columnWrapperStyle={{
          gap: Sizes.font45,
        }}
        contentContainerStyle={[
          styles.container,
          {
            gap: Sizes.font10,
          },
        ]}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              if (item === "del") {
                setPinCode((prevCode: any) =>
                  prevCode.slice(0, prevCode.length - 1)
                );
              } else if (typeof item === "number") {
                if (
                  pinCode &&
                  pinCode.length === 5 /*it checks through if the array is gr*/
                ) {
                  onPress(String(pinCode && pinCode.join("")));
                  navigation.navigate("Register");
                } else {
                  setPinCode((prevCode: any) => [...prevCode, item]);
                }
              } else if (
                item === "finger-print" &&
                padType === "confirm-passcode"
              ) {
                //perform asterisk function
                console.log("Perform asterisk function");
              } else if (
                item === "finger-print" &&
                padType === "login-passcode"
              ) {
                //perform fingerprint operation
                console.log("Perform fingerprint function");
              }
            }}
            // disabled={item === "finger-print"}
            style={styles.codeBtn}>
            {item === "del" ? (
              <Ionicons
                name='backspace-outline'
                size={Sizes.font34}
                color={theme === "dark" ? Colors.white : Colors.black}
              />
            ) : item === "finger-print" && padType === "login-passcode" ? (
              <Ionicons
                name='finger-print'
                size={Sizes.font34}
                color={theme === "dark" ? Colors.primaryColor2 : Colors.primary}
              />
            ) : item === "finger-print" && padType === "confirm-passcode" ? (
              <MaterialCommunityIcons
                name='asterisk'
                size={Sizes.font34}
                color={theme === "dark" ? Colors.primaryColor2 : Colors.primary}
              />
            ) : (
              <AppText fontBold big black>
                {item}
              </AppText>
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: RPH(-4),
  },
  codeBtn: {
    width: RPW(20),
    height: RPH(10),
    alignItems: "center",
    justifyContent: "center",
  },
  pinCode: {
    flexDirection: "row",
    gap: RPW(10),
    marginBottom: Sizes.font30,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedPinCode: {
    borderRadius: 100,
    paddingVertical: Sizes.font6,
    paddingHorizontal: Sizes.font6,
  },
});
