import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
import {Metrics, Images, Fonts,Colors} from '../../theme';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: Metrics.screenHeight * 0.095,
    flexDirection: 'row',
    shadowColor: Colors.black,
    elevation: 4,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
  },
  keyboard: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    width,
    height,
  },
  header: {
    height: 65,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F2F5FF',
    paddingHorizontal: 10,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    flexDirection: 'row',
  },
  chatTitle: {
    color: '#fff',
    fontWeight: '600',
    margin: 10,
    fontSize: 15,
  },
  chatImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    margin: 5,
  },
  detailText: {
    fontFamily: 'LexendDeca-Regular',
    fontSize: hp('2.7%'),
    color: '#484EC8',
    marginRight: 35,
  },
  input: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    padding: 10,
    height: 40,
    width: width - 20,
    backgroundColor: '#fff',
    margin: 10,
    shadowColor: '#3d3d3d',
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
    },
    borderColor: '#696969',
    borderWidth: 1,
  },
  eachMsg: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    margin: 5,
  },
  rightMsg: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    margin: 5,
    alignSelf: 'flex-end',
  },
  userPic: {
    height: 40,
    width: 40,
    margin: 5,
    borderRadius: 20,
    backgroundColor: '#f8f8f8',
  },
  msgBlock: {
    alignSelf: 'flex-start',

    // width: 220,
    borderRadius: 5,
    backgroundColor: '#e6e6e6',
    padding: 10,
    shadowColor: '#3d3d3d',
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
    },
  },
  rightBlock: {
    alignSelf: 'flex-start',
    // width: 220,
    borderRadius: 5,
    backgroundColor: '#84CDFF',
    padding: 10,
    shadowColor: '#3d3d3d',
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
    },
  },
  msgTxt: {
    fontSize: 15,
    color: 'black',
    fontWeight: '600',
    maxWidth: Metrics.screenWidth * 0.7
  },
  rightTxt: {
    fontSize: 15,
    color: 'white',
    fontWeight: '600',
    maxWidth: Metrics.screenWidth * 0.7
  },

  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
    // alignContent:"center"
    alignSelf: 'center',
  },
  inputRecoding: {
    flexDirection: 'row',
    marginRight: wp('2%'),
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: wp('66%'),
    height: 40,
    alignItems: 'center',
    // flex: 1,
    marginHorizontal: 20,
    // alignContent:"center"
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  inputs: {
    // height: 40,
    // marginLeft: 16,
    // backgroundColor :"blue",
    // borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  btnCancel: {
    width: 40,
    height: 40,
    borderRadius: 360,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnSend: {
    backgroundColor: 'red',
    width: 40,
    height: 40,
    borderRadius: 360,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: wp('1%'),
  },
  footer: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#eeeeee',
    paddingHorizontal: 10,
    padding: 5,
    alignItems: 'center',
  },
  iconSend: {
    width: wp('7%'),
    height: hp('5%'),
    alignSelf: 'center',
    marginLeft: wp('1%'),
  },

  container1: {
    backgroundColor: '#fff',
    height: Metrics.screenHeight * 0.095,
    flexDirection: 'row',
    shadowColor: Colors.black,
    // elevation: 4,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    // position: 'absolute',
    // top: 0,
    // zIndex: 1,
    // elevation: 1,
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0,
  },
  menuImage: {
    width: Metrics.ratio(25),
    height: Metrics.ratio(25),
  },
  TouchableMenu: {
    width: Metrics.ratio(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTextView: {
    flexDirection: 'row',
    // width: Metrics.screenWidth - Metrics.doubleBaseMargin,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText1: {
    // fontWeight: Platform.OS === "ios" ? "bold" : "bold",
    fontSize: Metrics.ratio(18),
    fontFamily: Fonts.type.regular,
    color: '#909090',
  },
});
