import { Box, VStack, HStack, Center, Container, Flex, Text, View, Button, Divider, Input, FormControl, WarningOutlineIcon, Icon, Pressable, Stack, Avatar, Circle, ScrollView } from "native-base";
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
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Calendar, LocaleConfig } from 'react-native-calendars';

const BuyMixesPage = (props) => {
    const { userInfo, setUserInfo, selectedEvent, setSelectedEvent } = useContext(AppContext);
    const { orientation, SCREEN_WIDTH, SCREEN_HEIGHT } = useContext(PlatformContext);
    const [passwordShow, setPasswordShow] = useState(false);
    
    const [formVal, setFormVal] = useState({
        email: '',
        password: '',
    });

    const [selected, setSelected] = useState('');

    const [formError, setFormError] = useState({
        email: '',
        password: ''
    })

    const [myEvents, setMyEvents] = useState([
        { id: 1, date: 'Thu 16 Mar 2023 . 6:00 PM', title: 'Fresh ThursdayLive Soul sessions', location: '(Mumbai) India', photo: AppImage.Mix1, active: true, status: 'Reserved (paid)' },
        { id: 2, date: 'Thu 16 Mar 2023 . 6:00 PM', title: 'Fresh ThursdayLive Soul sessions', location: '(Mumbai) India', photo: AppImage.Mix2, status: 'Reserved (paid)' },
        { id: 3, date: 'Thu 16 Mar 2023 . 6:00 PM', title: 'Fresh ThursdayLive Soul sessions', location: '(Mumbai) India', photo: AppImage.Mix3, status: 'Reserved (free)'},
        { id: 4, date: 'Thu 16 Mar 2023 . 6:00 PM', title: 'Fresh ThursdayLive Soul sessions', location: '(Mumbai) India', photo: AppImage.Mix4, status: 'Reserved (paid)' },
        { id: 5, date: 'Thu 16 Mar 2023 . 6:00 PM', title: 'Fresh ThursdayLive Soul sessions', location: '(Mumbai) India', photo: AppImage.Mix5, status: 'Reserved (free)' },
    ]);

    const goToDetail = (ev)=>{
        
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
                    <Text style={{ color: 'white', fontSize: 24, fontWeight: 600, lineHeight: 29 }}>Buy Mixes & Merch</Text>
                </Flex>
                <View mt={3}>
                    <ScrollView h={SCREEN_HEIGHT - 200}>
                        <VStack space="2" mt={5} style={{ width: '100%' }}>
                            {
                                myEvents.map((ev, key) => (
                                    <TouchableOpacity key={key} onPress={()=>goToDetail(ev)}>
                                        <HStack bg={'#0D2C58'} borderRadius={8} space="1" alignItems="center" justifyContent={'flex-start'} style={{ width: '100%' }}>
                                            <Image source={ev.photo} resizeMode="contain" style={{ width: 113, height: 80 }} />
                                            <Box style={{ paddingHorizontal: 5, paddingVertical: 0 }}>
                                                <Text style={[styles.eventTitle]}>{ev.title}</Text>
                                                <HStack alignItems="center">
                                                    <Text style={[styles.eventLocation]}>{ev.location}</Text>
                                                </HStack>
                                            </Box>
                                            <Center style={{ position: 'absolute', right: 10, top: 0, height: '100%' }}>
                                                <AntDesign name="right" color={ev.active ? 'red' : 'white'}></AntDesign>
                                            </Center>
                                        </HStack>
                                    </TouchableOpacity>
                                ))
                            }
                        </VStack>
                    </ScrollView>
                </View>
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
    eventDate: {
        color: '#FF3334',
        fontSize: 10,
        lineHeight: 12,
        fontWeight: 500
    },
    eventTitle: {
        fontSize: 12,
        lineHeight: 15,
        color: '#FFFFFF',
        fontWeight: 500
    },
    eventLocation: {
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: 10,
        lineHeight: 12,
        fontWeight: 400
    },
    event_status: {
        padding: 10, 
        backgroundColor: 'white', 
        borderRadius: 20, 
        right: -45, 
        top: 5
    },
    event_status_text: {
        color: 'black', 
        fontSize: 10, 
        lineHeight: 11, 
        fontWeight: 500
    }
});

export default BuyMixesPage;