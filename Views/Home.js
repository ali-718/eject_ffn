import React, { Component } from "react";
import {
  Text,
  View,
  StatusBar,
  SafeAreaView,
  Image,
  TouchableOpacity
} from "react-native";
// import SafeAreaView from "react-native-safe-area-view";
import Logo from "../assets/logo.jpg";
import { Icon } from "native-base";

export default class Home extends Component {
  render() {
    return (
      <View style={{ width: "100%", flex: 1 }}>
        <SafeAreaView
          style={{
            paddingTop: StatusBar.currentHeight,
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            flex: 1,
            backgroundColor: "white"
          }}
        >
          <Image source={Logo} style={{ width: 200, height: 200 }} />
          <View style={{ marginTop: 20, width: "100%", flexDirection: "row" }}>
            <View
              style={{
                width: "40%",
                alignItems: "flex-end",
                justifyContent: "center"
              }}
            >
              <Icon
                style={{ color: "#177fc2", fontSize: 40 }}
                name="location-pin"
                type="Entypo"
              />
            </View>
            <View style={{ width: "60%", alignItems: "flex-start" }}>
              <Text style={{ fontSize: 20 }}>Blessing Box</Text>
              <Text style={{ fontSize: 14, color: "lightgray" }}>
                (accessible 24/7)
              </Text>
            </View>
          </View>
          <View style={{ marginTop: 20, width: "100%", flexDirection: "row" }}>
            <View
              style={{
                width: "40%",
                alignItems: "flex-end",
                justifyContent: "center"
              }}
            >
              <Icon
                style={{ color: "lightgreen", fontSize: 40 }}
                name="location-pin"
                type="Entypo"
              />
            </View>
            <View style={{ width: "60%", alignItems: "flex-start" }}>
              <Text style={{ fontSize: 20 }}>Food Pantry</Text>
              <Text style={{ fontSize: 14, color: "lightgray" }}>
                (always call to confirm)
              </Text>
            </View>
          </View>
        </SafeAreaView>
        <View
          style={{
            width: "100%",
            height: 100,
            backgroundColor: "#f2f9ff",
            alignItems: "center"
          }}
        >
          <SafeAreaView
            style={{
              width: "100%",
              flex: 1,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <TouchableOpacity
              style={{
                width: "80%",
                padding: 10,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#037ec6"
              }}
              onPress={() => this.props.navigation.navigate("Maps")}
            >
              <Text
                style={{ fontSize: 20, fontWeight: "bold", color: "white" }}
              >
                Start
              </Text>
            </TouchableOpacity>
          </SafeAreaView>
        </View>
      </View>
    );
  }
}
