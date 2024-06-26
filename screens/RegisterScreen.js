import { StyleSheet, Text, View, SafeAreaView, Image, KeyboardAvoidingView, TextInput, Pressable, Alert } from 'react-native'
import React, { useState } from "react";
import { MaterialIcons, AntDesign, Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

import axios from 'axios';

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("")
  const navigation = useNavigation()

  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password,
    };

    // send a POST  request to the backend API to register the user
    axios
      .post("http://10.0.2.2:8000/register", user)
      .then((response) => {
        console.log(response.data);
        Alert.alert(
          "Registration successful",
          "You have been registered Successfully"
        );
        setName("");
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        Alert.alert(
          "Registration Error",
          "An error occurred while registering"
        );
        console.log("registration failed", error);
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
            Register to your Account
          </Text>
        </View>

        {/* name */}
        <View style={{ marginTop: 70 }}>
          <View style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            backgroundColor: "#D0D0D0", paddingVertical: 5,
            borderRadius: 5,
            marginTop: 30

          }}>
            <Ionicons name="person-sharp" size={24} color="gray"
              style={{ marginLeft: 8 }} />
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              style={{ color: "gray", marginVertical: 10, width: 300, fontSize: email ? 16 : 16 }} placeholder="Enter your Name">

            </TextInput>
          </View>
        </View>
        {/* //email */}
        <View >
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
              style={{ color: "gray", marginVertical: 10, width: 300, fontSize: email ? 16 : 16 }} placeholder="Enter your Email">

            </TextInput>
          </View>
        </View>
        {/* password */}
        <View>
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

        <View style={{ marginTop: 80 }} />
        <Pressable
          onPress={handleRegister}
          style={{
            width: 200,
            backgroundColor: "#FEBE10",
            marginLeft: "auto",
            marginRight: "auto",
            padding: 15,
          }}>
          <Text style={{
            textAlign: "center",
            color: "white",
            fontSize: 16,
            fontWeight: "bold",

          }}>Register</Text>

        </Pressable>
        <Pressable
          onPress={() => navigation.goBack()
          }
          style={{ marginTop: 15 }}>
          <Text style={{
            textAlign: "center",
            color: "gray",
            fontSize: 16
          }}>
            Already have an account? Sign In
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({})