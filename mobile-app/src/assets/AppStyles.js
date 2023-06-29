import { Dimensions, StyleSheet } from "react-native";

export default AppStyles = StyleSheet.create({
    red: '#FF3334',
    white_50: 'rgba(255, 255, 255, 0.5)',
    container: {
        flex: 1
    },
    bgImage: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        justifyContent: 'center',
    },
    spinner: {
        position: 'absolute',
        top: '50%',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        zIndex: 3
    },
    spinnerText: {
        color: '#FFFFFF',
        marginTop: 10,
        fontWeight: 200,
        zIndex: 3
    },
    redBtn: {
        backgroundColor: '#FF3334'
    },
    roundBtn: {
        borderRadius: 26,
        paddingHorizontal: 30,
        paddingVertical: 15
    }
})