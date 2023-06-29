import { Box, Center, Container, Flex, Text, View, Button, Input, Stack, Icon, Row } from "native-base";
import React, { useEffect, useRef, useState, useContext } from "react";
import { Image, Animated, StyleSheet, Easing, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import { AppContext } from "../contexts/AppProvider";
import AppStyles from "../assets/AppStyles";
import { AppImage } from "../assets/AppImage";
import { PlatformContext } from "../contexts/PlatformProvider";
import AppButton from "../components/AppButton";
import ProgressVar from "../components/ProgressVar";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SkipButton from "../components/SkipButton";

const GenresPeoplePage = (props) => {
    const { userInfo, setUserInfo } = useContext(AppContext);
    const { orientation, SCREEN_WIDTH, SCREEN_HEIGHT } = useContext(PlatformContext);
    const [peoples, setPeoples] = useState([
        { id: 1, name: 'DJ Wes Bantai', avatar: AppImage.People1 },
        { id: 2, name: 'DJ Aes Aantai', avatar: AppImage.People2 },
        { id: 3, name: 'DJ Bes Wantai', avatar: AppImage.People3 },
        { id: 4, name: 'DJ Ces Cankai', avatar: AppImage.People4 },
        { id: 5, name: 'DJ Des Dansai', avatar: AppImage.People5 },
        { id: 6, name: 'DJ Fes Famai', avatar: AppImage.People6 },

        { id: 1, name: 'DJ Wes Bantai', avatar: AppImage.People1 },
        { id: 2, name: 'DJ Aes Aantai', avatar: AppImage.People2 },
        { id: 3, name: 'DJ Bes Wantai', avatar: AppImage.People3 },
        { id: 4, name: 'DJ Ces Cankai', avatar: AppImage.People4 },
        { id: 5, name: 'DJ Des Dansai', avatar: AppImage.People5 },
        { id: 6, name: 'DJ Fes Famai', avatar: AppImage.People6 },

        { id: 1, name: 'DJ Wes Bantai', avatar: AppImage.People1 },
        { id: 2, name: 'DJ Aes Aantai', avatar: AppImage.People2 },
        { id: 3, name: 'DJ Bes Wantai', avatar: AppImage.People3 },
        { id: 4, name: 'DJ Ces Cankai', avatar: AppImage.People4 },
        { id: 5, name: 'DJ Des Dansai', avatar: AppImage.People5 },
        { id: 6, name: 'DJ Fes Famai', avatar: AppImage.People6 },

    ])
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectState, setSelectState] = useState(false);
    const [searchText, setSearchText] = useState('');
    const onSearchTextChange = (text) => {
        setSearchText(text);
    }

    const togglePeople = (itemId)=>{ // index
        let _selectedItems = [];
        if (selectedItems.includes(itemId)) {
            _selectedItems = selectedItems.filter((el) => {
                return el != itemId
            });
            setSelectedItems(_selectedItems);
        } else {
            if (typeof selectedItems != "object") {
                _selectedItems.push(itemId)
            } else {
                if (selectedItems.length == 3) {
                    return;
                }
                _selectedItems = selectedItems;
                _selectedItems.push(itemId);
            }
            setSelectedItems(_selectedItems);
        }
        setSelectState(_selectedItems.length);
    }

    const doneHandler =  ()=>{
        props.navigation.navigate('ShareFriend');
    }

    const skipHandler = ()=>{
        props.navigation.navigate('ShareFriend');
    }

    return (
        <View style={[AppStyles.container, { paddingHorizontal: 10 }]}>
            <Image source={AppImage.BG} resizeMode="cover" style={[AppStyles.bgImage, { width: SCREEN_WIDTH, height: SCREEN_HEIGHT }]} />
            <Center px="3" bgColor={"transparent"} style={[styles.mainContainer]}>
                <View style={styles.head}>
                    <Text style={styles.title}>Pick 3 or more DJS</Text>
                    <Text style={styles.title}>You like</Text>
                </View>
                <ProgressVar curstep={2} top={20}></ProgressVar>
            </Center>
            <Center py={3} px={3}>
                <Stack space={4} w="100%" alignItems="center">
                    <Input w={{
                            base: "100%",
                            md: "100%"
                        }}
                        h={{
                            base: 60
                        }}
                        InputLeftElement={<Icon as={<MaterialIcons name="search" />} size={8} ml="15" color="muted.400" />}
                        borderColor={'transparent'}
                        backgroundColor={'#010206'}
                        placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
                        fontSize={18}
                        lineHeight={22}
                        borderRadius={5}
                        placeholder="Search artist" />
                </Stack>

            </Center>
            <View style={{ flex: 1, marginTop: 20 }}>
                <KeyboardAwareScrollView keyboardDismissMode={"on-drag"} keyboardShouldPersistTaps="always">
                    <Center flex={1} flexDirection="row" justifyContent={'flex-start'} style={{ flexWrap: 'wrap' }}>
                        {
                            peoples.map((pe, index) => (
                                <TouchableOpacity key={index} onPress={()=>{togglePeople(index)}}>
                                    <Box style={[styles.avatarBlock, { width: SCREEN_WIDTH / 3 - 7 }]}>
                                        <View style={[styles.avatarActiveBorder, {borderColor: selectedItems.includes(index) ? 'red' : 'transparent'}]}
                                                width={SCREEN_WIDTH / 3 - 18}
                                                height={SCREEN_WIDTH / 3 - 18}
                                                borderRadius={SCREEN_WIDTH / 3 - 18}
                                                borderWidth={2}
                                        >
                                            <Image source={pe.avatar}
                                                width={SCREEN_WIDTH / 3 - 20}
                                                height={SCREEN_WIDTH / 3 - 20}
                                                borderRadius={SCREEN_WIDTH / 3 - 20}
                                            />
                                        </View>
                                        <Text style={[styles.peopleName]}>{pe.name}</Text>
                                    </Box>
                                </TouchableOpacity>
                            ))
                        }
                    </Center>
                </KeyboardAwareScrollView>
            </View>
            {
                selectState ? 
                <Center style={[styles.bottom]}>
                    <AppButton style={[AppStyles.redBtn, AppStyles.roundBtn, { paddingHorizontal: 70 }]}  onPress={()=>doneHandler()} title={"Done"}></AppButton>
                    <SkipButton style={{padding: 5}} onPress={()=>skipHandler()} title={'Skip'}></SkipButton>
                </Center> : <></>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    head: {
        marginTop: 60,
    },
    mainContainer: {
        zIndex: 1
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
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Montserrat'
    },
    avatarBlock: {
        textAlign: 'center',
        marginBottom: 10,
        paddingHorizontal: 10
    },
    peopleName: {
        color: 'white',
        fontSize: 14,
        fontWeight: 400,
        lineHeight: 17,
        marginTop: 10
    },
    avatarActiveBorder: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottom: {
        position: 'absolute',
        bottom: 40,
        width: '100%'
    }
});

export default GenresPeoplePage;