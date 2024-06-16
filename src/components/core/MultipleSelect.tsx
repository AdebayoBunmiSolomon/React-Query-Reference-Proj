import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Colors, Sizes } from "@src/theme";
import { AppText } from "../shared/AppText";

interface MultiInputSelectProps {
  tags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (index: number) => void;
}

export const MultiInputSelect: React.FC<MultiInputSelectProps> = ({
  tags,
  onAddTag,
  onRemoveTag,
}) => {
  const [tagInput, setTagInput] = useState<string>("");

  const addTag = () => {
    if (tagInput.trim() !== "") {
      onAddTag(tagInput.trim());
      setTagInput("");
    }
  };

  return (
    <View style={styles.container}>
      <AppText>Values</AppText>

      <View style={styles.inputContainer}>
        {tags.map((tag, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => onRemoveTag(index)}
            style={styles.tag}
          >
            <Text style={styles.tagText}>{tag}</Text>
            <FontAwesome
              name="times"
              size={14}
              color={Colors.background}
              style={styles.closeIcon}
            />
          </TouchableOpacity>
        ))}
        <TextInput
          style={styles.input}
          placeholder="Type and press enter to add value"
          value={tagInput}
          onChangeText={(text) => setTagInput(text)}
          onSubmitEditing={addTag}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  inputContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: Sizes.font10,
    paddingVertical: Sizes.font6 - 5,
    paddingHorizontal: Sizes.font10,
    marginTop: Sizes.font4,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.primary,
    borderRadius: Sizes.font10,
    paddingVertical: Sizes.font6,
    paddingHorizontal: Sizes.font10,
    marginRight: Sizes.font10,
    marginBottom: Sizes.font10,
  },
  tagText: {
    color: Colors.white,
    marginRight: Sizes.font6,
  },
  closeIcon: {
    marginLeft: Sizes.font6,
  },
  input: {
    flex: 1,
    fontSize: Sizes.font12,
    paddingVertical: Sizes.font10,
    paddingHorizontal: Sizes.font6,
  },
});
