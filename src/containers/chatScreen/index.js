// @flow
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import styles from './styles';
import {Header, SpinnerLoader} from '../../components';
import {Metrics, Images, z} from '../../theme';
import {Actions} from 'react-native-router-flux';
import {request as get_all_user} from '../../redux/actions/Alluser';
import io from 'socket.io-client';
import {TabView, SceneMap} from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import {socket as baseUrl} from '../../config/WebServices';

let filterArray = [];

class chatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: null,
      isloading: false,
      conversations: null,
      previousIndex: null,
      routeIndex: 0,
      searchText: '',
      searchTextUser: '',
      selectedUser: [],
      chatRooms: [],
      showTick: false,
      name: '',
    };
  }

  onChangeGroupName = value => this.setState({name: value});
  
  componentDidMount() {
    // this.getLocationHandler();
    const {login, socialLogin} = this.props;
    if (login.data && login.data.success) {
      this.setState({user: login.data.data});
      this.newChat(login.data.data)
    } else if (socialLogin.data && socialLogin.data.success) {
      this.setState({user: socialLogin.data.data});
    }
  }

  
  newChat = (user) => {
    this.socket = io(baseUrl);
    this.socket.on('newChat', newData => {

      if(newData.roomData ) {
         if(newData.type === 'audioCall') {
            Actions.AudioCall({data:newData, roomData: newData.roomData})
          } else if (newData.type === 'videoCall') {
            Actions.VideoCall({data:newData, roomData: newData.roomData})
        }
      }
    });
  };

  
  componentWillReceiveProps(nextProps) {
    const {user} = this.state;

    if (nextProps.user) {

      if (
        !nextProps.user.failure &&
        !nextProps.user.isFetching &&
        nextProps.user.data.data &&
        nextProps.user.data.success === true
      ) {
        this.setState({allUsers: nextProps.user.data.data});
        this.socket.emit('sign-in', user);

        this.setState({isloading: false});
      }
    }
  }
  _renderOverlaySpinner = () => {
    const {isloading} = this.state;
    return <SpinnerLoader isloading={isloading} />;
  };
  async componentWillMount() {
    const {login, socialLogin} = this.props;
    this.socket = await io(baseUrl);
    this._getRooms();

    this.socket.on('getAll', msg => {
      let filterUsers = [];
      let filterArray = [];
    

      this.setState({
        messages: msg,
      });
      const itemss =
        msg.conversation &&
        msg.conversation.filter(item => {
          if (
            item?.creator?._id === this.props.login.data.data._id ||
            item?.receiver?._id === this.props.login.data.data._id
          ) {
            filterArray.push(item);
          }
        });
      this.setState({conversations: msg.conversation, filterArray});
    });

    if (login.data && login.data.success) {
      this.setState({user: login.data.data}, () => {
        this.getData();
      });
    } else if (socialLogin.data && socialLogin.data.success) {
      this.setState({user: socialLogin.data.data}, () => {
        this.getData();
      });
    }
  }

  _getRooms = () => {
    const {login, socialLogin} = this.props;
    if (login.data.data && this.socket) {
      this.socket.emit('find-rooms', login.data.data._id);
      this.socket.on('getRooms', async chatRooms => {
        
        this.setState({chatRooms, refreshing: false});
      });
    }
  };

  componentWillUnmount() {
    filterArray.length = 0;
  }


  getData = () => {
    const {user} = this.state;
    this.setState({isloading: true});
    const data = {access_token: user.access_token};
    this.props.get_all_user(data);
  };

  tab = (txt, activation, index, routeindex) => {
    return (
      <View style={{width: Metrics.screenWidth * 0.5}}>
        {index !== routeindex && (
          <TouchableOpacity
            style={{
              height: Metrics.ratio(50),
              paddingVertical: Metrics.ratio(15),
              justifyContent: 'center',
              alignItems: 'center',
            }}
            // style={{ borderBottomColor: 'black', borderBottomWidth: Metrics.ratio(2) }}
            onPress={() => {

              this.setState({
                activeNavigation: activation,
                previousIndex: routeindex,
                routeIndex: index,
              });
              // Actions.ownProject();
            }}>
            <Text style={{height: Metrics.ratio(20)}}>{txt}</Text>
          </TouchableOpacity>
        )}

        {index === routeindex && (
          <TouchableOpacity
            style={{
              backgroundColor: '#cbd1db',
              height: Metrics.ratio(50),
              paddingVertical: Metrics.ratio(15),
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomWidth: Metrics.ratio(1),
            }}
            onPress={() => {
              this.setState({
                activeNavigation: activation,
                previousIndex: routeindex,
                routeIndex: index,
              });
              // Actions.ownProject();
            }}>
            <Text style={{height: Metrics.ratio(20)}}>{txt}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };
  renderNavigateButton = () => {
    const {activeNavigation, index} = this.state;
    return (
      <View
        style={{
          // marginHorizontal: Metrics.ratio(25),
          backgroundColor: '#fff',
          flexDirection: 'row',
          justifyContent: 'center',
          //   paddingTop: Metrics.ratio(15),
          height: Metrics.ratio(50),
          // width: Metrics.screenWidth * 0.865,
        }}>
        <ScrollView
          style={{}}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          {this.tab('CHATS', true, 0, this.state.routeIndex)}
          {this.tab('NEW USERS', false, 1, this.state.routeIndex)}
        </ScrollView>
      </View>
    );
  };

  showtab = () => {
    let route = {
      index: this.state.routeIndex,
      routes: [
        {key: 'first', title: 'ReportAgencyScreen'},
        {key: 'second', title: 'ReportIndividualScreen'},
      ],
    };
    return (
      <TabView
        navigationState={route}
        animationEnabled={true}
        // swipeEnabled={index => this.handleTapChange(index)}
        renderScene={SceneMap({
          first: this.FirstRoute,
          second: this.SecondRoute,
        })}
        onIndexChange={index => this.handleTapChange(index)}
        initialLayout={{width: Metrics.screenWidth}}
        renderTabBar={() => {
          return <View>{this.renderNavigateButton()}</View>;
        }}
      />
    );
  };

  handleTapChange = index => {
    this.setState({routeIndex: index});
  };

  refreshingData() {
    this.setState({refreshing: true});
    this._getRooms();
  }

  FirstRoute = user => {
    let removeDuplicateValues;
    const {
      filterArray,
      chatRooms,
      refreshing,
      searchTextUser,
      allUsers,
      selectedUser,
      showTick,
    } = this.state;
    let filterTextUser = [];
    if (searchTextUser) {
      filterTextUser = chatRooms.filter(user => {
        if (user.roomType === 'group') {
          return user.roomName
            .toLowerCase()
            .includes(searchTextUser.toLowerCase());
        } else {
          const userData = user?.usersInfo?.find(
            el => el._id != this.props.login.data.data._id,
          );
          return userData.firstName
            .toLowerCase()
            .includes(searchTextUser.toLowerCase());
        }
      });
    } else {
      filterTextUser = chatRooms;
    }
    return (
      <View>
        <View style={[styles.convoHead, {paddingHorizontal: 20}]}>
          <Image source={Images.search} style={styles.convoImg} />
          <TextInput
            style={{width: Metrics.screenWidth}}
            onChangeText={searchTextUser =>
              this.setState({searchTextUser}, () =>
                console.log(searchTextUser, 'ffffffff'),
              )
            }
            placeholder={'Search'}
          />
        </View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={{height: Metrics.screenHeight * 0.745}}
          refreshControl={
            <RefreshControl
              style={{backgroundColor: 'transparent'}}
              refreshing={!!refreshing}
              onRefresh={() => {
                this.refreshingData();
              }}
            />
          }>
          {chatRooms && filterTextUser.map(room => this.renderusers(room))}
          {/* {
            (filterArray && (removeDuplicateValues = [...new Set(filterArray)]),
            removeDuplicateValues &&
              removeDuplicateValues.map(user => this.renderusers(user)))
          } */}
          {/* {filterArray && filterArray.map(user => this.renderusers(user))} */}
        </ScrollView>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            backgroundColor: '#f2f2f2',
            width: Metrics.screenWidth,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              margin: Metrics.ratio(10),
            }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('History')}
              style={{
                paddingVertical: 10,
                width: Metrics.screenWidth * 0.4,
                borderRadius: 30,
                backgroundColor: '#83d2e6',
              }}>
              <Text style={{color: '#fff', fontSize: 18, textAlign: 'center'}}>
                Call History
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      // <View style={{marginBottom: Metrics.ratio(80)}}>
      //   {(!this.state.conversations || this.state.conversations.length == 0) && (
      //     <View style={styles.nochatHead}>
      //       <Text style={styles.nochatTxt}>No Chats</Text>
      //     </View>
      //   )}
      //   <ScrollView>
      //     {/* {allUsers && allUsers.map(user => this.renderusers(user))} */}
      //   </ScrollView>
      // </View>
    );
  };

  roomCreate = async () => {
    const {selectedUser, name} = this.state;

    const {login} = this.props;
    this.socket = await io(baseUrl);
    this.socket.emit('createRoom', {
      roomType: 'group',
      roomName: name,
      users: [...selectedUser, login.data.data],
    });
    this.setState({selectedUser: []});
    this.socket.on('getRoom', data => {
      Actions.Messages({user: data});
    });
    this.setState({setModalVisible: false});
  };

  oneRoomCreate = async user => {
    let {selectedUser} = this.state;
    let {login} = this.props;
    this.socket = await io(baseUrl);
    this.socket.emit('createRoom', {
      roomType: 'ptp',
      users: [...user, login.data.data],
    });
    this.setState({selectedUser: []});
    this.socket.on('getRoom', data => {
      Actions.Messages({user: data});
    });
  };

  SecondRoute = () => {
    const {searchText, allUsers, selectedUser, showTick} = this.state;
    let filterText = [];
    if (searchText) {
      filterText = allUsers.filter(user =>
        user.firstName.toLowerCase().includes(searchText.toLowerCase()),
      );
    } else {
      filterText = allUsers;
    }
    return (
      <View>
        <View style={[styles.convoHead, {paddingHorizontal: 20}]}>
          <Image source={Images.search} style={styles.convoImg} />
          <TextInput
            style={{width: Metrics.screenWidth}}
            onChangeText={searchText => this.setState({searchText})}
            placeholder={'Search'}
          />
        </View>
        <ScrollView style={{height: Metrics.screenHeight * 0.745}}>
          {this.state.allUsers &&
            filterText.map(user => this.renderusers2(user))}
        </ScrollView>
        {/* {selectedUser && !!selectedUser.length && (
        )}  */}
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            backgroundColor: '#f2f2f2',
            width: Metrics.screenWidth,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: Metrics.ratio(10),
            }}>
            <TouchableOpacity
              onPress={() => this.setState({showTick: !showTick})}
              style={{
                paddingVertical: 10,
                width: Metrics.screenWidth * 0.4,
                borderRadius: 30,
                backgroundColor: '#83d2e6',
              }}>
              <Text style={{color: '#fff', fontSize: 18, textAlign: 'center'}}>
                {showTick ? 'Remove' : 'Create Group'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              // onPress={() => this.roomCreate}
              onPress={() =>
                selectedUser && selectedUser.length < 1
                  ? Alert.alert('Please select group first')
                  : this.setState({setModalVisible: true})
              }
              style={{
                paddingVertical: 10,
                width: Metrics.screenWidth * 0.4,
                borderRadius: 30,
                backgroundColor: '#83d2e6',
              }}>
              <Text style={{color: '#fff', fontSize: 18, textAlign: 'center'}}>
                Start
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  gettingMessages = async (users, messages) => {
    // let allFilterMessages = [];
  };

  renderusers = user => {
    // const {usersInfo} = user;
    const userData = user?.usersInfo?.find(
      el => el._id != this.props.login.data.data._id,
    );
    // let allFilterMessages = [];
    // let convoInfo = [];
    // let obj = {};

    // let receiver =
    //   user.creator._id === this.props.login.data.data._id
    //     ? user.receiver
    //     : user.creator;

    return (
      <View>
        <TouchableOpacity
          style={styles.statuscard}
          onPress={() => {
            Actions.Messages({user});
          }}>
          <View style={{flexDirection: 'row', paddingHorizontal: 8}}>
            <View
              style={[
                styles.image,
                {alignItems: 'center', justifyContent: 'center'},
              ]}>
              {user?.roomType == 'group' ? (
                <Text
                  style={[styles.text, styles.author, {textAlign: 'center'}]}>
                  {user?.roomName[0]}
                </Text>
              ) : (
                <Image
                  source={
                    userData?.profile_img
                      ? {uri: userData.profile_img}
                      : require('./../../assets/Images/profile_dp.png')
                  }
                  style={styles.image}
                />
              )}
            </View>
            <View style={{marginLeft: 12, flex: 1, justifyContent: 'center'}}>
              <View>
                <Text style={[styles.text, styles.author]}>
                  {user?.roomType == 'group'
                    ? user.roomName
                    : userData?.firstName}
                </Text>
              </View>
              {user?.roomType != 'group' && (
                <View>
                  <Text style={[styles.text, styles.title]}>
                    {userData?.email}
                  </Text>
                </View>
              )}
            </View>
            <View>
              {/* <View style={{alignItems: 'flex-end'}}>
                <Text style={[styles.text, styles.time]}>1m</Text>
              </View>
              <View style={{marginTop: Metrics.ratio(10)}}>
                <Text style={[styles.text, styles.unread]}>2</Text>
              </View> */}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  handleSelectUser = user => {
    const {selectedUser} = this.state;
    const isFind = selectedUser.find(data => data._id == user._id);
    if (isFind) {
      const newArr = [];
      selectedUser.forEach(val => {
        if (val._id !== user._id) {
          newArr.push(val);
        }
      });
      this.setState({selectedUser: newArr});
    } else {
      const arr = [...selectedUser, {...user}];
      this.setState({selectedUser: arr});
    }
  };

  renderusers2 = user => {
    const {selectedUser, showTick} = this.state;
    const isSelected = selectedUser.find(data => data._id == user._id);

    return (
      <View>
        <TouchableOpacity
          style={styles.statuscard}
          onPress={() => {
            showTick ? this.handleSelectUser(user) : this.oneRoomCreate([user]);
          }}>
          <View style={{flexDirection: 'row', paddingHorizontal: 8}}>
            <Image source={{uri: user.profile_img}} style={styles.image} />
            <View style={{marginLeft: 12, flex: 1}}>
              <View>
                <Text style={[styles.text, styles.author]}>
                  {user.firstName}
                </Text>
              </View>
              <View>
                <Text style={[styles.text, styles.title]}>{user.email}</Text>
              </View>
            </View>
            {showTick && (
              <View style={{justifyContent: 'center'}}>
                <Icon
                  size={20}
                  color={isSelected ? '#83d2e6' : '#d1d1d1'}
                  name={'check-circle-o'}
                />
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  renderChats = user => {
    return (
      <View>
        <TouchableOpacity
          style={styles.statuscard}
          onPress={() => {
            // alert("Sf")
            Actions.Messages({user});
          }}>
          <View style={{flexDirection: 'row', paddingHorizontal: 8}}>
            <Image source={{uri: user.profile_img}} style={styles.image} />
            <View style={{marginLeft: 12, flex: 1}}>
              <View>
                <Text style={[styles.text, styles.author]}>
                  {user.firstName}
                </Text>
              </View>
              <View>
                <Text style={[styles.text, styles.title]}>{user.email}</Text>
              </View>
            </View>
            <View>
              <View style={{alignItems: 'flex-end'}}>
                <Text style={[styles.text, styles.time]}>1m</Text>
              </View>
              <View style={{marginTop: Metrics.ratio(10)}}>
                <Text style={[styles.text, styles.unread]}>2</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  renderPopup = () => {
    const {modalVisible} = this.setState;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{marginHorizontal: Metrics.ratio(15), marginVertical: 15}}>
              <TouchableOpacity
                onPress={() => this.setState({setModalVisible: false})}>
                <Image
                  source={Images.cross}
                  style={{height: 20, width: 20, alignSelf: 'flex-end'}}
                />
              </TouchableOpacity>

              <Text style={styles.modalText}>Group Name</Text>
              <TextInput
                style={styles.input}
                onChangeText={value => this.onChangeGroupName(value)}
                placeholder={'Enter group name'}
                value={this.state.name}
              />
              <TouchableOpacity
                // onPress={() => this.roomCreate}
                onPress={() => this.roomCreate()}
                style={{
                  paddingVertical: 5,
                  width: Metrics.screenWidth * 0.15,
                  borderRadius: 30,
                  backgroundColor: '#83d2e6',
                  alignSelf: 'flex-end',
                }}>
                <Text
                  style={{color: '#fff', fontSize: 14, textAlign: 'center'}}>
                  OK
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  render() {
    const {setModalVisible} = this.state;
    return (
      <View style={styles.container}>
        <Header
          headerText="Conversation"
          leftIcon={Images.navBar}
          rightIcon={Images.profileDp}
          leftBtnPress={() => this.props.navigation.openDrawer()}
        />

        {/* <View style={{ marginBottom: Metrics.ratio(80) }}>
                <View style={styles.convoHead}>
                        <Image source={Images.plusBlue} style={ styles.convoImg} />
                        <Text style={styles.convoTxt}>Start New Conversation</Text>
                    </View>
                    <ScrollView >

                        {allUsers && allUsers.map(user => this.renderusers(user))}

                    </ScrollView>
                </View> */}
        {setModalVisible ? this.renderPopup() : null}
        {this.showtab()}
        {this._renderOverlaySpinner()}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  //   user: state.userReducer.user,
  //   washHistory: state.washHistory,
  login: state.login,
  socialLogin: state.socialLogin,
  user: state.allUser,
});

const actions = {
  // get_wash_history
  get_all_user,
};

export default connect(
  mapStateToProps,
  actions,
  // {pure: false},
)(chatScreen);
