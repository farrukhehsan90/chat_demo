import { Alert } from "react-native";

class SuccessHelper {
  handleSuccess(msg, doAlert) {
    if (doAlert) {
      if (msg) {
        Alert.alert("Success", msg);
      }
    }
  }
}

export default new SuccessHelper();
