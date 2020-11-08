import React, {Component} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {Images, Metrics} from './../../theme';

import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';

import {success as login_user} from '../../redux/actions/Login';
import {drawerMenuSwitched} from '../../redux/actions/NavigationAction';

import {Actions} from 'react-native-router-flux';

class Loader extends Component {
  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    // try {
    const jsonValue = await AsyncStorage.getItem('LOGIN_USER');
    const convertValue = JSON.parse(jsonValue);

    let obj = {data: convertValue};
    if (convertValue) {
      this.props.drawerMenuSwitched('Login', 'Profile');
      this.props.login_user(obj);

      this.props.navigation.navigate('Profile');
    } else {
      Actions.Login();
    }
  };

  render() {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          marginTop: Metrics.ratio(300),
        }}>
        <ActivityIndicator size="large" color="#50CEFF" />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  login: state.login,
  socialLogin: state.socialLogin,
});

const action = {login_user, drawerMenuSwitched};

export default connect(
  mapStateToProps,
  action,
)(Loader);
