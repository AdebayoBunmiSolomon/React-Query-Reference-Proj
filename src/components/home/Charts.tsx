import React from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { Colors, RPH, verticalScale } from "@src/theme";
import { useThemeContext } from "@src/theme/themeContext";

const barChartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      data: [400, 500, 200, 100, 70, 100],
    },
  ],
};

export const Barchart: React.FC<{}> = () => {
  const { width } = useWindowDimensions();
  const { theme } = useThemeContext();
  return (
    <>
      <View style={styles.container}>
        <BarChart
          data={barChartData}
          yAxisLabel=''
          yAxisSuffix=''
          xAxisLabel=''
          width={width - 15}
          height={RPH(70)}
          chartConfig={{
            backgroundGradientFrom:
              theme === "dark" ? Colors.bgDark : Colors.lightGray,
            //   backgroundGradientFromOpacity: undefined,
            backgroundGradientTo:
              theme === "dark" ? Colors.bgDark : Colors.lightGray,
            //   backgroundGradientToOpacity: undefined,
            color: () =>
              theme === "dark"
                ? Colors.barChartColorDark
                : Colors.barChartColorLight,
            barPercentage: 1,
          }}
          withInnerLines={false}
          showBarTops={false}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingTop: verticalScale(20),
    paddingBottom: verticalScale(20),
    flexGrow: 1,
  },
});
