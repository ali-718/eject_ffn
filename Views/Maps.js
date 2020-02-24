import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity
} from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon
} from "native-base";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";

export default class Maps extends Component {
  state = {
    mapRegion: {
      latitude: 39.8039737,
      longitude: -105.11489660000001,
      latitudeDelta: 0.04,
      longitudeDelta: 0.06
    },
    locations: []
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        mapRegion = {
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.06
        };
        this.setState({ mapRegion });
      },
      error => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    axios.get(`http://138.68.13.121/v1/locations/`).then(responseData => {
      this.setState({ locations: responseData.data });
    });
  }

  getMarkers = locations => {
    let markers;

    markers = locations.map(marker => (
      <MapView.Marker
        coordinate={{
          latitude: marker.latitude,
          longitude: marker.longitude
        }}
        onPress={() => this.props.navigation.navigate("Location", marker)}
        key={marker.id}
      >
        <Icon
          name="map-marker"
          type="MaterialCommunityIcons"
          style={{
            fontSize: 40,
            color:
              this.props.navigation.getParam("Id", "123") == marker.id
                ? "pink"
                : marker.status == "active"
                ? "#177fc2"
                : "green"
          }}
        />
      </MapView.Marker>
    ));
    // }

    return markers;
  };
  render() {
    let markers = this.getMarkers(this.state.locations);
    return (
      <SafeAreaView
        style={{
          width: "100%",
          flex: 1
        }}
      >
        <MapView
          style={{ width: "100%", flex: 1 }}
          region={this.state.mapRegion}
        >
          {this.state.locations.length ? markers : null}
          {this.state.mapRegion.longitude && this.state.mapRegion.latitude ? (
            <MapView.Marker
              coordinate={{
                latitude: this.state.mapRegion.latitude,
                longitude: this.state.mapRegion.longitude
              }}
            >
              <Icon
                name="my-location"
                type="MaterialIcons"
                style={{ color: "#26a640" }}
              />
            </MapView.Marker>
          ) : null}
        </MapView>
      </SafeAreaView>
    );
  }
}
