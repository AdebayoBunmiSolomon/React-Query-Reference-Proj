import { Colors, RPW, Sizes, moderateScale } from "@src/theme";
import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from "react-native";
import countryData from "../../countries.json";
import { AppText } from "../shared/AppText";
import { useThemeContext } from "@src/theme/themeContext";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";

interface Country {
  name: string;
  dial_code: string;
  flag: string;
}

interface PhoneNumberInputProps {
  onPhoneNumberChange: (phoneNumber: string, countryCode: string) => void;
  errors: string | undefined;
}

export const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  onPhoneNumberChange,
  errors,
}) => {
  const [countryCode, setCountryCode] = useState("+234");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [countries, setCountries] = useState<Country[]>([]);
  const { theme } = useThemeContext();

  useEffect(() => {
    // Fetch country data from JSON file
    setCountries(countryData);
  }, []);

  const handlePhoneNumberChange = (number: string) => {
    setPhoneNumber(number);
    onPhoneNumberChange(number, countryCode);
  };

  const selectCountryCode = (code: string) => {
    setCountryCode(code);
    onPhoneNumberChange(phoneNumber, code);
    setShowCountryPicker(false);
  };

  const filteredCountryData = countries.filter((country) =>
    country.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={styles.textInputContainer}>
        <TouchableOpacity
          onPress={() => setShowCountryPicker(true)}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <View style={styles.countryCodeContainer}>
            <Text>
              {
                countries.find((country) => country.dial_code === countryCode)
                  ?.flag
              }
            </Text>
            <Text
              style={{
                color: theme === "dark" ? Colors.white : Colors.black,
              }}>
              {countryCode}
            </Text>
          </View>
          <MaterialIcons
            name='keyboard-arrow-down'
            color={theme === "dark" ? Colors.white : Colors.black}
            size={Sizes.font22}
          />
        </TouchableOpacity>
        <TextInput
          style={styles.phoneNumberInput}
          onChangeText={handlePhoneNumberChange}
          value={phoneNumber}
          keyboardType='phone-pad'
          maxLength={13}
          placeholder='Phone number'
        />
      </View>
      {!!errors && (
        <View>
          <AppText red style={{ color: Colors.red }}>
            {errors}
          </AppText>
        </View>
      )}

      <Modal visible={showCountryPicker} animationType='slide'>
        <View
          style={[
            styles.modalContainer,
            {
              backgroundColor: theme === "dark" ? Colors.bgDark : Colors.white,
            },
          ]}>
          <View style={styles.itemContainer}>
            <TextInput
              placeholder='Search country...'
              style={[
                styles.itemSearchInput,
                {
                  borderColor: theme === "dark" ? Colors.white : Colors.black,
                },
              ]}
              onChangeText={setSearchText}
              value={searchText}
            />
            <TouchableOpacity onPress={() => setShowCountryPicker(false)}>
              <FontAwesome5
                name='times'
                size={Sizes.font18}
                color={theme === "dark" ? Colors.white : Colors.black}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            data={filteredCountryData}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  onPhoneNumberChange(phoneNumber, item.dial_code);
                  selectCountryCode(item.dial_code);
                }}>
                <View style={[styles.itemSelectionContainer, {}]}>
                  <Text
                    style={{
                      color: theme === "dark" ? Colors.white : Colors.black,
                    }}>{`${item.flag} ${item.name} (${item.dial_code})`}</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => item.dial_code + index.toString()}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  textInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: Colors.gray,
    borderWidth: RPW(0.3),
    borderRadius: Sizes.font6,
    paddingVertical: Sizes.font6,
    paddingLeft: Sizes.font10,
    width: RPW(92),
    marginBottom: Sizes.font10,
  },
  countryCodeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Sizes.font6,
  },
  phoneNumberInput: {
    borderColor: "black",
    padding: Sizes.font6,
    width: "75%",
  },
  modalContainer: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: Sizes.font10,
    marginTop: moderateScale(50),
    gap: Sizes.font18,
  },
  itemSearchInput: {
    flex: 1,
    borderWidth: RPW(0.3),
    borderRadius: Sizes.font6,
    padding: Sizes.font4,
  },
  itemSelectionContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: Sizes.font10,
  },
});
