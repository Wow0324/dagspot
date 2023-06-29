import { Box, Center, Container, Flex, Text, View, Button } from "native-base";
import React, { useEffect, useRef, useState, useContext } from "react";
import { Image, Animated, StyleSheet, Easing } from 'react-native';
import { AppContext } from "../contexts/AppProvider";

const SplashPage = (props) => {
    const [step, setStep] = useState(1);
    const { userInfo, setUserInfo } = useContext(AppContext);

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const fadeLogoAnim = useRef(new Animated.Value(0)).current;
    const [translationY, setTranslationY] = useState(0);
    const [translationY2, setTranslationY2] = useState(0);
    const [scaleAnim, setScaleAnim] = useState(0);
    const [btnDisabled, setBtnDisabled] = useState(false);

    const generateFirstSplash = () => {
        Animated.timing(// fade in
            fadeAnim,
            {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true
            }
        ).start();
        for (let i = 0; i > - 20; i--) {
            setTimeout(() => {
                setTranslationY(i);
            }, 50 * Math.abs(i));
        }
    }

    const generateSecondSplash = () => {
        setTimeout(() => {// fade out
            Animated.timing(
                fadeAnim,
                {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true
                }
            ).start();
        }, 10);
        setTimeout(() => {// fade out
            setStep(2);
            Animated.timing(// fade in logo
                fadeLogoAnim,
                {
                    toValue: 1,
                    duration: 1400,
                    useNativeDriver: true
                }
            ).start();
            for (let i = 0; i < 930; i = i + 31) {
                setTimeout(() => {
                    setScaleAnim(i);
                    setTranslationY2(-i / 40);
                }, 50 * Math.abs(i / 31));
            }
        }, 2000);
        setTimeout(() => {
            setStep(1)
            props.navigation.navigate("Home");
        }, 4000);
    }

    

    useEffect(() => {
        generateFirstSplash();
    }, [fadeAnim, fadeLogoAnim, userInfo])

    return (
        <Center flex={1} px="3" bgColor={"white"}>
            <Text  fontSize="xs">Splash Page</Text>
            <Button
                colorScheme="primary"
                onPress={()=>{
                    props.navigation.navigate("Home");
                }}
            
            >
                Go to Home
            </Button>
            
        </Center>
    );
}

export default SplashPage;


const styles = StyleSheet.create({
    loginButton: {
        backgroundColor: "#0041C4",
        borderRadius: 20,
        marginTop: 40,
        paddingTop: 14,
        paddingBottom: 14,
    },
    loginText: {
        color: '#EAEAEA',
        textAlign: 'center',
        paddingLeft: 35
    }
});