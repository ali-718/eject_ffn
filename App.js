import React, { Component } from "react";
import { Text, View, Button } from "react-native";
import getDirections from "react-native-google-maps-directions";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Home from "./Views/Home";
import Maps from "./Views/Maps";
import LocationScreen from "./Views/Location";

const Stacker = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      headerShown: false
    }
  },
  Maps: {
    screen: Maps,
    navigationOptions: {
      headerTitle: "Free Food Now"
    }
  },
  Location: {
    screen: LocationScreen
  }
});

const MainNav = createAppContainer(Stacker);

export default class App extends Component {
  handleGetDirections = () => {
    const data = {
      source: {
        latitude: -33.8356372,
        longitude: 18.6947617
      },
      destination: {
        latitude: -33.8600024,
        longitude: 18.697459
      },
      params: [
        {
          key: "travelmode",
          value: "driving" // may be "walking", "bicycling" or "transit" as well
        },
        {
          key: "dir_action",
          value: "navigate" // this instantly initializes navigation using the given travel mode
        }
      ]
    };

    getDirections(data);
  };

  render() {
    return <MainNav />;
  }
}
