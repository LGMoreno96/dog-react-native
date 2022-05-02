import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useSelector, useDispatch } from "react-redux";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const Item = ({ name, subBreed = [], navigation }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.reducer.favorites);

  const setFav = (val) => {
    let findFav = favorites.find((breed) => breed == val);
    if (findFav) {
      let filterFav = favorites.filter((e) => e !== val);
      dispatch({ type: "SAVE_FAVORITE", payload: filterFav });
    } else {
      let array = [...favorites, val];
      dispatch({ type: "SAVE_FAVORITE", payload: array });
    }
  };

  let findFav = favorites.find((breed) => breed == name);

  return (
    <TouchableOpacity onPress={() => navigation.navigate("ViewBreed", { name })} activeOpacity={0.8} style={styles.item}>
      <View style={styles.mainRow}>
        <Text style={styles.name}>{name}</Text>
        <AntDesign name={findFav ? "heart" : "hearto"} size={20} color={"red"} onPress={() => setFav(name)} />
      </View>
      {!!subBreed.length &&
        subBreed.map((breed) => {
          let findFavr = favorites.find((favBreed) => favBreed == breed);
          return (
            <View style={styles.subRow}>
              <Text style={styles.breed}>{breed}</Text>
              <AntDesign name={findFavr ? "heart" : "hearto"} size={18} color={"red"} onPress={() => setFav(breed)} />
            </View>
          );
        })}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "#eeeeee",
  },
  name: {
    fontSize: 14,
    textTransform: "capitalize",
  },
  mainRow: {
    flexDirection: "row",
    paddingHorizontal: 5,
    alignItems: "center",
    justifyContent: "space-between",
  },
  subRow: {
    marginTop: 5,
    borderWidth: 1,
    paddingLeft: 5,
    paddingRight: 3,
    borderRadius: 3,
    paddingVertical: 3,
    alignItems: "center",
    flexDirection: "row",
    borderColor: "gainsboro",
    justifyContent: "space-between",
  },
  breed: {
    fontSize: 12,
    textTransform: "capitalize",
  },
});

export default Item;
