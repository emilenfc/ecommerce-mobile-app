import { StyleSheet, Text, View ,SafeAreaView, Platform, ScrollView, Pressable, TextInput, Image} from 'react-native'
import React from 'react'
import { AntDesign, Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';

const HomeScreen = () => {
  const list = [
    {
      id: 1,
      image:require("../assets/image1.png"),
      name: "home"
    },
    {
      id: 2,
      image:require("../assets/image2.png"),
      name: "deals"
    },
    {
      id: 3,
      image:require("../assets/image1.png"),
      name: "flash"
    },
    {
      id: 4,
      image:require("../assets/image2.png"),
      name: "bestse"
    },
    {
      id: 5,
      image:require("../assets/image1.png"),
      name: "banana"
    },
    {
      id: 6,
      image:require("../assets/image2.png"),
      name: "ckoa"
    },

    {
      id: 5,
      image: require("../assets/image1.png"),
      name: "banana"
    },
    {
      id: 6,
      image: require("../assets/image2.png"),
      name: "ckoa"
    },
    {
      id: 5,
      image: require("../assets/image1.png"),
      name: "banana"
    },
    {
      id: 6,
      image: require("../assets/image2.png"),
      name: "ckoa"
    },
  ]
  return (
    <SafeAreaView style={{
      paddingTop: Platform.OS === "android" ? 40 : 0,
      flex: 1,
      backgroundColor: "white"
    }}>
      <ScrollView>
        <View style={{backgroundColor:"#00CED1", padding:10, flexDirection:"row", alignItems:"center"}}>
          <Pressable style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 7,
            gap: 10,
            backgroundColor: "white",
            borderRadius: 3,
            height: 30,
            flex: 1
          }}>
            <AntDesign style={{paddingLeft:10}} name="search1" size={22} color="black" />
            <TextInput placeholder='Search ekorana.in '>
            </TextInput>
          </Pressable>
          <Feather name="mic" size={24} color="black" />
        </View>
        <View style={{flexDirection:"row", alignItems:"center", gap:10, padding:10,backgroundColor:"#AFEEEE"}}>
          <Ionicons name="location-outline" size={24} color="black" />
          <Pressable>
            <Text style={{fontSize:13,fontWeight:"bold"}}>
              Deliver to kigali kicukiro 2333
            </Text>
          </Pressable>
          <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false }>
          {list.map((item, index) => (
            <Pressable key={index} style={{margin:10, justifyContent:"center", alignItems:"center"}}>
              <Image style={{ width: 50, height: 50, resizeMode: "contain" }} source={item.image} />
              <Text style={{ textAlign: "center", fontSize:12, fontWeight:"500", marginTop:5}}>{item?.name}</Text>
            </Pressable>
           
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})