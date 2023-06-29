import { Keyboard } from "react-native";
import { TouchableWithoutFeedback } from "react-native";

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}> 
        {children}
    </TouchableWithoutFeedback>
);

export default DismissKeyboard;