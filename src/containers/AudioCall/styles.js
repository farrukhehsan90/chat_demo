import {Dimensions, StyleSheet} from 'react-native';
import {Metrics, Images, Fonts} from '../../theme';

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
  remoteContainer: {
    width: '100%',
    height: 150,
    position: 'absolute',
    top: 5,
  },
  remote: {
    width: 150,
    height: 150,
    marginHorizontal: 2.5,
  },
  noUserText: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: '#0093E9',
  },
  callHeaderContainer: {
    backgroundColor: '#84CDFF',
    height: Metrics.screenHeight * 0.1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    color: 'white',
    fontSize: Metrics.ratio(18),
  },
  callFooterContainer: {
    backgroundColor: '#84CDFF',
    height: Metrics.screenHeight * 0.1,
    paddingHorizontal: Metrics.ratio(30),
    justifyContent: 'center',
  },
  endCallIcon: {
    height: 60,
    width: 60,
    marginRight: 15,
    backgroundColor: 'red',
    borderRadius: 200,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  smallCallContainer: {
    flexDirection: 'row',
    paddingHorizontal: Metrics.ratio(15),
    justifyContent: 'flex-end',
    width: Metrics.screenWidth,
    marginTop: Metrics.screenHeight * 0.32,
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
