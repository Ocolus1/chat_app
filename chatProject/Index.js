import { View, Text } from 'react-native'
import React, { useEffect } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Login from "./screens/Login"
import Signup from "./screens/Signup"
import Home from "./screens/Home"
import ChatRoom from "./screens/ChatRoom"
import { checkAuthenticated, load_user } from './redux/actions/auth';
import { connect } from 'react-redux';

const Stack = createNativeStackNavigator();



function Index({ checkAuthenticated, load_user, isAuthenticated }) {
    useEffect(() => {
        checkAuthenticated();
        load_user();
    }, []);

    const isDarkMode = useColorScheme() === 'dark';
    if (isAuthenticated) {
        
        return (
            <PaperProvider >
                <NavigationContainer>
                    <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
                    <Stack.Navigator initialRouteName="Home">
                        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                        <Stack.Screen name="ChatRoom" component={ChatRoom} options={{ headerShown: false }} />
                    </Stack.Navigator>
                </NavigationContainer>
            </PaperProvider>
        )
    }

    return (
        <PaperProvider >
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                    <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    )
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { checkAuthenticated, load_user })(Index);