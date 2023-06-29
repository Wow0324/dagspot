import { Box, Center, Container, Flex, Text, View, Button, Input, FormControl, WarningOutlineIcon, Icon, Pressable, Stack } from "native-base";
import React, { useEffect, useRef, useState, useContext } from "react";
import { Image, Animated, StyleSheet, Easing, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import { AppContext } from "../contexts/AppProvider";
import AppStyles from "../assets/AppStyles";
import { AppImage } from "../assets/AppImage";
import { PlatformContext } from "../contexts/PlatformProvider";
import AppButton from "../components/AppButton";
import ProgressVar from "../components/ProgressVar";
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const SignupHomePage = (props) => {
    const { userInfo, setUserInfo } = useContext(AppContext);
    const { orientation, SCREEN_WIDTH, SCREEN_HEIGHT } = useContext(PlatformContext);
    const [passwordShow, setPasswordShow] = useState(false);

    const forgotPasswordHandler = () => {

    }

    const logiIn = () => {
        props.navigation.navigate('Login');
    }

    const signUp = (type)=>{
        props.navigation.navigate('SignUp', {role: type});
    }

    return (
        <View style={AppStyles.container}>
            <Image source={AppImage.BG} resizeMode="cover" style={[AppStyles.bgImage, { width: SCREEN_WIDTH, height: SCREEN_HEIGHT }]} />
            <Center flex={1} bgColor={"transparent"} style={[styles.mainContainer]}>
                <FormControl w="100%" style={{ marginTop: 30 }}>
                    <AppButton style={[AppStyles.redBtn, AppStyles.roundBtn, { paddingHorizontal: 20 }]} title={"Brand"} onPress={() => signUp('Brand')}></AppButton>
                </FormControl>
                <FormControl w="100%" style={{ marginTop: 30 }}>
                    <AppButton style={[AppStyles.redBtn, AppStyles.roundBtn, { paddingHorizontal: 20 }]} title={"Venue"} onPress={() => signUp('Venue')}></AppButton>
                </FormControl>
                <FormControl w="100%" style={{ marginTop: 30 }}>
                    <AppButton style={[AppStyles.redBtn, AppStyles.roundBtn, { paddingHorizontal: 20 }]} title={"Promoter"} onPress={() => signUp('Promoter')}></AppButton>
                </FormControl>

                <TouchableOpacity onPress={() => logiIn()} style={{ marginTop: 30 }}>
                    <Text style={{ textAlign: 'center', color: 'white', fontSize: 16, lineHeight: 20, fontWeight: 500 }}>Already have an account? <Text style={{ color: '#4A80C8' }}>Log in</Text></Text>
                </TouchableOpacity>
            </Center>
        </View>
    );
}

const styles = StyleSheet.create({
    head: {
        marginTop: 40,
        marginBottom: 40
    },
    mainContainer: {
        zIndex: 1,
        paddingHorizontal: 20
    },
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
    },
    title: {
        fontSize: 30,
        lineHeight: 37,
        fontWeight: 500,
        color: '#4A80C8',
        fontFamily: 'Montserrat'
    },
    backButton: {
        width: 54,
        height: 54,
        borderRadius: 50,
        backgroundColor: '#15335B',
    },
    top: {
        marginTop: 26,
        flexDirection: 'row',
        gap: 20,
        alignItems: 'center'
    },
    input: {
        backgroundColor: '#092D5D',
        paddingHorizontal: 30,
        paddingVertical: 30,
        height: 50,
        borderRadius: 20,
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: 14,
        lineHeight: 17,
    }
});

export default SignupHomePage;