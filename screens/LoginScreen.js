import { StyleSheet, Text, View, SafeAreaView, Image, KeyboardAvoidingView, TextInput, Pressable, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation()

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem("authToken");
                if (token) {
                    navigation.replace("Main")
                }
            
            } catch (error) {
                console.log("error message", error)
            }
        };

        checkLoginStatus();
    },[])
    
    const handleLogin = () => {
        const user = {
            email: email,
            password: password
        };
        axios
            .post("http://10.0.2.2:8000/login", user)
            .then((response) => {
                Alert.alert("Login successful");
                console.log(response.data);
                const token = response.data.token
                AsyncStorage.setItem("authToken", token)
                
                 setEmail("");
                 setPassword("");
                navigation.replace("Main")
            })
            .catch((error) => {
                Alert.alert("Login failed", "Try again");
                console.log("login failed", error);
            });
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
            <View>
                <Image
                    style={{ width: 200, height: 50}}
                    source={require("../assets/ekorana.png")}>
                </Image>

            </View>
            <KeyboardAvoidingView>
                <View style={{ alignItems: "center" }}>
                    <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 12, color: "#041E42" }}>
                        Login to your Account
                    </Text>
                </View>
          {/* login email */}
                <View style={{ marginTop: 70 }}>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5,
                        backgroundColor: "#D0D0D0", paddingVertical: 5,
                        borderRadius: 5,
                        marginTop: 30

                    }}>
                        <MaterialIcons style={{ marginLeft: 8 }} name="email" size={24} color="gray" />

                        <TextInput
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            style={{ color: "gray", marginVertical: 10, width: 300, fontSize:email?16:16 }} placeholder="Enter your Email">

                        </TextInput>
                    </View>
                </View>
                {/* Login password */}
                <View >
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5,
                        backgroundColor: "#D0D0D0", paddingVertical: 5,
                        borderRadius: 5,
                        marginTop: 30

                    }}>
                        <AntDesign name="lock1" size={24} color="gray" style={{ marginLeft: 8 }} />
                        <TextInput
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            secureTextEntry={true}
                            style={{
                                color: "gray", marginVertical: 10, width: 300, fontSize: password ? 16 : 16
                            }} placeholder="Enter your password">

                        </TextInput>
                    </View>
                </View>
                <View style={{ marginTop: 12, flexDirection: "row", alignItems:"center",justifyContent: "space-between"}}>
                    <Text>Keep me logged in</Text>
                    <Text style={{color:"#007FFF", fontWeight:"500"}}>Forget password</Text>
                </View>

                <View style={{ marginTop: 80 }} />
                <Pressable
                    onPress={handleLogin}
                    style={{
                        width:200,
                        backgroundColor: "#FEBE10",
                        marginLeft: "auto",
                        marginRight:"auto",
                        padding: 15, 
                    }}>
                    <Text style={{
                        textAlign: "center",
                        color: "white",
                        fontSize:16,
                        fontWeight: "bold"
                    }}>Login</Text>

                </Pressable>
                <Pressable
                    onPress={() => navigation.navigate("Register")
                }
                    style={{ marginTop: 15 }}>
                    <Text style={{
                        textAlign: "center",
                        color: "gray",
                        fontSize: 16
                    }}>
                    Don't have an account? Sign Up
                    </Text>
                </Pressable>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}
export default LoginScreen

const styles = StyleSheet.create({})