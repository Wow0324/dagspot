import { Center, Text, View } from "native-base";
import { ActivityIndicator } from "react-native";
import AppStyles from "../assets/AppStyles";

const AppSpinner = (props) => {
    return (
        <>
            <View flex={1} style={AppStyles.overlay}></View>
            <View flex={1} style={AppStyles.overlayfront}>
                <Center flex={1} style={AppStyles.spinner}>
                    <ActivityIndicator color={"#FFFFFF"} />
                    <View style={AppStyles.spinnerText}>
                        <Text style={AppStyles.loadingText}>{props.msg}</Text>
                    </View>
                </Center>
            </View>
            
        </>
    )
};

export default AppSpinner;