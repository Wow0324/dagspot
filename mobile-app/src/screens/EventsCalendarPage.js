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

const EventsCalendarPage = (props) => {
    const { userInfo, setUserInfo } = useContext(AppContext);
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

    const [upcomingEvents, setUpcomingEvents] = useState([
        { id: 1, date: 'Thu 16 Mar 2023 . 6:00 PM', title: 'Fresh ThursdayLive Soul sessions', location: '(Mumbai) India', photo: AppImage.Dj1, active: true },
        { id: 2, date: 'Thu 16 Mar 2023 . 6:00 PM', title: 'Fresh ThursdayLive Soul sessions', location: '(Mumbai) India', photo: AppImage.Dj2 },
    ]);

    const goToUpcomingEvents = () => {
        props.navigation.navigate('UpcomingEvents');
    }

    const goToPastEvents = () => {

    }

    const onMyEvents = () => {
        props.navigation.navigate('MyEvents');
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
                    <Text style={{ color: 'white', fontSize: 24, fontWeight: 600, lineHeight: 29 }}>Events Calendar</Text>
                </Flex>
                <View mt={3}>
                    <ScrollView h={SCREEN_HEIGHT - 200}>
                        <Center style={{ marginTop: 20 }}>
                            <Circle size={55} backgroundColor={'rgba(255, 51, 52, 0.2)'}>
                                <Image source={AppImage.Calendar} />
                            </Circle>
                            <Divider width={205} thickness={3} bg='#FF3334' mb={3} mt={3} borderColor={'red'} />

                            <Calendar
                                // Customize the appearance of the calendar
                                style={{
                                    borderWidth: 1,
                                    borderColor: 'gray',
                                    height: 350,
                                    width: SCREEN_WIDTH - 40
                                }}
                                theme={{
                                    backgroundColor: '#ffffff',
                                    calendarBackground: '#ffffff',
                                    textSectionTitleColor: '#b6c1cd',
                                    selectedDayBackgroundColor: '#00adf5',
                                    selectedDayTextColor: '#ffffff',
                                    todayTextColor: '#00adf5',
                                    dayTextColor: '#2d4150',
                                    textDisabledColor: '#d9e'
                                }}

                                // Specify the current date
                                current={new Date().toDateString()}
                                // Callback that gets called when the user selects a day
                                onDayPress={day => {

                                }}
                                // Mark specific dates as marked
                                markedDates={{
                                    '2023-05-01': { selected: true, marked: true, selectedColor: 'blue' },
                                    '2023-05-02': { marked: true },
                                    '2023-05-03': { selected: true, marked: true, selectedColor: 'blue' }
                                }}
                            />
                            <FormControl w="100%" style={{ marginTop: 30 }}>
                                <AppButton style={[AppStyles.redBtn, AppStyles.roundBtn, { paddingHorizontal: 20 }]} title={"My Events"} onPress={() => onMyEvents()}></AppButton>
                            </FormControl>
                        </Center>

                        <VStack space="2" mt={5} style={{ width: '100%' }}>
                            <TouchableOpacity onPress={() => goToUpcomingEvents()}>
                                <HStack space="3" alignItems="center" justifyContent="space-between">
                                    <Text color="#4A80C8" fontSize={18} bold>Upcoming Events</Text>
                                    <Circle backgroundColor={'#15335B'} size={36}>
                                        <AntDesign name="right" color="white"></AntDesign>
                                    </Circle>
                                </HStack>
                            </TouchableOpacity>
                            {
                                upcomingEvents.map((ev, key) => (
                                    <HStack bg={'#0D2C58'} borderRadius={8} space="1" alignItems="center" justifyContent={'flex-start'} key={key} style={{ width: '100%' }}>
                                        <Image source={ev.photo} resizeMode="contain" style={{ width: 113, height: 80 }} />
                                        <Box style={{ paddingHorizontal: 5, paddingVertical: 0 }}>
                                            <HStack alignItems="center" justifyContent={'space-between'}>
                                                <Text style={[styles.eventDate]}>{ev.date}</Text>
                                            </HStack>
                                            <Text style={[styles.eventTitle]}>{ev.title}</Text>
                                            <HStack alignItems="center">
                                                <FontAwesome name="map-marker" size={10} color={'rgba(255, 255, 255, 0.5)'} style={{marginRight: 5}}/>
                                                <Text style={[styles.eventLocation]}>{ev.location}</Text>
                                            </HStack>
                                        </Box>
                                        <AntDesign name="hearto" color={ev.active ? 'red' : 'white'} style={{ position: 'absolute', top: 10, right: 10 }}></AntDesign>
                                    </HStack>
                                ))
                            }
                            <TouchableOpacity onPress={() => goToPastEvents()}>
                                <HStack space="3" alignItems="center" justifyContent="space-between">
                                    <Text color="#4A80C8" fontSize={18} bold>Past Events</Text>
                                    <Circle backgroundColor={'#15335B'} size={36}>
                                        <AntDesign name="right" color="white"></AntDesign>
                                    </Circle>
                                </HStack>
                            </TouchableOpacity>
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
    }
});

export default EventsCalendarPage;