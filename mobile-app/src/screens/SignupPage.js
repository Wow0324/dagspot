import {
    Box, Center, Container, Flex, Text, View, Button,
    Input, FormControl, WarningOutlineIcon, Icon, Pressable, Stack, Select, CheckIcon
} from "native-base";
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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useToast } from 'native-base';
import { PostRequest, toCapitalize, validateEmail } from "../utils/Func";

const SignupPage = (props) => {
    const Toast = useToast();
    const { userInfo, setUserInfo } = useContext(AppContext);
    const { orientation, SCREEN_WIDTH, SCREEN_HEIGHT } = useContext(PlatformContext);

    const [passwordShow, setPasswordShow] = useState({
        password: false,
        password_confirm: false
    });

    const [role, setRole] = useState(props.route?.params?.role)

    const [formVal, setFormVal] = useState({
        fname: { val: '', label: 'First Name', type: 'text' },
        lname: { val: '', label: 'Last Name', type: 'text' },
        country: { val: '', label: 'Country', type: 'text' },
        mobile: { val: '', label: 'Mobile', type: 'text' },
        genre: { val: '', label: 'Genre', type: 'select' },
        email: { val: '', label: 'Email', type: 'text' },
        password: { val: '', label: 'Password', type: 'password' },
        password_confirm: { val: '', label: 'Confirm Password', type: 'password' }
    });

    const [formError, setFormError] = useState({
        email: '',
        password: '',
        password_confirm: '',
        fname: '',
        lname: '',
        country: '',
        genre: '',
        mobile: '',
    })

    const onFormChange = (name, val) => {
        let formInput = formVal[name];
        formInput.val = val;
        setFormVal({ ...formVal, [name]: formInput });
    }


    const logiIn = () => {
        props.navigation.navigate('Login');
    }

    const togglePasswordShow = (key) => {
        setPasswordShow({ ...passwordShow, [key]: !passwordShow[key] });
    }

    const onSignup = () => {
        let requestBody = {};
        Object.keys(formVal).map((key, index)=>{
            requestBody = {...requestBody, [key]: formVal[key].val};
        });
        requestBody = {...requestBody, role: role};
        let isSubmit = true;
        let _formError = formError;
        Object.keys(requestBody).map((formKey, index)=> {
            if(!requestBody[formKey] && formKey !== 'genre'){
                _formError = ({..._formError, [formKey]: `${toCapitalize(formVal[formKey].label)} is required.`});
                isSubmit = false;
            }
        })
        if(requestBody.email) {
            if(!validateEmail(requestBody.email)){
                _formError = ({..._formError, email: 'Email is not valid'});
                isSubmit = false;
            }
        }
        if(requestBody.password !== requestBody.password_confirm){
            _formError = ({..._formError, password_confirm: 'Password is mismatch.'});
            isSubmit = false;
        }
        console.log(isSubmit);
        console.log(formError);
        if(!isSubmit) {
            setFormError(_formError);
            return;
        }

        PostRequest(`api/users/signup`, requestBody, 
            function (response) {
                let {status, msg} = response.data;
                if(status){
                    Toast.show({title: 'Successfully registered.', placement: 'top'});
                    setTimeout(()=>{
                        props.navigation.navigate('VerifyEmail', {email: requestBody.email});
                    }, 1000);
                }else{
                    Toast.show({title: msg, placement: 'top'})
                }
            },
            function (error) {
                // handle error
                Toast.show({title: error.message, placement: 'top'});
            }
        )
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
                    <Text style={{ color: 'white', fontSize: 24, fontWeight: 600, lineHeight: 29 }}>DaGspot</Text>
                </Flex>
                <View style={styles.head}>
                    <Text style={styles.title}>Sign Up As a {role}</Text>
                </View>
            </View>
            <View flex={1} style={[styles.mainContainer, { marginBottom: 50 }]}>
                <KeyboardAwareScrollView keyboardDismissMode={"on-drag"} keyboardShouldPersistTaps="always">
                    <Center flex={1} flexDirection={'column'} justifyContent={'flex-start'}>
                        {
                            Object.keys(formVal).map((formKey, index) => {
                                if (formVal[formKey].type !== 'select') {
                                    return (
                                        <FormControl isInvalid w="100%" key={index}>
                                            <Input variant={'unstyled'} placeholder={formVal[formKey].label} style={[styles.input]}
                                                value={formVal[formKey].val}
                                                onChangeText={(txt) => onFormChange(formKey, txt)}
                                                type={
                                                    formVal[formKey].type !== 'password'
                                                        ? formVal[formKey].type
                                                        : passwordShow[formKey] ? 'text' : 'password'
                                                }
                                            />
                                            {
                                                formVal[formKey].type == 'password' &&
                                                <View style={{ position: 'absolute', right: 10, display: 'flex', justifyContent: 'center', height: 50 }}>
                                                    <Pressable onPress={() => togglePasswordShow(formKey)}>
                                                        <Icon as={<MaterialIcons name={passwordShow[formKey] ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
                                                    </Pressable>
                                                </View>
                                            }
                                            {
                                                formError[formKey] &&
                                                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                                    {formError[formKey]}
                                                </FormControl.ErrorMessage>
                                            }
                                        </FormControl>
                                    )
                                } else {
                                    return (
                                        <FormControl isInvalid w="100%" key={index} style={{marginBottom: 20}}>
                                            <Select
                                                selectedValue={formVal[formKey].val}
                                                style={[styles.input]}
                                                variant="unstyled"
                                                minWidth="200"
                                                width="100%"
                                                accessibilityLabel={formVal[formKey].label} placeholder={formVal[formKey].label}
                                                _selectedItem={{
                                                    bg: "teal.600",
                                                    endIcon: <CheckIcon size="5" />
                                                }}
                                                dropdownIcon={<AntDesign name="down" size={20} color={"white"} style={{position: 'absolute', right: 10, padding: 10}} />}
                                                mt={1}
                                                onValueChange={itemValue => onFormChange(formKey, itemValue)}
                                            >
                                                <Select.Item label="All" value="all" />
                                                <Select.Item label="Blues" value="blue" />
                                                <Select.Item label="Cross Platform Development" value="cross" />
                                                <Select.Item label="Rock And Roll" value="rock" />
                                                <Select.Item label="Backend Development" value="backend" />
                                            </Select>
                                        </FormControl>
                                    )
                                }
                            })
                        }

                        <FormControl w="80%" style={{ marginTop: 30 }}>
                            <AppButton style={[AppStyles.redBtn, AppStyles.roundBtn, { paddingHorizontal: 20 }]} title={"Sign up"} onPress={() => onSignup()}></AppButton>
                        </FormControl>

                        <Text style={{ textAlign: 'center', color: 'white', marginTop: 30, fontSize: 14, fontWeight: 500, lineHeight: 17 }}>
                            By proceeding, You Agree To DaGspot <Text style={{ color: '#4A80C8' }}>Terms Of Service</Text> And <Text style={{ color: '#4A80C8' }}>Privacy Policy.</Text>
                        </Text>
                        <TouchableOpacity onPress={() => logiIn()} style={{ marginTop: 30 }}>
                            <Text style={{ textAlign: 'center', color: 'white', fontSize: 16, lineHeight: 20, fontWeight: 500 }}>Already have an account? <Text style={{ color: '#4A80C8' }}>Log in</Text></Text>
                        </TouchableOpacity>
                    </Center>
                </KeyboardAwareScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    head: {
        marginTop: 30,
        marginBottom: 30
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

export default SignupPage;