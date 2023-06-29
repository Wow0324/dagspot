import { Box, Center, Container, Flex, Text, View, HStack, Button, Input, FormControl, WarningOutlineIcon, Icon, Pressable, Stack } from "native-base";
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

const CheckEmailPage = (props) => {
    const { userInfo, setUserInfo } = useContext(AppContext);
    const { orientation, SCREEN_WIDTH, SCREEN_HEIGHT } = useContext(PlatformContext);
    const [passwordShow, setPasswordShow] = useState(false);
    const [code, setCode] = useState(['', '', '', '']);

    const onFormChange = (index, val)=>{
        let _code = code;
        _code[index] = val;
        setCode(_code);
    }

    const onVerify = ()=>{
        props.navigation.navigate('ResetPwd');
    }

    const resendHandler = ()=>{

    }
    
    return (
        <View style={AppStyles.container}>
            <Image source={AppImage.BG} resizeMode="cover" style={[AppStyles.bgImage, { width: SCREEN_WIDTH, height: SCREEN_HEIGHT }]} />
            <View bgColor={"transparent"} style={[styles.mainContainer]}>
                <Flex style={[styles.top]}>
                    <Button style={[styles.backButton]} onPress={() => { props.navigation.goBack() }}>
                        <AntDesign
                            name="left"
                            size={30}
                        >
                        </AntDesign>
                    </Button>
                    <Text style={{color: 'white', fontSize: 24, fontWeight: 600, lineHeight: 29}}>DaGspot</Text>
                </Flex>
                <View style={styles.head}>
                    <Text style={styles.title}>Check Your Mail</Text>
                </View>
                <Center>
                    <HStack space="3" alignItems="center">
                        {
                            code.map((c, key)=>(
                                <FormControl isInvalid key={key} w="22%">
                                    <Input variant={'unstyled'} placeholder="" style={[styles.input]} type="text"
                                        value={c}
                                        onChangeText={(txt)=>onFormChange(key, txt)}
                                    />
                                </FormControl>
                                
                            ))
                        }
                        
                    </HStack>
                    
                    
                    <View style={{marginTop: 30}}>
                        <TouchableOpacity onPress={()=>{resendHandler()}}>
                            <Text style={{color: 'white'}}>Didn't get a code? Resend</Text>
                        </TouchableOpacity>
                    </View>
                    <FormControl w="80%" style={{marginTop: 30}}>
                        <AppButton style={[AppStyles.redBtn, AppStyles.roundBtn, {paddingHorizontal: 20}]} title={"Verify OTP"} onPress={()=>onVerify()}></AppButton>
                    </FormControl>
                    
                </Center>
            </View>
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
        fontSize: 24,
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

export default CheckEmailPage;