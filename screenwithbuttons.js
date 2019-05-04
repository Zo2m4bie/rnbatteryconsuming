import React, { Component } from "react";
import {
  TouchableNativeFeedback,
  Button,
  Text,
  View,
  ProgressBarAndroid,
  Animated,
  Easing
} from "react-native";
//200 https://i.dlpng.com/static/png/512041_thumb.png

export class ScreenWithButtons extends React.Component {
  constructor(props) {
    super(props);
    const maxOpacity = 0.12;

    this.state = {
      showProgress: false,
      showCustomProgress: false,
      maxOpacity,
      scaleValue: new Animated.Value(0.01),
      opacityValue: new Animated.Value(maxOpacity)
    };
    this.spinValue = new Animated.Value(0);
  }

  spin() {
    this.spinValue.setValue(0);
    Animated.timing(this.spinValue, {
      toValue: 1,
      duration: 4000,
      easing: Easing.linear,
      useNativeDriver: true
    }).start(() => this.spin());
  }

  componentDidMount() {
    this.spin();
  }
  renderProgress() {
    if (this.state.showProgress) {
      return <ProgressBarAndroid />;
    } else {
      return <View />;
    }
  }
  renderCustomProgress() {
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"]
    });
    if (this.state.showCustomProgress) {
      return (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Animated.Image
            style={{ transform: [{ rotate: spin }], width: 200, height: 200 }}
            source={{ uri: "https://i.dlpng.com/static/png/512041_thumb.png" }}
          />
        </View>
      );
    } else {
      return <View />;
    }
  }
  render() {
    return (
      <View style={{ flex: 1, margin: 10 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Button
            onPress={() => {
              this.setState({
                showProgress: !this.state.showProgress
              });
            }}
            title="Start/Stop progress"
            color="#dddddd"
          />
          <Button
            onPress={() => {
              this.setState({
                showCustomProgress: !this.state.showCustomProgress
              });
            }}
            title="Start/Stop image rotation"
            color="#dddddd"
          />
        </View>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.SelectableBackground()}
        >
          <View
            style={{
              height: 200,
              marginTop: 10,
              backgroundColor: "#dddddd",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text>Test ripple effect</Text>
          </View>
        </TouchableNativeFeedback>

        {this.renderProgress()}
        {this.renderCustomProgress()}
      </View>
    );
  }
}
