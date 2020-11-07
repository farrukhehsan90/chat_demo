import { Platform,  Alert, ToastAndroid, DeviceEventEmitter, BackHandler } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

class Util {

  isPlatformAndroid = () => Platform.OS === 'android';

  showToast(message: String) {
    if (this.isPlatformAndroid()) {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    }
  }

  showYesNoMessage(title, message, onYes, onNo) {
    setTimeout(() => {
      Alert.alert(
        title,
        message,
        [
          {
            text: 'Yes',
            onPress: onYes,
          },
          {
            text: 'No',
            onPress: onNo,
            style: 'cancel',
          },
        ],
        { cancelable: false },
      );
    }, 150);
  }

  showCommonMessage(
    title,
    message,
    onOkPressed = () => console.log('OK Pressed'),
  ) {
    Alert.alert(
      title,
      message,
      [
        {
          text: 'ok',
          onPress: onOkPressed,
        },
      ],
      { cancelable: false },
    );
  }

  showAlertWithDelay(title, message, delay = 150) {
    setTimeout(() => {
      this.showCommonMessage(title, message);
    }, delay);
  }

  isConnected() {
    let isConnected;
    NetInfo.addEventListener(state => {
      isConnected = state.isConnected;
    });
    return isConnected;
  }

}
export default new Util();
