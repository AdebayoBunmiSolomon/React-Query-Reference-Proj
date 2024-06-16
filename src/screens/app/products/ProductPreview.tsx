import { AppText, Header } from "@src/components";
import {
  formatAmount,
  getStatusBackgroundColor,
  getStatusColor,
} from "@src/helper/helper";
import { RootStackProps, TabScreenProps } from "@src/router/types";
import Screen from "@src/screens/Screen";
import {
  Colors,
  RPH,
  RPW,
  Sizes,
  moderateScale,
  screenWidth,
} from "@src/theme";
import { globalStyle } from "@src/theme/globalStyles";
import { useThemeContext } from "@src/theme/themeContext";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

export const ProductPreview = ({ route }: RootStackProps<"ProductPreview">) => {
  const { productData }: any = route.params ?? { productData: undefined };
  const { theme } = useThemeContext();
  console.log(productData);

  return (
    <Screen>
      <View style={globalStyle.container}>
        <Header title='Product Preview' backBtn rightIcon />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.productDetailsContainer}>
            <Image
              source={require("@src/assets/images/nike.png")}
              style={styles.productImage}
            />
            <View style={styles.productInfo}>
              <View style={styles.namePriceContainer}>
                <AppText semiMedium black>
                  {productData.product.name}
                </AppText>
                <AppText semiMedium mainColor fontBold>
                  ₦{formatAmount(Number(productData.product.price))}
                </AppText>
              </View>
              <View style={styles.statusQuantityContainer}>
                <View
                  style={[
                    styles.statusItem,
                    {
                      backgroundColor: getStatusBackgroundColor(
                        productData.product.status ? "In Stock" : "Out Of Stock"
                      ),
                    },
                  ]}>
                  <AppText
                    fontRegular
                    small
                    style={{
                      color: getStatusColor(productData.product.status),
                    }}>
                    {productData.product.status}
                  </AppText>
                </View>
                <AppText gray fontMedium small>
                  Quantity - {productData.product.quantity}
                </AppText>
              </View>

              <View style={styles.categoryStoreDetails}>
                <View style={styles.categoryData}>
                  <AppText semiMedium gray>
                    Category
                  </AppText>
                  <AppText semiMedium black>
                    {productData.product.categories}
                  </AppText>
                </View>
                {/* <View style={styles.categoryData}>
                  <AppText semiMedium gray>
                    Store
                  </AppText>
                  <AppText semiMedium black>
                    {productData.product.store}
                  </AppText>
                </View> */}
                <View style={styles.categoryData}>
                  <AppText semiMedium gray>
                    Discount
                  </AppText>
                  <AppText semiMedium black>
                    ₦{formatAmount(Number(productData.product.discount))}
                  </AppText>
                </View>
              </View>

              {/* <View style={styles.sizesContainer}>
                <AppText fontBold semiMedium black>
                  Sizes available
                </AppText>
                <View style={styles.sizeBoxContainer}>
                  {productData.product.sizes.map(
                    (size: string, index: number) => (
                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.sizeBox,
                          {
                            backgroundColor:
                              theme === "dark"
                                ? Colors.primaryColor2
                                : Colors.primary,
                          },
                        ]}>
                        <AppText
                          fontMedium
                          style={{
                            color:
                              theme === "dark" ? Colors.black : Colors.white,
                          }}>
                          {size}
                        </AppText>
                      </TouchableOpacity>
                    )
                  )}
                </View>
              </View> */}
              {/* <View style={styles.colorsContainer}>
                <AppText fontBold big black>
                  Color Specification
                </AppText>
                <View style={styles.colorCircleContainer}>
                  {productData.product.colors.map(
                    (color: string, index: number) => (
                      <TouchableOpacity
                        key={index}
                        style={[styles.colorCircle, { backgroundColor: color }]}
                      />
                    )
                  )}
                </View>
              </View> */}
            </View>
          </View>
        </ScrollView>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  productDetailsContainer: {
    flex: 1,
  },
  productImage: {
    width: screenWidth - 25,
    height: RPH(30),
    borderRadius: moderateScale(8),
  },
  productInfo: {
    marginTop: Sizes.font16,
  },
  namePriceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Sizes.font14,
  },
  statusQuantityContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: Sizes.font14,
  },
  statusItem: {
    paddingVertical: Sizes.font6,
    borderRadius: Sizes.font20,
    paddingHorizontal: Sizes.font14,
  },
  categoryStoreDetails: {
    marginTop: Sizes.font30,
    gap: Sizes.font14,
  },
  categoryData: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sizesContainer: {
    marginTop: Sizes.font30,
  },
  sizeBoxContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: Sizes.font14,
    gap: Sizes.font14,
  },
  sizeBox: {
    width: RPW(20),
    height: RPH(6),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Sizes.font10,
  },
  colorsContainer: {
    marginVertical: Sizes.font30,
  },
  colorCircleContainer: {
    flexDirection: "row",
    marginTop: Sizes.font14,
    gap: Sizes.font14,
  },
  colorCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
  },
});
