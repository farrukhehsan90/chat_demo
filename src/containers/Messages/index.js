import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  FlatList,
  Dimensions,
 
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SendIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Metrics, Images, Fonts} from '../../theme';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import io from 'socket.io-client';
import Sound from 'react-native-sound';
import styles from './style';
import { socket as baseUrl } from '../../config/WebServices'

const {width, height} = Dimensions.get('window');

// const allMessages = [];

class Chat extends Component {
  sound = new Sound('ringtone.mp3');
  constructor(props) {
    super(props);
    this.state = {
      oldMessages: null,
      allMessages: [],
      msg: '',
      conversationId: null,
      roomType:'',
      members:[]
    };
    this.onSend = this.onSend.bind(this);
    this.renderItem = this._renderItem.bind(this);
  }

  async componentDidMount() {
    const { roomType, usersInfo } = this.props.user
    const members = usersInfo.filter(el => el._id != this.props.login.data.data._id)
    this.setState({members, roomType })
    this.getMessages();
   
  }

  handlePress() {
    this.sound.play()
  }
  handleStop = () => {
    this.sound.pause()
  }

  getMessages = () => {
    console.log('Chat -> getMessages -> getMessages--------------------');
    this.socket = io(baseUrl);
    // this.socket = io('https://convey-stg.herokuapp.com');

    let conversationId = this.props?.user?._id;
    // let conversationId = convoId ? convoId : newMessage.msg.conversationId;

    this.socket.emit('findMsgs', this.props?.user?._id);

    this.socket.on('getMessages', allMessages => {
      if (conversationId) {
        if (conversationId == allMessages[0]?.roomId) {
          this.setState({
            allMessages: allMessages,
            oldMessages: null,
            conversationId: conversationId,
          });
        }
      }
    });
  };

  onSend() {
    this.socket = io(baseUrl);
    // this.socket = io('https://convey-stg.herokuapp.com');

    let msg = {
      roomId: this.props.user._id,
      userId: this.props.login.data.data._id,
      type: 'text',
      msg: this.state.msg,
    };
    this.socket.emit('sentMsg', msg);
    this.setState({
      msg: '',
    });
  }

  onAudioCall = () => {
    this.socket = io(baseUrl);
    // this.socket = io('https://convey-stg.herokuapp.com');

    let msg = {
      roomId: this.props.user._id,
      userId: this.props.login.data.data._id,
      type: 'audioCall',
    };
    this.socket.emit('sentMsg', msg);
  };

  onVideoCall = () => {
    this.socket = io(baseUrl);
    // this.socket = io('https://convey-stg.herokuapp.com');

    let msg = {
      roomId: this.props.user._id,
      userId: this.props.login.data.data._id,
      type: 'videoCall',
    };
    this.socket.emit('sentMsg', msg);
  };

  componentWillUnmount() {
    this.setState({oldMessages: null, allMessages: null});
  }

  _renderItem = ({item}) => {

    if (item.type !== 'text') {
      if (this.props.login.data.data._id === item.userId) return;
      if (item.type === 'videoCall') {
        return (
          <View
            style={{
              width: '100%',
              marginVertical: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                backgroundColor: '#dbdbdb',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 7,
              }}>
              <Feather size={15} color={'red'} name={'video'} />
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 'bold',
                  marginHorizontal: 5,
                }}>{`Missed voice call at ${moment(item.createdDate).format(
                'h:mm a',
              )}`}</Text>
            </View>
          </View>
        );
      }
      return (
        <View style={{width: '100%', marginVertical: 10, alignItems: 'center'}}>
          <View
            style={{
              backgroundColor: '#dbdbdb',
              flexDirection: 'row',
              justifyContent: 'center',
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 7,
            }}>
            <MaterialIcons name={'phone-missed'} size={15} color={'red'} />
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                marginHorizontal: 5,
              }}>{`Missed voice call at  ${moment(item.createdDate).format(
              'h:mm a',
            )}`}</Text>
          </View>
        </View>
      );
    }

    if (item.userId !== this.props.login.data.data._id) {
      return (
        <View style={styles.eachMsg}>
          {/* <Image source={{uri: item.image}} style={styles.userPic} /> */}
          <View style={styles.msgBlock}>
            <Text style={styles.msgTxt}>{item.msg}</Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.rightMsg}>
          <View style={styles.rightBlock}>
            <Text style={styles.rightTxt}>{item.msg}</Text>
          </View>
          {/* <Image source={{uri: item.image}} style={styles.userPic} /> */}
        </View>
      );
    }
  };

  renderHeader = () => {
    const { user, members, roomType  } = this.state
    console.log("Messages -> render -> user", user)

    return (
      <View
        style={[
          styles.container1,
          Platform.OS === 'ios' && {paddingTop: Metrics.screenHeight * 0.035},
          {justifyContent: 'space-between'},
        ]}>
        <TouchableOpacity
          style={styles.TouchableMenu}
          onPress={() => {
            Actions.pop();
          }}>
          <Image
            source={Images.backarrow}
            style={{width: Metrics.ratio(40), height: Metrics.ratio(40)}}
          />
        </TouchableOpacity>

        <View style={[styles.headerTextView]}>
          {!this.props?.user.profile_img && (
            <Image
              source={Images.logo}
              style={{width: Metrics.ratio(45), height: Metrics.ratio(45)}}
            />
          )}
          <Text style={[styles.headerText1]}>{roomType == 'group' ? this.props.user.roomName : members[0]?.firstName}</Text>
        </View>

        <View style={{width: 100, flexDirection: 'row'}}>
          <TouchableOpacity
            style={[styles.TouchableMenu, {flexDirection: 'row-reverse'}]}
            onPress={() => {
              this.onAudioCall();
            }}>
            <Ionicons size={30} name={'call-outline'} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.TouchableMenu}
            onPress={() => {
              this.onVideoCall();
              //Actions.VideoCall()
            }}>
            <Feather size={30} name={'video'} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    const {
      allMessages,
      messages,
      oldMessages,
      msg,
      receiverId,
      noChat,
      userInfo,
      path,
      isAudio,
    } = this.state;
    const {user} = this.props;
    return (
      <View style={{flex: 1}}>
        {this.renderHeader()}
        
        <ScrollView
          ref="scrollView"
          style={{flex: 1}}
          onContentSizeChange={(width, height) =>
            this.refs.scrollView.scrollTo({y: height})
          }>
          {/* <View style={{flex: 1, backgroundColor: 'red'}} /> */}

          <FlatList
            onMomentumScrollEnd={event => {
              let sliderIndex = event.nativeEvent.contentOffset.x
                ? event.nativeEvent.contentOffset.x / width
                : 0;
              this.setState({sliderIndex});
            }}
            style={styles.list}
            extraData={this.state}
            data={oldMessages ? oldMessages : allMessages}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this.renderItem}
            // ListHeaderComponent={this.renderHeader}
            // stickyHeaderIndices={[0]}
          />
        </ScrollView>

        <View style={styles.footer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="Write a message..."
              underlineColorAndroid="transparent"
              onChangeText={msg => this.setState({msg})}
              value={msg}
            />
          </View>

          {/* SEND TEXT */}
          {this.state.msg ? (
            <TouchableOpacity
              style={styles.btnSend}
              onPress={() => this.onSend()}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                }}>
                <SendIcon color={'white'} size={hp('2.5%')} name="send-o" />
              </View>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  login: state.login,
  // socialLogin: state.socialLogin,
});

const action = {
  // login_user,
  // socialLoginRequest,
  // drawerMenuSwitched
};

export default connect(
  mapStateToProps,
  action,
)(Chat);
