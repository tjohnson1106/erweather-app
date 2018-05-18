import React, { Component } from "react";
import { StyleSheet, Text, View, Animated } from "react-native";

import { API_KEY } from "./src/utils/WeatherAPIKey";
import Weather from "./src/components/Weather";
import { WeatherConditions } from "./src/utils/WeatherConditions";

export default class App extends Component {
  state = {
    isLoading: false,
    tempature: 0,
    weatherCondition: null,
    error: null
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.fetchWeather(
          position.coords.latitude,
          position.coords.longitude
        );
      },

      error => {
        this.setState({
          error: "Error obtaining weather conditions"
        });
      }
    );
  }

  fetchWeather(lat = 25, lon = 25) {
    fetch(
      "http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric"
    )
      .then(res => res.json)
      .then(json => {
        // console.log(json);

        this.setState({
          tempature: json.main.temp,
          weatherConditions: json.weather[0].main,
          isLoading: false
        });
      });
  }

  render() {
    const { isLoading } = this.state;
    return (
      <View style={styles.container}>
        {isLoading ? (
          <Text>Fetching The Weather</Text>
        ) : (
          <Weather
            weather={weatherConditions}
            tempature={tempature}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
