// @flow
import { StyleSheet, Platform } from "react-native";
import { Colors, Metrics, Fonts } from "../theme";

export default StyleSheet.create({
  header: {
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 4,
    backgroundColor: Colors.navbar.background
  },
  title: {
    fontWeight: Platform.OS === "ios" ? "bold" : "bold",

    width:
      Metrics.screenWidth - (Metrics.doubleBaseMargin + Metrics.baseMargin),
    //textAlign: "center",
    fontSize: Metrics.ratio(18),
    fontFamily: Fonts.type.AvenirNextDemiBold,
    color: Colors.darkStaleBlue
  },
  tabBarStyle: {
    borderTopColor: Colors.border,
    borderTopWidth: Metrics.horizontalLineHeight,
    backgroundColor: Colors.navbar.background
  },
  menuButton: {
    width: 50,
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  rightButtonStyle: {
    marginRight: Metrics.smallMargin,
    width: Metrics.ratio(30),
    height: Metrics.ratio(30)
  },
  customHeaderView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  headerLogoImage: {
    height: Metrics.ratio(50),
    width: Metrics.ratio(100)
  }
});
