import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, AntDesign, Ionicons } from '@expo/vector-icons';

const StackNavigator = () => {
    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator();
    function BottomTabs() {
        return (
            <Tab.Navigator>
                {/* //home icon */}
                <Tab.Screen name="Home"
                    component={HomeScreen}
                    options={{
                        tabBarLabel: "Home",
                        tabBarLabelStyle: {
                            color: "#008E97",
                        },
                        headerShown: false,
                        tabBarIcon: ({ focused }) =>
                            focused ?
                                (
                                    <Entypo name="home" size={24} color="#008E97" />
                                ) : (
                                    <AntDesign name="home" size={24} color="black" />
                                )
                    }}
                />
                {/* profile icons */}
                <Tab.Screen name="Profile"
                    component={HomeScreen}
                    options={{
                        tabBarLabel: "Profile",
                        tabBarLabelStyle: {
                            color: "#008E97",
                        },
                        headerShown: false,
                        tabBarIcon: ({ focused }) =>
                            focused ?
                                (
                                    <Ionicons name="person" size={24} color="#008E97" />
                                ) : (
                                    <Ionicons name="person-outline" size={24} color="black" />
                                )
                    }}
                />
                {/* Cart icon */}
                <Tab.Screen name="Cart"
                    component={HomeScreen}
                    options={{
                        tabBarLabel: "Cart",
                        tabBarLabelStyle: {
                            color: "#008E97",
                        },
                        headerShown: false,
                        tabBarIcon: ({ focused }) =>
                            focused ?
                                (
                                    <Ionicons name="cart" size={24} color="#008E97" />
                                ) : (
                                    <Ionicons name="cart-outline" size={24} color="black" />
                                )
                    }}
                />
            </Tab.Navigator>
        )
    }
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Login" component={LoginScreen} options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="Register"
                    component={RegisterScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="Main"
                    component={BottomTabs} options={{
                        headerShown: false
                    }}
                />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigator

const styles = StyleSheet.create({})