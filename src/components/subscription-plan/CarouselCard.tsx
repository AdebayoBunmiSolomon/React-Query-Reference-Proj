import { Colors, RPH, RPW, Sizes } from "@src/theme";
import { subscriptionType } from "@src/types/types";
import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { AppText } from "../shared/AppText";
import { formatAmount } from "@src/helper/helper";

export const SLIDER_WIDTH = Dimensions.get("window").width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

export interface carouselCardProps {
  item: subscriptionType;
  index: number;
  theme: string;
  activeIndex: number;
}

export const CarouselCard = React.memo(
  ({ item, index, theme, activeIndex }: carouselCardProps) => {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor:
              activeIndex === index && theme === "light"
                ? Colors.primary
                : activeIndex === index && theme === "dark"
                ? Colors.primary
                : index !== activeIndex && theme === "light"
                ? "whitesmoke"
                : index !== activeIndex && theme === "dark"
                ? Colors.lightGray
                : undefined,
          },
        ]}>
        <Image
          source={item.image}
          style={styles.image}
          resizeMode='contain'
          // Use a placeholder image while loading
          defaultSource={require("@src/assets/icons/person.png")}
        />
        <AppText
          fontMedium
          big
          style={[
            styles.header,
            {
              color:
                activeIndex === index && theme === "light"
                  ? Colors.white
                  : activeIndex === index && theme === "dark"
                  ? Colors.light
                  : index !== activeIndex && theme === "light"
                  ? Colors.black
                  : index !== activeIndex && theme === "dark"
                  ? Colors.white
                  : undefined,
            },
          ]}>
          {item.plan}
        </AppText>
        <View style={styles.priceContainer}>
          <AppText
            fontBold
            semiBig
            style={{
              color:
                activeIndex === index && theme === "light"
                  ? Colors.white
                  : activeIndex === index && theme === "dark"
                  ? Colors.light
                  : index !== activeIndex && theme === "light"
                  ? Colors.black
                  : index !== activeIndex && theme === "dark"
                  ? Colors.white
                  : undefined,
            }}>
            {formatAmount(Number(item.price))}
          </AppText>
          <AppText
            fontRegular
            semiMedium
            style={{
              color:
                activeIndex === index && theme === "light"
                  ? Colors.white
                  : activeIndex === index && theme === "dark"
                  ? Colors.light
                  : index !== activeIndex && theme === "light"
                  ? Colors.gray
                  : index !== activeIndex && theme === "dark"
                  ? Colors.light
                  : undefined,
            }}>
            / Monthly
          </AppText>
        </View>
        <AppText
          fontRegular
          small
          style={[
            styles.description,
            {
              color:
                activeIndex === index && theme === "light"
                  ? Colors.light
                  : activeIndex === index && theme === "dark"
                  ? Colors.lightGray
                  : index !== activeIndex && theme === "light"
                  ? Colors.black
                  : index !== activeIndex && theme === "dark"
                  ? Colors.white
                  : undefined,
            },
          ]}>
          {item.description}
        </AppText>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor:
                activeIndex === index && theme === "light"
                  ? Colors.light
                  : activeIndex === index && theme === "dark"
                  ? Colors.white
                  : index !== activeIndex && theme === "light"
                  ? Colors.primary
                  : index !== activeIndex && theme === "dark"
                  ? Colors.white
                  : undefined,
              borderColor:
                activeIndex === index && theme === "light"
                  ? Colors.light
                  : activeIndex === index && theme === "dark"
                  ? Colors.white
                  : index !== activeIndex && theme === "light"
                  ? "transparent"
                  : index !== activeIndex && theme === "dark"
                  ? Colors.white
                  : undefined,
            },
          ]}>
          <AppText
            style={{
              color:
                activeIndex === index && theme === "light"
                  ? Colors.primary
                  : activeIndex === index && theme === "dark"
                  ? Colors.primary
                  : index !== activeIndex && theme === "light"
                  ? Colors.white
                  : activeIndex !== index && theme === "dark"
                  ? Colors.gray
                  : undefined,
            }}>
            {activeIndex === index ? `Choose ${item.plan} Plan` : "Choose Plan"}
          </AppText>
        </TouchableOpacity>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    borderRadius: Sizes.font20,
    width: ITEM_WIDTH,
    paddingVertical: Sizes.font45,
    paddingHorizontal: Sizes.font12,
    backgroundColor: "whitesmoke",
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },
    // shadowOpacity: 0.29,
    // shadowRadius: 4.65,
    // elevation: 7,
  },
  image: {
    width: RPW(20),
    height: RPH(10),
    borderRadius: Sizes.font12,
  },
  header: {
    paddingTop: Sizes.font20,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Sizes.font6,
    paddingTop: Sizes.font16,
    paddingLeft: Sizes.font20,
  },
  description: {
    paddingTop: Sizes.font20,
    textAlign: "justify",
    paddingLeft: Sizes.font20,
  },
  button: {
    borderWidth: RPW(0.4),
    height: RPH(6),
    marginTop: Sizes.font45,
    width: "95%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: Sizes.font10,
  },
});
