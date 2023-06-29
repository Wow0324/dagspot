import { Box, Center, Container, Flex, Text, View, Select, Button, Input, FormControl, WarningOutlineIcon, HStack, Icon, Pressable, Stack, ScrollView, List, VStack } from "native-base";
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

const SearchDjsPage = (props) => {
    const { userInfo, setUserInfo } = useContext(AppContext);
    const { orientation, SCREEN_WIDTH, SCREEN_HEIGHT } = useContext(PlatformContext);

    const [searchText, setSearchText] = useState('a');
    const [searchOption, setSearchOption] = useState('all');
    const [options, setOptions] = useState([
        'Genre', 'City', 'Popular', 'Top Mixes', 'Alphabetical'
    ])

    const [djs, setDjs] = useState([
        {id: 1, title: 'DJ Jazy Jeff', fans: 345, location: '(Mumbai) India', genre: 'Rap', photo: AppImage.Dj1},
        {id: 2, title: 'DJ Jazy Jeff', fans: 345, location: '(Mumbai) India', genre: 'Rap', photo: AppImage.Dj2},
        {id: 3, title: 'DJ Jazy Jeff', fans: 345, location: '(Mumbai) India', genre: 'Rap', photo: AppImage.Dj3},
        {id: 4, title: 'DJ Jazy Jeff', fans: 345, location: '(Mumbai) India', genre: 'Rap', photo: AppImage.Dj4},
        {id: 5, title: 'DJ Jazy Jeff', fans: 345, location: '(Mumbai) India', genre: 'Rap', photo: AppImage.Dj5},
        {id: 6, title: 'DJ Jazy Jeff', fans: 345, location: '(Mumbai) India', genre: 'Rap', photo: AppImage.Dj6},
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
                    {
                        searchText ?
                            <Stack space={0} w={SCREEN_WIDTH - 120} alignItems="center">
                                <Input w={{
                                    base: "100%",
                                    md: "100%"
                                }}
                                    h={{
                                        base: 46
                                    }}
                                    borderColor={'transparent'}
                                    backgroundColor={'#010206'}
                                    placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
                                    fontSize={14}
                                    lineHeight={17}
                                    borderRadius={5}
                                    placeholder="What do you want to listen to?" />
                            </Stack>
                            : <Text style={{ color: 'white', fontSize: 24, fontWeight: 600, lineHeight: 29 }}>Search For DJs</Text>
                    }

                </Flex>
                {
                    searchText ?
                    <ScrollView horizontal={true}>
                        <HStack space="3" alignItems="center">
                        <Center>
                            <Button
                                backgroundColor={searchOption == 'all' ? '#4A80C8' : '#051326'} borderRadius={16.5} opacity={0.5} color={'white'} fontSize={12} minWidth={85}
                                onPress={()=>{setSearchOption('all')}}
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
                            options.map((op, key)=>(
                                <Center key={key}>
                                    <Button
                                        backgroundColor={searchOption == op ? '#4A80C8' : '#051326'} borderRadius={16.5} opacity={0.5} color={'white'} fontSize={12} minWidth={85}
                                        onPress={()=>{setSearchOption(op)}}
                                    >
                                        {op}
                                    </Button>
                                </Center>
                            ))
                        }
                    </HStack>    
                    </ScrollView>
                    :
                    <Stack space={0} w="100%" alignItems="center">
                        <Input w={{
                            base: "100%",
                            md: "100%"
                            }}
                            h={{
                                base: 59
                            }}
                            InputLeftElement={<Icon as={<MaterialIcons name="search" />} size={8} ml="15" color="muted.400" />}
                            borderColor={'transparent'}
                            backgroundColor={'#010206'}
                            placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
                            fontSize={18}
                            lineHeight={22}
                            borderRadius={5}
                            placeholder="What do you want to listen to?" />
                    </Stack>
                }
                
                <View style={{ marginTop: searchText ? 20 : 150 }}>
                    {
                        searchText ?
                        <ScrollView h={SCREEN_HEIGHT - 200}>
                            <VStack space="2">
                            {
                                djs.map((dj, key)=>(
                                    <HStack space="5" alignItems="center" key={key} justifyContent="flex-start">
                                        <Image source={dj.photo} style={[styles.djPhoto, {width: SCREEN_WIDTH/2 - 20, height: 100}]} resizeMode="cover"/>
                                        <Box>
                                            <Text style={[styles.boxTitle]}>{dj.title}</Text>
                                                <Text style={[styles.boxDesc, {fontWeight: 600}]}>Fans:
                                                <Text style={{color: '#14C141'}}>{dj.fans}</Text></Text>
                                                <Text style={[styles.boxDesc]}>{dj.location}</Text>
                                                <Text style={[styles.boxDesc]}>{dj.genre}</Text>
                                        </Box>
                                    </HStack>
                                ))
                            }
                            </VStack>
                        </ScrollView>
                        
                        :
                        <>
                            <Image source={AppImage.SearchDjBg} />
                            <Text style={[styles.desc]}>
                                SEARCH ARTISTS, GENRES, VENUES...
                            </Text>
                        </>
                    }
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
        marginBottom: 20,
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
    },
    desc: {
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: 18,
        lineHeight: 22,
        fontWeight: 400
    },
    djPhoto: {
        borderRadius: 10
    },
    boxTitle: {
        fontSize: 19,
        lineHeight: 24,
        fontWeight: 600,
        color: '#4A80C8'
    },
    boxDesc: {color: 'white', fontSize: 14, lineHeight: 16, fontWeight: 400}
});

export default SearchDjsPage;