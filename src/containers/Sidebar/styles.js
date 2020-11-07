// @flow
import { StyleSheet } from 'react-native';
import { Fonts, Metrics } from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  profile: {
    width: Metrics.ratio(80),
    height: Metrics.ratio(80),
    borderRadius: Metrics.ratio(80),
    borderColor: '#FFF',
    marginTop: Metrics.ratio(20),
  },

  name: {
    color: '#FFF',
    fontSize: Metrics.ratio(13),
    marginVertical: Metrics.ratio(8),
    fontWeight: '700',
    fontFamily: Fonts.type.regular,
  },

  mail: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: Metrics.ratio(13),
    marginRight: Metrics.ratio(4),
    fontFamily: Fonts.type.regular,
  },

  listView: {
    height: Metrics.screenHeight * 0.08,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#66DAFF',
  },

  listTitle: {
    color: 'white',
    fontSize: Metrics.ratio(15),
    fontFamily: Fonts.type.bold,
  },
});
