import { Box, Center, Container, Flex, Text, View, Button } from "native-base";
import React, { useEffect, useRef, useState, useContext } from "react";
import { Image, Animated, StyleSheet, Easing, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import { AppContext } from "../contexts/AppProvider";
import AppStyles from "../assets/AppStyles";
import { AppImage } from "../assets/AppImage";
import { PlatformContext } from "../contexts/PlatformProvider";
import LinearGradient from 'react-native-linear-gradient';
import AppButton from "../components/AppButton";
import SqliteUtils from "../utils/SqliteUtils";

const SplashPage = (props) => {
    const { userInfo, setUserInfo } = useContext(AppContext);
    const { orientation, SCREEN_WIDTH, SCREEN_HEIGHT } = useContext(PlatformContext);

    const enterHandler = ()=>{
        SqliteUtils.getToken((tx, res)=>{
            if(res.rows.length > 0) {
                let token = res.rows.item(0).token;
                
            }
        })

        props.navigation.navigate('Login');
    }

    useEffect(()=>{
        (async () => {
            await SqliteUtils.init()
              .then((res) => {
                console.log('successfully initialized database', res);
              }).catch(error => {
                console.log('failed database');
                console.log(error);
              })
          })();
    })

    return (
        <View style={AppStyles.container}>
            <Image source={AppImage.BG} resizeMode="cover" style={[AppStyles.bgImage, { width: SCREEN_WIDTH, height: SCREEN_HEIGHT }]} />
            <Center flex={1} px="3" bgColor={"transparent"} style={[styles.mainContainer]}>
                <View style={styles.head}>
                    <Text style={styles.title}>DaGspot</Text>
                    <Text style={styles.subtitle}>Entertainment lives here</Text>
                </View>
                <AppButton onPress={()=>enterHandler()} style={[styles.enterBtn, AppStyles.redBtn]} title={"Enter"} />
            </Center>
            <Center flex={1} style={[styles.container, {width: SCREEN_WIDTH, height: SCREEN_HEIGHT}]}>
                <LinearGradient colors={['#0E2D56', '#010103']} style={styles.circle1} 
                    useAngle={true} angle={180}
                />
            </Center>
            <Center flex={1} style={[styles.container, {width: SCREEN_WIDTH, height: SCREEN_HEIGHT}]}>
                <LinearGradient colors={['#0E2D56', '#010103']} style={styles.circle2} 
                    useAngle={true} angle={180}
                />
            </Center>
            <Center flex={1} style={[styles.container, {width: SCREEN_WIDTH, height: SCREEN_HEIGHT}]}>
                <LinearGradient colors={['#0E2D56', '#010103']} style={styles.circle3} 
                    useAngle={true} angle={180}
                >
                    <Image source={AppImage.LOGO} style={{width: 130, resizeMode: 'contain'}}/>
                </LinearGradient>
            </Center>
        </View>
    );
}

const styles = StyleSheet.create({
    head: {
        position: 'absolute',
        top: 60,
    },
    mainContainer: {
        zIndex: 1
    },
    enterBtn: {
        position: 'absolute',
        bottom: 60,
        width: 238,
        height: 56,
        borderRadius: 28,
        zIndex: 2,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
    },
    title: {
        fontSize: 50,
        lineHeight: 61,
        fontWeight: 700,
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Montserrat'
    },
    subtitle: {
        color: '#4A80C8',
        marginTop: 17,
        fontSize: 18,
        fontWeight: 500,
        lineHeight: 22,
        textTransform: 'uppercase',
        textAlign: 'center',
        fontFamily: 'Montserrat'
    },
    circle1: {
        width: 640,
        height: 640,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowRadius: 50,
        borderRadius: 400,
    },
    circle2: {
        width: 440,
        height: 440,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowRadius: 50,
        borderRadius: 250
    },
    circle3: {
        width: 240,
        height: 240,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowRadius: 50,
        borderRadius: 150,
        paddingLeft: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default SplashPage;