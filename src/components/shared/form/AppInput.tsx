import { Colors, FontFamily, RPH, RPW, Sizes } from "@src/theme";
import { useThemeContext } from "@src/theme/themeContext";
import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  StyleProp,
  TextStyle,
  ViewStyle,
  Image,
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from "react-native";
import { AppText } from "../AppText";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

interface InputProps {
  label?: string;
  placeholder: string;
  password?: boolean;
  phoneNumber?: string;
  icon?: any;
  errors?: React.ReactNode;
  showDropDown?: boolean;
  colorInput?: boolean;
  colorValue?: string;
  showSoftInputOnFocus?: boolean;
  onBlur?: any;
  onSubmitEditing?: () => void;
  clickDropDown?: () => void;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  value?: string;
  defaultValue?: string;
  onChangeText?: (text: string) => void;
  onFocus?: () => void;
  showBoxIcon?: boolean;
  onBoxIconPress?: () => void;
  keyboardType?: KeyboardTypeOptions;
}

export const AppInput = ({
  label,
  placeholder,
  showDropDown,
  colorInput,
  colorValue,
  showSoftInputOnFocus,
  onBlur,
  onSubmitEditing,
  clickDropDown,
  password,
  phoneNumber,
  icon,
  errors,
  style,
  inputStyle,
  keyboardType,
  showBoxIcon = false,
  onBoxIconPress,
  ...props
}: InputProps) => {
  const { theme } = useThemeContext();

  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const labelStyle = {
    marginBottom: Sizes.font6,
    color: theme === "dark" ? Colors.white : Colors.black,
  };

  return (
    <View style={[styles.container, style]}>
      {label && (
        <AppText fontMedium black style={[styles.label, labelStyle]}>
          {label}
        </AppText>
      )}
      <View
        style={[
          styles.inputContainer,
          { paddingHorizontal: icon ? Sizes.font10 : 0 },
        ]}>
        <View style={styles.iconContainer}>
          {icon && <Image source={icon} />}
        </View>
        <TextInput
          style={[
            styles.input,
            inputStyle,
            {
              color: theme === "dark" ? Colors.white : Colors.black,
            },
          ]}
          placeholder={placeholder}
          secureTextEntry={password && !isPasswordVisible}
          autoCapitalize='none'
          placeholderTextColor={
            theme === "dark" ? Colors.lightGray : Colors.gray
          }
          autoCorrect={false}
          keyboardType={phoneNumber ? "phone-pad" : keyboardType}
          showSoftInputOnFocus={showSoftInputOnFocus}
          onBlur={onBlur}
          onSubmitEditing={onSubmitEditing}
          {...props}
        />
        {showDropDown && (
          <TouchableOpacity onPress={clickDropDown}>
            <MaterialIcons
              name='keyboard-arrow-down'
              size={Sizes.font22}
              color={theme === "dark" ? Colors.primaryColor2 : Colors.primary}
            />
          </TouchableOpacity>
        )}
        {colorInput && (
          <View
            style={[
              styles.colorValue,
              {
                backgroundColor:
                  theme === "dark" && !colorValue
                    ? Colors.white
                    : theme === "dark" && colorValue
                    ? colorValue
                    : theme === "light" && !colorValue
                    ? Colors.black
                    : theme === "light" && colorValue
                    ? colorValue
                    : undefined,
                borderColor:
                  theme === "dark" && !colorValue
                    ? Colors.white
                    : theme === "dark" && colorValue
                    ? colorValue
                    : theme === "light" && !colorValue
                    ? Colors.black
                    : theme === "light" && colorValue
                    ? colorValue
                    : undefined,
              },
            ]}></View>
        )}
        <View style={styles.inputEndItem}>
          {showBoxIcon && (
            <TouchableOpacity>
              <MaterialCommunityIcons
                name='line-scan'
                size={24}
                color={Colors.primary}
              />
            </TouchableOpacity>
          )}
          {showBoxIcon && (
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={onBoxIconPress}>
              <MaterialIcons name='grid-on' size={24} color={Colors.primary} />
            </TouchableOpacity>
          )}
        </View>
        {password && (
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={togglePasswordVisibility}>
            {isPasswordVisible ? (
              <Image source={require("@src/assets/icons/eye-off.png")} />
            ) : (
              <Image source={require("@src/assets/icons/eye.png")} />
            )}
          </TouchableOpacity>
        )}
      </View>
      {!!errors && (
        <View>
          <AppText red style={{ color: Colors.red }}>
            {errors}
          </AppText>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Sizes.font20,
    width: RPW(92),
    alignSelf: "center",
  },
  label: {
    marginBottom: Sizes.font6,
    color: Colors.black,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: Sizes.font6,
  },
  inputEndItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: Sizes.font6,
  },
  input: {
    flex: 1,
    paddingVertical: Sizes.font10,
    paddingHorizontal: Sizes.font6,
    fontSize: Sizes.font14,
    color: Colors.secondary,
    fontFamily: FontFamily.openSansRegular,
  },
  iconContainer: {
    padding: Sizes.font6,
  },
  colorValue: {
    borderWidth: RPW(0.3),
    padding: Sizes.font14,
  },
  phonePadButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  phonePadTextInput: {
    height: 49,
    color: "green",
  },
  textInputPhone: {
    fontFamily: FontFamily.openSansRegular,
  },
});
