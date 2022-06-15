import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, Text, View, SafeAreaView, FlatList, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Item from "../components/item";

export default function Profile({ navigation }) {
  const state = useSelector((state) => state.reducer);
  const dispatch = useDispatch()
  const renderItems = ({ item }) => <Item name={item} navigation={navigation} />;

  const logout = async () => {
    AsyncStorage.removeItem("name");
    AsyncStorage.removeItem("email");
    dispatch({ type: "SAVE_NAME", payload: null });
    dispatch({ type: "SAVE_EMAIL", payload: null });
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={{ color: "white", fontSize: 24, marginLeft: 5, fontWeight: 'bold' }}>PROFILE</Text>
        <Button title="Logout" onPress={logout} />
      </View>
      <View style={styles.body}>
        <Text style={styles.text}>{state.name}</Text>
        <Text style={styles.text}>{state.email}</Text>
      </View>
      <Text style={styles.title}>Favorites</Text>
      <FlatList data={state.favorites} renderItem={renderItems} keyExtractor={(e, index) => index} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    paddingHorizontal: 6,
    paddingVertical: 16,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#01B5E7",
  },
  body: {
    padding: 16,
  },
  text: {
    fontSize: 20,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    paddingLeft: 16,
    fontWeight: "bold",
  },
});
