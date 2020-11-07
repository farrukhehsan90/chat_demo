// @flow

import React, {Component} from 'react';
import {connect} from 'react-redux';
import { BackHandler} from 'react-native';
import {Stack, Scene, Router, Actions, } from 'react-native-router-flux';

import {Colors, Metrics, Images} from '../theme';
import utils from '../util';

import Login from '../containers/Login';
import Register from '../containers/Registration';

import Messages from '../containers/Messages';
import AudioCall from '../containers/AudioCall';
import VideoCall from '../containers/VideoCall';
import DrawerMenu from './DrawerNavigator';
import styles from './styles';

function onBackPress() {
  const scene = Actions.currentScene;
  if (scene === 'Login' || scene === 'Message' || scene === 'Loader') {
    utils.showYesNoMessage(
      'Confirm',
      'Are you sure you want to exit?',
      () => {
        BackHandler.exitApp();
      },
      () => {},
    );
    return true;
  } else {
    Actions.pop();
    return true;
  }
}

const navigator = Actions.create(
  <Stack
    titleStyle={styles.title}
    headerStyle={styles.header}
    key="root"
    tintColor={Colors.primary}
  >
    
    <Scene
      hideNavBar
      headerStyle={styles.header}
      titleStyle={[styles.title, {width: Metrics.screenWidth}]}
      tintColor="white"
      title={'Login'}
      key="Login"
      component={Login}
      renderLeftButton={
        () => {}
        //<TabButtonLeft imagesArray={["rightArrow"]} actions={[Actions.pop]} />
      }
    />

    <Scene
      hideNavBar
      headerStyle={styles.header}
      titleStyle={[styles.title, {width: Metrics.screenWidth}]}
      tintColor="white"
      title={'Register'}
      key="Register"
      component={Register}
      renderLeftButton={
        () => {}
        //<TabButtonLeft imagesArray={["rightArrow"]} actions={[Actions.pop]} />
      }
    />

    <Scene
      hideNavBar
      headerStyle={styles.header}
      titleStyle={[styles.title, {width: Metrics.screenWidth}]}
      tintColor="white"
      title={'Messages'}
      key="Messages"
      component={Messages}
      renderLeftButton={() => {}}
    />

<Scene
      hideNavBar
      headerStyle={styles.header}
      titleStyle={[styles.title, {width: Metrics.screenWidth}]}
      tintColor="white"
      title={'AudioCall'}
      key="AudioCall"
      component={AudioCall}
      renderLeftButton={() => {}}
    />
<Scene
      hideNavBar
      headerStyle={styles.header}
      titleStyle={[styles.title, {width: Metrics.screenWidth}]}
      tintColor="white"
      title={'VideoCall'}
      key="VideoCall"
      component={VideoCall}
      renderLeftButton={() => {}}
    />

    {DrawerMenu.getDrawerMenu()}
  </Stack>,
);
export default () => (
  <AppNavigator backAndroidHandler={onBackPress} navigator={navigator} />
);
const AppNavigator = connect()(Router);
