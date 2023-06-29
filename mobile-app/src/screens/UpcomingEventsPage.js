import { Box, VStack, HStack, Center, Container, Flex, Select, Text, View, Button, Divider, Input, FormControl, WarningOutlineIcon, Icon, Pressable, Stack, Avatar, Circle, ScrollView } from "native-base";
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

const UpcomingEventsPage = (props) => {
    const { userInfo, setUserInfo } = useContext(AppContext);
    const { orientation, SCREEN_WIDTH, SCREEN_HEIGHT } = useContext(PlatformContext);
    const [passwordShow, setPasswordShow] = useState(false);
    const [formVal, setFormVal] = useState({
        email: '',
        password: '',
    });

    const [searchOption, setSearchOption] = useState('all');

    const [options, setOptions] = useState([
        'Genre', 'City', 'Popular', 'Top Mixes', 'Alphabetical'
    ])

    const [selected, setSelected] = useState('');

    const [formError, setFormError] = useState({
        email: '',
        password: ''
    })

    const [upcomingEvents, setUpcomingEvents] = useState([
        { id: 1, date: 'Thu 16 Mar 2023 . 6:00 PM', title: 'Fresh ThursdayLive Soul sessions', location: '(Mumbai) India', photo: AppImage.Dj1, active: true },
        { id: 2, date: 'Thu 16 Mar 2023 . 6:00 PM', title: 'Fresh ThursdayLive Soul sessions', location: '(Mumbai) India', photo: AppImage.Dj2 },
        { id: 2, date: 'Thu 16 Mar 2023 . 6:00 PM', title: 'Fresh ThursdayLive Soul sessions', location: '(Mumbai) India', photo: AppImage.Dj3 },
        { id: 2, date: 'Thu 16 Mar 2023 . 6:00 PM', title: 'Fresh ThursdayLive Soul sessions', location: '(Mumbai) India', photo: AppImage.Dj4 },
        { id: 2, date: 'Thu 16 Mar 2023 . 6:00 PM', title: 'Fresh ThursdayLive Soul sessions', location: '(Mumbai) India', photo: AppImage.Dj5 },
    ]);



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
                    <Text style={{ color: 'white', fontSize: 24, fontWeight: 600, lineHeight: 29 }}>Upcoming Events</Text>
                </Flex>
                <ScrollView horizontal={true} mt={3}>
                    <HStack space="3" alignItems="center">
                        <Center>
                            <Button
                                backgroundColor={searchOption == 'all' ? '#4A80C8' : '#051326'} borderRadius={16.5} opacity={0.5} color={'white'} fontSize={12} minWidth={85}
                                onPress={() => { setSearchOption('all') }}
                            >
                                All
                            </Button>
                        </Center>
                        <Center>
                            <Select
                                backgroundColor={'#051326'}
                                placeholder=""
                                borderRadius={16.5} opacity={0.5} color={'white'} fontSize={12} minWidth={100}
                                variant="unstyled"
                            >
                                <Select.Item label="Online" value="online" />
                                <Select.Item label="Offline" value="offline" />
                            </Select>
                        </Center>
                        {
                            options.map((op, key) => (
                                <Center key={key}>
                                    <Button
                                        backgroundColor={searchOption == op ? '#4A80C8' : '#051326'} borderRadius={16.5} opacity={0.5} color={'white'} fontSize={12} minWidth={85}
                                        onPress={() => { setSearchOption(op) }}
                                    >
                                        {op}
                                    </Button>
                                </Center>
                            ))
                        }
                    </HStack>
                </ScrollView>
                <View mt={3}>
                    <ScrollView h={SCREEN_HEIGHT - 200}>
                        <VStack space="2" mt={5} style={{ width: '100%' }}>
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
                                                <FontAwesome name="map-marker" size={10} color={'rgba(255, 255, 255, 0.5)'} style={{ marginRight: 5 }} />
                                                <Text style={[styles.eventLocation]}>{ev.location}</Text>
                                            </HStack>
                                        </Box>
                                        <AntDesign name="hearto" color={ev.active ? 'red' : 'white'} style={{ position: 'absolute', top: 10, right: 10 }}></AntDesign>
                                    </HStack>
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
    }
});

export default UpcomingEventsPage;