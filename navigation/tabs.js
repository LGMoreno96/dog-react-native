import React from "react";
import { View, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Profile from "../screens/profile";
import HomeScreen from "../screens/home";
import ViewBreed from "../screens/ViewBreed";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
    <Stack.Screen options={{ headerShown: false }} name="ViewBreed" component={ViewBreed} />
  </Stack.Navigator>
);

const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "white",
          position: "absolute",
          elevation: 0,
          height: 95,
          bottom: 0,
          right: 0,
          left: 0,
        },
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center", top: 10 }}>
              <FontAwesome5 name="home" size={30} color={focused ? "#01B5E7" : "gray"} />
              <Text style={{ color: focused ? "#01B5E7" : "gray", fontSize: 12, marginTop: 5 }}>Home</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center", top: 10 }}>
              <FontAwesome5 name="user-alt" size={30} color={focused ? "#01B5E7" : "gray"} />
              <Text style={{ color: focused ? "#01B5E7" : "gray", fontSize: 12, marginTop: 5 }}>Profile</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
