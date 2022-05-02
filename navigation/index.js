import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Tabs from "./tabs";
import Auth from "../screens/Auth";

const Stack = createNativeStackNavigator();

function navigation() {
  const [load, setLoading] = useState(true);

  const dispatch = useDispatch();
  const name = useSelector((state) => state.reducer.name);

  useEffect(() => {
    getUid();
  });

  const getUid = async () => {
    let name = await AsyncStorage.getItem("name");
    let email = await AsyncStorage.getItem("email");
    dispatch({ type: "SAVE_NAME", payload: name });
    dispatch({ type: "SAVE_EMAIL", payload: email });
    setLoading(false);
  };

  if (load) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={70} />
      </View>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {!!name ? (
            <Stack.Screen options={{ headerShown: false }} name="Tabs" component={Tabs} />
          ) : (
            <Stack.Screen options={{ headerShown: false }} name="Auth" component={Auth} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default navigation;
