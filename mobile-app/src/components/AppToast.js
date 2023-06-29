import { Center, Text } from "native-base";
import { Animated } from "react-native";
import AppStyles from "../assets/AppStyles";

const AppToast = (props) => {
    return (
        <Animated.View style={{ opacity: props.opacity }}>
            <Center style={[AppStyles.feedback]}>
                <Text color={"#FFFFFF"} fontSize={17} fontWeight={400}>{props.msg}</Text>
            </Center>
        </Animated.View>
    )
}

export default AppToast;