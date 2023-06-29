import { Box, Center, Container, Flex, Text, View, Button, ScrollView } from "native-base";
import React, { useEffect, useRef, useState, useContext } from "react";
import { Image, Animated, StyleSheet, Easing, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import { AppContext } from "../contexts/AppProvider";
import AppStyles from "../assets/AppStyles";
import { AppImage } from "../assets/AppImage";
import { PlatformContext } from "../contexts/PlatformProvider";
import { makeCircleGrid } from "../utils/Grid";
import LinearGradient from "react-native-linear-gradient";
import AppButton from "../components/AppButton";
import ProgressVar from "../components/ProgressVar";

const GenresPage = (props) => {
    const { userInfo, setUserInfo } = useContext(AppContext);
    const { orientation, SCREEN_WIDTH, SCREEN_HEIGHT } = useContext(PlatformContext);
    const [items, setItems] = useState([
        { id: 1, name: 'POP', color1: '#FF7723', color2: '#FEC23C' },
        { id: 2, name: 'Comedy', color1: '#4A80C8', color2: '#4A80C8' },
        { id: 3, name: 'Rap', color1: '#4A80C8', color2: '#4A80C8' },
        { id: 4, name: 'Dance', color1: '#FE6A75', color2: '#F8427D' },
        { id: 5, name: 'Disney', color1: '#ED49E2', color2: '#D92BE5' },
        { id: 6, name: 'Classical', color1: '#4A80C8', color2: '#4A80C8' },
        { id: 7, name: 'Blues', color1: '#4A80C8', color2: '#4A80C8' },
        { id: 8, name: 'POP', color1: '#FF7723', color2: '#FEC23C' },
        { id: 9, name: 'Comedy', color1: '#4A80C8', color2: '#4A80C8' },
        { id: 10, name: 'Rap', color1: '#4A80C8', color2: '#4A80C8' },
        { id: 11, name: 'Dance', color1: '#FE6A75', color2: '#F8427D' },
        { id: 12, name: 'Disney', color1: '#ED49E2', color2: '#D92BE5' },
        { id: 13, name: 'Classical', color1: '#4A80C8', color2: '#4A80C8' },
        { id: 14, name: 'Blues', color1: '#4A80C8', color2: '#4A80C8' },
    ]);

    const [selectedItems, setSelectedItems] = useState([]);
    const [selectState, setSelectState] = useState(false);
    const [circles, setCircles] = useState([]);
    const [searchText, SetSearchText] = useState('');

    useEffect(() => {
        let _circles = makeCircleGrid(SCREEN_WIDTH + 5, SCREEN_HEIGHT - 100, items.length);
        setCircles(_circles);
    }, [])

    const toggleGenre = (itemId) => {
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

    const choosePeople = () => {
        props.navigation.navigate('GenresPeople');
    }

    return (
        <View style={AppStyles.container}>
            <Image source={AppImage.BG} resizeMode="cover" style={[AppStyles.bgImage, { width: SCREEN_WIDTH, height: SCREEN_HEIGHT }]} />
            <Center flex={1} px="3" bgColor={"transparent"} style={[styles.mainContainer]}>
                <View style={styles.head}>
                    <Text style={styles.title}>Select Genres</Text>
                </View>
                <ProgressVar curstep={1} top={140}></ProgressVar>
            </Center>
            <View style={[styles.circleContainer, { width: SCREEN_WIDTH, height: SCREEN_HEIGHT - 100 }]}>
                {
                    items.map((item, index) => {

                        let _circle = circles[index];
                        if (_circle) {
                            let { radius, x, y } = _circle;
                            return (
                                <TouchableOpacity key={index} onPress={() => toggleGenre(index)}>
                                    <LinearGradient colors={[item.color1, item.color2]}
                                        style={[
                                            styles.circle,
                                            {
                                                position: 'absolute', left: x - radius, top: y - radius,
                                                width: radius * 2, height: radius * 2, borderRadius: radius,
                                            },
                                            selectedItems.includes(index) && {
                                                shadowColor: 'rgba(255, 255, 255, 0.25)',
                                                shadowRadius: 50,
                                                borderColor: 'white',
                                                borderWidth: 3
                                            }
                                        ]}
                                        useAngle={true} angle={180}>
                                        <Text style={[styles.circleText]}>{item.name}</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            )
                        } else {
                            <View key={index} ></View>
                        }

                    })
                }
            </View>
            {
                selectedItems.length > 0 && <>
                    <Center style={[styles.footer]}>
                        {
                            selectedItems.map((itemIndex, index) =>
                                <View key={index} style={[styles.selectedItemBtn]}>
                                    <Text color={'white'} style={{ fontSize: 16, lineHeight: 20, fontWeight: 500 }}>{items[itemIndex].name}</Text></View>
                            )
                        }
                    </Center>
                    <Center style={[styles.bottom]}>
                        <AppButton onPress={() => choosePeople()} style={[AppStyles.redBtn, AppStyles.roundBtn, { paddingHorizontal: 100 }]} title={"Continue"} />
                    </Center>
                </>
            }

        </View>
    );
}

const styles = StyleSheet.create({
    head: {
        position: 'absolute',
        top: 60,
    },
    footer: {
        borderTopLeftRadius: 40,
        borderTopEndRadius: 40,
        width: '100%',
        height: 80,
        bottom: 100,
        left: 0,
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        backgroundColor: '#061833',
        flexDirection: 'row',
        alignItems: 'center'
    },
    bottom: {
        backgroundColor: '#061833',
        width: '100%',
        bottom: 0,
        left: 0,
        position: 'absolute',
        height: 100,
        display: 'flex',
        justifyContent: 'center',
        paddingBottom: 20
    },
    mainContainer: {
        zIndex: 1
    },
    circleContainer: {
        position: 'relative',
        top: 120,
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
    circle: {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    circleText: {
        color: 'white',
        fontWeight: 500,
        fontSize: 16,
        lineHeight: 24
    },
    selectedItemBtn: {
        backgroundColor: 'rgba(9, 45, 93, 0.8)',
        borderRadius: 23,
        paddingHorizontal: 20,
        paddingVertical: 10,
        height: 45,
        display: 'flex',
        justifyContent: 'center'
    }
});

export default GenresPage;