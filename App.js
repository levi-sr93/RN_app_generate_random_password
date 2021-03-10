import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";
import Clipboard from "expo-clipboard";

export default function App() {
  const [password, setPassword] = useState("");
  const [passwordSize, setPasswordSize] = useState(10);

  let charset =
    "abcdefghijklmnopqrstuvxyzABCDEFGHIJKLMNOPQRSTUVXYZ0123456789!@#$%*";

  function generatePass() {
    let pass = "";
    for (let i = 0, n = charset.length; i < passwordSize; i++) {
      pass += charset.charAt(Math.floor(Math.random() * n));
    }

    setPassword(pass);
  }

  function copyPass() {
    Clipboard.setString(password);
    alert("Password in the clipboard 🙈");
  }

  return (
    <View style={styles.container}>
      <Image source={require("./src/assets/logo.png")} style={styles.logo} />
      <Text style={styles.title}>{passwordSize} characters</Text>
      <View style={styles.area}>
        <Slider
          style={{ height: 50 }}
          minimumValue={6}
          maximumValue={15}
          minimumTrackTintColor="#f00"
          maximumTrackTintColor="#000"
          value={passwordSize}
          onValueChange={(value) => setPasswordSize(value.toFixed(0))}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={generatePass}>
        <Text style={styles.buttonText}>Generate Password</Text>
      </TouchableOpacity>

      {password !== "" && (
        <View style={styles.area}>
          <Text onLongPress={copyPass} style={styles.password}>
            {password}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c0c0c0",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    marginBottom: 60,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  area: {
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
    width: "90%",
    borderRadius: 7,
  },
  button: {
    backgroundColor: "#ffa200",
    width: "90%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
    marginBottom: 25,
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
  },

  password: {
    padding: 10,
    textAlign: "center",
  },
});
