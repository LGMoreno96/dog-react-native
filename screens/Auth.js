import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ navigation }) {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [load, setLoad] = useState(false);
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const loginHandler = async () => {
    if (!name && email && password) {
      alert("Please, fill all the required fields");
    } else {
      setLoad(true);
      await AsyncStorage.setItem("name", name);
      await AsyncStorage.setItem("email", email);
      dispatch({ type: "SAVE_NAME", payload: name });
      dispatch({ type: "SAVE_EMAIL", payload: email });
      setTimeout(() => {
        setLoad(false);
      }, 2000);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titletextContainer}>LOGIN</Text>
      </View>

      <View style={styles.textboxContainer}>
        <TextInput
          value={name}
          label="Username"
          mode={"outlined"}
          autoComplete={false}
          style={{ marginTop: 5 }}
          onChangeText={(text) => setName(text)}
          right={<TextInput.Icon name="account" color={"#01B5E7"} />}
        />
        <TextInput
          label="Email"
          mode={"outlined"}
          value={email}
          autoComplete={false}
          style={{ marginTop: 5 }}
          onChangeText={(text) => setEmail(text)}
          right={<TextInput.Icon name="email" color={"#01B5E7"} />}
        />
        <TextInput
          label="Password"
          mode={"outlined"}
          value={password}
          autoComplete={false}
          style={{ marginTop: 5 }}
          secureTextEntry={!visible}
          onChangeText={(text) => setPassword(text)}
          right={<TextInput.Icon name={visible ? "eye" : "eye-off"} onPress={() => setVisible(!visible)} color={"#01B5E7"} />}
        />
        <Button loading={load} mode="contained" color={"#01B5E7"} style={styles.button} onPress={loginHandler} labelStyle={{ color: "white" }}>
          Continue
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  titleContainer: {
    width: "100%",
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: "#01B5E7",
  },
  titletextContainer: {
    fontSize: 28,
    color: "white",
    marginLeft: 10,
    fontWeight: "bold",
    alignSelf: "center",
  },
  textboxContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
    backgroundColor: "white",
  },
  button: {
    padding: 7,
    marginTop: 30,
    borderRadius: 5,
    backgroundColor: "#01B5E7",
  },
});
