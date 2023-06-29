import { Box, Center, Container, Flex, Text, View, Button, Input, FormControl, WarningOutlineIcon, Icon, Pressable, Stack } from "native-base";
import React, { useEffect, useRef, useState, useContext } from "react";
import { Image, Animated, StyleSheet, Easing, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import { AppContext } from "../contexts/AppProvider";
import AppStyles from "../assets/AppStyles";
import { AppImage } from "../assets/AppImage";
import { PlatformContext } from "../contexts/PlatformProvider";
import AppButton from "../components/AppButton";
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const VerifyEmailPage = (props) => {
    const { userInfo, setUserInfo } = useContext(AppContext);
    const { orientation, SCREEN_WIDTH, SCREEN_HEIGHT } = useContext(PlatformContext);
    const [verified, setVerified] = useState(false);

    const verifyEmail = () => {
        setVerified(true);
    }

    const getStarted =  ()=>{
        props.navigation.navigate('Login');
    }

    return (
        <View style={AppStyles.container}>
            <Image source={AppImage.BG} resizeMode="cover" style={[AppStyles.bgImage, { width: SCREEN_WIDTH, height: SCREEN_HEIGHT }]} />
            <Center flex={1} bgColor={"transparent"} style={[styles.mainContainer]}>
                {
                    !verified ? <>
                        <Image source={AppImage.Envelop} />
                        <Text style={[styles.title]}>verify your email address</Text>
                        <Text style={[styles.desc]}>
                            Lorem Ipsum is  simply dummy text  of the  printing and typesetting industry. Lorem  Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took.
                        </Text>
                        <FormControl w="80%" style={{ marginTop: 30 }}>
                            <AppButton style={[AppStyles.redBtn, AppStyles.roundBtn, { paddingHorizontal: 20 }]} title={"Verify your email"} onPress={() => verifyEmail()}></AppButton>
                        </FormControl>    
                    </>
                    :
                    <Box style={[styles.verifyBox]}>
                        <Image source={AppImage.EnvelopChk} />
                        <Text style={{fontSize: 24, lineHeight: 29, fontWeight: 500, color: '#4A80C8'}}>Verified</Text>
                        <Text style={{fontSize: 12, lineHeight: 14, fontWeight: 500, textAlign: 'center'}}>
                        Yahoo! you have successfully verified the account
                        </Text>
                        <AppButton title="Get Started" onPress={()=>{ getStarted() }} style={[AppStyles.redBtn, AppStyles.roundBtn, {width: '100%'}]}></AppButton>
                    </Box>
                }
                
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
        fontFamily: 'Montserrat',
        textTransform: 'capitalize',
        marginTop: 30,
        marginBottom: 10
    },
    desc: {
        color: 'white',
        fontSize: 10,
        lineHeight: 12,
        fontWeight: 500,
        textAlign: 'center'
    },
    verifyBox: {
        backgroundColor: '#F3F8FF',
        width: 320,
        height: 320,
        borderRadius: 30,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 30
    }
});

export default VerifyEmailPage;