import React, { useEffect, useRef, useState } from "react";
import Screen from "../Screen";
import { globalStyle } from "@src/theme/globalStyles";
import { View, StyleSheet } from "react-native";
import { AppBtn, CarouselCard, Header, ITEM_WIDTH } from "@src/components";
import { AuthScreenProps } from "@src/router/types";
import { Colors, Sizes, screenWidth } from "@src/theme";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { subscriptionPlan } from "@src/constant/data";
import { useThemeContext } from "@src/theme/themeContext";

export const SubscriptionPlan = ({
  navigation,
}: AuthScreenProps<"SubscriptionPlan">) => {
  const { theme } = useThemeContext();
  const isCarousel = useRef<any>(null);
  const [initialIndex, setInitialIndex] = useState(0);

  useEffect(() => {
    setInitialIndex(0);
  }, []);

  return (
    <Screen>
      <View style={globalStyle.container}>
        <View style={styles.headerContainer}>
          <Header
            title='Select Subscription Plan'
            backBtn
            onPressRight={() => {}}
          />
        </View>
      </View>
      <View>
        <Carousel
          layout='default'
          layoutCardOffset={9}
          ref={isCarousel}
          data={subscriptionPlan}
          renderItem={({ item, index }) => (
            <CarouselCard
              item={item}
              index={index}
              theme={theme}
              activeIndex={initialIndex}
            />
          )}
          sliderWidth={screenWidth}
          itemWidth={ITEM_WIDTH}
          inactiveSlideShift={0}
          useScrollView={true}
          onSnapToItem={(index) => setInitialIndex(index)}
        />
        <Pagination
          dotsLength={subscriptionPlan.length}
          activeDotIndex={initialIndex}
          carouselRef={isCarousel.current}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 0,
            backgroundColor:
              theme === "dark" ? Colors.primaryColor2 : Colors.primary,
            paddingHorizontal: 5,
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          inactiveDotColor={theme === "dark" ? Colors.lightGray : Colors.gray}
          dotColor={theme === "dark" ? Colors.primaryColor2 : Colors.primary}
          tappableDots={true}
        />
      </View>
      <View style={styles.bottomContainer}>
        <AppBtn title='Continue with free plan' />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: "flex-start",
    width: screenWidth - 25,
  },
  bottomContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: Sizes.font10,
  },
});
