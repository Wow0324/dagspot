import { Box, Center, Container, Flex, Text, View, Button, Input } from "native-base";
import React, { useEffect, useRef, useState, useContext } from "react";
import { Image, Animated, StyleSheet, Easing, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import { AppContext } from "../contexts/AppProvider";
import AppStyles from "../assets/AppStyles";
import { AppImage } from "../assets/AppImage";
import { PlatformContext } from "../contexts/PlatformProvider";
import AppButton from "../components/AppButton";
import SkipButton from "../components/SkipButton";
import ProgressVar from "../components/ProgressVar";
import AntDesign from "react-native-vector-icons/AntDesign";

const InviteCodePage = (props) => {
    const { userInfo, setUserInfo } = useContext(AppContext);
    const { orientation, SCREEN_WIDTH, SCREEN_HEIGHT } = useContext(PlatformContext);

    const inviteFriends = () => {
        props.navigation.navigate('Login');
    }

    const skipHandler = () => {

    }

    const saveCode = ()=>{

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
                <Box borderRadius={5} width={SCREEN_WIDTH - 100}>
                    <View style={[styles.boxHead, {backgroundColor: AppStyles.red}]}>
                        <Image source={AppImage.People1} style={[styles.boxImage]}></Image>
                        <Image source={AppImage.People2} style={[styles.boxImage]}></Image>
                    </View>
                    <Center style={[styles.boxBody]}>
                        <Text style={[styles.boxDesc]}>Invite friends and get bonus points for</Text>
                        <Text style={[styles.boxDesc]}>every new Member!</Text>

                        <Text color={AppStyles.red} style={[styles.inviteCode]}>UW1234</Text>
                        <Flex direction="row" justifyContent={'space-between'} style={{marginTop: 16}} width="100%">
                            <TouchableOpacity onPress={()=>saveCode()} style={[AppStyles.redBtn, AppStyles.roundBtn, {width: '80%'}]}>
                                <Text style={{color: 'white', textAlign: 'center', fontWeight: 400, fontSize: 16}}>Copy Code</Text>
                            </TouchableOpacity>
                            <View style={{width: 44, height: 44, borderColor: AppStyles.red, 
                                borderWidth: 1, borderRadius: 15, padding: 10}}>
                                <AntDesign name="sharealt" size={20} color={AppStyles.red}></AntDesign>
                            </View>
                        </Flex>
                    </Center>
                </Box>
            </Center>
            <Center style={[styles.bottom]}>
                <AppButton style={[AppStyles.redBtn, AppStyles.roundBtn, { paddingHorizontal: 70 }]} onPress={() => inviteFriends()} title={"Invite Friends"}></AppButton>
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
    },
    boxHead: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 25,
        paddingVertical: 17,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    boxBody: {
        backgroundColor: 'white',
        padding: 25,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5
    },
    boxDesc: {
        fontWeight: 500,
        fontSize: 12,
        lineHeight: 15,
        color: '#010001'
    },
    inviteCode: {
        marginTop: 10,
        height: 45,
        borderRadius: 15,
        backgroundColor: '#EFEEFC',
        textAlign: 'center',
        lineHeight: 40,
        fontSize: 14,
        fontWeight: 600,
        width: '100%',
        borderColor: '#FF3334',
        borderWidth: 1
    }
});

export default InviteCodePage;