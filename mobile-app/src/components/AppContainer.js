import { View } from 'native-base';
import { ImageBackground, StyleSheet } from 'react-native';
import { AppImage } from '../assets/AppImage';

const AppContainer = (props) => {
    return (
        <View>
            {/* <ImageBackground source={AppImage.BG} resizeMode="cover" style={styles.image}> */}
                {props.children}
            {/* </ImageBackground> */}
        </View>
    )
};

export default AppContainer;

