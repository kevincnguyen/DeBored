import { TouchableWithoutFeedback, Keyboard } from "react-native";

/*
 * Wrap around components to dismiss keyboard clicking them
 */
const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback
    onPress={() => Keyboard.dismiss()}
    accessible={false}
  >
    {children}
  </TouchableWithoutFeedback>
);

export default DismissKeyboard;
