// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    backgroundColor: '#f3f5f6', //#0f5997
  },
  scene: {
    flex: 1,
  },
  statuscard: {
    width: Metrics.screenWidth * 1,
    marginVertical: Metrics.ratio(1),
    paddingVertical: Metrics.ratio(8),
    backgroundColor: 'white',
    elevation: 4,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    flexDirection: 'column',
  },

  image: {
    width: Metrics.ratio(50),
    height: Metrics.ratio(50),
    borderRadius: Metrics.ratio(50),
    borderWidth: Metrics.ratio(1),
    borderColor: '#b1b4b5',
  },
  text: {
    fontFamily: 'Avenir Next',
    color: '#1D2029',
  },
  author: {
    fontSize: 18,
    fontWeight: '200',
    color: '#ccc',
    // color: 'rgba(0, 0, 0, 0.3)',
  },
  convoHead: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // paddingVertical: Metrics.ratio(10),
    paddingHorizontal: Metrics.ratio(5),
  },
  nochatHead: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Metrics.ratio(10),
    paddingHorizontal: Metrics.ratio(5),
  },
  convoTxt: {
    fontSize: Metrics.ratio(18),
    fontFamily: Fonts.type.regular,
    color: '#909090',
  },
  nochatTxt: {
    fontSize: Metrics.ratio(18),
    fontFamily: Fonts.type.regular,
    alignSelf: 'center',
    color: '#909090',
  },
  convoImg: {
    height: Metrics.ratio(15),
    width: Metrics.ratio(15),
  },
  time: {
    fontSize: 12,
    justifyContent: 'flex-end',
    fontWeight: '700',
    color: '#ccc',
    width: Metrics.screenWidth * 0.08,
    // color: 'rgba(0, 0, 0, 0.3)',
  },
  unread: {
    fontSize: 12,
    fontWeight: '200',
    // marginTop: 5,
    width: Metrics.ratio(20),
    height: Metrics.ratio(20),
    borderRadius: Metrics.ratio(20),
    backgroundColor: '#997bf4',
    textAlign: 'center',
    justifyContent: 'center',
    color: '#ffffff',
  },
  title: {
    fontSize: 9,
    fontWeight: '100',
    marginTop: 5,
    color: '#b1b4b5',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7);',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    width: Metrics.screenWidth * 0.8,
    // height: Metrics.screenHeight * 0.4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    fontSize: Metrics.ratio(18),
  },
  input:{
    backgroundColor: '#f2f2f2',
    padding:12,
    borderRadius:10,
    marginBottom:20,
    marginTop: 10
},
});
