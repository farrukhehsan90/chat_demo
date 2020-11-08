import React, {Component} from 'react';
import {
  ImageBackground,
  Platform,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import RtcEngine, {
} from 'react-native-agora';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import InCallManager from 'react-native-incall-manager';
import {Metrics, Images, Fonts} from '../../theme';
import requestCameraAndAudioPermission from '../../components/Permission';
import styles from './styles';

class AudioCall extends Component {
  constructor(props) {
    super(props);

    this.state = {
      appId: '8e49a5fdb5c04c35973389bdd333f472',
      channelName: this.props.data._id,
      joinSucceed: false,
      peerIds: [],
      members: [],
      isSpeakerEmabled: true,
      isAudioMuteed: true,
      callStatusMsg: 'Ringing'
    };
    if (Platform.OS === 'android') {
      // Request required permissions from Android
      requestCameraAndAudioPermission().then(() => {
        console.log('requested!');
      });
    }
    this._engine = RtcEngine;
  }

  componentDidMount() {
    
    const {roomType, usersInfo} = this.props.roomData;
    const members = usersInfo.filter(
      el => el._id != this.props.login.data.data._id,
    );

    this.setState({members, roomType});
    this.init();
  }

  startAutoCall = () => {
    if (this.props.data.userId === this.props.login.data.data._id) {
      this.startCall();
    } else {
      InCallManager.startRingtone('_BUNDLE_')
    }
  };

  /**
   * @name init
   * @description Function to initialize the Rtc Engine, attach event listeners and actions
   */
  init = async () => {
    const {appId} = this.state;
    this._engine = await RtcEngine.create(appId);
    // await this._engine.enableVideo()
    await this._engine.enableAudio();

    this._engine.addListener('Warning', warn => {
      console.log('Warning', warn);
    });

    this._engine.addListener('Error', err => {
      console.log('Error', err);
    });

    this._engine.addListener('UserJoined', (uid, elapsed) => {
      console.log('UserJoined', uid, elapsed);
      // Get current peer IDs
      const {peerIds} = this.state;
      // If new user
      if (peerIds.indexOf(uid) === -1) {
        this.setState({
          // Add peer ID to state array
          peerIds: [...peerIds, uid],
          callStatusMsg:'Connected'
        });
      }
    });

    this._engine.addListener('UserOffline', (uid, reason) => {
      console.log('UserOffline', uid, reason);
      const {peerIds} = this.state;
      this.setState({
        // Remove peer ID from state array
        peerIds: peerIds.filter(id => id !== uid),
      }, () => {
          if(!this.state.peerIds.length) {
            this.endCall()
          }
        });
    });

    handleDisconnect = () => {
      const {peerIds} = this.state;
      if(!this.state.peerIds.length) {
        this.endCall()
      }
    }

    // If Local user joins RTC channel
    this._engine.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
      console.log('JoinChannelSuccess', channel, uid, elapsed);
      // Set state variable to true
      this.setState({
        joinSucceed: true,
      });
    });

    this.startAutoCall();
  };

  speakerToggle = async () => {
    const isEmabled = await this._engine.isSpeakerphoneEnabled()
    if(isEmabled) {
      InCallManager.start({media: 'audio'})
    } else {
      InCallManager.stop()
    }
    this.setState({isSpeakerEmabled: isEmabled})
    this._engine.setEnableSpeakerphone(!isEmabled)
  }

  handleMute = () => {
    this._engine.enableLocalAudio(!this.state.isAudioMuteed)
    this.setState({isAudioMuteed: !this.state.isAudioMuteed})
  }

  startCall = async () => {
    // Join Channel using null token and channel name
    InCallManager.stopRingtone()
    InCallManager.start({media: 'audio'})
    await this._engine?.joinChannel(null, this.state.channelName, null, 0);
  };

  endCall = async () => {
    
    InCallManager.stop()
    InCallManager.stopRingtone()
    await this._engine?.leaveChannel();
    Actions.pop();
    this.setState({joinSucceed: false});
  };

  _renderVideos = () => {
    const {joinSucceed, show, roomType, members, isSpeakerEmabled, isAudioMuteed, callStatusMsg} = this.state;
    const callFalg = this.props.data.userId === this.props.login.data.data._id;
    return true ? (
      <View style={{flex: 1}}>
        <View style={styles.callHeaderContainer}>
          <TouchableOpacity>
            <Image
              source={Images.backarrow}
              style={{width: Metrics.ratio(40), height: Metrics.ratio(40)}}
            />
          </TouchableOpacity>
          <View style={{marginLeft: Metrics.screenWidth * 0.34}}>
            <Text style={styles.title}>{callStatusMsg || ''}</Text>
            <Text style={[styles.title, {fontSize: Metrics.ratio(22)}]}>
              {roomType == 'group'
                ? this.props.roomData.roomName
                : members[0]?.firstName}
            </Text>
          </View>
        </View>
        <View>
          <ImageBackground
            source={Images.coverImage}
            style={{
              height: Metrics.screenHeight * 0.77,
              width: Metrics.screenWidth,
            }}>
            <View
              style={{
                marginTop: Metrics.screenHeight * 0.65,
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                paddingHorizontal: Metrics.screenWidth * 0.1,
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({show: !show});
                  this.endCall();
                }}
                style={styles.endCallIcon}>
                <MaterialIcons
                  name={'call-end'}
                  size={30}
                  color={'white'}
                  style={{
                    textAlign: 'center',
                  }}
                />
              </TouchableOpacity>
              {!callFalg && !joinSucceed && (
                <TouchableOpacity
                  onPress={() => {
                    this.startCall();
                  }}
                  style={[styles.endCallIcon, {backgroundColor: 'green'}]}>
                  <MaterialIcons
                    name={'call-end'}
                    size={30}
                    color={'white'}
                    style={{
                      textAlign: 'center',
                    }}
                  />
                </TouchableOpacity>
              )}
            </View>
          </ImageBackground>
        </View>
        <View style={styles.callFooterContainer}>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <TouchableOpacity onPress={() => this.speakerToggle()}>
               <MaterialIcons name={ isSpeakerEmabled ? 'volume-up': 'volume-off'} size={35} color={'white'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.handleMute}>
               <MaterialIcons name={ !isAudioMuteed ? 'mic-off': 'mic-none'} size={35} color={'white'} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    ) : null;
  };

  //   _renderRemoteVideos = () => {
  //     const {peerIds} = this.state;
  //     return (
  //       <ScrollView
  //         style={styles.remoteContainer}
  //         contentContainerStyle={{paddingHorizontal: 2.5}}
  //         horizontal={true}>
  //         {peerIds.map((value, index, array) => {
  //           return (
  //             <View>
  //                 <Text>ssssssssssss</Text>
  //             </View>
  //           );
  //         })}
  //       </ScrollView>
  //     );
  //   };

  render() {
    return (
      <View style={styles.max}>
        {/* <View style={styles.buttonHolder}>
            <TouchableOpacity onPress={this.startCall} style={styles.button}>
              <Text style={styles.buttonText}> Start Call </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.endCall} style={styles.button}>
              <Text style={styles.buttonText}> End Call </Text>
            </TouchableOpacity>
          </View> */}
        {this._renderVideos()}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  login: state.login,
});

const action = {};

export default connect(
  mapStateToProps,
  action,
)(AudioCall);
