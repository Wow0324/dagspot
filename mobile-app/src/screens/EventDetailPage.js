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

const EventDetailPage = (props) => {
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
        { id: 1, date: 'Thu 16 Mar 2023 . 6:00 PM', title: 'Fresh ThursdayLive Soul sessions', location: '(Mumbai) India', photo: AppImage.Dj1, active: true, status: 'Reserved (paid)' },
        { id: 2, date: 'Thu 16 Mar 2023 . 6:00 PM', title: 'Fresh ThursdayLive Soul sessions', location: '(Mumbai) India', photo: AppImage.Dj2, status: 'Reserved (paid)' },
        { id: 3, date: 'Thu 16 Mar 2023 . 6:00 PM', title: 'Fresh ThursdayLive Soul sessions', location: '(Mumbai) India', photo: AppImage.Dj3, status: 'Reserved (free)' },
        { id: 4, date: 'Thu 16 Mar 2023 . 6:00 PM', title: 'Fresh ThursdayLive Soul sessions', location: '(Mumbai) India', photo: AppImage.Dj4, status: 'Reserved (paid)' },
        { id: 5, date: 'Thu 16 Mar 2023 . 6:00 PM', title: 'Fresh ThursdayLive Soul sessions', location: '(Mumbai) India', photo: AppImage.Dj5, status: 'Reserved (free)' },
    ]);

    const goToDetail = (ev) => {
        setSelectedEvent(ev);
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
                </Flex>
                <View mt={3}>
                    <ScrollView h={SCREEN_HEIGHT - 200}>
                        <View>
                            <Image source={selectedEvent.photo} resizeMode="contain" style={{ width: '100%', height: 250, borderRadius: 15 }} />
                            <AntDesign name="hearto" color={selectedEvent.active ? 'red' : 'white'} style={{ position: 'absolute', bottom: 10, right: 10 }}></AntDesign>
                        </View>
                        <Text style={[styles.eventDate, {marginTop: 20}]}>{selectedEvent.date}</Text>
                        <Text style={[styles.eventTitle, {marginTop: 12}]}>{selectedEvent.title}</Text>
                        <HStack alignItems="center" style={{marginTop: 12}}>
                            <FontAwesome name="map-marker" size={10} color={'rgba(255, 255, 255, 0.5)'} style={{ marginRight: 5 }} />
                            <Text style={[styles.eventLocation]}>{selectedEvent.location}</Text>
                        </HStack>
                        <HStack alignItems={'center'} space={5} mt={8}>
                            <Avatar
                                size={58}
                                source={AppImage.People1}
                            >
                                P1
                            </Avatar>
                            <Text color="white" fontSize="25" lineHeight="30" fontWeight="500">DJ Jazy Jeff</Text>
                        </HStack>
                        <VStack space={2} mt={4}>
                            <Text color="white" fontSize={8.8} lineHeight={12}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it.</Text>
                            <Text color="white" fontSize={8.8} lineHeight={12}>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it.</Text>
                            <Text color="white" fontSize={8.8} lineHeight={12}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</Text>
                            <Text color="white" fontSize={8.8} lineHeight={12}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it . Show More</Text>
                        </VStack>
                        <Center>
                            <FormControl w="80%" style={{marginTop: 30}}>
                                <AppButton style={[AppStyles.redBtn, AppStyles.roundBtn, {paddingHorizontal: 20}]} title={"Pay Now"} onPress={()=>onLogin()}></AppButton>
                            </FormControl>
                        </Center>
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
        fontSize: 12,
        lineHeight: 15,
        fontWeight: 500
    },
    eventTitle: {
        fontSize: 18,
        lineHeight: 22,
        color: '#FFFFFF',
        fontWeight: 500
    },
    eventLocation: {
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: 12,
        lineHeight: 15,
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

export default EventDetailPage;