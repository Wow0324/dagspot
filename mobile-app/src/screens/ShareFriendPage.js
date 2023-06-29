import { Box, Center, Container, Flex, Text, View, Button } from "native-base";
import React, { useEffect, useRef, useState, useContext } from "react";
import { Image, Animated, StyleSheet, Easing, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import { AppContext } from "../contexts/AppProvider";
import AppStyles from "../assets/AppStyles";
import { AppImage } from "../assets/AppImage";
import { PlatformContext } from "../contexts/PlatformProvider";
import AppButton from "../components/AppButton";
import SkipButton from "../components/SkipButton";
import ProgressVar from "../components/ProgressVar";

const ShareFriendPage = (props) => {
    const { userInfo, setUserInfo } = useContext(AppContext);
    const { orientation, SCREEN_WIDTH, SCREEN_HEIGHT } = useContext(PlatformContext);

    const inviteFriends = () => {
        props.navigation.navigate('InviteCode');
    }

    const skipHandler = () => {
        props.navigation.navigate('InviteCode');
    }

    return (
        <View style={AppStyles.container}>
            <Image source={AppImage.BG} resizeMode="cover" style={[AppStyles.bgImage, { width: SCREEN_WIDTH, height: SCREEN_HEIGHT }]} />
            <Center px="3" bgColor={"transparent"} style={[styles.mainContainer]}>
                <View style={styles.head}>
                    <Text style={styles.title}>Share With Friends</Text>
                    <Text style={[styles.title, { color: '#FFD840' }]}>Earn 1 Credit</Text>
                    <Text style={[styles.subtitle]}>
                        just share this code with your friends and
                    </Text>
                    <Text style={[styles.subtitle]}>
                        ask them to sign up and add this code.
                    </Text>
                </View>
                <ProgressVar curstep={3} top={20}></ProgressVar>
            </Center>
            <Center style={{marginTop: 60}}>
                <View style={[styles.inviteIconBlock]}>
                    <Image source={AppImage.InviteLogo} width={250}/>
                </View>
            </Center>
            <Center style={[styles.bottom]}>
                <AppButton style={[AppStyles.redBtn, AppStyles.roundBtn, { paddingHorizontal: 70 }]} onPress={() => inviteFriends()} title={"Invite Friends"}></AppButton>
                <SkipButton style={{ padding: 5 }} onPress={() => skipHandler()} title={'Skip'}></SkipButton>
            </Center>
        </View>
    );
}

const styles = StyleSheet.create({
    head: {
        marginTop: 60,
    },
    mainContainer: {
        zIndex: 1
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
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Montserrat'
    },
    subtitle: {
        fontSize: 15,
        lineHeight: 18,
        fontWeight: 500,
        textAlign: 'center',
        color: 'white'
    },
    bottom: {
        position: 'absolute',
        bottom: 40,
        width: '100%'
    },
    inviteIconBlock: {
        width: 270,
        height: 270,
        borderRadius: 200,
        backgroundColor: '#2A4C80',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ShareFriendPage;