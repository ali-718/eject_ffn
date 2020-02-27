import React, { Component } from "react";
import {
  ScrollView,
  Linking,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  StatusBar,
  Alert
} from "react-native";

import getDirections from "react-native-google-maps-directions";

import Swiper from "react-native-swiper";
import { Icon } from "native-base";

export default class LocationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: null,
      source: "",
      destination: ""
    };
  }

  Donation = ID => {
    Linking.openURL(`https://freefoodnow.org/donate/?locationid=${ID}`);
  };

  Info = () => {
    Linking.openURL(`https://freefoodnow.org/state`);
  };

  Edit = (ID, name) => {
    Linking.openURL(
      `http://freefoodnow.org/edit?locationid=${ID}&locationname=${name}`
    );
  };

  BoxFilled = () => {
    Alert.alert(
      "",
      "When you mark a box as filled the icon changes to pink for 3 hours. Confirm you've filled the box? ",
      [
        {
          text: "Fill Box",
          onPress: () => {
            this.props.navigation.navigate("Maps", {
              Id: this.props.navigation.getParam("id")
            });
          }
        },
        {
          text: "No",
          onPress: () => {
            console.log("done");
          }
        }
      ]
    );
  };

  Pantry = phone => {
    let phoneNumber;
    if (Platform.OS !== "android") {
      phoneNumber = `telprompt:${phone}`;
    } else {
      phoneNumber = `tel:${phone}`;
    }
    Linking.openURL(phoneNumber);
  };

  log = (latitude, longitude, locationId) => {
    fetch("http://138.68.13.121/v1/locations/", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: locationId,
        longitude: longitude,
        latitude: latitude
      })
    }).then(response => {});
  };

  componentDidMount() {
    const { navigation } = this.props;

    // retrieve and save current location
    navigator.geolocation.getCurrentPosition(
      position => {
        // this.log(
        //   position.coords.latitude,
        //   position.coords.longitude,
        //   navigation.getParam("id", "")
        // );
        this.setState({
          destination: {
            longitude: navigation.getParam("longitude", ""),
            latitude: navigation.getParam("latitude", "")
          },
          source: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        });
      },
      error => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );

    this.setState({
      email: navigation.getParam("email", ""),
      phone: navigation.getParam("phone", ""),
      contact_name: navigation.getParam("contact_name", "")
    });
  }

  handleGetDirections = () => {
    let { source, destination } = this.state;

    const data = {
      source: source,
      destination: destination,
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
    let { source, email, phone, contact_name } = this.state;
    const { navigation } = this.props;

    let imageList = navigation.getParam("images", []);

    return (
      <SafeAreaView style={{ width: "100%", flex: 1 }}>
        <ScrollView
          style={{ backgroundColor: "white", width: "100%", flex: 1 }}
        >
          <Image
            style={{ width: "100%", height: 375 }}
            source={
              imageList[0]
                ? { uri: imageList[0].image }
                : require("../assets/logo.jpg")
            }
          />

          <View style={{ backgroundColor: "#f5f7f8", padding: 10 }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.textTitle}>
                {navigation.getParam("name", "")}
              </Text>
              <Text>{navigation.getParam("address", "")}</Text>
              <View style={{ flexDirection: "row" }}>
                <Text>{navigation.getParam("city", "")}</Text>
                <Text> {navigation.getParam("state", "")}</Text>
                <Text> {navigation.getParam("zipcode", "")}</Text>
              </View>
              {console.log(navigation.getParam("phone", "number not here"))}
            </View>
          </View>

          <View style={{ backgroundColor: "white" }}>
            {navigation.getParam("summary", null) ? (
              <View style={{ paddingLeft: 10, paddingTop: 20 }}>
                <Text style={styles.textTitle}>Tips for Locating</Text>
                <Text>{navigation.getParam("summary", "")}</Text>
              </View>
            ) : null}

            {navigation.getParam("donations", []).length > 0 ? (
              <View style={{ paddingLeft: 10, paddingTop: 20 }}>
                <Text style={styles.textTitle}>Suggested Donations</Text>
                {navigation.getParam("donations", []).map((item, i) => (
                  <View key={i}>
                    <Text>{item.name}</Text>
                  </View>
                ))}
              </View>
            ) : null}

            {navigation.getParam("notes", null) ? (
              <View
                style={{ paddingLeft: 10, paddingTop: 20, paddingBottom: 20 }}
              >
                <Text style={styles.textTitle}>Notes</Text>
                <Text>{navigation.getParam("notes", "")}</Text>
              </View>
            ) : null}
          </View>
        </ScrollView>
        <View
          style={{
            flexDirection: "row",
            padding: 0,
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            marginTop: 10
          }}
        >
          <View style={{ width: "13%", alignItems: "center", margin: 5 }}>
            <TouchableOpacity
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                height: 40,
                backgroundColor: "#26a640",
                margin: 5
              }}
              onPress={source ? this.handleGetDirections : null}
            >
              <Icon
                style={{ color: "white" }}
                name="md-navigate"
                color="white"
              />
            </TouchableOpacity>
            <Text style={{ fontSize: 10 }}>Navigate</Text>
          </View>

          <View style={{ width: "13%", alignItems: "center", margin: 5 }}>
            <TouchableOpacity
              style={{
                width: "100%",
                margin: 5,
                justifyContent: "center",
                alignItems: "center",
                height: 40,
                backgroundColor: "#26a640"
              }}
              onPress={() => this.Donation(navigation.getParam("id", "no id"))}
            >
              <Icon
                style={{ color: "white" }}
                type="FontAwesome5"
                name="donate"
              />
            </TouchableOpacity>
            <Text style={{ fontSize: 10 }}>Donation</Text>
          </View>

          <View style={{ width: "13%", alignItems: "center", margin: 5 }}>
            <TouchableOpacity
              style={{
                width: "100%",
                margin: 5,
                justifyContent: "center",
                alignItems: "center",
                height: 40,
                backgroundColor: "#26a640"
              }}
              onPress={() => this.Info()}
            >
              <Icon
                style={{ color: "white" }}
                type="Entypo"
                name="info-with-circle"
                color="white"
              />
            </TouchableOpacity>
            <Text style={{ fontSize: 10 }}>Info</Text>
          </View>

          <View style={{ width: "13%", alignItems: "center", margin: 5 }}>
            <TouchableOpacity
              style={{
                width: "100%",
                margin: 5,
                justifyContent: "center",
                alignItems: "center",
                height: 40,
                backgroundColor: "#26a640"
              }}
              onPress={() =>
                this.Edit(
                  navigation.getParam("id", "no id"),
                  navigation.getParam("name")
                )
              }
            >
              <Icon
                style={{ color: "white" }}
                type="Entypo"
                name="edit"
                color="white"
              />
            </TouchableOpacity>
            <Text style={{ fontSize: 10 }}>Edit</Text>
          </View>

          <View style={{ width: "13%", alignItems: "center", margin: 5 }}>
            <TouchableOpacity
              disabled={
                navigation.getParam("status", "active") == "active"
                  ? true
                  : false
              }
              onPress={source ? this.handleGetDirections : null}
              style={{
                width: "100%",
                margin: 5,
                justifyContent: "center",
                alignItems: "center",
                height: 40,
                backgroundColor:
                  navigation.getParam("status", "active") == "active"
                    ? "gray"
                    : "#26a640"
              }}
              onPress={() => this.Pantry(navigation.getParam("phone", "0000"))}
            >
              <Icon
                style={{ color: "white" }}
                type="Entypo"
                name="phone"
                color="white"
              />
            </TouchableOpacity>
            <Text style={{ fontSize: 10 }}>Call</Text>
          </View>

          <View style={{ width: "13%", alignItems: "center", margin: 5 }}>
            <TouchableOpacity
              disabled={
                navigation.getParam("status", "active") == "active"
                  ? false
                  : true
              }
              style={{
                width: "100%",
                margin: 5,
                justifyContent: "center",
                alignItems: "center",
                height: 40,
                backgroundColor:
                  navigation.getParam("status", "active") == "active"
                    ? "#26a640"
                    : "gray"
              }}
              onPress={() => this.BoxFilled()}
            >
              <Icon
                style={{ color: "white" }}
                type="Entypo"
                name="box"
                size={25}
                color="white"
              />
            </TouchableOpacity>
            <Text style={{ fontSize: 10 }}>Box Filled</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  wrapper: {},
  textTitle: {
    fontSize: 18,
    color: "#5a91f8",
    flexWrap: "wrap"
  }
};
