// @flow
import { StyleSheet, Platform } from "react-native";
import { Colors, Metrics, Fonts } from "../../theme";

export default StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: Metrics.screenHeight * 0.095,
    flexDirection: "row",
    shadowColor: Colors.black,
    elevation: 4,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
  },
  menuImage: {
    width: Metrics.ratio(25),
    height: Metrics.ratio(25)
  },
  TouchableMenu: {
    width: Metrics.ratio(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTextView: {
    flexDirection: 'row',
    width: Metrics.screenWidth - Metrics.doubleBaseMargin,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerText: {
    // fontWeight: Platform.OS === "ios" ? "bold" : "bold",
    fontSize: Metrics.ratio(18),
    fontFamily: Fonts.type.regular,
    color: "#909090",
  }
});
