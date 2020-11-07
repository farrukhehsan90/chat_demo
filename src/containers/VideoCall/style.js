import {Dimensions, StyleSheet} from 'react-native';
import {Metrics} from '../../theme';

const dimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

export default StyleSheet.create({
  max: {
    flex: 1,
  },
  buttonHolder: {
    height: 100,
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#0093E9',
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
  },
  fullView: {
    width: dimensions.width,
    height: dimensions.height - 100,
  },
  remote: {
    position:'absolute',
    bottom:10,
    right:10,
    width: Metrics.screenWidth * 0.30,
    height: Metrics.screenHeight * 0.20,
  },
  noUserText: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: '#0093E9',
  },
  callHeaderContainer: {
    backgroundColor: '#84CDFF',
    height: Metrics.screenHeight * 0.13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    color: 'white',
    fontSize: Metrics.ratio(18),
  },
  callFooterContainer: {
    backgroundColor: '#84CDFF',
    height: Metrics.screenHeight * 0.08,
    paddingHorizontal: Metrics.ratio(30),
    justifyContent: 'center',
  },
  endCallIcon: {
    height: 60,
    width: 60,
    marginRight: 15,
    backgroundColor: 'red',
    borderRadius: 200,
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
  smallCallContainer: {
    flexDirection: 'row',
    paddingHorizontal: Metrics.ratio(15),
    justifyContent: 'flex-end',
    width: Metrics.screenWidth,
    // marginTop: Metrics.screenHeight * 0.32,
  },
  profileIcon: {
    height: 80,
    width: 80,
    borderRadius: 200,
    backgroundColor: 'grey',
    alignSelf: 'center',
    marginTop: Metrics.screenHeight * 0.07,
  },
});
