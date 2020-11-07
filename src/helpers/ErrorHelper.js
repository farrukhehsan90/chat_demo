import { Alert } from "react-native";

class ErrorHelper {
  handleErrors(err, doAlert) {
    if (doAlert) {
      if (err) {
        Alert.alert("Error", err);
      }
    }
  }
}

export default new ErrorHelper();
