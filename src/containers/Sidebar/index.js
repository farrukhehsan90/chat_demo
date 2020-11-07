import {connect} from 'react-redux';
import React, {Component} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Image,
  Animated,
  TouchableOpacity,
  Alert,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {DrawerNavigatorItems, DrawerItems} from 'react-navigation-drawer';
import {Images, Metrics} from '../../theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import {Actions} from 'react-native-router-flux';
import {drawerMenuSwitched} from '../../redux/actions/NavigationAction';

class Sidebar extends Component {
  navigateProfile = () => {
    const {myNavigation} = this.props;
    if (Actions.currentScene === 'Profile') {
      Actions.drawerClose();
      console.log('tttttttttttttttttttttttt');
    } else {
      Actions.Profile();
    }
    this.props.drawerMenuSwitched(myNavigation.newView, 'Profile');
  };
  navigateYourPlaces = () => {
    const {myNavigation} = this.props;
    if (Actions.currentScene === 'Yourplaces') {
      Actions.drawerClose();
      console.log('tttttttttttttttttttttttt');
    } else {
      Actions.Yourplaces();
      this.props.drawerMenuSwitched(myNavigation.newView, 'Yourplaces');
    }
  };
  navigateDriving = () => {
    const {myNavigation} = this.props;
    if (Actions.currentScene === 'StartDriving') {
      Actions.drawerClose();
      console.log('tttttttttttttttttttttttt');
    } else {
      Actions.StartDriving();
      this.props.drawerMenuSwitched(myNavigation.newView, 'StartDriving');
    }
  };
  navigateMessage = () => {
    const {myNavigation} = this.props;
    if (Actions.currentScene === 'Message') {
      Actions.drawerClose();
      console.log('tttttttttttttttttttttttt');
    } else {
      Actions.Message();
      this.props.drawerMenuSwitched(myNavigation.newView, 'Message');
    }
  };
  navigateShare = () => {
    const {myNavigation} = this.props;
    if (Actions.currentScene === 'Location') {
      Actions.drawerClose();
      console.log('tttttttttttttttttttttttt');
    } else {
      Actions.Location();
      this.props.drawerMenuSwitched(myNavigation.newView, 'Location');
    }
  };
  navigatefeedback = () => {
    const {myNavigation} = this.props;
    if (Actions.currentScene === 'Feedback') {
      Actions.drawerClose();
      console.log('tttttttttttttttttttttttt');
    } else {
      Actions.Feedback();
      this.props.drawerMenuSwitched(myNavigation.newView, 'Feedback');
    }
  };
  navigateHelp = () => {
    const {myNavigation} = this.props;
    if (Actions.currentScene === 'Help') {
      Actions.drawerClose();
      console.log('tttttttttttttttttttttttt');
    } else {
      Actions.Help();
      this.props.drawerMenuSwitched(myNavigation.newView, 'Help');
    }
  };
  navigateHostParty = () => {
    const {myNavigation} = this.props;
    if (Actions.currentScene === 'HostParty') {
      Actions.drawerClose();
      console.log('tttttttttttttttttttttttt');
    } else {
      Actions.HostParty();
      this.props.drawerMenuSwitched(myNavigation.newView, 'HostParty');
    }
  };
  navigateFavouriteplaces = () => {
    if (Actions.currentScene === 'FavouritePlaces') {
      Actions.drawerClose();
      console.log('tttttttttttttttttttttttt');
    } else {
      Actions.FavouritePlaces();
    }
  };
  onLogout = () => {
    Actions.drawerClose();
    Actions.Login();
  };

  // drowerCondition = () => {

  // };

  renderBody = () => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#66DAFF',
          paddingVertical: Metrics.ratio(20),
        }}>
        {this.renderRow('Profile', this.navigateProfile, 'profile', 'Profile')}
        {this.renderRow(
          'Your Places',
          this.navigateYourPlaces,
          'location',
          'Yourplaces',
        )}
        {this.renderRow(
          'Start Driving',
          this.navigateDriving,
          'drawer_start_driving',
          'StartDriving',
        )}

        {this.renderRow('Messages', this.navigateMessage, 'message', 'Message')}
        {this.renderRow(
          'Location Sharing',
          this.navigateShare,
          'sharelocation',
          'Location',
        )}
        {this.renderRow(
          'Host a Party',
          this.navigateHostParty,
          'hostaparty',
          'HostParty',
        )}
        {this.renderRow(
          'Send Feedback',
          this.navigatefeedback,
          'feedback',
          'Feedback',
        )}
        {this.renderRow('Help', this.navigateHelp, 'help', 'Help')}

        {/* {this.renderRow(
          'Favourite Places',
          this.navigateFavouriteplaces,
          'favouritedrawer',
          'FavouritePlaces',
        )} */}

        {this.renderRow('Logout', this.onLogout, 'logout', 'logout')}
      </View>
    );
  };
  renderRow = (title, onPress, icon, activeScene, rightIcon) => {
    const {myNavigation} = this.props;
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.listView,
          myNavigation &&
            myNavigation.newView === activeScene && {
              backgroundColor: '#50CEFF',
            },
          title == 'Logout' && {
            marginBottom: Metrics.ratio(25),
          },
        ]}>
        <Image
          resizeMethod="auto"
          resizeMode="contain"
          style={{
            marginHorizontal: Metrics.ratio(16),
            width: Metrics.ratio(25),
            height: Metrics.ratio(25),
          }}
          source={Images[icon]}
        />
        <View
          style={{
            justifyContent: 'center',
          }}>
          <Text style={[styles.listTitle]}>{title}</Text>
        </View>
        {rightIcon && (
          <Icon
            style={{marginLeft: Metrics.screenWidth * 0.3}}
            size={20}
            color="white"
            name={rightIcon}
          />
        )}
      </TouchableOpacity>
    );
  };

  render() {
    console.log('login data', this.props.login.data, '::');

    return (
      <View style={{height: Metrics.screenHeight * 1}}>
        <View
          style={{
            backgroundColor: '#53D0FF',
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 4,
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.18,
            shadowRadius: 1.0,
          }}>
          <Image
            source={
              this.props.login.data?.data?.profile_img
              // ? this.props.login.data?.data.profile_img
              // : this.props.login.data.profile_img
            }
            style={styles.profile}
          />
          <Text style={styles.name}>
            {
              this.props.login.data?.data?.firstName
              // ? this.props.login.data?.data.firstName
              // : this.props.login.data.firstName
            }
          </Text>
          <View style={{marginBottom: Metrics.ratio(30)}}>
            <Text style={styles.mail}>
              {
                this.props.login.data?.data?.email
                // ? this.props.login.data?.data.email
                // : this.props.login.data.email
              }
            </Text>
          </View>
        </View>
        <ScrollView>
          <View
            style={styles.container}
            forceInset={{top: 'always', horizontal: 'never'}}>
            {this.renderBody()}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  myNavigation: state.navigations,
  login: state.login,
});

const actions = {drawerMenuSwitched};

export default connect(
  mapStateToProps,
  actions,
)(Sidebar);
