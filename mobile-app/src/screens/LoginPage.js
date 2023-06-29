import { Box, Center, Container, Flex, Text, View, Button, Input, FormControl, WarningOutlineIcon, Icon, Pressable, Stack, useToast } from "native-base";
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
import { PostRequest } from "../utils/Func";
import SqliteUtils from "../utils/SqliteUtils";

const LoginPage = (props) => {
    const Toast = useToast();
    const { userInfo, setUserInfo } = useContext(AppContext);
    const { orientation, SCREEN_WIDTH, SCREEN_HEIGHT } = useContext(PlatformContext);
    const [passwordShow, setPasswordShow] = useState(false);
    const [formVal, setFormVal] = useState({
        email: '',
        password: '',
    });

    const [formError, setFormError] = useState({
        email: '',
        password: ''
    })

    const onFormChange = (name, val)=>{
        setFormVal({...formVal, [name]: val});
    }

    const forgotPasswordHandler = ()=>{
        props.navigation.navigate('Forgot');
    }

    const onLogin = ()=>{
        let _formError = formError;
        if(!formVal.email){
            _formError = {..._formError, email: 'Emails is required.'};
            setFormError(_formError);
            return;
        }
        
        PostRequest('api/users/login', formVal, (response)=>{
            let {status, msg, token} = response.data;
            if(status && token){
                Toast.show({title: 'Successfully logged in', placement: 'top'})
                SqliteUtils.addToken(token, (tx, res)=>{
                    if(res.rowsAffected){
                        console.log('Succeed to add token to sqlite');
                    }
                })
                setTimeout(()=>{
                    props.navigation.navigate('Home');
                }, 1000);
            }else{
                Toast.show({title: msg, placement: 'top'});
            }
        }, 
        (err)=>{
            Toast.show({title: err.message, placement: 'top'});
        })
    }

    const signUp = ()=>{
        props.navigation.navigate('SignupHome');
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
                    <Text style={styles.title}>Login Now</Text>
                </View>
                <Center>
                    <FormControl isInvalid w="100%">
                        <Input variant={'unstyled'} placeholder="Email ID" style={[styles.input]} type="text"
                            value={formVal.email}
                            onChangeText={(txt)=>onFormChange('email', txt)}
                        />
                        {
                            formError.email && 
                            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                {formError.email}
                            </FormControl.ErrorMessage>
                        }
                        
                    </FormControl>
                    <FormControl isInvalid w="100%">
                        
                        <Input variant={'unstyled'} placeholder="Password" style={[styles.input]} 
                            value={formVal.password}
                            width="100%"
                            onChangeText={(txt)=>onFormChange('password', txt)}
                            type={passwordShow ? 'text' : 'password'}
                        />
                        <View style={{position: 'absolute', right: 10, display: 'flex', justifyContent: 'center', height: 50}}>
                            <Pressable onPress={() => setPasswordShow(!passwordShow)}
                            >
                                <Icon as={<MaterialIcons name={passwordShow ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
                            </Pressable>
                        </View>
                        {
                            formError.password && 
                            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                { formError.password }
                            </FormControl.ErrorMessage>
                        }
                        <TouchableOpacity onPress={()=>forgotPasswordHandler()}>
                            <Text style={{color: AppStyles.white_50, textAlign: 'right'}}>Forgot Password?</Text>
                        </TouchableOpacity>
                    </FormControl>
                    <FormControl w="80%" style={{marginTop: 30}}>
                        <AppButton style={[AppStyles.redBtn, AppStyles.roundBtn, {paddingHorizontal: 20}]} title={"Login"} onPress={()=>onLogin()}></AppButton>
                    </FormControl>
                    <View style={{marginTop: 30}}>
                        <Text style={{color: 'white'}}>Or Login With</Text>
                    </View>
                    <Flex direction="row" justifyContent="center" gap="10" style={{marginTop: 30}}>
                        <Image source={AppImage.Google}></Image>
                        <Image source={AppImage.Facebook}></Image>
                        <Image source={AppImage.Gmail}></Image>
                    </Flex>
                    <Text style={{textAlign: 'center', color: 'white', marginTop: 30, fontSize: 14, fontWeight: 500, lineHeight: 17}}>
                    By proceeding, You Agree To DaGspot <Text style={{color: '#4A80C8'}}>Terms Of Service</Text> And <Text style={{color: '#4A80C8'}}>Privacy Policy.</Text>
                    </Text>
                    <TouchableOpacity onPress={()=>signUp()} style={{marginTop: 30}}>
                        <Text style={{textAlign: 'center', color: 'white', fontSize: 16, lineHeight: 20, fontWeight: 500}}>Don't have an account? <Text style={{color: '#4A80C8'}}>Sign Up</Text></Text>
                    </TouchableOpacity>
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

export default LoginPage;