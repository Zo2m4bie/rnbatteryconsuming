import React, { Component } from "react";
import {
  TouchableNativeFeedback,
  View,
  Dimensions,
  FlatList,
  Animated,
  Button,
  UIManager,
  Platform,
  Text,
  StyleSheet,
  LayoutAnimation
} from "react-native";
import { Card, CardContent } from "react-native-material-cards";

class Animated_Item extends Component {
  constructor() {
    super();
    this.animatedValue = new Animated.Value(0);
    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {

    console.log('nextProps.item.id');
    console.log(nextProps.item.id);
    console.log("this.props.item.id");
    console.log(this.props.item.id);
    console.log(nextProps.item.id !== this.props.item.id);
    if (nextProps.item.id !== this.props.item.id) {
      return true;
    }
    return false;
  }

  componentDidMount() {
    Animated.timing(this.animatedValue, {
      toValue: 0.5,
      duration: 510,
      useNativeDriver: true
    }).start(() => {
      this.props.afterAnimationComplete();
    });
  }

  deleteItem = () => {
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 510,
      useNativeDriver: true
    }).start(() => {
      this.props.deleteItem(this.props.item.id);
    });
  };
  render() {
    const width = Dimensions.get("window").width;
    const translate_Animation_Object = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [-width, 0, width]
    });

    const opacity_Animation_Object = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 1, 0]
    });

    return (
      <Animated.View
        style={[
          styles.singleItemView,
          {
            transform: [{ translateX: translate_Animation_Object }],
            opacity: opacity_Animation_Object
          }
        ]}
      >
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.SelectableBackground()}
          onPress={this.deleteItem}
        >
          <Text>{this.props.item.text}</Text>
        </TouchableNativeFeedback>
      </Animated.View>
    );
  }
}

export class ScreenWithAnimatedList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        { id: "a", text: "a" },
        { id: "b", text: "b" },
        { id: "c", text: "c" },
        { id: "fd", text: "fb" }
      ],
      disabled: false
    };
  }

  remove_Selected_Item(id) {
    this.addNewElement = false;
    const newArray = [...this.state.list];
    newArray.splice(newArray.findIndex(ele => ele.id === id), 1);

    this.setState(
      () => {
        return {
          list: newArray
        };
      },
      () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      }
    );
  }

  afterAnimationComplete = () => {
    this.index += 1;
    this.setState({ disabled: false });
  };

  add_New_View = () => {
    this.addNewElement = true;
    
    this.setState({
        disabled: true,
        list: [
            { id: this.state.list.length, text: this.state.list.length },
          ...this.state.list
        ]
      });
  };

  renderItem(data) {
    return (
      <Animated_Item
        key={data.id}
        item={data}
        deleteItem={id => this.remove_Selected_Item(id)}
        afterAnimationComplete={this.afterAnimationComplete}
      />
    );
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Button
          title="Add item"
          onPress={this.add_New_View}
        />
        <FlatList
            
        keyExtractor={item => item.id}
          data={this.state.list}
          renderItem={({ item }) => this.renderItem(item)}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    justifyContent: "center",
    paddingTop: Platform.OS == "ios" ? 20 : 0
  },

  singleItemView: {
    backgroundColor: "#FF6F00",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingVertical: 16,
    paddingLeft: 16,
    margin: 5,
    borderRadius: 8
  },

  singleItemText: {
    color: "#fff",
    fontSize: 23,
    paddingRight: 18
  },

  TouchableOpacityStyle: {
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 30
  },

  FloatingButtonStyle: {
    resizeMode: "contain",
    width: 50,
    height: 50
  },

  deleteButton: {
    position: "absolute",
    right: 10,
    width: 25,
    height: 25,
    borderRadius: 18,
    padding: 7,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },

  removeIcon: {
    width: "100%",
    fontSize: 20
  }
});
