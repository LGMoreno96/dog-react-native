import Item from "../components/item";
import { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, TextInput, FlatList, View, Text} from "react-native";


export default function App({ navigation }) {
  const [search, setSearch] = useState("");
  const [breeds, setBreeds] = useState([]);
  const [favorite, setFavorite] = useState([]);
  const [searchItems, setSearchItems] = useState([]);

  useEffect(() => {
    getApiData();
  }, []);

  const searchItem = (txt) => {
    const fil = breeds.filter((item) => item.name.toLowerCase().includes(txt.toLowerCase()));
    setSearchItems(fil);
    setSearch(txt);
  };

  const getApiData = async () => {
    try {
      const resp = await fetch("https://dog.ceo/api/breeds/list/all");
      const data = await resp.json();
      const arrangeData = Object.keys(data.message).map((breed) => ({ name: breed, subBreed: data.message[breed] }));
      setSearchItems(arrangeData);
      setBreeds(arrangeData);
    } catch (error) {
      console.log(error);
    }
  };

  const renderItems = ({ item }) => <Item {...item} favorite={favorite} setFavorite={setFavorite} navigation={navigation} />;


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={{ color: "white", fontSize: 24, marginLeft: 5, fontWeight: 'bold' }}>DOG APP</Text>
      </View>
      <TextInput onChangeText={(text) => searchItem(text)} value={search} placeholder={"Search..."} style={styles.input} />
      <FlatList data={searchItems} renderItem={renderItems} keyExtractor={(e, index) => index} />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  input: {
    height: 40,
    padding: 10,
    borderWidth: 0,
    marginVertical: 8,
    marginHorizontal: 16,
    borderBottomWidth: 1,
  },
  header: {
    paddingHorizontal: 6,
    paddingVertical: 16,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#01B5E7",
    width: "100%",
    justifyContent: "center",
  },
});
