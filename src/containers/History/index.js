import React, {Component} from 'react';
import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import {Header} from '../../components';
import {Images} from '../../theme';
import styles from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      callDetail: [
        {name: 'call', color: 'green', callMade: 'call-received'},
        {name: 'videocam', color: 'red', callMade: 'call-made'},
        {name: 'call', color: 'red', callMade: 'call-received'},
        {name: 'videocam', color: 'green', callMade: 'call-made'},
        {name: 'videocam', color: 'green', callMade: 'call-made'},
        {name: 'videocam', color: 'green', callMade: 'call-made'},
        {name: 'videocam', color: 'green', callMade: 'call-made'},
        {name: 'videocam', color: 'green', callMade: 'call-made'},
        {name: 'videocam', color: 'green', callMade: 'call-made'},
        {name: 'videocam', color: 'green', callMade: 'call-made'},
        {name: 'videocam', color: 'green', callMade: 'call-made'},
        {name: 'videocam', color: 'green', callMade: 'call-made'},
        {name: 'videocam', color: 'green', callMade: 'call-made'},
      ],
    };
  }

  render() {
    const {callDetail} = this.state;
    return (
      <View style={styles.container}>
        <Header
          headerText="Call History"
          leftIcon={Images.backarrow}
          rightIcon={Images.profileDp}
          leftBtnPress={() => this.props.navigation.goBack()}
        />
        <ScrollView>
          {callDetail.map(val => {
            return (
              <View style={styles.cardContainer}>
                <View>
                  <Image
                    source={Images.profileDp}
                    style={{height: 60, width: 60, borderRadius: 200}}
                  />
                </View>
                <View style={{paddingHorizontal: 15}}>
                  <Text style={{fontSize: 18}}>John</Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <MaterialIcons
                      name={val.callMade}
                      size={15}
                      color={val.color}
                      style={{marginRight: 10}}
                    />
                    <Text>Today, 3:58 PM</Text>
                  </View>
                </View>
                <View style={{flex: 1, alignItems: 'flex-end'}}>
                  <TouchableOpacity>
                    <MaterialIcons name={val.name} size={30} color={'green'} />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}
