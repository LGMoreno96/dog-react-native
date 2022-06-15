import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, SafeAreaView, Text, View, Image, FlatList } from "react-native";

export default function App({ route, navigation }) {
  let breed = route.params.name;
  const [breedImg, setBreedImg] = useState("");
  const [subBreed, setSubBreed] = useState([]);
  const [subBreedImages, setSubBreedImages] = useState([]);

  useEffect(() => {
    getBreedImg();
    geSubBreed();
  }, []);

  const getBreedImg = async () => {
    try {
      let resp = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
      let data = await resp.json();
      setBreedImg(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const geSubBreed = async () => {
    try {
      let resp = await fetch(`https://dog.ceo/api/breed/${breed}/list`);
      let data = await resp.json();
      if (data.message.length) {
        let array = [];
        for (let x of data.message) {
          array.push(getSubBreedImg());
        }
        Promise.all(array).then((values) => {
          setSubBreedImages(values);
          setSubBreed(data.message);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getSubBreedImg = () => {
    return new Promise(async (resolve, reject) => {
      let resp = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
      let data = await resp.json();
      resolve(data.message);
    });
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.item}>
      <Image source={{ uri: subBreedImages[index] }} style={styles.breedImg} />
      <Text style={styles.title}>{item}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="arrow-back-outline" size={24} color="white" onPress={() => navigation.goBack()} />
        <Text style={{ color: "white", fontSize: 24, marginLeft: 5, fontWeight: 'bold' }}>BREED</Text>
      </View>
      <View style={styles.mainBreed}>
        <Image source={{ uri: breedImg }} style={styles.breedImg} />
        <Text style={styles.title}>{breed}</Text>
      </View>
      <FlatList data={subBreed} renderItem={renderItem} keyExtractor={(item, index) => index.toString()} contentContainerStyle={{ paddingBottom: 70 }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingLeft: 6,
    paddingVertical: 16,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#01B5E7",
  },
  mainBreed: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "gainsboro",
  },
  breedImg: {
    height: 200,
    width: "100%",
  },
  title: {
    fontSize: 20,
    marginTop: 10,
    textTransform: 'capitalize',
  },
  item: {
    padding: 10,
    width: "90%",
    borderWidth: 1,
    marginVertical: 10,
    borderColor: "gainsboro",
    alignSelf: "center",
  },
});
