import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { AppText } from "../shared/AppText";
import { Colors, Sizes, verticalScale } from "@src/theme";
import { useThemeContext } from "@src/theme/themeContext";

interface FilterHeaderProps {
  filters: string[];
  selectedFilter: string;
  onSelectFilter: (filter: string) => void;
}

export const FilterHeader: React.FC<FilterHeaderProps> = ({
  filters,
  selectedFilter,
  onSelectFilter,
}) => {
  const { theme } = useThemeContext();

  const getBackgroundColor = (filter: string) => {
    if (filter === selectedFilter) {
      return theme === "light" ? Colors.primary : Colors.primaryColor2;
    }
    return theme === "light" ? Colors.light : Colors.secondary;
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {filters.map((filter, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => onSelectFilter(filter)}
          style={[
            styles.filterOption,
            { backgroundColor: getBackgroundColor(filter) },
          ]}
        >
          <AppText
            fontRegular
            centered
            black
            style={[
              styles.selectedText,
              {
                color:
                  (filter !== selectedFilter && theme === "dark") ||
                  (filter === selectedFilter && theme === "light")
                    ? Colors.white
                    : Colors.black,
              },
            ]}
          >
            {filter}
          </AppText>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  filterOption: {
    marginTop: Sizes.font12,
    paddingHorizontal: verticalScale(12),
    paddingVertical: verticalScale(10),
    marginHorizontal: Sizes.font6 - 3,
    borderRadius: 50,
  },
  selectedText: {
    color: Colors.black,
  },
});
