import React from "react";
import { useSelector } from "react-redux";
import { StyleSheet, Text, View, SafeAreaView, FlatList } from "react-native";

import Item from "../components/item";

export default function Profile({ navigation }) {
  const state = useSelector((state) => state.reducer);

  const renderItems = ({ item }) => <Item name={item} navigation={navigation} />;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={{ color: "white", fontSize: 16, marginLeft: 5, fontWeight: 'bold' }}>Profile</Text>
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
    paddingLeft: 6,
    paddingVertical: 16,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#01B5E7",
  },
  body: {
    padding: 16,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    paddingLeft: 16,
    fontWeight: "bold",
  },
});
