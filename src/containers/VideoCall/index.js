import React, {Component} from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import RtcEngine, {
  RtcLocalView,
  RtcRemoteView,
  VideoRenderMode,
} from 'react-native-agora';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import requestCameraAndAudioPermission from '../../components/Permission';
import InCallManager from 'react-native-incall-manager';
import styles from './style';
import {Metrics, Images} from '../../theme';

class VideoCall extends Component {
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
      callStatusMsg: 'Ringing',
      isTouchSupported: false,
      isVideoMute: false,
      show: true,
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
    console.log('-----------------------------------', this.props)
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

  init = async () => {
    const {appId} = this.state;
    this._engine = await RtcEngine.create(appId);
    await this._engine.enableVideo();
    // await this._engine.enableAudio()

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
        }, () => {
          if(!this.state.peerIds.length) {
            this.endCall()
          }
        });
      }
    });

    this._engine.addListener('UserOffline', (uid, reason) => {
      console.log('UserOffline', uid, reason);
      const {peerIds} = this.state;
      this.setState({
        // Remove peer ID from state array
        peerIds: peerIds.filter(id => id !== uid),
      });
    });

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

  handleMute = () => {
    this._engine.enableLocalAudio(!this.state.isAudioMuteed)
    this.setState({isAudioMuteed: !this.state.isAudioMuteed})
  }

  handleCameraSwitch =  () => {
    this._engine?.switchCamera()
  }

  handleCameraTorch = async () => {
    const isTouchSupported = await this._engine.isCameraTorchSupported()
    if(isTouchSupported) {
      await this._engine.setCameraTorchOn(!this.state.isTouchSupported)
    }
    
    this.setState({isTouchSupported: isTouchSupported ? !this.state.isTouchSupported: isTouchSupported})
  }

  handleMuteCamera = async () => {
     await this._engine.muteLocalVideoStream(!this.state.isVideoMute)
     this.setState({isVideoMute: !this.state.isVideoMute})
  }

  startCall = async () => {
    InCallManager.stop()
    InCallManager.stopRingtone()
    // Join Channel using null token and channel name
    await this._engine?.joinChannel(null, this.state.channelName, null, 0);
  };

  endCall = async () => {
    InCallManager.stop()
    InCallManager.stopRingtone()
    await this._engine?.leaveChannel();
    Actions.pop();
    this.setState({ joinSucceed: false});
  };

  _renderVideos = () => {
    const {joinSucceed, show, peerIds, isAudioMuteed, isTouchSupported, isVideoMute} = this.state;
    return true ? (
      <View>
        {/* <View style={styles.callHeaderContainer}>
          <Text style={styles.title}>Calling</Text>
          <Text style={[styles.title, {fontSize: Metrics.ratio(22)}]}>
            Alexinder
          </Text>
        </View> */}
        <TouchableOpacity>
          <View style={{height: Metrics.screenHeight * 0.87}}>
          <RtcLocalView.SurfaceView
              style={peerIds.length != 1 || peerIds.length != 0 ? styles.max :styles.remote}
              channelId={this.state.channelName}
              renderMode={VideoRenderMode.Hidden}
              zOrderMediaOverlay={true}
            />
            {peerIds.map(val => <RtcRemoteView.SurfaceView
                        style={styles.max}
                        uid={val}
                        channelId={this.state.channelName}
                        renderMode={VideoRenderMode.Hidden}
                        zOrderMediaOverlay={true}
                      />)}
            
            {this._renderRemoteVideos()}
          </View>
        </TouchableOpacity>
        <View style={styles.callFooterContainer}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity onPress={this.handleCameraSwitch}>
              <MaterialIcons name={'switch-camera'} size={35} color={'white'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.handleCameraTorch}>
               <MaterialIcons name={isTouchSupported ? 'flash-on' :'flash-off'} size={35} color={'white'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.handleMuteCamera}>
               <Feather name={isVideoMute ? 'camera' : 'camera-off'} size={32} color={'white'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.handleMute}>
               <MaterialIcons name={ !isAudioMuteed ? 'mic-off': 'mic-none'} size={35} color={'white'} />  
            </TouchableOpacity>
          </View>
          {/* <Image source={Images.search} style={{height: 20, width: 20}} /> */}
        </View>
      </View>
    ) : null;
  };

  _renderRemoteVideos = () => {
    const {joinSucceed, show, roomType, members, isSpeakerEmabled, isAudioMuteed, callStatusMsg, peerIds} = this.state;
    const callFalg = this.props.data.userId === this.props.login.data.data._id;
    return (
      <View style={{height:'100%',width:'100%', position:'absolute'}} >
                    <MaterialIcons
                      name={'person'}
                      size={80}
                      color={'white'}
                      style={styles.profileIcon}
                    />
                    <Text
                      style={[
                        styles.title,
                        {fontSize: Metrics.ratio(20), marginTop: 5},
                      ]}>
                      {roomType == 'group'
                        ? this.props.roomData.roomName
                        : members[0]?.firstName}
                    </Text>
                    <Text style={[styles.title, {fontSize: Metrics.ratio(14)}]}>
                     {callStatusMsg || ''}
                    </Text>
                  <View style={[styles.smallCallContainer, {backgroundColor:'yellow', justifyContent:'center', position: 'absolute', bottom:100}]}>
                    <TouchableOpacity onPress={this.endCall} style={styles.endCallIcon}>
                      <MaterialIcons
                        name={'call-end'}
                        size={50}
                        color={'white'}
                        style={{
                          textAlign: 'center',
                        }}
                      />
                    </TouchableOpacity >
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
                    {/* <View style={{height:100, width: 100, backgroundColor:'red'}}>
                      <RtcRemoteView.SurfaceView
                        style={styles.remote}
                        uid={value}
                        channelId={this.state.channelName}
                        renderMode={VideoRenderMode.Hidden}
                        zOrderMediaOverlay={true}
                      />
                    </View> */}
                  </View>
      </View>
    );
  };
  render() {
    return (
      <View style={styles.max}>
        {/* <View style={styles.buttonHolder}>
                        <TouchableOpacity
                            onPress={this.startCall}
                            style={styles.button}>
                            <Text style={styles.buttonText}> Start Call </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.endCall}
                            style={styles.button}>
                            <Text style={styles.buttonText}> End Call </Text>
                        </TouchableOpacity>
                    </View> */}
        {this._renderVideos()}
      </View>
    );
  }
}

const mapStateToProps = state => ({login: state.login});

const action = {};

export default connect(
  mapStateToProps,
  action,
)(VideoCall);
