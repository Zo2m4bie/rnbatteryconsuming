import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { createMaterialTopTabNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';

class HomeScreen extends React.Component {
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Home!</Text>
        </View>
      );
    }
  }
  
  class SettingsScreen extends React.Component {
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Settings!</Text>
        </View>
      );
    }
  }
  
  const TabNavigator = createMaterialTopTabNavigator({
    Test1: { screen: HomeScreen },
    Settings: { screen: SettingsScreen },
  });
  
export class HomeScreen extends Component {
    render() {
        return createAppContainer(TabNavigator);
    }
}
