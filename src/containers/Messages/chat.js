import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Header} from '../../components';
import {Metrics, Images, Fonts} from '../../theme';
import {GiftedChat, Message} from 'react-native-gifted-chat';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import io from 'socket.io-client';
// import io from 'socket.io-client/dist/socket.io';

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allMessages: null,
    };
  }

  async componentDidMount() {
    this.getMessages();
  }

  getMessages = async () => {
    // this.socket = await io('http://192.168.0.105:3000');
    this.socket = await io('https://convey-stg.herokuapp.com/');

    let allFilterMessages = [];

    let conversationId = this.props?.confoInfo?.convoId;

    this.socket.emit('filter-messages', conversationId);
    this.socket.on('getMessages', allMessages => {
      this.setState({
        allMessages: allMessages.reverse(),
      });
    });

    this.socket.on('message', msg => {
      console.log('::>>>>', msg, ':::');

      // console.log('conversation', msg, '<><>');
      // this.setState({conversations: msg.conversation});
    });
  };

  onSend(messages = []) {
    let msg = {
      to: this.props.user._id,
      from: this.props.login.data.data._id,
      msg: messages[0].text,
    };
    this.socket.emit('message', msg);
    this.getMessages();
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Header
          headerText={`${this.props.user.firstName} ${
            this.props.user.lastName
          }`}
          leftIcon={Images.backarrow}
          leftBtnPress={() => {
            Actions.pop();
          }}
          rightIcon={Images.profileDp}
          userImage={this.props.user.profile_img}
        />
        <View
          style={{
            flex: 1,
          }}>
          <GiftedChat
            messages={this.state.allMessages}
            onSend={messages => this.onSend(messages)}
            user={{
              _id: 1,
            }}
          />
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
)(Messages);
