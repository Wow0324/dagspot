import { Box, Center, Container, Flex, Text, View, Button, Input } from "native-base";
import React, { useEffect, useRef, useState, useContext } from "react";
import { Image, Animated, StyleSheet, Easing, ImageBackground, Dimensions, TouchableOpacity, Pressable, ScrollView } from 'react-native';
import { AppContext } from "../contexts/AppProvider";
import AppStyles from "../assets/AppStyles";
import { AppImage } from "../assets/AppImage";
import { PlatformContext } from "../contexts/PlatformProvider";
import AppButton from "../components/AppButton";
import ProgressVar from "../components/ProgressVar";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


const HomePage = (props) => {
    const { userInfo, setUserInfo } = useContext(AppContext);
    const { orientation, SCREEN_WIDTH, SCREEN_HEIGHT } = useContext(PlatformContext);
    const [profile, setProfile] = useState({
        name: 'Wesley',
        avatar: AppImage.People1
    })

    const [category, setCategory] = useState('djs'); // or fan
    const [people, setPeople] = useState([
        { id: 1, name: 'Niya Joya', avatar: AppImage.People1 },
        { id: 2, name: 'Hert', avatar: AppImage.People2 },
        { id: 3, name: 'Nick', avatar: AppImage.People3 },
        { id: 4, name: 'Hiya', avatar: AppImage.People4 },
        { id: 5, name: 'John', avatar: AppImage.People5 },
    ]);

    const [links, setLinks] = useState([
        { name: 'Search For DJs', icon: <Feather color={'white'} name="activity" size={20}></Feather>, route: 'SearchDjs' },
        { name: 'Events Calendar', icon: <FontAwesome color={'white'} name="calendar" size={20}></FontAwesome>, route: 'EventsCalendar' },
        { name: 'Start A Clash', icon: <Entypo name="browser" color={'white'} size={20}></Entypo>, route: 'StartClash' },
        { name: 'Book A DJ', icon: <Feather name="volume-2" color={'white'} size={20}></Feather>, route: 'BookDj' },
        { name: 'Create An Event', icon: <SimpleLineIcons name="earphones" color={'white'} size={20}></SimpleLineIcons>, route: 'CreateEvent' },
        { name: 'Buy Mixes & Merch', icon: <AntDesign name="setting" color={'white'} size={20}></AntDesign>, route: 'BuyMixesAndMerch' },
        { name: 'Listen To A DJ', icon: <SimpleLineIcons name="earphones" color={'white'} size={20}></SimpleLineIcons>, route: 'ListenToDj' },
        { name: 'Your Profile', icon: <AntDesign name="setting" color={'white'} size={20}></AntDesign>, route: 'Profile' },
        { name: 'Your Wallet', icon: <Entypo name="wallet" color={'white'} size={20}></Entypo>, route: 'Wallet' },
        { name: 'About Us', icon: <SimpleLineIcons name="earphones" color={'white'} size={20}></SimpleLineIcons>, route: 'AboutUs' },
        { name: 'Upgrade Account', icon: <EvilIcons name="user" color={'white'} size={20}></EvilIcons>, route: 'UpgradeAccount' },
    ]);

    const [searchText, setSearchText] = useState('');

    const goToProfile = () => {
        props.navigation.navigate('Profile');
    }

    const logout = ()=>{

    }

    return (
        <View style={AppStyles.container}>
            <Image source={AppImage.BG} resizeMode="cover" style={[AppStyles.bgImage, { width: SCREEN_WIDTH, height: SCREEN_HEIGHT }]} />
            <Flex style={[styles.header]} flexDirection="row" alignItems="center" justifyContent={'space-between'}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={profile.avatar} style={[styles.profileAvatar]}></Image>
                    <Text style={[styles.profileName]}>{profile.name}</Text>
                </View>

                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <AntDesign name="bells" size={20} color={'white'} />
                </View>
            </Flex>
            <Center bgColor={"transparent"} style={[styles.mainContainer]}>
                <View style={{ width: '100%' }} flex={1}>
                    <Image source={AppImage.HomeHeadBg} resizeMode="contain" style={{ width: '100%' }} />
                    <Center style={{ width: '100%', left: 0, position: 'absolute', paddingVertical: 10 }}>
                        <Text style={[styles.title]}>Create Your Profile</Text>
                        <TouchableOpacity onPress={() => goToProfile()}>
                            <Text style={{
                                textAlign: 'center', color: '#FFD840',
                                textDecorationLine: 'underline', textDecorationColor: '#FFD840'
                            }}>Click Here</Text>
                        </TouchableOpacity>
                    </Center>
                </View>
                <View style={[styles.topbtns]}>
                    <Pressable style={[styles.topbtn,
                    { backgroundColor: category == 'djs' ? '#092142' : 'transparent' }]} onPress={() => setCategory('djs')}>
                        <Text style={{ textAlign: 'center', color: category == 'djs' ? '#4A80C8' : 'white' }}>DJS Shorts</Text>
                    </Pressable>
                    <Pressable style={[styles.topbtn,
                    { backgroundColor: category == 'fan' ? '#092142' : 'transparent' }]} onPress={() => setCategory('fan')}>
                        <Text style={{ textAlign: 'center', color: category == 'fan' ? '#4A80C8' : 'white' }}>Fan Shorts</Text>
                    </Pressable>
                </View>
                <View flexDirection="row" style={[styles.peoples]}>
                    <TouchableOpacity style={{ marginRight: 5 }}>
                        <View style={[styles.peopleImg]}>
                            <Text style={{ color: 'white', fontSize: 20 }}>+</Text>
                        </View>
                        <Text style={{ color: '#FFD840', textAlign: 'center' }}>Me</Text>
                    </TouchableOpacity>
                    {
                        people.map((p, key) => (
                            <TouchableOpacity key={key} style={{ marginRight: 5 }}>
                                <View style={[styles.peopleImg]}>
                                    <Image source={p.avatar} style={{ width: 49, height: 49 }} />
                                </View>
                                <Text style={{ color: 'white', textAlign: 'center' }}>{p.name}</Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
                <Input variant={"unstyled"} placeholder="What are you looking for" value={searchText} onChangeText={setSearchText} style={[styles.searchInput]} />

            </Center>
            <View style={[styles.mainContainer, { flex: 1, marginTop: 0 }]}>
                <KeyboardAwareScrollView keyboardDismissMode="on-drag" keyboardShouldPersistTaps="always">
                    <View style={{ width: '100%' }}>

                        {
                            links.map((link, key) => (
                                <TouchableOpacity onPress={() => props.navigation.navigate(link.route)} key={key}>
                                    <Flex key={key} flexDirection={'row'} justifyContent={'flex-start'} style={{ padding: 10 }}>
                                        {link.icon}
                                        <Text style={{ color: 'white', fontSize: 18, lineHeight: 22, fontWeight: 500, marginLeft: 20 }}>{link.name}</Text>
                                    </Flex>
                                </TouchableOpacity>

                            ))
                        }
                        <TouchableOpacity onPress={() => logout()}>
                            <Flex flexDirection={'row'} justifyContent={'flex-start'} style={{ padding: 10 }}>
                                <Entypo name="log-out" size={20} color={'#FF3334'}></Entypo>
                                <Text style={{ color: 'white', fontSize: 18, lineHeight: 22, fontWeight: 500, marginLeft: 20 }}>{'Sign Out'}</Text>
                            </Flex>
                        </TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        height: 77,
        paddingHorizontal: 10,
        backgroundColor: '#061326',
    },
    profileAvatar: {
        width: 47,
        height: 47,
        borderRadius: 47
    },
    profileName: {
        fontSize: 22,
        lineHeight: 27,
        fontWeight: 600,
        color: 'white',
        paddingHorizontal: 10
    },
    mainContainer: {
        zIndex: 1,
        paddingHorizontal: 10,
        paddingTop: 10
    },
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
    },
    title: {
        fontSize: 24,
        lineHeight: 29,
        fontWeight: 500,
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Montserrat'
    },
    topbtns: {
        marginTop: 90,
        backgroundColor: '#0D2C58',
        borderRadius: 8,
        height: 52,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    topbtn: {
        borderRadius: 8,
        width: '50%',
        height: '100%',
        padding: 10
    },
    peoples: {
        marginTop: 20,
        marginBottom: 10,
        // backgroundColor: 'yellow',
        display: 'flex',
        // height: 100,
        paddingHorizontal: 10,

    },
    peopleImg: {
        width: 55,
        height: 55,
        padding: 3,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 1
    },
    searchInput: {
        backgroundColor: '#0D2C58',
        opacity: 0.7,
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginTop: 0,
        fontSize: 18,
        lineHeight: 22,

    }
});

export default HomePage;