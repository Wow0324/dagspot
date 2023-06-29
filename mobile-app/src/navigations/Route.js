import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Animated } from 'react-native';
import React, { useContext } from 'react';
import GenresPage from '../screens/GenresPage';
import GenresPeoplePage from '../screens/GenresPeoplePage';
import ShareFriendPage from '../screens/ShareFriendPage';
import InviteCodePage from '../screens/InviteCodePage';
import LoginPage from '../screens/LoginPage';
import SignupHomePage from '../screens/SignupHomePage';
import SignupPage from '../screens/SignupPage';
import VerifyEmailPage from '../screens/VerifyEmailPage';
import SplashPage from '../screens/SplashPage';
import HomePage from '../screens/HomePage';
import ProfilePage from '../screens/ProfilePage';
import SearchDjsPage from '../screens/SearchDjsPage';
import EventsCalendarPage from '../screens/EventsCalendarPage';
import StartClashPage from '../screens/StartClashPage';
import BookDjPage from '../screens/BookDjPage';
import CreateEventPage from '../screens/CreateEventPage';
import BuyMixesPage from '../screens/BuyMixesPage';
import ListenDjPage from '../screens/ListenDjPage';
import WalletPage from '../screens/WalletPage';
import AboutUsPage from '../screens/AboutUsPage';
import UpgradeAccountPage from '../screens/UpgradeAccountPage';
import MyEventsPage from '../screens/MyEventsPage';
import UpcomingEventsPage from '../screens/UpcomingEventsPage';
import EventDetailPage from '../screens/EventDetailPage';
import ForgotPwdPage from '../screens/ForgotPwdPage';
import CheckEmailPage from '../screens/CheckEmailPage';
import ResetPwdPage from '../screens/ResetPwdPage';

const Stack = createNativeStackNavigator();

const Routes = () =>{
  const forFade = ({ current, next }) => {
    const opacity = Animated.add(
      current.progress,
      next ? next.progress : 0
    ).interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, 1, 0],
    });

    return {
      leftButtonStyle: { opacity },
      rightButtonStyle: { opacity },
      titleStyle: { opacity },
      backgroundStyle: { opacity },
    };
  };
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Splash'
          screenOptions={{
            headerShown: false,
            headerStyleInterpolator: forFade,
            animation: "slide_from_right"
          }}
          headerMode="none"
        // mode="modal"
        >
          
          <Stack.Screen name='ResetPwd' component={ResetPwdPage}></Stack.Screen>
          <Stack.Screen name='CheckEmail' component={CheckEmailPage}></Stack.Screen>
          <Stack.Screen name='Forgot' component={ForgotPwdPage}></Stack.Screen>
          <Stack.Screen name='UpcomingEvents' component={UpcomingEventsPage}></Stack.Screen>
          <Stack.Screen name='EventDetail' component={EventDetailPage}></Stack.Screen>
          <Stack.Screen name='MyEvents' component={MyEventsPage}></Stack.Screen>
          <Stack.Screen name='UpgradeAccount' component={UpgradeAccountPage}></Stack.Screen>
          <Stack.Screen name='AboutUs' component={AboutUsPage}></Stack.Screen>
          <Stack.Screen name='Wallet' component={WalletPage}></Stack.Screen>
          <Stack.Screen name='ListenToDj' component={ListenDjPage}></Stack.Screen>
          <Stack.Screen name='BuyMixesAndMerch' component={BuyMixesPage}></Stack.Screen>
          <Stack.Screen name='CreateEvent' component={CreateEventPage}></Stack.Screen>
          <Stack.Screen name='BookDj' component={BookDjPage}></Stack.Screen>
          <Stack.Screen name='StartClash' component={StartClashPage}></Stack.Screen>
          <Stack.Screen name='EventsCalendar' component={EventsCalendarPage}></Stack.Screen>
          <Stack.Screen name='SearchDjs' component={SearchDjsPage}></Stack.Screen>
          <Stack.Screen name='Profile' component={ProfilePage}></Stack.Screen>
          <Stack.Screen name='Home' component={HomePage}></Stack.Screen>
          <Stack.Screen name='VerifyEmail' component={VerifyEmailPage}></Stack.Screen>
          <Stack.Screen name='SignUp' component={SignupPage}></Stack.Screen>
          <Stack.Screen name='SignupHome' component={SignupHomePage}></Stack.Screen>
          <Stack.Screen name='Login' component={LoginPage}></Stack.Screen>
          <Stack.Screen name='InviteCode' component={InviteCodePage}></Stack.Screen>
          <Stack.Screen name='Genres' component={GenresPage}></Stack.Screen>
          <Stack.Screen name='ShareFriend' component={ShareFriendPage}></Stack.Screen>
          <Stack.Screen name='GenresPeople' component={GenresPeoplePage}></Stack.Screen>
          <Stack.Group>
            <Stack.Screen name='Splash' component={SplashPage} options={{ animation: "fade" }}></Stack.Screen>
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

export default Routes;