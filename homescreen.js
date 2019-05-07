import React, { Component } from "react";
import { View, Button } from "react-native";
import {
  createMaterialTopTabNavigator,
  createAppContainer
} from "react-navigation";
import { ScreenWithButtons } from "./screenwithbuttons";
import { ScreenWithAnimatedList } from "./screenanimatedpage";

const TabNavigator = createAppContainer(createAppContainer(
  createMaterialTopTabNavigator({
    Test1: { screen: ScreenWithButtons },
    Settings: { screen: ScreenWithAnimatedList }
  }))
);

export class HomeScreen extends Component {
  static navigationOptions = {
    drawerLabel: "Home"
  };
  render() {
    return <View style={{flex: 1}}>
        <Button
        title="open drawer"
        onPress={()=>{
          this.props.navigation.openDrawer();
        }}/>
        <TabNavigator />
      </View>;
  }
}
