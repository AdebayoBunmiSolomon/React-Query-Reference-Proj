import { Dimensions, PixelRatio, Platform } from "react-native";

export const screenHeight = Dimensions.get("window").height;
export const screenWidth = Dimensions.get("window").width;

// based on iphone 5s's scale
const scale = screenWidth / 320;

const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

export const scaleSize = (size: number) =>
  (screenWidth / guidelineBaseWidth) * size;
export const verticalScale = (size: number) =>
  (screenHeight / guidelineBaseHeight) * size;
export const moderateScale = (size: number, factor = 0.5) =>
  size + (scaleSize(size) - size) * factor;

export function normalize(size: number) {
  const newSize = size * scale;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

export const RPH = (percentage: number) => {
  return (percentage / 100) * screenHeight;
};

export const RPW = (percentage: number) => {
  return (percentage / 100) * screenWidth;
};

export const FontFamily = {
  openSansRegular: "open-sans-regular",
  openSansMedium: "open-sans-medium",
  openSansSemiBold: "open-sans-semi-bold",
  openSansBold: "open-sans-bold",
};

export const Colors = {
  primary: "#508A8C",
  primaryColor2: "#7EE5CA",
  secondary: "#09252B",
  modalBg: "##091D22",
  white: "#FFFFFF",
  black: "#000000",
  light: "#F1F1F1",
  lightGray: "#FFFFFF80",
  background: "#E5E5E5",
  red: "#EC0000",
  gray: "#999999",
  success: "#34C759",
  veryLight: "#D9D9D9",
  bgDark: "#051215",
  iconNfocused: "#B4C8C7",
  iconNfocused2: "#325253",
  bottomTabBgDarkColor: "#051215e1",
  bottomTabBgLightColor: "#FFFFFF",
  editIcon: "#FFA500",
  deleteIcon: "#FF0B0B",
  editButton: "#FEFBED",
  deleteButton: "#FEEDED",
  nameColor: "#FF630B",
  selectedPinCodeLight: "rgba(80, 138, 140, 0.2)",
  selectedPinCodeDark: "rgba(126, 229, 202, 0.2)",
  subContainerBgLight: "rgba(249, 250, 251, 1)",
  volumeBgDark: "#E7F6ED",
  minimumColor: "rgba(255, 11, 11, 1)",
  mediumColors: "rgba(255, 99, 11, 1)",
  maximumColor: "rgba(3, 107, 38, 1)",
  paymentSelector: "#008080",
  topMaximumColor: "",
  barChartColorLight: "rgba(80, 138, 140, 1)",
  barChartColorDark: "rgba(126, 229, 202, 1)",
  modalBgDark: "rgba(9, 36, 43, 0.616)",
  modalBgLight: "rgba(9, 36, 43, 0.20)",
  modalBgDark2: "#051215",
  modalBgLight2: "#F4F5FA",
  modalBorderDark: "#508a8c63",
  modalBorderLight: "rgba(80, 138, 140, 0.20)",
  authInputDark: "#A7C4C5",
  usedText: "#0B32FF",
  usedTextBg: "#EDF9FE",
  authInputLight: "#dad8d8",
  statusLightBg: "rgba(0, 128, 128, 0.1)",
  statusLightTxt: "rgba(3, 107, 38, 1)",
  taxIconColor: "#F67E7D",
  taxIconBgColor: "#FFF8F8",
};

export const Sizes = {
  font2: moderateScale(2),
  font4: moderateScale(4),
  font6: moderateScale(6),
  font8: moderateScale(8),
  font10: moderateScale(10),
  font12: moderateScale(12, 0.5),
  font14: moderateScale(14, 0.5),
  font16: moderateScale(16, 0.7),
  font18: moderateScale(18),
  font20: moderateScale(20, 0.4),
  font22: moderateScale(24, 0.4),
  font26: moderateScale(26, 0.5),
  font30: moderateScale(30, 0.4),
  font34: moderateScale(34, 0.4),
  font45: moderateScale(45, 0.5),
  font50: moderateScale(50, 0.5),
  font57: moderateScale(57, 0.5),
};
