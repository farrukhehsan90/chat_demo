/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import Navigation from './src/navigator';
import 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';

import Store from './src/redux/store/index';

const store = Store();

export default class App extends Component {
  // componentDidMount() {
  //   setTimeout(() => {
  // SplashScreen.hide();

  //   }, 3000);
  // }

  render() {
    console.disableYellowBox = true;
    SplashScreen.hide();

    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}
