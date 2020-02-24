import React, { Component } from "react";
import { Text, View, Image } from "react-native";

export default class Splash extends Component {
  render() {
    return (
      <View
        style={{
          width: "100%",
          flex: 1,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Image
          source={require("../assets/logo.jpg")}
          style={{ width: 260, height: 300 }}
        />
      </View>
    );
  }
}
